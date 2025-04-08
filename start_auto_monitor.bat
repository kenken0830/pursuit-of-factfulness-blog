@echo off
echo ===================================================
echo 自動記事アップロードシステム - 起動スクリプト
echo ===================================================
echo 作業ディレクトリ: "D:\NvidiaGTCProject"
if not exist "articles" (
  mkdir "articles"
  echo 記事フォルダを作成しました: articles
)

echo カテゴリフォルダの確認中...
if not exist "articles\ai-technology" mkdir "articles\ai-technology"
if not exist "articles\ai-applications" mkdir "articles\ai-applications"
if not exist "articles\ai-news" mkdir "articles\ai-news"
if not exist "articles\nvidia-gtc-2025-report" mkdir "articles\nvidia-gtc-2025-report"

echo.
echo システムの使い方:
echo ※1. TSXファイルを articles フォルダに配置
echo   2. 自動的に GitHub にプッシュされます
echo   3. 自動的に Vercel にデプロイされます
echo.
echo 終了するには Ctrl+C を押してください
echo.

taskkill /F /IM node.exe 2>nul
node "folder_watcher.js"

echo.
echo.
echo ログは upload_log.txt を確認してください
echo.

rem 一時停止
pause
