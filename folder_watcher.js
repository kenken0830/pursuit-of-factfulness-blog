/**
 * 記事フォルダ自動監視スクリプト
 * 
 * このスクリプトは以下の機能を提供します：
 * 1. articles フォルダを監視
 * 2. 新しいTSXファイルを自動検出
 * 3. H1タグからタイトルを抽出
 * 4. コンポーネントとブログページを生成
 * 5. GitHubにプッシュしVercelデプロイを実行
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

// .env.localがあれば読み込む
try {
  require('dotenv').config({ path: '.env.local' });
  if (process.env.VERCEL_DEPLOY_HOOK) {
    log(`Vercelデプロイフックが設定されています: ${process.env.VERCEL_DEPLOY_HOOK}`);
  } else {
    log('Vercelデプロイフックが設定されていません。.env.localファイルを確認してください');
  }
} catch (e) {
  console.log('dotenv not installed or .env.local not found');
}

// ログファイル
const LOG_FILE = './upload_log.txt';

// execをPromise化する関数
const exec = util.promisify(nodeExec);

// 設定
const CONFIG = {
  watchFolder: './articles',
  componentsFolder: './components',
  blogFolder: './app/blog',
  processedList: './processed_files.txt',
  gitPath: process.env.GIT_PATH || 'git'
};

// カテゴリリスト
const CATEGORIES = ['ai-news', 'ai-technology', 'projects', 'nvidia-gtc-2025-report'];

// メタデータのパターン
const META_PATTERNS = {
  title: /\/\/\s*title:\s*(.+)/,
  category: /\/\/\s*category:\s*(.+)/,
  date: /\/\/\s*date:\s*(.+)/,
  coverImage: /\/\/\s*coverImage:\s*(.+)/,
  description: /\/\/\s*description:\s*(.+)/,
  tags: /\/\/\s*tags:\s*(.+)/,
  author: /\/\/\s*author:\s*(.+)/
};

// ログ出力関数
function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}`;
  console.log(logMessage);
  
  try {
    fs.appendFileSync(LOG_FILE, logMessage + '\n');
  } catch (error) {
    console.error(`ログファイルへの書き込みエラー: ${error.message}`);
  }
}

// 処理済みファイルかどうかをチェック
function isFileProcessed(fileName) {
  try {
    if (!fs.existsSync(CONFIG.processedList)) {
      return false;
    }
    
    const content = fs.readFileSync(CONFIG.processedList, 'utf8');
    return content.includes(fileName + ',');
  } catch (error) {
    log(`処理済みチェックエラー: ${error.message}`);
    return false;
  }
}

// 処理済みリストに追加
function addToProcessedList(fileName, title, slug, date) {
  try {
    const timestamp = new Date().toISOString();
    const line = `${fileName},${title},${slug},${timestamp}\n`;
    fs.appendFileSync(CONFIG.processedList, line);
    log(`ファイル ${fileName} を処理済みリストに追加しました`);
  } catch (error) {
    log(`処理済みリストへの追加エラー: ${error.message}`);
  }
}

// 処理済みリストの準備
if (!fs.existsSync(CONFIG.processedList)) {
  fs.writeFileSync(CONFIG.processedList, '# 処理済みTSXファイルリスト\n# 形式: ファイル名,タイトル,スラグ,処理日時\n\n');
  log('処理済みファイルリストを作成しました');
}

// フォルダの準備
if (!fs.existsSync(CONFIG.watchFolder)) {
  fs.mkdirSync(CONFIG.watchFolder, { recursive: true });
  log(`監視フォルダを作成しました: ${CONFIG.watchFolder}`);
}

if (!fs.existsSync(CONFIG.componentsFolder)) {
  fs.mkdirSync(CONFIG.componentsFolder, { recursive: true });
  log(`コンポーネントフォルダを作成しました: ${CONFIG.componentsFolder}`);
}

// H1タグからタイトルを抽出する関数
function extractTitleFromContent(content, fallbackTitle) {
  // メタデータからタイトルを抽出
  const metaTitleMatch = content.match(META_PATTERNS.title);
  if (metaTitleMatch && metaTitleMatch[1]) {
    const title = metaTitleMatch[1].trim();
    // ダブルクォーテーションを除去
    const cleanTitle = title.replace(/["']/g, '').trim();
    log(`メタデータからタイトルを抽出しました: "${cleanTitle}"`);
    return cleanTitle;
  }
  
  // H1タグを探す
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1Match && h1Match[1]) {
    let title = h1Match[1].trim();
    // HTMLタグを除去
    title = title.replace(/<[^>]*>/g, '');
    log(`H1タグからタイトルを抽出しました: "${title}"`);
    return title;
  }
  
  log(`タイトルが見つかりません。フォールバックタイトルを使用: "${fallbackTitle}"`);
  return fallbackTitle;
}

// カテゴリを抽出する関数
function extractCategory(content, filePath) {
  // メタデータからカテゴリを抽出
  const metaCategoryMatch = content.match(META_PATTERNS.category);
  if (metaCategoryMatch && metaCategoryMatch[1]) {
    const category = metaCategoryMatch[1].trim();
    // カテゴリからダブルクォーテーションと空白を除去
    const cleanCategory = category.replace(/["']/g, '').trim();
    
    if (CATEGORIES.includes(cleanCategory)) {
      log(`メタデータからカテゴリを抽出しました: "${cleanCategory}"`);
      return cleanCategory;
    } else {
      log(`無効なカテゴリ "${cleanCategory}" が指定されました。有効なのは: ${CATEGORIES.join(', ')}`);
    }
  }
  
  // ファイルパスからカテゴリを判断
  const pathParts = filePath.split(path.sep);
  const articlesDirIndex = pathParts.indexOf('articles');
  
  if (articlesDirIndex >= 0 && pathParts.length > articlesDirIndex + 1) {
    const categoryFromPath = pathParts[articlesDirIndex + 1];
    if (CATEGORIES.includes(categoryFromPath)) {
      log(`ファイルパスからカテゴリを抽出しました: "${categoryFromPath}"`);
      return categoryFromPath;
    }
  }
  
  // デフォルトカテゴリ
  log(`カテゴリが見つかりません。デフォルトカテゴリを使用: "ai-technology"`);
  return 'ai-technology';
}

// タグを抽出する関数
function extractTags(content) {
  // メタデータからタグを抽出
  const metaTagsMatch = content.match(META_PATTERNS.tags);
  if (metaTagsMatch && metaTagsMatch[1]) {
    try {
      const tagsString = metaTagsMatch[1].trim();
      // JSON形式の場合はパース
      if (tagsString.startsWith('[') && tagsString.endsWith(']')) {
        const tags = JSON.parse(tagsString);
        if (Array.isArray(tags)) {
          log(`メタデータからタグを抽出しました: ${tags.join(', ')}`);
          return tags;
        }
      }
    } catch (e) {
      log(`タグのパース中にエラー: ${e.message}`);
    }
  }
  
  // デフォルトタグ
  return ['AI', '自動生成'];
}

// 作者を抽出する関数
function extractAuthor(content) {
  // メタデータから作者を抽出
  const metaAuthorMatch = content.match(META_PATTERNS.author);
  if (metaAuthorMatch && metaAuthorMatch[1]) {
    const author = metaAuthorMatch[1].trim();
    log(`メタデータから作者を抽出しました: "${author}"`);
    return author;
  }
  
  // デフォルト作者
  return 'AI Team';
}

// 日付を抽出する関数
function extractDate(content) {
  // メタデータから日付を抽出
  const metaDateMatch = content.match(META_PATTERNS.date);
  if (metaDateMatch && metaDateMatch[1]) {
    const date = metaDateMatch[1].trim();
    // 日付形式の検証
    if (/^\d{4}-\d{2}-\d{2}/.test(date)) {
      log(`メタデータから日付を抽出しました: "${date}"`);
      return date;
    }
  }
  
  // 現在日付を使用
  const today = new Date().toISOString().split('T')[0];
  log(`日付が見つかりません。現在の日付を使用: "${today}"`);
  return today;
}

// アイキャッチ画像を抽出する関数
function extractCoverImage(content) {
  // メタデータからアイキャッチ画像を抽出
  const metaCoverMatch = content.match(META_PATTERNS.coverImage);
  if (metaCoverMatch && metaCoverMatch[1]) {
    const coverImage = metaCoverMatch[1].trim();
    // ダブルクォーテーションを除去
    const cleanCoverImage = coverImage.replace(/["']/g, '').trim();
    log(`メタデータからアイキャッチ画像を抽出しました: "${cleanCoverImage}"`);
    return cleanCoverImage;
  }
  
  log(`アイキャッチ画像が見つかりません。デフォルト画像を使用します`);
  return '/placeholder.svg?height=600&width=800';
}

// エラーハンドリングを改善したexecPromiseラッパー
async function execPromise(cmd) {
  try {
    log(`コマンド実行: ${cmd}`);
    const { stdout, stderr } = await exec(cmd);
    if (stdout) log(`コマンド出力: ${stdout}`);
    if (stderr && stderr.trim() !== '') {
      log(`警告: ${stderr}`);
    }
    return stdout;
  } catch (error) {
    log(`コマンド実行エラー: ${error.message}`);
    throw error;
  }
}

// Gitのロックファイルをクリーンアップ
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

// コンポーネントファイルを生成する関数
function generateComponent(title, content) {
  // 空のタイトルをチェック
  if (!title || title.trim() === '') {
    title = 'DefaultArticle';
    log(`警告: 空のコンポーネント名が検出されました。デフォルト名を使用します: "${title}"`);
  }
  
  // 記事の内容からコンポーネントを抽出
  const articleMatch = content.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  const articleContent = articleMatch ? articleMatch[1] : `<h1>${title}</h1>`;

  return `import React from 'react';

export default function ${title}() {
  return (
    <article className="prose prose-slate max-w-none">
      ${articleContent}
    </article>
  );
}
`;
}

// ブログポストを生成する関数
function generateBlogPost(title, componentName, category, date, description, coverImage = null) {
  return `import type { Metadata } from "next"
import ${componentName} from "@/components/${componentName}"

// メタデータ
export const metadata: Metadata = {
  title: "${title}",
  description: "${description || `${title}に関する詳細記事`}",
  openGraph: {
    title: "${title}",
    description: "${description || `${title}に関する詳細記事`}",
    images: [{ url: "${coverImage || '/placeholder.svg?height=600&width=800'}" }],
  },
}

export default function BlogPost() {
  return <${componentName} />
}
`;
}

// メタデータを抽出する関数を改善
function extractMetadata(content, fileName) {
  const metadata = {
    title: '',
    category: '',
    date: '',
    coverImage: '',
    description: '',
  };

  // メタデータコメントから抽出
  Object.entries(META_PATTERNS).forEach(([key, pattern]) => {
    const match = content.match(pattern);
    if (match && match[1]) {
      metadata[key] = match[1].replace(/["']/g, '').trim();
    }
  });

  // H1タグからタイトルを抽出（メタデータにタイトルがない場合）
  if (!metadata.title) {
    const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    if (h1Match && h1Match[1]) {
      metadata.title = h1Match[1].replace(/<[^>]*>/g, '').trim();
    }
  }

  // フォールバック値を設定
  if (!metadata.title || metadata.title.trim() === '') {
    const baseName = path.parse(fileName).name;
    metadata.title = baseName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
    log(`タイトルが見つからないため、ファイル名から生成: "${metadata.title}"`);
  }
  
  if (!metadata.category) {
    metadata.category = 'ai-technology';
  }
  
  if (!metadata.date) {
    metadata.date = new Date().toISOString().split('T')[0];
  }

  return metadata;
}

// コンポーネント名とスラグ生成を改善
function generateNameAndSlug(title) {
  // 無効な文字を除去し、スペースとハイフンを処理
  const safeTitle = (title || "DefaultArticle").trim();
  
  // コンポーネント名をパスカルケースで生成
  const componentName = safeTitle
    .replace(/[^\w\s-]/g, '')
    .split(/[-\s]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
  
  // スラグをケバブケースで生成
  const slug = safeTitle
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
  
  return { componentName, slug };
}

// ファイル処理を実行する関数
async function processFile(filePath) {
  try {
    const fileName = path.basename(filePath);
    
    // 既に処理済みかチェック
    if (isFileProcessed(fileName)) {
      log(`ファイル ${fileName} は既に処理済みです`);
      return;
    }
    
    // ファイルの内容を読み込む
    const content = fs.readFileSync(filePath, 'utf8');
    
    // メタデータを抽出
    const metadata = extractMetadata(content, fileName);
    
    // コンポーネント名とスラグを生成
    const { componentName, slug } = generateNameAndSlug(metadata.title);
    
    // 処理状況をログ
    log(`タイトル: "${metadata.title}"`);
    log(`カテゴリ: "${metadata.category}"`);
    log(`日付: "${metadata.date}"`);
    log(`アイキャッチ画像: "${metadata.coverImage || '/placeholder.svg?height=600&width=800'}"`);
    log(`コンポーネント名: "${componentName}"`);
    log(`スラグ: "${slug}"`);
    
    // 必要なディレクトリを作成
    const blogDir = path.join(CONFIG.blogFolder, metadata.category, slug);
    fs.mkdirSync(blogDir, { recursive: true });
    
    // コンポーネントファイルを生成
    const componentPath = path.join(CONFIG.componentsFolder, `${componentName}.tsx`);
    fs.writeFileSync(componentPath, generateComponent(componentName, content));
    log(`コンポーネントを作成しました: ${componentPath}`);
    
    // ブログページを生成
    const blogPostPath = path.join(blogDir, 'page.tsx');
    fs.writeFileSync(blogPostPath, generateBlogPost(
      metadata.title,
      componentName,
      metadata.category,
      metadata.date,
      metadata.description,
      metadata.coverImage
    ));
    log(`ブログページを作成しました: ${blogPostPath}`);
    
    // Git操作を実行
    await handleGitProcess(componentPath, blogPostPath, metadata.title);
    
    // 処理済みリストに追加
    addToProcessedList(fileName, metadata.title, slug, metadata.date);
    
    log(`ファイル ${fileName} の処理が完了しました！`);
    return { title: metadata.title, slug };
    
  } catch (error) {
    log(`ファイル処理エラー: ${error.message}`);
    console.error(error);
  }
}

// Git処理を実行する関数 - 修正版
async function handleGitProcess(componentPath, blogPostPath, title) {
  try {
    log('Git処理を開始します...');
    cleanupGitLock(); // ロックファイル削除を先に行う

    // 1. 生成したファイルをステージング
    log('生成されたファイルをステージングします...');
    await execPromise(`"${CONFIG.gitPath}" add "${componentPath}" "${blogPostPath}"`);
    log('生成ファイルをGitにステージングしました');

    // 2. 生成したファイルをコミット
    log('生成されたファイルの変更をコミットします...');
    const escapedTitle = title.replace(/"/g, '\\"');
    await execPromise(`"${CONFIG.gitPath}" commit -m "記事の自動生成: ${escapedTitle}"`);
    log('生成ファイルの変更をコミットしました');

    // 3. その他の変更も全てコミット
    log('その他の変更を確認します...');
    const statusOutput = await execPromise(`"${CONFIG.gitPath}" status --porcelain`);
    if (statusOutput.trim() !== '') {
      log('その他の変更が見つかりました。全てコミットします...');
      await execPromise(`"${CONFIG.gitPath}" add .`);
      const timestamp = new Date().toISOString();
      await execPromise(`"${CONFIG.gitPath}" commit -m "その他の変更を自動コミット: ${timestamp}"`);
      log('全ての変更をコミットしました');
    } else {
      log('その他の未コミットの変更はありませんでした');
    }
    
    // 4. プッシュ（pull --rebase は削除）
    log('変更をリモートにプッシュします...');
    await execPromise(`"${CONFIG.gitPath}" push origin main`);
    log('変更をプッシュしました');
    
    // 5. Vercelデプロイをトリガー（axiosを使用）
    if (process.env.VERCEL_DEPLOY_HOOK) {
      log('Vercelデプロイをトリガーします...');
      try {
        const response = await axios.post(process.env.VERCEL_DEPLOY_HOOK);
        log(`Vercelデプロイトリガー成功: ${JSON.stringify(response.data)}`);
      } catch (error) {
        log(`Vercelデプロイトリガーエラー: ${error.message}`);
        if (error.response) {
          log(`Vercel APIエラー詳細: ${JSON.stringify(error.response.data)}`);
        }
      }
    }
    
    log('Git処理が正常に完了しました');

  } catch (error) {
    log(`Git処理中にエラーが発生しました: ${error.message}`);
    cleanupGitLock(); // エラー時もロックファイル削除を試みる
    throw error;
  }
}

// コマンド実行用のプロミスラッパー
function execCommand(command) {
  return new Promise((resolve, reject) => {
    log(`コマンド実行: ${command}`);
    exec(command, { cwd: process.cwd() }, (error, stdout, stderr) => {
      if (stdout) log(`コマンド出力: ${stdout}`);
      if (stderr) log(`コマンドエラー出力: ${stderr}`);
      
      if (error) {
        log(`コマンド実行エラー: ${error.message}`);
        reject(error);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

// 初期チェック - 既存のTSXファイルを処理
log('既存ファイルの確認を開始します...');

// カテゴリを含む全てのファイルを検索
const allTsxFiles = [];

// メインフォルダのファイル
const mainDirFiles = fs.readdirSync(CONFIG.watchFolder)
  .filter(file => file.endsWith('.tsx'))
  .map(file => path.join(CONFIG.watchFolder, file));
allTsxFiles.push(...mainDirFiles);

// 各カテゴリフォルダのファイル
CATEGORIES.forEach(category => {
  const categoryPath = path.join(CONFIG.watchFolder, category);
  if (fs.existsSync(categoryPath)) {
    const categoryFiles = fs.readdirSync(categoryPath)
      .filter(file => file.endsWith('.tsx'))
      .map(file => path.join(categoryPath, file));
    allTsxFiles.push(...categoryFiles);
  }
});

log(`${allTsxFiles.length}個の既存TSXファイルが見つかりました`);

// 既存ファイルを処理
allTsxFiles.forEach(filePath => {
  const fileName = path.basename(filePath);
  
  if (isFileProcessed(fileName)) {
    log(`ファイル ${fileName} は既に処理済みです`);
  } else {
    // 非同期処理を開始
    processFile(filePath)
      .then(result => {
        if (result) {
          log(`ファイル処理成功: タイトル="${result.title}", スラグ="${result.slug}"`);
        }
      })
      .catch(error => {
        log(`ファイル処理中にエラー: ${error.message}`);
      });
  }
});

// 新しいファイルの監視を開始
const watchOptions = {
  persistent: true,
  ignoreInitial: true,
  awaitWriteFinish: {
    stabilityThreshold: 2000,
    pollInterval: 100
  }
};

const watcher = chokidar.watch([
  `${CONFIG.watchFolder}/**/*.tsx`,
  `${CONFIG.watchFolder}/*.tsx`
], watchOptions);

log(`フォルダ監視を開始します: ${CONFIG.watchFolder} (カテゴリフォルダも含む)`);

watcher
  .on('add', async (filePath) => {
    log(`新しいファイルを検出しました: ${filePath}`);
    try {
      await processFile(filePath);
    } catch (error) {
      log(`ファイル処理エラー: ${error.message}`);
    }
  })
  .on('error', error => log(`監視エラー: ${error.message}`));

log('監視中... Ctrl+C で終了');

// 処理完了をログに記録
setTimeout(() => {
  log('既存ファイルの処理が完了しました');
}, 1000);
