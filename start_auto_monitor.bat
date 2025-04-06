@echo off
echo ===================================================
echo 
echo ===================================================
echo.

cd /d "D:\NvidiaGTCProject"

echo 
if not exist "articles" (
  mkdir "articles"
  echo articles
)

echo 
if not exist "articles\ai-technology" mkdir "articles\ai-technology"
if not exist "articles\ai-applications" mkdir "articles\ai-applications" 
if not exist "articles\ai-news" mkdir "articles\ai-news"

echo 
echo.
echo ※1. TSX articles\ 
echo   2. GitHub
echo   3. Vercel
echo.
echo Ctrl+C 
echo.

node "start_auto_watcher.js"

echo 
echo 
echo auto_watcher_log.txt 
echo.

rem 
pause
