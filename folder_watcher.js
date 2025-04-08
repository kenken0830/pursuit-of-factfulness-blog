/**
 * 記事フォルダ自動監視スクリプト
 *
 * このスクリプトは以下の機能を提供します：
 * 1. articles フォルダを監視
 * 2. 新しいTSXファイルを自動検出
 * 3. メタデータ (title, category等) を抽出
 * 4. タイトルをASCII変換しコンポーネント名とスラグを生成
 * 5. コンポーネントとブログページを生成
 * 6. Gitで現在のブランチにコミット＆プッシュしVercelデプロイを実行
 *
 * 使用方法:
 * > node folder_watcher.js
 */

const fs = require('fs');
const path = require('path');
const { exec: nodeExec } = require('child_process');
const util = require('util');
const chokidar = require('chokidar');
const axios = require('axios');
const anyAscii = require('any-ascii');

// --- 定数定義 (ファイル先頭) ---
const LOG_FILE = './upload_log.txt';
const exec = util.promisify(nodeExec);

// --- 設定 ---
const CONFIG = {
  watchFolder: './articles',
  componentsFolder: './components',
  blogFolder: './app/blog',
  processedList: './processed_files.txt',
  gitPath: process.env.GIT_PATH || 'C:\\Program Files\\Git\\cmd\\git.exe' // Windowsでの標準的なGitパス
};
const PROCESSED_FILES = CONFIG.processedList;

const CATEGORIES = ['ai-news', 'ai-technology', 'projects', 'nvidia-gtc-2025-report'];

// メタデータ抽出用の正規表現パターン - 複数のコメント形式をサポート
const META_PATTERNS = {
  // 行コメント形式: // title: "値"
  title: [
    /\/\/\s*title:\s*"([^"]+)"/,
    /\/\*\s*title:\s*"([^"]+)"/,
    /{\s*\/\*\s*title:\s*"([^"]+)"/,
    /title:\s*"([^"]+)"/
  ],
  category: [
    /\/\/\s*category:\s*"([^"]+)"/,
    /\/\*\s*category:\s*"([^"]+)"/,
    /{\s*\/\*\s*category:\s*"([^"]+)"/,
    /category:\s*"([^"]+)"/
  ],
  date: [
    /\/\/\s*date:\s*"([^"]+)"/,
    /\/\*\s*date:\s*"([^"]+)"/,
    /{\s*\/\*\s*date:\s*"([^"]+)"/,
    /date:\s*"([^"]+)"/
  ],
  coverImage: [
    /\/\/\s*coverImage:\s*"([^"]+)"/,
    /\/\*\s*coverImage:\s*"([^"]+)"/,
    /{\s*\/\*\s*coverImage:\s*"([^"]+)"/,
    /coverImage:\s*"([^"]+)"/
  ],
  description: [
    /\/\/\s*description:\s*"([^"]+)"/,
    /\/\*\s*description:\s*"([^"]+)"/,
    /{\s*\/\*\s*description:\s*"([^"]+)"/,
    /description:\s*"([^"]+)"/
  ],
  tags: [
    /\/\/\s*tags:\s*(\[.*?\])/,
    /\/\*\s*tags:\s*(\[.*?\])/,
    /{\s*\/\*\s*tags:\s*(\[.*?\])/,
    /tags:\s*(\[.*?\])/
  ],
  author: [
    /\/\/\s*author:\s*"([^"]+)"/,
    /\/\*\s*author:\s*"([^"]+)"/,
    /{\s*\/\*\s*author:\s*"([^"]+)"/,
    /author:\s*"([^"]+)"/
  ]
};

// --- ログ関数 (LOG_FILE定義の後) ---
function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}`;
  console.log(logMessage);
  try {
    fs.appendFileSync(LOG_FILE, logMessage + '\n');
  } catch (error) {
    console.error(`!!! Log file write error: ${error.message}`);
  }
}

// --- ヘルパー関数 ---

// 指定されたファイルが既に処理されたかどうかをチェック
function isFileProcessed(fileName) {
  try {
    if (!fs.existsSync(PROCESSED_FILES)) {
      return false;
    }
    const content = fs.readFileSync(PROCESSED_FILES, 'utf8');
    return content.includes(fileName + ',');
  } catch (error) {
    log(`処理済みチェックエラー (${fileName}): ${error.message}`);
    return false;
  }
}

// 処理済みファイルリストにファイル情報を追加
function addToProcessedList(fileName, title, slug, date) {
  try {
    const timestamp = new Date().toISOString();
    const line = `${fileName},${title},${slug},${timestamp}\n`;
    fs.appendFileSync(PROCESSED_FILES, line);
    log(`ファイル ${fileName} を処理済みリストに追加しました`);
  } catch (error) {
    log(`処理済みリストへの追加エラー: ${error.message}`);
  }
}

// Git のロックファイル (.git/index.lock) があれば削除
function cleanupGitLock() {
  // 削除対象のロックファイル一覧
  const lockFiles = [
    path.join(process.cwd(), '.git', 'index.lock'),
    path.join(process.cwd(), '.git', 'refs', 'heads', 'main.lock'),
    path.join(process.cwd(), '.git', 'refs', 'heads', 'master.lock'),
    path.join(process.cwd(), '.git', 'HEAD.lock')
  ];
  
  let cleanedCount = 0;
  
  for (const lockFile of lockFiles) {
    try {
      if (fs.existsSync(lockFile)) {
        fs.unlinkSync(lockFile);
        log(`Gitのロックファイル ${path.basename(lockFile)} を削除しました`);
        cleanedCount++;
      }
    } catch (err) {
      log(`警告: ロックファイル ${path.basename(lockFile)} の削除中にエラー: ${err.message}`);
    }
  }
  
  if (cleanedCount > 0) {
    log(`${cleanedCount}個のGitロックファイルを削除しました。処理を少し遅延します。`);
    // ファイルシステム操作の同期を確保するために少し待機
    const waitStart = Date.now();
    while (Date.now() - waitStart < 500) {
      // 意図的な短い遅延 (500ms)
    }
  }
  
  return cleanedCount > 0;
}

// --- メタデータ抽出関数群 ---

// タグ情報を抽出（JSON配列形式を期待）
function extractTags(content) {
  // 各パターンをトライ
  let tagsMatch = null;
  for (const pattern of META_PATTERNS.tags) {
    const match = content.match(pattern);
    if (match && match[1]) {
      tagsMatch = match;
      break;
    }
  }

  if (tagsMatch && tagsMatch[1]) {
    try {
      const tagsString = tagsMatch[1].trim();
      // JSON形式の文字列か簡易チェック
      if (tagsString.startsWith('[') && tagsString.endsWith(']')) {
        // JSONパースを試みる
        const tags = JSON.parse(tagsString);
        if (Array.isArray(tags)) {
          log(`メタデータからタグを抽出しました: ${tags.join(', ')}`);
          return tags; // 抽出したタグ配列を返す
        }
      } else {
         // JSON形式でない場合はカンマ区切りとして処理
         const tags = tagsString
           .replace(/[\[\]'"]/g, '') // 角括弧と引用符を除去
           .split(',')
           .map(tag => tag.trim())
           .filter(tag => tag.length > 0);
         
         if (tags.length > 0) {
           log(`タグをカンマ区切りとして処理しました: ${tags.join(', ')}`);
           return tags;
         } else {
           log(`タグの処理に失敗しました: ${tagsString}`);
         }
      }
    } catch (e) {
      log(`タグのJSONパース中にエラー: ${e.message}`);
    }
  }
  // メタデータから抽出できない、またはパース失敗時はデフォルト値を返す
  log('タグが見つからないか無効なため、デフォルトタグを使用します');
  return ['AI', '自動生成']; // デフォルトタグ
}

// 著者情報を抽出
function extractAuthor(content) {
  // 各パターンをトライ
  for (const pattern of META_PATTERNS.author) {
    const match = content.match(pattern);
    if (match && match[1]) {
      const author = match[1].trim();
      log(`メタデータから作者を抽出しました: "${author}"`);
      return author; // 抽出した著者名を返す
    }
  }
  // メタデータから抽出できない場合はデフォルト値を返す
  log('作者が見つからないため、デフォルトの作者を使用します');
  return 'AI Team'; // デフォルトの著者名
}

// 主要なメタデータ（タイトル、カテゴリ、日付など）を抽出
function extractMetadata(content, filePath) {
  const fileName = path.basename(filePath); // ファイル名はログ用
  const metadata = {
    title: '',
    category: '',
    date: '',
    coverImage: '',
    description: '',
    // tags, author はここでは初期化せず、専用の抽出関数に任せる
  };
  log(`[extractMetadata] Start processing for: ${fileName}`);

  // コメントブロックを抽出
  const commentBlockMatches = [
    content.match(/\/\*\s*([\s\S]*?)\s*\*\//),  // /* ... */
    content.match(/{\s*\/\*\s*([\s\S]*?)\s*\*\/\s*}/),  // { /* ... */ }
  ];
  
  let metadataText = '';
  
  // コメントブロックからテキストを抽出
  for (const match of commentBlockMatches) {
    if (match && match[1]) {
      metadataText += match[1] + '\n';
      log(`  [extractMetadata] コメントブロックを検出しました`);
    }
  }
  
  // 行コメントも抽出
  const lineComments = content.match(/\/\/\s*(.+)/g);
  if (lineComments) {
    const lineCommentText = lineComments.map(line => line.replace(/\/\/\s*/, '')).join('\n');
    metadataText += lineCommentText;
    log(`  [extractMetadata] 行コメントを検出しました`);
  }
  
  // 最終的にはmetadataTextとcontentの両方を検索対象にする
  const searchText = metadataText + '\n' + content;

  // メタデータコメントから抽出 (title, category, date, coverImage, description)
  Object.entries(META_PATTERNS).forEach(([key, patterns]) => {
    // tags と author は専用関数で処理するのでスキップ
    if (key === 'tags' || key === 'author') return;

    // 各パターンを順番に試す
    for (const pattern of patterns) {
      const match = searchText.match(pattern);
      if (match && match[1]) {
        // "([^"]+)" パターンでキャプチャしているので、基本的に trim() のみでOK
        const extractedValue = match[1].trim();
        log(`  [extractMetadata] Raw match for ${key}: "${match[1]}"`);
        log(`  [extractMetadata] Cleaned value for ${key}: "${extractedValue}"`);
        metadata[key] = extractedValue;
        break; // 最初にマッチしたら終了
      }
    }
    
    // このメタデータ要素がマッチしなかった場合
    if (!metadata[key]) {
      log(`  [extractMetadata] No match for ${key}`);
    }
  });

  // --- 各メタデータのフォールバック処理 ---

  // タイトル: H1タグ or ファイル名からフォールバック
  if (!metadata.title) {
    log(`  [extractMetadata] No title found in metadata comment, trying H1 tag...`);
    const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    if (h1Match && h1Match[1]) {
      metadata.title = h1Match[1].replace(/<[^>]*>/g, '').trim();
      log(`  [extractMetadata] Title extracted from H1: "${metadata.title}"`);
    }
  }
  if (!metadata.title || metadata.title.trim() === '') {
    log(`  [extractMetadata] No title found in H1 tag, trying filename fallback...`);
    const baseName = path.parse(fileName).name;
    // ファイル名を元にタイトルらしい文字列を生成（例: test-file -> TestFile）
    metadata.title = baseName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
    log(`  [extractMetadata] Title fallback from filename: "${metadata.title}"`);
  }

  // カテゴリ: ファイルパス or デフォルト値でフォールバック
  if (!metadata.category) {
     log(`  [extractMetadata] No category found in metadata comment, trying path...`);
     // ファイルパスからカテゴリを推測（例: articles/ai-news/file.tsx -> ai-news）
     const pathParts = filePath.split(path.sep);
     const articlesDirIndex = pathParts.indexOf('articles');
     // 'articles' ディレクトリの次の要素がカテゴリリストにあれば採用
     if (articlesDirIndex >= 0 && pathParts.length > articlesDirIndex + 1) {
       const categoryFromPath = pathParts[articlesDirIndex + 1];
       if (CATEGORIES.includes(categoryFromPath)) {
         metadata.category = categoryFromPath;
         log(`  [extractMetadata] Category extracted from path: "${metadata.category}"`);
       } else {
         log(`  [extractMetadata] Category from path ("${categoryFromPath}") is not valid.`);
       }
     } else {
        log(`  [extractMetadata] Could not determine category from path.`);
     }
  }
  
  // カテゴリが有効リストに含まれない、または見つからない場合はデフォルト
  if (!metadata.category || !CATEGORIES.includes(metadata.category)) {
    if (metadata.category && !CATEGORIES.includes(metadata.category)) { // 指定があったが無効だった場合
      log(`  [extractMetadata] Invalid category specified: "${metadata.category}". Valid categories: ${CATEGORIES.join(', ')}`);
    }
    log(`  [extractMetadata] Using default category: "ai-technology"`);
    metadata.category = 'ai-technology'; // デフォルトカテゴリ
  }

  // その他メタデータのフォールバック
  if (!metadata.date) {
    metadata.date = new Date().toISOString().split('T')[0];
    log(`  [extractMetadata] Using default date: "${metadata.date}"`);
  }
  if (!metadata.description) {
    metadata.description = `${metadata.title}に関する詳細記事`; // タイトルから自動生成
    log(`  [extractMetadata] Using default description: "${metadata.description}"`);
  }
  if (!metadata.coverImage) {
    metadata.coverImage = '/placeholder.svg?height=600&width=800'; // デフォルト画像
    log(`  [extractMetadata] Using default coverImage: "${metadata.coverImage}"`);
  }

  log(`[extractMetadata] Returning metadata (excluding tags/author): title="${metadata.title}", category="${metadata.category}", date="${metadata.date}", ...`);
  return metadata; // tags と author を含まない metadata を返す
}

// --- コンポーネント/ページ生成関数 ---

// 記事コンポーネントのTSXコードを生成
function generateComponent(componentName, content) {
  const articleMatch = content.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  const articleContent = (articleMatch && articleMatch[1]?.trim())
    ? articleMatch[1]
    : `<h1>${componentName.replace(/^Article/, '').replace(/^GeneratedArticle[a-z0-9]+/, 'Generated Article')}</h1><p>Error: Content not found within &lt;article&gt; tags in the source TSX file.</p>`;

  return `import React from 'react';

export default function ${componentName}() {
  return (
    <article className="prose prose-slate max-w-none dark:prose-invert">
      ${articleContent}
    </article>
  );
}
`;
}

// ブログ記事ページのTSXコードを生成
function generateBlogPost(title, componentName, category, date, description, coverImage) {
  const safeTitle = title.replace(/"/g, '\\"');
  const safeDescription = (description || `${safeTitle}に関する詳細記事`).replace(/"/g, '\\"');
  const safeCoverImage = coverImage || '/placeholder.svg?height=600&width=800';

  return `import type { Metadata } from "next";
import ${componentName} from "@/components/${componentName}";

export const metadata: Metadata = {
  title: "${safeTitle}",
  description: "${safeDescription}",
  openGraph: {
    title: "${safeTitle}",
    description: "${safeDescription}",
    images: [{ url: "${safeCoverImage}" }],
  },
};

export default function BlogPost() {
  return <${componentName} />;
}
`;
}

// --- 名前/スラグ生成関数 (any-ascii 使用) ---
function generateNameAndSlug(title) {
  const safeTitle = (title || "DefaultArticleTitle").trim();
  log(`  [generateNameAndSlug] Original title: "${safeTitle}"`);

  // anyAscii を使って ASCII 文字列に変換
  let asciiTitle;
  try {
    asciiTitle = anyAscii(safeTitle); // 直接関数として呼び出す
    log(`  [generateNameAndSlug] Ascii title: "${asciiTitle}"`);
  } catch (error) {
    log(`  [generateNameAndSlug] エラー: anyAscii 変換に失敗しました: ${error.message}`);
    // フォールバック: タイムスタンプを使用
    asciiTitle = safeTitle.replace(/[^\x00-\x7F]/g, ''); // 非ASCII文字を削除
    if (asciiTitle.trim() === '') {
      asciiTitle = `article-${Date.now().toString(36)}`;
    }
    log(`  [generateNameAndSlug] フォールバック ASCII title: "${asciiTitle}"`);
  }

  // コンポーネント名をパスカルケースで生成 (ASCII化されたタイトルから)
  let componentName = asciiTitle
    .replace(/[^\w\s-]/g, '') // 半角英数字、スペース、ハイフン以外を除去
    .split(/[-\s]+/)          // ハイフンまたはスペースで単語に分割
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // 各単語の先頭を大文字化
    .join('');                 // 単語を結合

  // 無効な開始文字や空の場合のフォールバック
  if (!/^[a-zA-Z]/.test(componentName)) { // 英字で始まらない場合
      componentName = `Article${componentName}`; // "Article"プレフィックスを追加
  }
  // 生成結果が空、または "Article" のみになった場合のフォールバック
  if (componentName.length === 0 || componentName === 'Article') {
    // タイムスタンプを使い、よりユニークなフォールバック名を生成
    componentName = `GeneratedArticle${Date.now().toString(36)}`;
  }
  log(`  [generateNameAndSlug] Generated componentName: "${componentName}"`);

  // スラグをケバブケースで生成 (ASCII化されたタイトルから)
  let slug = asciiTitle
    .toLowerCase()           // 全て小文字に
    .replace(/[^\w\s-]/g, '') // 半角英数字、スペース、ハイフン以外を除去
    .replace(/[\s]+/g, '-')   // 1つ以上のスペースをハイフン1つに置換
    .replace(/-+/g, '-')     // 連続するハイフンを1つに置換
    .replace(/^-+|-+$/g, ''); // 先頭と末尾のハイフンを除去

  // 空の場合のフォールバック
  if (slug.length === 0) {
    slug = `article-${Date.now().toString(36)}`;
  }
  log(`  [generateNameAndSlug] Generated slug: "${slug}"`);

  return { componentName, slug };
}

// --- Git 処理関数 (現在のブランチに pull/push) ---
async function handleGitProcess(componentPath, blogPostPath, title) {
  try {
    log('Git処理を開始します...');
    cleanupGitLock();

    log('生成されたファイルをステージングします...');
    await exec(`"${CONFIG.gitPath}" add "${componentPath}" "${blogPostPath}"`);
    log('生成ファイルをGitにステージングしました');

    log('生成されたファイルの変更をコミットします...');
    const escapedTitle = title.replace(/"/g, '\\"');
    await exec(`"${CONFIG.gitPath}" commit -m "記事の自動生成: ${escapedTitle}"`);
    log('生成ファイルの変更をコミットしました');

    log('その他の変更を確認します...');
    try {
      const gitStatusResult = await exec(`"${CONFIG.gitPath}" status --porcelain`);
      const statusOutput = gitStatusResult.stdout;
      
      if (statusOutput && typeof statusOutput === 'string' && statusOutput.trim() !== '') {
        log('その他の変更が見つかりました。全てステージングしてコミットします...');
        await exec(`"${CONFIG.gitPath}" add .`);
        const timestamp = new Date().toISOString();
        try {
          await exec(`"${CONFIG.gitPath}" commit -m "その他の変更を自動コミット: ${timestamp}"`);
          log('その他の変更をコミットしました');
        } catch (commitError) {
          if (commitError.stdout?.includes('nothing to commit') || commitError.stderr?.includes('nothing to commit')) {
            log('コミットするその他の変更はありませんでした。');
          } else {
            throw commitError;
          }
        }
      } else {
        log('その他の未コミットの変更はありませんでした');
      }
    } catch (statusError) {
      log(`!!! Git状態の確認に失敗しました: ${statusError.message}`);
    }

    log('現在のブランチを確認し、リモートと同期・プッシュします...');
    let currentBranch = '';
    try {
      const branchResult = await exec(`"${CONFIG.gitPath}" rev-parse --abbrev-ref HEAD`);
      currentBranch = branchResult.stdout.trim();
      if (!currentBranch) {
        throw new Error('現在のGitブランチ名の取得に失敗しました。');
      }
      log(`現在のブランチ: ${currentBranch} にプッシュします。`);
    } catch (branchError) {
      log(`!!! 現在のブランチ名の取得エラー: ${branchError.message}`);
      throw branchError;
    }

    try {
      log(`リモートの変更を取得・統合します (pull --rebase origin ${currentBranch})...`);
      await exec(`"${CONFIG.gitPath}" pull origin ${currentBranch} --rebase`);
      log('リモートとの同期 (rebase) が完了しました。');

      log(`変更を origin/${currentBranch} にプッシュします...`);
      await exec(`"${CONFIG.gitPath}" push origin ${currentBranch}`);
      log('変更をプッシュしました');

    } catch (syncOrPushError) {
      log(`!!! プルまたはプッシュに失敗しました: ${syncOrPushError.message}`);
      log('!!! コンフリクトが発生したか、リモートとの同期が必要です。');
      if (syncOrPushError.stderr?.includes('conflict')) {
        log('!!! Rebase 中にコンフリクトが発生しました。手動で解決が必要です: git status, git rebase --continue / --abort');
      } else if (syncOrPushError.stderr?.includes('non-fast-forward')) {
        log(`!!! Non-fast-forward エラー。リモートが先に進んでいます。手動で git pull origin ${currentBranch} を試してください。`);
      } else {
        log('!!! 手動での確認・解決が必要な場合があります。');
      }
      throw new Error('Git sync or push failed. Manual intervention may be required.');
    }

    if (process.env.VERCEL_DEPLOY_HOOK) {
      log('Vercelデプロイをトリガーします...');
      try {
        const response = await axios.post(process.env.VERCEL_DEPLOY_HOOK);
        log(`Vercelデプロイトリガー成功: ${JSON.stringify(response.data)}`);
      } catch (error) {
        log(`!!! Vercelデプロイトリガーエラー: ${error.message}`);
        if (error.response) {
          log(`!!! Vercel APIエラー詳細: Status=${error.response.status}, Data=${JSON.stringify(error.response.data)}`);
        }
      }
    } else {
      log('Vercelデプロイフックが設定されていません。.env.localファイルを確認してください');
    }

    log('Git処理とデプロイトリガーが完了しました');

  } catch (error) {
    log(`*** Git処理中に予期せぬエラーが発生しました: ${error.message}`);
    cleanupGitLock();
    throw error;
  }
}

// --- メインのファイル処理関数 ---
async function processFile(filePath) {
  const fileName = path.basename(filePath);
  log(`処理を開始します: ${filePath}`);
  try {
    if (isFileProcessed(fileName)) {
      log(`ファイル ${fileName} は既に処理済みのためスキップします`);
      return;
    }

    const content = fs.readFileSync(filePath, 'utf8');

    const metadata = extractMetadata(content, filePath);
    const tags = extractTags(content);
    const author = extractAuthor(content);

    const { componentName, slug } = generateNameAndSlug(metadata.title);

    log(`  タイトル: "${metadata.title}"`);
    log(`  カテゴリ: "${metadata.category}"`);
    log(`  日付: "${metadata.date}"`);
    log(`  カバー画像: "${metadata.coverImage}"`);
    log(`  説明: "${metadata.description}"`);
    log(`  タグ: ${tags.join(', ')}`);
    log(`  作者: "${author}"`);
    log(`  コンポーネント名: "${componentName}"`);
    log(`  スラグ: "${slug}"`);

    const blogDir = path.join(CONFIG.blogFolder, metadata.category, slug);
    try {
      fs.mkdirSync(blogDir, { recursive: true });
      log(`ブログディレクトリを作成/確認しました: ${blogDir}`);
    } catch (mkdirError) {
      log(`!!! ブログディレクトリ作成エラー: ${mkdirError.message}`);
      throw mkdirError;
    }

    const componentPath = path.join(CONFIG.componentsFolder, `${componentName}.tsx`);
    try {
      fs.writeFileSync(componentPath, generateComponent(componentName, content));
      log(`コンポーネントを作成しました: ${componentPath}`);
    } catch (writeError) {
      log(`!!! コンポーネントファイル書き込みエラー: ${writeError.message}`);
      throw writeError;
    }

    const blogPostPath = path.join(blogDir, 'page.tsx');
    try {
      fs.writeFileSync(blogPostPath, generateBlogPost(
        metadata.title,
        componentName,
        metadata.category,
        metadata.date,
        metadata.description,
        metadata.coverImage
      ));
      log(`ブログページを作成しました: ${blogPostPath}`);
    } catch (writeError) {
      log(`!!! ブログページファイル書き込みエラー: ${writeError.message}`);
      throw writeError;
    }

    await handleGitProcess(componentPath, blogPostPath, metadata.title);

    addToProcessedList(fileName, metadata.title, slug, metadata.date);

    log(`ファイル ${fileName} の処理が正常に完了しました！`);
    return { title: metadata.title, slug };

  } catch (error) {
    log(`!!! ファイル処理エラー (${fileName}): ${error.message}`);
    console.error(`Error details for ${fileName}:`, error);
  }
}

// --- 初期化処理 ---

try {
  require('dotenv').config({ path: '.env.local' });
  if (process.env.VERCEL_DEPLOY_HOOK) {
    log(`Vercelデプロイフックが設定されています: ${process.env.VERCEL_DEPLOY_HOOK.substring(0, 60)}...`);
  } else {
    log('Vercelデプロイフックが設定されていません。.env.localファイルを確認してください');
  }
} catch (e) {
  log('dotenv がインストールされていないか、.env.local が見つかりません');
}

[CONFIG.watchFolder, CONFIG.componentsFolder, CONFIG.blogFolder].forEach(folder => {
  if (!fs.existsSync(folder)) {
    try {
      fs.mkdirSync(folder, { recursive: true });
      log(`フォルダを作成しました: ${folder}`);
    } catch (mkdirError) {
      log(`!!! フォルダ作成エラー (${folder}): ${mkdirError.message}`);
      process.exit(1);
    }
  }
});

if (!fs.existsSync(PROCESSED_FILES)) {
  try {
    fs.writeFileSync(PROCESSED_FILES, '# 処理済みTSXファイルリスト\n# 形式: ファイル名,タイトル,スラグ,処理日時\n\n');
    log('処理済みファイルリストを作成しました');
  } catch (writeError) {
    log(`!!! 処理済みファイルリスト作成エラー: ${writeError.message}`);
    process.exit(1);
  }
}

log('既存ファイルの確認を開始します...');
const articleBaseDirs = [CONFIG.watchFolder];
CATEGORIES.forEach(cat => {
  const catDir = path.join(CONFIG.watchFolder, cat);
  if (fs.existsSync(catDir)) {
    articleBaseDirs.push(catDir);
  }
});

log(`以下のディレクトリ内の既存TSXファイルをチェック: ${articleBaseDirs.join(', ')}`);
let initialFilesFound = 0;

articleBaseDirs.forEach(dir => {
  try {
    const files = fs.readdirSync(dir)
      .filter(file => file.endsWith('.tsx') && fs.statSync(path.join(dir, file)).isFile());
    files.forEach(file => {
      initialFilesFound++;
      const filePath = path.normalize(path.join(dir, file));
      processFile(filePath).catch(error => {
      });
    });
  } catch(readDirError) {
    log(`!!! ディレクトリ読み込みエラー (${dir}): ${readDirError.message}`);
  }
});

if (initialFilesFound > 0) {
  log(`${initialFilesFound}個の既存TSXファイルについて処理を開始しました（バックグラウンドで実行）。`);
} else {
  log('処理対象の既存TSXファイルは見つかりませんでした。');
}

const watchPatterns = [
  path.join(CONFIG.watchFolder, '*.tsx').replace(/\\/g, '/'),
  path.join(CONFIG.watchFolder, '*', '*.tsx').replace(/\\/g, '/'),
];
log(`以下のパターンでファイル監視を開始します: ${watchPatterns.join(', ')}`);

const watcher = chokidar.watch(watchPatterns, {
  persistent: true,
  ignoreInitial: true,
  ignored: /(^|[\/\\])\../,
  depth: 1,
  awaitWriteFinish: {
    stabilityThreshold: 2000,
    pollInterval: 100
  }
});

watcher.on('add', async (filePath) => {
  const normalizedPath = path.normalize(filePath);
  log(`新しいファイルを追加検出: ${normalizedPath}`);
  processFile(normalizedPath).catch(error => {
    log(`!!! watcher 'add' イベント処理中に予期せぬエラー (${normalizedPath}): ${error.message}`);
    console.error(error);
  });
});

watcher.on('error', error => log(`!!! 監視エラーが発生しました: ${error.message}`));

watcher.on('ready', () => {
  log('ファイル監視の準備が完了しました。');
  const watchedPaths = watcher.getWatched();
  log('現在監視中のパス:');
  console.log(watchedPaths);
  log('監視中... Ctrl+C で終了');
});
