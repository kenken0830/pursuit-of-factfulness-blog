/**
 * 記事自動アップロードシステム起動スクリプト
 * 
 * 使用方法:
 * > node start_auto_watcher.js
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// 設定
const CONFIG = {
  watcherScript: path.join(__dirname, 'folder_watcher.js'),
  articlesFolder: path.join(__dirname, 'articles'),
  logFile: path.join(__dirname, 'auto_watcher_log.txt')
};

// ログ関数
function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}`;
  console.log(logMessage);
  fs.appendFileSync(CONFIG.logFile, logMessage + '\n');
}

// articlesフォルダの存在確認
if (!fs.existsSync(CONFIG.articlesFolder)) {
  fs.mkdirSync(CONFIG.articlesFolder, { recursive: true });
  log(`articlesフォルダを作成しました: ${CONFIG.articlesFolder}`);
}

// カテゴリフォルダの確認と作成
const CATEGORIES = ['ai-technology', 'ai-applications', 'ai-news'];
CATEGORIES.forEach(category => {
  const categoryPath = path.join(CONFIG.articlesFolder, category);
  if (!fs.existsSync(categoryPath)) {
    fs.mkdirSync(categoryPath, { recursive: true });
    log(`カテゴリフォルダを作成しました: ${categoryPath}`);
  }
});

// 監視スクリプトの起動
log('記事自動アップロードシステムを起動します...');
const watcher = spawn('node', [CONFIG.watcherScript], {
  detached: true,
  stdio: 'inherit'
});

watcher.on('error', (err) => {
  log(`監視スクリプトの起動中にエラーが発生しました: ${err.message}`);
});

watcher.on('exit', (code) => {
  log(`監視スクリプトが終了しました。コード: ${code}`);
});

log(`監視プロセスID: ${watcher.pid}`);
log('監視システムが起動しました。記事ファイルを配置するだけで自動的に処理されます。');
log('終了するには、このプロセスを停止してください（Ctrl+C）');

// プロセスを切り離して継続実行
watcher.unref();
