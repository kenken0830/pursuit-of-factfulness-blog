const fs = require('fs');
const path = require('path');
const { exec: nodeExec } = require('child_process');
const util = require('util');
const chokidar = require('chokidar');
const axios = require('axios');
const anyAscii = require('any-ascii');

// --- 設定 ---
const CONFIG = {
  watchFolder: './articles',
  componentsFolder: './components',
  blogFolder: './app/blog',
  processedList: './processed_files.txt',
  logFile: './upload_log.txt',
  gitPath: process.env.GIT_PATH || 'C:\\Program Files\\Git\\cmd\\git.exe',
  vercelHook: process.env.VERCEL_DEPLOY_HOOK_URL || ''
};

if (CONFIG.vercelHook) {
  console.log(`Vercelデプロイフックが設定されています: ${CONFIG.vercelHook}`);
}

const exec = util.promisify(nodeExec);

// セーフな実行関数
async function safeExec(command) {
  try {
    const result = await exec(command);
    return result;
  } catch (error) {
    console.error(`コマンド実行エラー: ${error.message}`);
    throw error;
  }
}

// メタデータ抽出パターン
const METADATA_PATTERNS = {
  title: /title:\s*['"](.+?)['"]/,
  category: /category:\s*['"](.+?)['"]/,
  date: /date:\s*['"](.+?)['"]/,
  coverImage: /coverImage:\s*['"](.+?)['"]/,
  description: /description:\s*['"](.+?)['"]/,
  tags: /tags:\s*\[(.*?)\]/,
  author: /author:\s*['"](.+?)['"]/
};

// ログ関数
function log(message) {
  try {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp}: ${message}\n`;
    console.log(logMessage);
    fs.appendFileSync(CONFIG.logFile, logMessage);
  } catch (error) {
    console.error(`ログファイルへの書き込みエラー: ${error.message}`);
  }
}

// 処理済みファイルのチェック
function isProcessed(filePath) {
  try {
    if (!fs.existsSync(CONFIG.processedList)) {
      return false;
    }
    const processed = fs.readFileSync(CONFIG.processedList, 'utf8').split('\n');
    return processed.includes(filePath);
  } catch (error) {
    log(`処理済みリストの確認エラー: ${error.message}`);
    return false;
  }
}

// 処理済みリストに追加
function addToProcessed(filePath) {
  try {
    fs.appendFileSync(CONFIG.processedList, `${filePath}\n`);
    log(`ファイル ${filePath} を処理済みリストに追加しました`);
  } catch (error) {
    log(`処理済みリストへの追加エラー: ${error.message}`);
  }
}

// メタデータ抽出
function extractMetadata(content) {
  log(`[extractMetadata] Start processing`);
  const metadata = {};
  
  // コメントブロックからのメタデータ抽出
  for (const [key, pattern] of Object.entries(METADATA_PATTERNS)) {
    const match = content.match(pattern);
    if (match) {
      log(`  [extractMetadata] Raw match for ${key}: "${match[1]}"`);
      metadata[key] = key === 'tags' 
        ? match[1].split(',').map(tag => tag.trim().replace(/['"]/g, ''))
        : match[1];
      log(`  [extractMetadata] Cleaned value for ${key}: "${metadata[key]}"`);
    } else {
      log(`  [extractMetadata] No match for ${key}`);
    }
  }
  
  // タイトルがない場合はh1タグか、ファイル名から生成
  if (!metadata.title) {
    // h1タグからの抽出を試みる
    const h1Match = content.match(/<h1[^>]*>(.*?)<\/h1>/);
    if (h1Match) {
      metadata.title = h1Match[1].trim();
      log(`  [extractMetadata] Title extracted from H1: "${metadata.title}"`);
    } else {
      // ファイル名からの生成（パスから取得しないので呼び出し側で対応）
      const fileNameMatch = /([^\/\\]+)\.tsx$/.exec(content);
      if (fileNameMatch) {
        metadata.title = fileNameMatch[1]
          .replace(/[-_]/g, ' ')
          .replace(/([A-Z])/g, ' $1')
          .trim();
        log(`  [extractMetadata] Title fallback from filename: "${metadata.title}"`);
      }
    }
  }
  
  // カテゴリのデフォルト設定
  if (!metadata.category) {
    metadata.category = 'ai-technology';
    log(`  [extractMetadata] Using default category: "${metadata.category}"`);
  }
  
  // 日付のデフォルト設定
  if (!metadata.date) {
    metadata.date = new Date().toISOString().split('T')[0];
    log(`  [extractMetadata] Using default date: "${metadata.date}"`);
  }
  
  // 説明のデフォルト設定
  if (!metadata.description && metadata.title) {
    metadata.description = `${metadata.title}に関する詳細記事`;
    log(`  [extractMetadata] Using default description: "${metadata.description}"`);
  }
  
  // カバー画像のデフォルト設定
  if (!metadata.coverImage) {
    metadata.coverImage = '/placeholder.svg?height=600&width=800';
    log(`  [extractMetadata] Using default coverImage: "${metadata.coverImage}"`);
  }
  
  log(`[extractMetadata] Returning metadata: title="${metadata.title}", category="${metadata.category}"`);
  return metadata;
}

// コンポーネント名とスラグの生成
function generateNameAndSlug(title) {
  const safeTitle = (title || "DefaultArticleTitle").trim();
  log(`  [generateNameAndSlug] Original title: "${safeTitle}"`);

  try {
    // anyAsciiは直接関数として使用
    const romajiTitle = anyAscii(safeTitle);
    log(`  [generateNameAndSlug] Romaji title: "${romajiTitle}"`);

    // コンポーネント名の生成
    let componentName = romajiTitle
      .replace(/[^\w\s-]/g, '')
      .split(/[-\s]+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
    
    // 空文字になった場合のフォールバック
    if (!componentName || componentName.length === 0) {
      componentName = 'Article' + safeTitle.replace(/[^a-zA-Z0-9]/g, '');
    }
    
    log(`  [generateNameAndSlug] Generated componentName: "${componentName}"`);

    // スラグの生成
    let slug = romajiTitle
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    // 空文字になった場合のフォールバック
    if (!slug || slug.length === 0) {
      slug = safeTitle.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
      if (!slug || slug.length === 0) {
        slug = 'article-' + Date.now();
      }
    }
    
    log(`  [generateNameAndSlug] Generated slug: "${slug}"`);

    return { componentName, slug };
  } catch (error) {
    log(`  [generateNameAndSlug] エラー: ${error.message}`);
    // フォールバック：日本語タイトルからシンプルな英語名を生成
    const fallbackComponentName = 'Article' + Date.now();
    const fallbackSlug = 'article-' + Date.now();
    log(`  [generateNameAndSlug] フォールバック使用: componentName="${fallbackComponentName}", slug="${fallbackSlug}"`);
    return { 
      componentName: fallbackComponentName, 
      slug: fallbackSlug 
    };
  }
}

// Gitプロセスの処理
async function handleGitProcess(files, extractedTitle) {
  try {
    log('Git処理を開始します...');
    
    // 既存のGitロックファイルをクリーンアップ
    const lockFile = path.join('.git', 'index.lock');
    if (fs.existsSync(lockFile)) {
      fs.unlinkSync(lockFile);
      log('既存のGitロックファイルをクリーンアップしました');
    }

    // ファイルをステージング
    log('生成されたファイルをステージングします...');
    for (const file of files) {
      log(`コマンド実行: "${CONFIG.gitPath}" add "${file}"`);
      const { stdout, stderr } = await safeExec(`"${CONFIG.gitPath}" add "${file}"`);
      if (stderr) log(`警告: ${stderr}`);
    }
    log('生成ファイルをGitにステージングしました');

    // 変更をコミット
    const commitMessage = `記事の自動生成: ${extractedTitle}`;
    log('生成されたファイルの変更をコミットします...');
    log(`コマンド実行: "${CONFIG.gitPath}" commit -m "${commitMessage}"`);
    const { stdout: commitOutput, stderr: commitError } = await safeExec(`"${CONFIG.gitPath}" commit -m "${commitMessage}"`);
    if (commitError) log(`警告: ${commitError}`);
    log('生成ファイルの変更をコミットしました');

    // その他の変更を確認
    log('その他の変更を確認します...');
    log(`コマンド実行: "${CONFIG.gitPath}" status --porcelain`);
    const { stdout: statusOutput, stderr: statusError } = await safeExec(`"${CONFIG.gitPath}" status --porcelain`);
    if (statusError) log(`警告: ${statusError}`);

    // statusOutputがundefinedでないことを確認
    if (statusOutput && typeof statusOutput === 'string' && statusOutput.trim()) {
      log('その他の変更が見つかりました。全てコミットします...');
      log(`コマンド実行: "${CONFIG.gitPath}" add .`);
      const { stderr: addError } = await safeExec(`"${CONFIG.gitPath}" add .`);
      if (addError) log(`警告: ${addError}`);

      const timestamp = new Date().toISOString();
      const otherCommitMessage = `その他の変更を自動コミット: ${timestamp}`;
      log(`コマンド実行: "${CONFIG.gitPath}" commit -m "${otherCommitMessage}"`);
      const { stdout: otherCommitOutput, stderr: otherCommitError } = await safeExec(`"${CONFIG.gitPath}" commit -m "${otherCommitMessage}"`);
      if (otherCommitError) log(`警告: ${otherCommitError}`);
      log('その他の変更をコミットしました');
    }

    // 変更をプッシュ
    log('変更をリモートにプッシュします...');
    log(`コマンド実行: "${CONFIG.gitPath}" push origin main`);
    const { stdout: pushOutput, stderr: pushError } = await safeExec(`"${CONFIG.gitPath}" push origin main`);
    if (pushError) log(`警告: ${pushError}`);
    log('変更をプッシュしました');

    // Vercelデプロイメントのトリガー
    if (CONFIG.vercelHook) {
      log('Vercelデプロイをトリガーします...');
      try {
        const response = await axios.post(CONFIG.vercelHook);
        log(`Vercelデプロイトリガー成功: ${JSON.stringify(response.data)}`);
      } catch (error) {
        log(`Vercelデプロイトリガーエラー: ${error.message}`);
      }
    }

    log('Git処理が正常に完了しました');
  } catch (error) {
    log(`Git処理中にエラーが発生しました: ${error.message}`);
    throw error;
  }
}

// ファイル処理
async function processFile(filePath) {
  const fileName = path.basename(filePath);
  try {
    log(`処理を開始します: ${filePath}`);
    
    if (isProcessed(fileName)) {
      log(`ファイル ${fileName} は既に処理済みのためスキップします`);
      return;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const metadata = extractMetadata(content);
    
    if (!metadata.title) {
      throw new Error('Title not found in metadata');
    }

    // タグの確認
    if (!metadata.tags) {
      log('タグが見つからないか無効なため、デフォルトタグを使用します');
    } else {
      log(`メタデータからタグを抽出しました: ${metadata.tags.join(', ')}`);
    }
    
    // 作者の確認
    if (!metadata.author) {
      log('作者が見つからないため、デフォルトの作者を使用します');
    } else {
      log(`メタデータから作者を抽出しました: "${metadata.author}"`);
    }

    log(`タイトル: "${metadata.title}"`);
    log(`カテゴリ: "${metadata.category}"`);
    log(`日付: "${metadata.date}"`);
    log(`アイキャッチ画像: "${metadata.coverImage}"`);

    const { componentName, slug } = generateNameAndSlug(metadata.title);
    
    log(`コンポーネント名: "${componentName}"`);
    log(`スラグ: "${slug}"`);
    
    // コンポーネントファイルの生成
    const componentPath = path.join(CONFIG.componentsFolder, `${componentName}.tsx`);
    log(`コンポーネントを作成しました: ${componentPath}`);
    fs.copyFileSync(filePath, componentPath);

    // ブログページの生成
    const category = metadata.category || 'ai-news';
    const blogPath = path.join(CONFIG.blogFolder, category, slug);
    fs.mkdirSync(blogPath, { recursive: true });
    
    const pagePath = path.join(blogPath, 'page.tsx');
    log(`ブログページを作成しました: ${pagePath}`);
    
    const pageContent = `import ${componentName} from '@/components/${componentName}';\n\nexport default ${componentName};\n`;
    fs.writeFileSync(pagePath, pageContent);

    // Git処理の実行
    await handleGitProcess([componentPath, pagePath], metadata.title);

    // 処理済みリストに追加
    addToProcessed(fileName);
    log(`ファイル ${fileName} の処理が完了しました！`);
    log(`ファイル処理成功: タイトル="${metadata.title}", スラグ="${slug}"`);
    
  } catch (error) {
    log(`!!! ファイル処理エラー (${fileName}): ${error.message}`);
    console.error(`Error details for ${fileName}: ${error}`);
  }
}

// メイン処理の開始
log('既存ファイルの確認を開始します...');

// 再帰的にすべてのTSXファイルを取得
const getAllTsxFiles = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat && stat.isDirectory()) {
      // サブディレクトリの場合は再帰的に検索
      results = results.concat(getAllTsxFiles(filePath));
    } else if (file.endsWith('.tsx')) {
      // TSXファイルの場合はリストに追加
      results.push(filePath);
    }
  });
  
  return results;
};

// カテゴリディレクトリも含めて検索
try {
  const tsxFiles = getAllTsxFiles(CONFIG.watchFolder);
  log(`${tsxFiles.length}個の既存TSXファイルが見つかりました`);
  
  // 各ファイルを処理（並列処理を避けるために直列処理）
  tsxFiles.forEach(filePath => {
    processFile(filePath).catch(error => {
      log(`既存ファイル処理エラー: ${error.message}`);
    });
  });
  
  // ファイル監視の設定
  log(`フォルダ監視を開始します: ${CONFIG.watchFolder} (カテゴリフォルダも含む)`);
  const watcher = chokidar.watch([
    path.join(CONFIG.watchFolder, '*.tsx'),
    path.join(CONFIG.watchFolder, '**', '*.tsx')
  ], {
    ignored: /(^|[\/\\])\../,
    persistent: true
  });

  // 新規ファイルの監視
  watcher.on('add', filePath => {
    log(`新しいファイルを検出しました: ${filePath}`);
    processFile(filePath).catch(error => {
      log(`新規ファイル処理エラー: ${error.message}`);
    });
  });

  watcher.on('ready', () => {
    log('ファイル監視の準備が完了しました。');
    log('監視中... Ctrl+C で終了');
  });

  watcher.on('error', error => {
    log(`監視エラー: ${error.message}`);
  });

  setTimeout(() => {
    log('既存ファイルの処理が完了しました');
  }, 1000);
  
} catch (error) {
  log(`初期化エラー: ${error.message}`);
}
