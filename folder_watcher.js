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
const { exec } = require('child_process');
const chokidar = require('chokidar'); // npm install chokidar

// .env.localがあれば読み込む
try {
  const dotenv = require('dotenv');
  dotenv.config({ path: '.env.local' });
} catch (e) {
  console.log('dotenvモジュールが見つからないか、.env.localファイルがありません');
}

// 設定
const CONFIG = {
  watchFolder: path.join(__dirname, 'articles'),
  componentsFolder: path.join(__dirname, 'components'),
  blogFolder: path.join(__dirname, 'app', 'blog'),
  processedList: path.join(__dirname, 'processed_files.txt'),
  logFile: path.join(__dirname, 'upload_log.txt'),
  // Gitコマンドのパスを設定 (.env.localから読み込みまたはデフォルト値)
  gitPath: process.env.GIT_PATH || (process.platform === 'win32' 
    ? 'C:\\Program Files\\Git\\cmd\\git.exe' // Windowsの一般的なGitパス
    : 'git') // Linux/MacではPATHを利用
};

// カテゴリー一覧
const CATEGORIES = [
  'ai-technology',
  'ai-applications',
  'ai-news'
];

// メタデータの正規表現パターン
const META_PATTERNS = {
  title: /\/\/\s*title:\s*(.*?)(\r?\n|\r|$)/,
  date: /\/\/\s*date:\s*(.*?)(\r?\n|\r|$)/,
  author: /\/\/\s*author:\s*(.*?)(\r?\n|\r|$)/,
  tags: /\/\/\s*tags:\s*(.*?)(\r?\n|\r|$)/,
  category: /\/\/\s*category:\s*(.*?)(\r?\n|\r|$)/,
  featured: /\/\/\s*featured:\s*(.*?)(\r?\n|\r|$)/,
  coverImage: /\/\/\s*coverImage:\s*(.*?)(\r?\n|\r|$)/
};

// ログ出力関数
function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}`;
  console.log(logMessage);
  fs.appendFileSync(CONFIG.logFile, logMessage + '\n');
}

// ファイルが処理済みかチェックする関数
function isFileProcessed(fileName) {
  try {
    if (!fs.existsSync(CONFIG.processedList)) {
      return false;
    }
    
    const content = fs.readFileSync(CONFIG.processedList, 'utf8');
    const lines = content.split('\n');
    
    // 各行をチェック
    for (const line of lines) {
      // コメント行をスキップ
      if (line.startsWith('#') || line.trim() === '') {
        continue;
      }
      
      // ファイル名がカンマで区切られた最初のフィールド
      const fields = line.split(',');
      if (fields.length > 0 && fields[0].trim() === fileName) {
        return true;
      }
    }
    
    return false;
  } catch (error) {
    log(`処理済みチェックエラー: ${error.message}`);
    return false;
  }
}

// 処理済みリストにファイルを追加する関数
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
  log(`カテゴリが見つかりません。デフォルトカテゴリを使用: "ai-news"`);
  return 'ai-news';
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

// コンポーネントファイルを生成する関数
function generateComponent(title, componentName) {
  const componentContent = `import React from 'react';

export function ${componentName}() {
  return (
    <article className="prose prose-slate max-w-none">
      <h1>${title}</h1>
      {/* ここに記事の内容を追加 */}
    </article>
  );
}
`;
  return componentContent;
}

// ブログポストを生成する関数
function generateBlogPost(title, componentName, category, date, coverImage = null) {
  const blogPostContent = `import type { Metadata } from "next"
import { ${componentName} } from "@/components/${componentName}"
import { getMetadata } from "@/lib/metadata-utils"

// メタデータ
export const metadata: Metadata = getMetadata({
  title: "${title}",
  description: "${title}に関する詳細記事",
  ogImage: "${coverImage || '/placeholder.svg?height=600&width=800'}",
  path: "/blog/${category}/${componentName.toLowerCase()}",
})

export default function BlogPost() {
  return <${componentName} />
}
`;
  return blogPostContent;
}

// Vercelデプロイをトリガーする関数
async function triggerVercelDeploy() {
  try {
    const webhookUrl = process.env.VERCEL_DEPLOY_HOOK;
    
    if (!webhookUrl) {
      log('Vercelデプロイフック未設定。GitHubプッシュのみ実行します。');
      return;
    }
    
    log(`Vercelデプロイをトリガーします...`);
    
    // HTTPリクエストを作成
    const https = require('https');
    
    return new Promise((resolve, reject) => {
      const req = https.request(
        webhookUrl,
        { method: 'POST' },
        (res) => {
          let data = '';
          res.on('data', (chunk) => {
            data += chunk;
          });
          
          res.on('end', () => {
            if (res.statusCode === 200 || res.statusCode === 201) {
              log(`Vercelデプロイが正常にトリガーされました。ステータス: ${res.statusCode}`);
              resolve(true);
            } else {
              log(`Vercelデプロイのトリガー失敗。ステータス: ${res.statusCode}, レスポンス: ${data}`);
              resolve(false);
            }
          });
        }
      );
      
      req.on('error', (error) => {
        log(`Vercelデプロイのトリガーエラー: ${error.message}`);
        reject(error);
      });
      
      req.end();
    });
  } catch (error) {
    log(`Vercelデプロイトリガー中のエラー: ${error.message}`);
    return false;
  }
}

// Git処理を実行する関数
async function handleGitProcess(componentPath, blogPostPath, title) {
  try {
    // Gitコマンドのパスを使用
    const gitCmd = CONFIG.gitPath;
    
    // ファイルをGitに追加
    log(`コマンド実行: ${gitCmd} add "${componentPath}" "${blogPostPath}"`);
    await execCommand(`"${gitCmd}" add "${componentPath}" "${blogPostPath}"`);
    log(`ファイルをGitにステージングしました`);
    
    log(`コマンド実行: ${gitCmd} commit -m "Add new article: ${title}"`);
    await execCommand(`"${gitCmd}" commit -m "Add new article: ${title}"`);
    
    try {
      const { stdout: branchName } = await execCommand(`"${gitCmd}" rev-parse --abbrev-ref HEAD`);
      const currentBranch = branchName.trim() || 'main';
      
      await execCommand(`"${gitCmd}" fetch origin`);
      await execCommand(`"${gitCmd}" pull --rebase origin ${currentBranch}`);
      
      log(`コマンド実行: ${gitCmd} push origin ${currentBranch}`);
      await execCommand(`"${gitCmd}" push origin ${currentBranch}`);
      
      log(`Gitプッシュ完了: ${title}`);
      
      // GitHubプッシュ後にVercelデプロイをトリガー
      await triggerVercelDeploy();
      
      return true;
    } catch (pushError) {
      log(`Gitプッシュ中のエラー: ${pushError}`);
      // プッシュに失敗しても処理を続行
      return false;
    }
  } catch (error) {
    log(`Git処理中のエラー: ${error}`);
    return false;
  }
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
    
    // タイトルを抽出
    const title = extractTitleFromContent(content, path.parse(fileName).name);
    
    // カテゴリを抽出
    const category = extractCategory(content, filePath);
    
    // 日付を抽出
    const date = extractDate(content) || new Date().toISOString().split('T')[0];
    
    // カバー画像を抽出
    const coverImage = extractCoverImage(content);
    
    // コンポーネント名を生成（キャメルケース）
    const componentName = title
      .replace(/[^\w\s-]/g, '') // 特殊文字を削除
      .split(/[-\s]+/) // ハイフンとスペースで分割
      .map((word, index) => {
        // 最初の文字を大文字に、残りを小文字に
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join('');
    
    // スラグを生成（ケバブケース）
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // 特殊文字を削除
      .replace(/\s+/g, '-') // スペースをハイフンに変換
      .replace(/-+/g, '-'); // 連続するハイフンを単一のハイフンに変換
    
    // コンポーネントファイル名
    const componentFileName = `${componentName}.tsx`;
    
    // ブログページのパス
    const blogPostPath = path.join(CONFIG.blogFolder, category, slug, 'page.tsx');
    
    // 必要なディレクトリを作成
    fs.mkdirSync(path.dirname(blogPostPath), { recursive: true });
    
    // コンポーネントファイルを作成
    const componentPath = path.join(CONFIG.componentsFolder, componentFileName);
    fs.writeFileSync(componentPath, generateComponent(title, componentName));
    log(`コンポーネントを作成しました: ${componentPath}`);
    
    // ブログページを作成
    fs.writeFileSync(blogPostPath, generateBlogPost(title, componentName, category, date, coverImage));
    log(`ブログページを作成しました: ${blogPostPath}`);
    
    // Gitの処理を実行
    await handleGitProcess(componentPath, blogPostPath, title);
    
    // 処理済みリストに追加
    addToProcessedList(fileName, title, slug, date);
    
  } catch (error) {
    log(`ファイル処理エラー: ${error.message}`);
    console.error(error);
  }
}

// コマンド実行用のプロミスラッパー
function execCommand(command) {
  return new Promise((resolve, reject) => {
    log(`コマンド実行: ${command}`);
    exec(command, { cwd: __dirname }, (error, stdout, stderr) => {
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

if (allTsxFiles.length > 0) {
  log(`${allTsxFiles.length}個の既存TSXファイルが見つかりました`);
  Promise.all(allTsxFiles.map(processFile))
    .then(() => log('既存ファイルの処理が完了しました'))
    .catch(err => log(`既存ファイル処理中にエラー: ${err.message}`));
} else {
  log('処理すべき既存のTSXファイルはありません');
}

// フォルダ監視を開始
log(`フォルダ監視を開始します: ${CONFIG.watchFolder} (カテゴリフォルダも含む)`);
const watcher = chokidar.watch([
  `${CONFIG.watchFolder}/*.tsx`,
  ...CATEGORIES.map(category => `${CONFIG.watchFolder}/${category}/*.tsx`)
], {
  persistent: true,
  ignoreInitial: true // 既存ファイルは別途処理するので無視
});

// 新しいファイルのイベントハンドラ
watcher.on('add', filePath => {
  log(`新しいファイルを検出しました: ${filePath}`);
  processFile(filePath)
    .then(result => {
      if (result) {
        log(`ファイル処理成功: タイトル="${result.title}", スラグ="${result.slug}"`);
      }
    })
    .catch(err => log(`ファイル処理エラー: ${err.message}`));
});

// エラーハンドリング
watcher.on('error', error => {
  log(`監視エラー: ${error}`);
});

log('監視中... Ctrl+C で終了');
