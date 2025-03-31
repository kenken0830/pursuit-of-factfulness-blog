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

// 設定
const CONFIG = {
  watchFolder: path.join(__dirname, 'articles'),
  componentsFolder: path.join(__dirname, 'components'),
  blogFolder: path.join(__dirname, 'app', 'blog'),
  processedList: path.join(__dirname, 'processed_files.txt'),
  logFile: path.join(__dirname, 'upload_log.txt')
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
  featured: /\/\/\s*featured:\s*(.*?)(\r?\n|\r|$)/
};

// ログ出力関数
function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}`;
  console.log(logMessage);
  fs.appendFileSync(CONFIG.logFile, logMessage + '\n');
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
    log(`メタデータからタイトルを抽出しました: "${title}"`);
    return title;
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
    if (CATEGORIES.includes(category)) {
      log(`メタデータからカテゴリを抽出しました: "${category}"`);
      return category;
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

// Git処理を実行する関数
async function handleGitProcess(componentPath, blogPostPath, title) {
  try {
    // ファイルをGitに追加
    log(`コマンド実行: git add "${componentPath}" "${blogPostPath}"`);
    await execCommand(`git add "${componentPath}" "${blogPostPath}"`);
    log(`ファイルをGitにステージングしました`);

    // 変更をコミット
    log(`コマンド実行: git commit -m "Add new article: ${title}"`);
    await execCommand(`git commit -m "Add new article: ${title}"`);
    log(`変更をコミットしました`);

    // 安全なプッシュ戦略を実行（リモート変更の統合→プッシュ）
    log(`リモート変更を取得中...`);
    try {
      // 現在のブランチ名を取得
      const { stdout: branchName } = await execCommand('git rev-parse --abbrev-ref HEAD');
      const currentBranch = branchName.trim();
      
      // 最新のリモート変更を取得
      await execCommand('git fetch origin');
      log(`リモート変更を取得しました`);
      
      // リモート変更を統合（リベース）
      await execCommand(`git pull --rebase origin ${currentBranch}`);
      log(`リモート変更を統合しました`);
      
      // 変更をプッシュ
      log(`コマンド実行: git push origin ${currentBranch}`);
      await execCommand(`git push origin ${currentBranch}`);
      log(`変更をプッシュしました`);
      
      // Vercelにデプロイリクエスト
      await triggerVercelDeploy();
      
      return true;
    } catch (pushError) {
      log(`通常のプッシュに失敗しました: ${pushError.message}`);
      log(`代替プッシュ戦略を試行します...`);
      
      // 代替戦略：一時ブランチを作成して変更をプッシュ
      const tempBranch = `article-update-${Date.now()}`;
      await execCommand(`git checkout -b ${tempBranch}`);
      log(`一時ブランチ ${tempBranch} を作成しました`);
      
      // 変更を一時ブランチにプッシュ
      await execCommand(`git push -u origin ${tempBranch}`);
      log(`一時ブランチをプッシュしました`);
      
      // PRを作成するためのメッセージ表示
      log(`GitHub上でPull Requestを作成してください: ${tempBranch} → main`);
      
      // Vercelプレビューデプロイのトリガー
      await triggerVercelDeploy(tempBranch);
      
      return true;
    }
  } catch (error) {
    log(`Git処理中のエラー: ${error.message}`);
    return false;
  }
}

// Vercelデプロイをトリガーする関数
async function triggerVercelDeploy(branch = 'main') {
  try {
    // Vercelデプロイフックを取得（環境変数またはconfig.json）
    let deployHook = process.env.VERCEL_DEPLOY_HOOK;
    
    if (!deployHook) {
      try {
        const configPath = path.join(__dirname, 'config.json');
        if (fs.existsSync(configPath)) {
          const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
          deployHook = config.VERCEL_DEPLOY_HOOK;
        }
      } catch (configError) {
        log(`設定ファイルの読み込みエラー: ${configError.message}`);
      }
    }
    
    if (deployHook) {
      // Unix curlコマンドを使用
      log(`Vercelデプロイをトリガーします...`);
      await execCommand(`curl -X POST "${deployHook}?ref=${branch}"`);
      log(`Vercelデプロイリクエストを送信しました (${branch} ブランチ)`);
      return true;
    } else {
      log(`Vercelデプロイフックが設定されていません。Vercelへのデプロイをトリガーできません。`);
      return false;
    }
  } catch (error) {
    log(`Vercelデプロイトリガー中のエラー: ${error.message}`);
    return false;
  }
}

// ファイル処理を実行する関数
async function processFile(filePath) {
  const fileName = path.basename(filePath);
  
  // すでに処理済みかチェック
  if (isFileProcessed(fileName)) {
    log(`ファイル ${fileName} は既に処理済みです。スキップします`);
    return null;
  }

  try {
    // ファイルの内容を読み込む
    const content = fs.readFileSync(filePath, 'utf8');
    
    // componentNameを取得（拡張子なしのファイル名、キャメルケースに変換）
    const baseName = path.basename(fileName, '.tsx');
    const componentName = baseName
      .split('-')
      .map((part, index) => index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
    
    // タイトルを抽出
    const title = extractTitleFromContent(content, componentName);
    if (!title) {
      log(`ファイル ${fileName} からタイトルを抽出できませんでした`);
      return null;
    }
    log(`タイトルを抽出しました: "${title}"`);
    
    // カテゴリを抽出
    const category = extractCategory(content, filePath);
    log(`カテゴリ: "${category}"`);
    
    // 日付を抽出
    const date = extractDate(content);
    log(`日付: "${date}"`);
    
    // スラグを作成（ファイル名から拡張子を除いたもの）
    const slug = baseName;
    
    // コンポーネントファイルのパスを生成
    const componentFileName = `${componentName.charAt(0).toUpperCase() + componentName.slice(1)}.tsx`;
    const componentPath = path.join(CONFIG.componentsFolder, componentFileName);
    
    // コンポーネントファイルを作成
    const componentContent = content;
    fs.writeFileSync(componentPath, componentContent);
    log(`コンポーネントを作成しました: ${componentPath}`);
    
    // ブログページのパスを生成
    const blogPostDir = path.join(CONFIG.blogFolder, category, slug);
    if (!fs.existsSync(blogPostDir)) {
      fs.mkdirSync(blogPostDir, { recursive: true });
    }
    const blogPostPath = path.join(blogPostDir, 'page.tsx');
    
    // ブログページを作成
    const blogPostContent = generateBlogPost(title, componentName, category, date);
    fs.writeFileSync(blogPostPath, blogPostContent);
    log(`ブログページを作成しました: ${blogPostPath}`);
    
    // Git処理を実行
    await handleGitProcess(componentPath, blogPostPath, title);
    
    // 処理済みリストに追加
    addToProcessedList(fileName, title, slug, date);
    
    log(`ファイル ${fileName} の処理が完了しました！`);
    return { title, slug };
  } catch (error) {
    log(`ファイル処理エラー: ${error.message}`);
    return null;
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
