@echo off
echo ======================================================
echo TSX Upload Tool
echo ======================================================
echo.
echo Starting server...

REM Kill existing node.exe processes
taskkill /f /im node.exe >nul 2>&1

REM Change to project directory
cd /d D:\NvidiaGTCProject

REM Start npm server in minimized window
start /min cmd /c "npm run dev"

echo Server starting... please wait...
ping 127.0.0.1 -n 6 > nul

REM Open upload page in browser
echo Opening upload page...
start http://localhost:3000/upload

echo.
echo ======================================================
echo Next steps:
echo 1. Browser will open with upload page
echo 2. Select TSX file using "Choose File" button
echo 3. Click "Upload and Publish" button
echo.
echo After completion, check the homepage: http://localhost:3000
echo ======================================================
echo.
echo You can close this window.
echo To stop the server, run "server_stop.bat"

REM Create server stop batch file
@echo off > D:\NvidiaGTCProject\server_stop.bat
echo echo Stopping server... >> D:\NvidiaGTCProject\server_stop.bat
echo taskkill /f /im node.exe >> D:\NvidiaGTCProject\server_stop.bat
echo echo Server stopped. >> D:\NvidiaGTCProject\server_stop.bat
echo pause >> D:\NvidiaGTCProject\server_stop.bat

echo Server stop batch file created.
pause
