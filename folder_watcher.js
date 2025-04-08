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
const { exec: nodeExec } = require('child_process'); // exec: nodeExec をインポート
const util = require('util');
const chokidar = require('chokidar');
const axios = require('axios');
const anyAsciiModule = require('any-ascii');
const anyAscii = anyAsciiModule.default; // ESモジュールから正しく default をインポート

// --- 定数定義 (ファイル先頭) ---
const LOG_FILE = './upload_log.txt'; // ★ LOG_FILE を先頭で定義
const exec = util.promisify(nodeExec); // ★ Promise版 exec を定義

// --- 設定 ---
const CONFIG = {
  watchFolder: './articles',
  componentsFolder: './components',
  blogFolder: './app/blog',
  processedList: './processed_files.txt',
  gitPath: process.env.GIT_PATH || 'C:\\Program Files\\Git\\cmd\\git.exe' // Windowsでの標準的なGitパス
};
const PROCESSED_FILES = CONFIG.processedList; // 処理済みリストのパス

const CATEGORIES = ['ai-news', 'ai-technology', 'projects', 'nvidia-gtc-2025-report']; // 有効なカテゴリリスト

// メタデータ抽出用の正規表現パターン
const META_PATTERNS = {
  title: /\/\/\s*title:\s*"([^"]+)"/,          // "値" 形式を想定
  category: /\/\/\s*category:\s*"([^"]+)"/,      // "値" 形式を想定
  date: /\/\/\s*date:\s*"([^"]+)"/,              // "値" 形式を想定
  coverImage: /\/\/\s*coverImage:\s*"([^"]+)"/,  // "値" 形式を想定
  description: /\/\/\s*description:\s*"([^"]+)"/, // "値" 形式を想定
  tags: /\/\/\s*tags:\s*(.+)/,                   // JSON配列を含む行全体
  author: /\/\/\s*author:\s*"([^"]+)"/         // "値" 形式を想定
};

// --- ログ関数 (LOG_FILE定義の後) ---
function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}`;
  console.log(logMessage); // コンソールにログ出力
  try {
    // ログファイルに追記
    fs.appendFileSync(LOG_FILE, logMessage + '\n');
  } catch (error) {
    // ログファイル書き込みエラー時の処理（コンソールへのエラー出力はループを避けるため最小限に）
    console.error(`!!! Log file write error: ${error.message}`);
  }
}
// スクリプト開始時にログファイルの場所を記録
log(`ログファイルを使用します: ${LOG_FILE}`);

// --- ヘルパー関数 ---

// 指定されたファイルが既に処理されたかどうかをチェック
function isFileProcessed(fileName) {
  try {
    if (!fs.existsSync(PROCESSED_FILES)) {
      return false; // 処理済みリストファイルがなければ未処理
    }
    const content = fs.readFileSync(PROCESSED_FILES, 'utf8');
    // ファイル名がリストに含まれているか確認 (行末にカンマが付いていると仮定)
    return content.includes(fileName + ',');
  } catch (error) {
    log(`処理済みチェックエラー (${fileName}): ${error.message}`);
    return false; // エラー時は未処理扱い
  }
}

// 処理済みファイルリストにファイル情報を追加
function addToProcessedList(fileName, title, slug, date) {
  try {
    const timestamp = new Date().toISOString();
    // 形式: ファイル名,タイトル,スラグ,処理日時
    const line = `${fileName},${title},${slug},${timestamp}\n`; // 行末の ; を削除
    fs.appendFileSync(PROCESSED_FILES, line);
    log(`ファイル ${fileName} を処理済みリストに追加しました`);
  } catch (error) {
    log(`処理済みリストへの追加エラー: ${error.message}`);
  }
}

// Git のロックファイル (.git/index.lock) があれば削除
function cleanupGitLock() {
  const lockFile = path.join(process.cwd(), '.git', 'index.lock');
  if (fs.existsSync(lockFile)) {
    try {
      fs.unlinkSync(lockFile);
      log('Gitのロックファイルを削除しました');
    } catch (err) {
      log(`ロックファイル削除中にエラー: ${err.message}`);
    }
  }
}

// --- メタデータ抽出関数群 ---

// タグ情報を抽出（JSON配列形式を期待）
function extractTags(content) {
  const metaTagsMatch = content.match(META_PATTERNS.tags);
  if (metaTagsMatch && metaTagsMatch[1]) {
    try {
      const tagsString = metaTagsMatch[1].trim();
      // JSON形式の文字列か簡易チェック
      if (tagsString.startsWith('[') && tagsString.endsWith(']')) {
        // JSONパースを試みる
        const tags = JSON.parse(tagsString);
        if (Array.isArray(tags)) {
          log(`メタデータからタグを抽出しました: ${tags.join(', ')}`);
          return tags; // 抽出したタグ配列を返す
        }
      } else {
         // JSON形式でない場合はカンマ区切りとして処理するなどの代替策も可能
         log(`タグはJSON配列形式ではありませんでした: ${tagsString}`);
         // ここでカンマ区切りを配列にする処理を追加しても良い
         // return tagsString.split(',').map(tag => tag.trim()).filter(tag => tag);
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
  const metaAuthorMatch = content.match(META_PATTERNS.author);
  if (metaAuthorMatch && metaAuthorMatch[1]) {
    const author = metaAuthorMatch[1].trim();
     log(`メタデータから作者を抽出しました: "${author}"`);
    return author; // 抽出した著者名を返す
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

  // メタデータコメントから抽出 (title, category, date, coverImage, description)
  Object.entries(META_PATTERNS).forEach(([key, pattern]) => {
    // tags と author は専用関数で処理するのでスキップ
    if (key === 'tags' || key === 'author') return;

    const match = content.match(pattern);
    if (match && match[1]) {
      // "([^"]+)" パターンでキャプチャしているので、基本的に trim() のみでOK
      const extractedValue = match[1].trim();
      log(`  [extractMetadata] Raw match for ${key}: "${match[1]}"`);
      log(`  [extractMetadata] Cleaned value for ${key}: "${extractedValue}"`);
      metadata[key] = extractedValue;
    } else {
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
  // 記事の<article>タグの中身を抽出
  const articleMatch = content.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  // <article>タグがない場合や中身が空の場合、フォールバックとして H1 とメッセージを表示
  const articleContent = (articleMatch && articleMatch[1]?.trim())
    ? articleMatch[1]
    : `<h1>${componentName.replace(/^Article/, '').replace(/^GeneratedArticle[a-z0-9]+/, 'Generated Article')}</h1><p>Error: Content not found within &lt;article&gt; tags in the source TSX file.</p>`;

  // 生成する TSX コードのテンプレート
  return `import React from 'react';

export default function ${componentName}() {
  return (
    <article className="prose prose-slate max-w-none dark:prose-invert">
      ${articleContent}
    </article>
  );
}
`; // ダークモード対応のクラス `dark:prose-invert` を追加
}

// ブログ記事ページのTSXコードを生成
function generateBlogPost(title, componentName, category, date, description, coverImage) {
  // メタデータ用にタイトルと説明をエスケープ
  const safeTitle = title.replace(/"/g, '\\"');
  const safeDescription = (description || `${safeTitle}に関する詳細記事`).replace(/"/g, '\\"');
  const safeCoverImage = coverImage || '/placeholder.svg?height=600&width=800';

  // 生成する TSX コードのテンプレート
  return `import type { Metadata } from "next";
import ${componentName} from "@/components/${componentName}"; // インポートパスを確認

// Next.js 用のメタデータ
export const metadata: Metadata = {
  title: "${safeTitle}",
  description: "${safeDescription}",
  openGraph: {
    title: "${safeTitle}",
    description: "${safeDescription}",
    images: [{ url: "${safeCoverImage}" }], // OGP画像
  },
};

// ページコンポーネント
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
  const asciiTitle = anyAscii(safeTitle); // ★ anyAscii を直接呼び出す
  log(`  [generateNameAndSlug] Ascii title: "${asciiTitle}"`);

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
    cleanupGitLock(); // Gitロックファイルがあれば削除

    // 1. 生成されたファイルをステージング
    log('生成されたファイルをステージングします...');
    // ファイルパスをダブルクォートで囲む (スペース等を含むパス対策)
    await exec(`"${CONFIG.gitPath}" add "${componentPath}" "${blogPostPath}"`);
    log('生成ファイルをGitにステージングしました');

    // 2. 生成されたファイルの変更をコミット
    log('生成されたファイルの変更をコミットします...');
    const escapedTitle = title.replace(/"/g, '\\"'); // コミットメッセージ用にタイトルをエスケープ
    await exec(`"${CONFIG.gitPath}" commit -m "記事の自動生成: ${escapedTitle}"`);
    log('生成ファイルの変更をコミットしました');

    // 3. その他の変更を確認し、あればコミット
    log('その他の変更を確認します...');
    const gitStatusResult = await exec(`"${CONFIG.gitPath}" status --porcelain`); // ★ execの戻り値を取得
    const statusOutput = gitStatusResult.stdout; // ★ stdout を使用
    if (statusOutput.trim() !== '') {
      log('その他の変更が見つかりました。全てステージングしてコミットします...');
      await exec(`"${CONFIG.gitPath}" add .`); // 全ての変更をステージング
      const timestamp = new Date().toISOString();
      try {
        // コミット実行
        await exec(`"${CONFIG.gitPath}" commit -m "その他の変更を自動コミット: ${timestamp}"`);
        log('その他の変更をコミットしました');
      } catch (commitError) {
        // コミット対象がなくてもエラーになる場合があるので、その場合はログ出力のみ
        if (commitError.stdout?.includes('nothing to commit') || commitError.stderr?.includes('nothing to commit')) {
          log('コミットするその他の変更はありませんでした。');
        } else {
          throw commitError; // それ以外のエラーは再スロー
        }
      }
    } else {
      log('その他の未コミットの変更はありませんでした');
    }

    // 4. 現在のブランチを取得し、リモートと同期してプッシュ
    log('現在のブランチを確認し、リモートと同期・プッシュします...');
    let currentBranch = '';
    try {
        // git rev-parse コマンドで現在のブランチ名を取得
        const branchResult = await exec(`"${CONFIG.gitPath}" rev-parse --abbrev-ref HEAD`);
        currentBranch = branchResult.stdout.trim();
        // ブランチ名が取得できなかった場合のエラー処理
        if (!currentBranch) {
            throw new Error('現在のGitブランチ名の取得に失敗しました。');
        }
        log(`現在のブランチ: ${currentBranch} にプッシュします。`);
    } catch (branchError) {
        log(`!!! 現在のブランチ名の取得エラー: ${branchError.message}`);
        throw branchError; // ブランチ取得失敗は処理継続不可
    }


    try {
      // pull --rebase を試行 (コンフリクトの可能性あり)
      log(`リモートの変更を取得・統合します (pull --rebase origin ${currentBranch})...`);
      await exec(`"${CONFIG.gitPath}" pull origin ${currentBranch} --rebase`);
      log('リモートとの同期 (rebase) が完了しました。');

      // プッシュ実行
      log(`変更を origin/${currentBranch} にプッシュします...`);
      await exec(`"${CONFIG.gitPath}" push origin ${currentBranch}`);
      log('変更をプッシュしました');

    } catch (syncOrPushError) {
      // 同期またはプッシュ失敗時のエラーハンドリング
      log(`!!! プルまたはプッシュに失敗しました: ${syncOrPushError.message}`);
      log('!!! コンフリクトが発生したか、リモートとの同期が必要です。');
      // エラー出力に特定のキーワードが含まれるかチェックして詳細なヒントを表示
      if (syncOrPushError.stderr?.includes('conflict')) {
        log('!!! Rebase 中にコンフリクトが発生しました。手動で解決が必要です: git status, git rebase --continue / --abort');
      } else if (syncOrPushError.stderr?.includes('non-fast-forward')) {
        // non-fast-forward の場合は、pull --rebase で既に失敗している可能性が高いが念のため
        log(`!!! Non-fast-forward エラー。リモートが先に進んでいます。手動で git pull origin ${currentBranch} を試してください。`);
      } else if (syncOrPushError.stderr?.includes('Please commit or stash them')) {
          log('!!! 未ステージングの変更があります。手動で git add . と git commit または git stash を実行してください。');
      } else {
        log('!!! 手動での確認・解決が必要な場合があります。Gitの出力を確認してください。');
        // エラーの詳細を出力
        if(syncOrPushError.stderr) log(`Git stderr: ${syncOrPushError.stderr}`);
        if(syncOrPushError.stdout) log(`Git stdout: ${syncOrPushError.stdout}`);
      }
      // Vercelトリガーは実行せずにエラーをスロー
      throw new Error('Git sync or push failed. Manual intervention may be required.');
    }

    // 5. Vercelデプロイをトリガー（環境変数が設定されていれば）
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
        // Vercelのエラーは処理全体を止めないかもしれない
      }
    } else {
      // Vercelフックがない場合は明確にログ出力
      log('Vercelデプロイフック (VERCEL_DEPLOY_HOOK) が .env.local に設定されていないため、デプロイトリガーをスキップします。');
    }

    log('Git処理とデプロイトリガーが完了しました');

  } catch (error) {
    // Git処理全体のエラー
    log(`*** Git処理中に予期せぬエラーが発生しました: ${error.message}`);
    cleanupGitLock(); // エラー時もロックファイル削除を試みる
    throw error; // エラーを再スローして processFile に伝える
  }
}


// --- メインのファイル処理関数 ---
async function processFile(filePath) {
  const fileName = path.basename(filePath); // ログや処理済みリスト用にファイル名を取得
  log(`処理を開始します: ${filePath}`);
  try {
    // 既に処理済みかチェック
    if (isFileProcessed(fileName)) {
      log(`ファイル ${fileName} は既に処理済みのためスキップします`);
      return;
    }

    // ファイル内容を読み込み
    const content = fs.readFileSync(filePath, 'utf8');

    // メタデータ（基本情報）を抽出
    const metadata = extractMetadata(content, filePath); // filePath を渡す
    // タグと作者を別途抽出
    const tags = extractTags(content);
    const author = extractAuthor(content);

    // コンポーネント名とスラグを生成 (anyAsciiを使用)
    const { componentName, slug } = generateNameAndSlug(metadata.title);

    // --- 抽出・生成結果をログ出力 ---
    log(`  タイトル: "${metadata.title}"`);
    log(`  カテゴリ: "${metadata.category}"`);
    log(`  日付: "${metadata.date}"`);
    log(`  カバー画像: "${metadata.coverImage}"`);
    log(`  説明: "${metadata.description}"`);
    log(`  タグ: ${tags.join(', ')}`);
    log(`  作者: "${author}"`);
    log(`  コンポーネント名: "${componentName}"`);
    log(`  スラグ: "${slug}"`);

    // --- 必要なディレクトリを作成 ---
    // 正しいカテゴリとスラグを使ってパスを生成
    const blogDir = path.join(CONFIG.blogFolder, metadata.category, slug);
    try {
        // ディレクトリが存在しない場合のみ作成 (recursive: true)
        if (!fs.existsSync(blogDir)) {
            fs.mkdirSync(blogDir, { recursive: true });
            log(`ブログディレクトリを作成しました: ${blogDir}`);
        } else {
             log(`ブログディレクトリは既に存在します: ${blogDir}`);
        }
    } catch (mkdirError) {
        log(`!!! ブログディレクトリ作成エラー: ${mkdirError.message}`);
        throw mkdirError; // ディレクトリ作成失敗は致命的なのでエラーをスロー
    }


    // --- コンポーネントファイルを生成 ---
    const componentPath = path.join(CONFIG.componentsFolder, `${componentName}.tsx`);
    try {
        fs.writeFileSync(componentPath, generateComponent(componentName, content));
        log(`コンポーネントを作成しました: ${componentPath}`);
    } catch (writeError) {
        log(`!!! コンポーネントファイル書き込みエラー: ${writeError.message}`);
        throw writeError;
    }

    // --- ブログページファイルを生成 ---
    const blogPostPath = path.join(blogDir, 'page.tsx');
     try {
        fs.writeFileSync(blogPostPath, generateBlogPost(
          metadata.title,
          componentName,
          metadata.category,
          metadata.date,
          metadata.description,
          metadata.coverImage
          // 必要なら tags, author も generateBlogPost に渡せるように修正
        ));
        log(`ブログページを作成しました: ${blogPostPath}`);
    } catch (writeError) {
        log(`!!! ブログページファイル書き込みエラー: ${writeError.message}`);
        throw writeError;
    }

    // --- Git操作とデプロイトリガーを実行 ---
    await handleGitProcess(componentPath, blogPostPath, metadata.title);

    // --- 処理済みリストに追加 ---
    addToProcessedList(fileName, metadata.title, slug, metadata.date);

    log(`ファイル ${fileName} の処理が正常に完了しました！`);
    return { title: metadata.title, slug }; // 処理結果を返す

  } catch (error) {
    // processFile 内で発生したエラーをキャッチ
    log(`!!! ファイル処理エラー (${fileName}): ${error.message}`);
    // エラーの詳細をコンソールにも出力（デバッグ用）
    console.error(`Error details for ${fileName}:`, error);
    // ここで処理を中断するか、次のファイルの処理に進むかなどを決定できる
    // 現状ではエラーをログ記録し、次のファイルの処理に進む（監視は継続する）
  }
}


// --- 初期化処理 ---

// .env.local の読み込み（ファイルの先頭に移動しても良い）
try {
  require('dotenv').config({ path: '.env.local' });
  if (process.env.VERCEL_DEPLOY_HOOK) {
    // URL全体ではなく一部を表示（セキュリティのため）
    log(`Vercelデプロイフックが設定されています: ${process.env.VERCEL_DEPLOY_HOOK.substring(0, 60)}...`);
  } else {
    log('Vercelデプロイフックが設定されていません (.env.local)');
  }
} catch (e) {
  // dotenv がない場合はエラーログではなく情報ログに
  log('dotenv モジュールが見つからないか、.env.local が存在しません。');
}

// 必要なフォルダが存在するか確認し、なければ作成
[CONFIG.watchFolder, CONFIG.componentsFolder, CONFIG.blogFolder].forEach(folder => {
    if (!fs.existsSync(folder)) {
      try {
          fs.mkdirSync(folder, { recursive: true });
          log(`フォルダを作成しました: ${folder}`);
      } catch (mkdirError) {
          log(`!!! フォルダ作成エラー (${folder}): ${mkdirError.message}`);
          process.exit(1); // フォルダ作成失敗は致命的エラー
      }
    }
});

// 処理済みファイルリストを準備
if (!fs.existsSync(PROCESSED_FILES)) {
  try {
      // 初期内容を書き込む
      fs.writeFileSync(PROCESSED_FILES, '# 処理済みTSXファイルリスト\n# 形式: ファイル名,タイトル,スラグ,処理日時\n\n');
      log('処理済みファイルリストを作成しました');
  } catch (writeError) {
      log(`!!! 処理済みファイルリスト作成エラー: ${writeError.message}`);
      process.exit(1); // これも致命的エラー
  }
}

// --- 既存ファイルの初期チェック ---
// スクリプト起動時に一度だけ実行される
log('既存ファイルの確認を開始します...');
// articles 直下と、CATEGORIES 配下のフォルダを対象とする
const articleBaseDirs = [CONFIG.watchFolder];
CATEGORIES.forEach(cat => {
    const catDir = path.join(CONFIG.watchFolder, cat);
    if (fs.existsSync(catDir)) {
        // カテゴリフォルダが存在する場合のみ対象に追加
        articleBaseDirs.push(catDir);
    }
});

log(`以下のディレクトリ内の既存TSXファイルをチェック: ${articleBaseDirs.join(', ')}`);
let initialFilesFound = 0;
const processingPromises = []; // 既存ファイル処理のPromiseを格納する配列

articleBaseDirs.forEach(dir => {
    try {
        // ディレクトリ内の .tsx ファイル（ファイルのみ）をリストアップ
        const files = fs.readdirSync(dir)
                       .filter(file => file.endsWith('.tsx') && fs.statSync(path.join(dir, file)).isFile());

        files.forEach(file => {
            initialFilesFound++;
            const filePath = path.normalize(path.join(dir, file)); // パスを正規化
            // 既存ファイル処理は非同期で実行し、Promiseを配列に追加
            processingPromises.push(
                processFile(filePath).catch(error => {
                    // processFile内でエラーはログされるはずだが、念のためここでもログ
                    log(`!!! 既存ファイル処理中のエラー (${file}): ${error.message}`);
                })
            );
        });
    } catch(readDirError) {
        log(`!!! ディレクトリ読み込みエラー (${dir}): ${readDirError.message}`);
    }
});

// 既存ファイルの処理開始を通知
if (initialFilesFound > 0) {
    log(`${initialFilesFound}個の既存TSXファイルについて処理を開始しました...`);
    // 全ての既存ファイル処理が終わるのを待つ（オプション）
    // Promise.all(processingPromises).then(() => {
    //     log('全ての既存ファイルの初期処理が完了しました。');
    // });
} else {
    log('処理対象の既存TSXファイルは見つかりませんでした。');
}

// --- ファイル監視の開始 ---
// 監視対象パターン (articles/*.tsx と articles/*/*.tsx)
const watchPatterns = [
    path.join(CONFIG.watchFolder, '*.tsx').replace(/\\/g, '/'), // OS互換性のため / を使用
    path.join(CONFIG.watchFolder, '*', '*.tsx').replace(/\\/g, '/') // 1階層下のカテゴリ内
];
log(`以下のパターンでファイル監視を開始します: ${watchPatterns.join(', ')}`);

const watcher = chokidar.watch(watchPatterns, {
  persistent: true,       // スクリプト終了まで監視継続
  ignoreInitial: true,    // 起動時に既存ファイルで 'add' イベントを発火させない
  ignored: /(^|[\/\\])\../, // ドットファイル/フォルダを無視 (例: .git)
  depth: 1,               // articles とその直下のサブディレクトリのみ監視 (無限階層を防ぐ)
  awaitWriteFinish: {     // 書き込み完了を待つ設定
    stabilityThreshold: 2000, // 2秒間変更がなければ書き込み完了とみなす
    pollInterval: 100         // 100ms間隔でチェック
  }
});

// ファイルが追加されたときのイベントハンドラ
watcher.on('add', (filePath) => { // async は不要かも
  const normalizedPath = path.normalize(filePath);
  log(`新しいファイルを追加検出: ${normalizedPath}`);
  // processFile を非同期で実行 (完了を待たない)
  processFile(normalizedPath).catch(error => {
    // processFile 内でキャッチされなかった予期せぬエラー
    log(`!!! watcher 'add' イベント処理中に予期せぬエラー (${normalizedPath}): ${error.message}`);
    console.error(error);
  });
});

// ファイルが変更されたときのイベントハンドラ (必要であれば有効化)
/*
watcher.on('change', (filePath) => {
  const normalizedPath = path.normalize(filePath);
  log(`ファイルを変更検出: ${normalizedPath}`);
  // 変更時にも処理を実行したい場合は processFile を呼ぶ
  // 注意：無限ループにならないように、生成されるファイルは監視対象から除外する必要がある
  processFile(normalizedPath).catch(error => { ... });
});
*/

// 監視エラー発生時のイベントハンドラ
watcher.on('error', error => log(`!!! 監視エラーが発生しました: ${error.message}`));

// 監視準備完了時のイベントハンドラ
watcher.on('ready', () => {
    log('ファイル監視の準備が完了しました。');
    // 現在監視しているパスの詳細を表示（デバッグ用）
    const watchedPaths = watcher.getWatched();
    log('現在監視中のパス:');
    // console.log(watchedPaths); // 詳細すぎる場合があるのでコメントアウトも可
    for (const [dir, files] of Object.entries(watchedPaths)) {
        if (files.length > 0) {
            log(`- ${dir} (${files.length} items)`);
        } else {
             log(`- ${dir}`);
        }
    }
    log('監視中... Ctrl+C で終了');
});

// スクリプト終了時の処理（必要であれば）
process.on('SIGINT', () => {
    log('監視を終了します...');
    watcher.close().then(() => {
        log('Watcher closed.');
        process.exit(0);
    });
});