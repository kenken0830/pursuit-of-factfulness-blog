@echo off
echo ======================================================
echo Automatic TSX Uploader
echo ======================================================
echo.

REM Change to project directory
cd /d D:\NvidiaGTCProject

REM Create a folder for TSX files if it doesn't exist
if not exist tsx_to_upload mkdir tsx_to_upload
echo TSX upload folder: D:\NvidiaGTCProject\tsx_to_upload

REM Kill existing node.exe processes
taskkill /f /im node.exe >nul 2>&1

REM Start npm server in minimized window
echo Starting server...
start /min cmd /c "npm run dev"

echo Server starting... please wait...
ping 127.0.0.1 -n 6 > nul

REM Create a simple Node.js script for automatic upload
echo Creating upload script...
(
echo const fs = require('fs'^);
echo const path = require('path'^);
echo const https = require('https'^);
echo const http = require('http'^);
echo const FormData = require('form-data'^);
echo.
echo // Watch the tsx_to_upload folder
echo const watchFolder = path.join(__dirname, 'tsx_to_upload'^);
echo console.log('Watching folder for TSX files:', watchFolder^);
echo.
echo // Function to upload a file
echo async function uploadFile(filePath^) {
echo   try {
echo     const fileName = path.basename(filePath^);
echo     
echo     // Skip if not a TSX file
echo     if (!fileName.endsWith('.tsx'^)^) {
echo       console.log('Skipping non-TSX file:', fileName^);
echo       return;
echo     }
echo     
echo     console.log('Detected new TSX file:', fileName^);
echo     
echo     // Prepare title and slug
echo     const baseName = fileName.replace('.tsx', ''^);
echo     const title = baseName.replace(/([A-Z]^)/g, ' $1'^).trim(^);
echo     const slug = title.toLowerCase(^).replace(/\s+/g, '-'^).replace(/[^a-z0-9-]/g, ''^);
echo     
echo     // Read file content
echo     const fileContent = fs.readFileSync(filePath, 'utf8'^);
echo     
echo     // Create form data
echo     const formData = new FormData(^);
echo     formData.append('title', title^);
echo     formData.append('slug', slug^);
echo     formData.append('file', fs.createReadStream(filePath^)^);
echo     
echo     // Send to the API
echo     console.log(`Uploading ${fileName} with title "${title}" and slug "${slug}"...`^);
echo     
echo     const options = {
echo       hostname: 'localhost',
echo       port: 3000,
echo       path: '/api/deploy',
echo       method: 'POST',
echo       headers: formData.getHeaders(^)
echo     };
echo     
echo     // Send the request
echo     return new Promise((resolve, reject^) => {
echo       const req = http.request(options, (res^) => {
echo         let data = '';
echo         
echo         res.on('data', (chunk^) => {
echo           data += chunk;
echo         }^);
echo         
echo         res.on('end', (^) => {
echo           if (res.statusCode >= 200 && res.statusCode < 300^) {
echo             console.log(`Upload successful for ${fileName}`^);
echo             console.log(`Response:`, data^);
echo             
echo             // Move file to uploaded folder
echo             const uploadedFolder = path.join(__dirname, 'tsx_uploaded'^);
echo             if (!fs.existsSync(uploadedFolder^)^) {
echo               fs.mkdirSync(uploadedFolder^);
echo             }
echo             
echo             const newPath = path.join(uploadedFolder, fileName^);
echo             fs.renameSync(filePath, newPath^);
echo             console.log(`Moved ${fileName} to uploaded folder`^);
echo             
echo             resolve(data^);
echo           } else {
echo             console.error(`Error uploading ${fileName}: ${res.statusCode}`^);
echo             console.error(data^);
echo             reject(new Error(`HTTP ${res.statusCode}: ${data}`^)^);
echo           }
echo         }^);
echo       }^);
echo       
echo       req.on('error', (error^) => {
echo         console.error(`Request error for ${fileName}:`, error.message^);
echo         reject(error^);
echo       }^);
echo       
echo       formData.pipe(req^);
echo     }^);
echo   } catch (error^) {
echo     console.error('Upload error:', error.message^);
echo     throw error;
echo   }
echo }
echo.
echo // Process existing files in the folder first
echo const existingFiles = fs.readdirSync(watchFolder^);
echo console.log('Found', existingFiles.length, 'files in the upload folder'^);
echo.
echo existingFiles.filter(file => file.endsWith('.tsx'^)^).forEach(file => {
echo   const filePath = path.join(watchFolder, file^);
echo   console.log('Processing existing file:', file^);
echo   uploadFile(filePath^)
echo     .then(^) => console.log('Processed existing file:', file^)^)
echo     .catch(error => console.error('Failed to process existing file:', file, error.message^)^);
echo }^);
echo.
echo // Watch for new files
echo fs.watch(watchFolder, (eventType, filename^) => {
echo   if (eventType === 'rename' && filename && filename.endsWith('.tsx'^)^) {
echo     const filePath = path.join(watchFolder, filename^);
echo     
echo     // Check if file exists and has content (to avoid partial writes^)
echo     setTimeout((^) => {
echo       if (fs.existsSync(filePath^) && fs.statSync(filePath^).size > 0^) {
echo         console.log('New file detected:', filename^);
echo         uploadFile(filePath^)
echo           .then((^) => console.log('Successfully processed new file:', filename^)^)
echo           .catch(error => console.error('Failed to process new file:', filename, error.message^)^);
echo       }
echo     }, 1000^); // Wait 1 second to ensure file is completely written
echo   }
echo }^);
echo.
echo console.log('Watcher started. Drop TSX files into the tsx_to_upload folder to upload them automatically.'^);
echo console.log('Press Ctrl+C to stop.'^);
) > auto_uploader.js

REM Install required packages
echo Installing required packages...
call npm install form-data --no-fund --no-audit --silent || echo Failed to install packages, but continuing...

REM Open the upload folder
echo Opening TSX upload folder...
start "" "D:\NvidiaGTCProject\tsx_to_upload"

REM Open the browser
echo Opening browser to check uploads...
start http://localhost:3000/blog

REM Start the auto uploader
echo Starting auto uploader...
start cmd /c "cd /d D:\NvidiaGTCProject && node auto_uploader.js"

echo.
echo ======================================================
echo Auto uploader started!
echo.
echo 1. Place TSX files in the tsx_to_upload folder
echo 2. Files will be automatically uploaded
echo 3. Check results at http://localhost:3000/blog
echo.
echo Files that have been uploaded will be moved to the tsx_uploaded folder
echo ======================================================
echo.
echo To stop all services, run server_stop.bat
echo.

REM Create server stop batch file if it doesn't exist
if not exist D:\NvidiaGTCProject\server_stop.bat (
  (
    echo @echo off
    echo echo Stopping all services...
    echo taskkill /f /im node.exe
    echo echo Services stopped.
    echo pause
  ) > D:\NvidiaGTCProject\server_stop.bat
  echo Server stop batch file created.
)

pause
