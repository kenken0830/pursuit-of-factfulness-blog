@echo off
cd /d D:\NvidiaGTCProject
echo Starting automatic article monitoring system...

REM Create necessary folders if they don't exist
if not exist "articles" mkdir "articles"
if not exist "articles\ai-technology" mkdir "articles\ai-technology"
if not exist "articles\ai-applications" mkdir "articles\ai-applications" 
if not exist "articles\ai-news" mkdir "articles\ai-news"

echo Folders created/checked. Starting the monitoring system...
echo Place TSX files in articles/category/ folders to trigger automatic upload
echo Press Ctrl+C to stop the monitoring system

REM Run the monitor script
node start_auto_watcher.js

pause
