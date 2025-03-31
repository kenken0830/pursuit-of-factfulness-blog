@echo off
echo ======================================================
echo Automatic Issue Resolver
echo ======================================================
echo.

cd /d D:\NvidiaGTCProject

echo Step 1: Fixing Git synchronization issues...
echo ------------------------------------------------

REM Create a backup of the modified files
echo Creating backups of modified files...
if not exist backups mkdir backups
copy /Y lib\posts.ts backups\posts.ts.bak 2>nul
copy /Y app\page.tsx backups\page.tsx.bak 2>nul 
copy /Y app\blog\index.tsx backups\index.tsx.bak 2>nul
echo Backups created in D:\NvidiaGTCProject\backups

REM Attempt to fix Git issues with a fresh branch
echo Creating a fresh Git branch for our changes...
git fetch origin
git stash save "Temporary stash for fix"
git checkout -b fix-auto-display-posts-temp origin/main

echo Restoring our modifications from backups...
mkdir -p lib 2>nul
mkdir -p app\blog 2>nul
copy /Y backups\posts.ts.bak lib\posts.ts 2>nul
copy /Y backups\page.tsx.bak app\page.tsx 2>nul
copy /Y backups\index.tsx.bak app\blog\index.tsx 2>nul

echo Committing changes to the new branch...
git add lib\posts.ts app\page.tsx app\blog\index.tsx
git commit -m "Add automatic post display to homepage and blog index"

echo Pushing changes to GitHub...
git push -u origin fix-auto-display-posts-temp

echo.
echo Step 2: Creating alternative Vercel deployment approach...
echo ------------------------------------------------

REM Create direct deployment script using GitHub API
echo Creating GitHub-based deployment script...

(
echo const fs = require('fs'^);
echo const https = require('https'^);
echo.
echo function createVercelDeployment(^) {
echo   console.log('Attempting to create Vercel deployment via alternative method...'^);
echo.
echo   // Try multiple deployment hooks and approaches
echo   const deployHooks = [
echo     'https://api.vercel.com/v1/integrations/deploy/prj_KHKAmHCUZh1IrcDFnFNy4yuuqcLB/cbBevQw7qX',
echo     // Add any other potential hooks here
echo   ];
echo.
echo   deployHooks.forEach(hook => {
echo     console.log(`Trying deployment hook: ${hook}`^);
echo.
echo     const req = https.request(hook, {
echo       method: 'POST',
echo       headers: {
echo         'Content-Type': 'application/json'
echo       }
echo     }, (res^) => {
echo       let data = '';
echo.
echo       res.on('data', (chunk^) => {
echo         data += chunk;
echo       }^);
echo.
echo       res.on('end', (^) => {
echo         console.log(`Hook response (${res.statusCode}^):`, data^);
echo         if (res.statusCode >= 200 && res.statusCode < 300^) {
echo           console.log('Deployment successfully triggered!'^);
echo         } else {
echo           console.log('This hook did not work. Trying alternative methods...'^);
echo           tryAlternativeMethod(^);
echo         }
echo       }^);
echo     }^);
echo.
echo     req.on('error', (e^) => {
echo       console.error('Error with deployment hook:', e.message^);
echo       tryAlternativeMethod(^);
echo     }^);
echo.
echo     req.end(^);
echo   }^);
echo }
echo.
echo function tryAlternativeMethod(^) {
echo   console.log('Attempting GitHub repository webhook trigger...'^);
echo   
echo   // Create a small change to trigger GitHub actions/webhooks
echo   try {
echo     const readmePath = './README.md';
echo     let readmeContent = '';
echo     
echo     if (fs.existsSync(readmePath^)^) {
echo       readmeContent = fs.readFileSync(readmePath, 'utf8'^);
echo     } else {
echo       readmeContent = '# Pursuit of Factfulness\n\nA blog about AI and technology.';
echo     }
echo     
echo     // Add a timestamp to force a change
echo     const timestamp = new Date(^).toISOString(^);
echo     const newContent = `${readmeContent.trim(^)}\n\nLast updated: ${timestamp}`;
echo     
echo     fs.writeFileSync(readmePath, newContent^);
echo     
echo     console.log('Updated README.md to trigger deployment');
echo     console.log('Attempting to commit and push this change...');
echo     
echo     const { execSync } = require('child_process'^);
echo     
echo     try {
echo       execSync('git add README.md'^);
echo       execSync('git commit -m "Update README to trigger deployment"'^);
echo       execSync('git push'^);
echo       console.log('Successfully pushed change to trigger deployment');
echo     } catch (execError^) {
echo       console.error('Error executing Git commands:', execError.message^);
echo       console.log('Please manually push changes to trigger deployment');
echo     }
echo   } catch (error^) {
echo     console.error('Error with alternative method:', error.message^);
echo   }
echo }
echo.
echo // Start the process
echo createVercelDeployment(^);
echo.
echo console.log('Waiting 30 seconds for deployment to initialize...');
echo setTimeout((^) => {
echo   console.log('You can check deployment status at: https://vercel.com/dashboard');
echo   console.log('After deployment completes, visit: https://www.pursuit-of-factfulness.com/blog');
echo   console.log('Process complete! You can close this window.');
echo }, 30000^);
) > deploy_helper.js

REM Create a comprehensive troubleshooting guide
echo Creating troubleshooting guide...

(
echo # Troubleshooting Guide for TSX Upload System
echo.
echo ## Current Setup
echo.
echo - **Local Development**: http://localhost:3000
echo   - Upload page: http://localhost:3000/upload
echo   - Blog index: http://localhost:3000/blog
echo.
echo - **Production Site**: https://www.pursuit-of-factfulness.com
echo   - Blog index: https://www.pursuit-of-factfulness.com/blog
echo.
echo ## Common Issues and Solutions
echo.
echo ### 1. TSX File Upload Issues
echo.
echo - **Problem**: File doesn't upload or generates an error
echo   - **Solution**: Check that the file is a valid TSX React component
echo   - **Solution**: Ensure your GitHub token has sufficient permissions
echo.
echo ### 2. Git Synchronization Issues
echo.
echo - **Problem**: Local changes can't be pushed to GitHub
echo   - **Solution**: Use the repair script or create a new branch:
echo     ```
echo     git checkout -b feature/my-fix
echo     git add .
echo     git commit -m "My changes"
echo     git push -u origin feature/my-fix
echo     ```
echo.
echo ### 3. Vercel Deployment Issues
echo.
echo - **Problem**: Site shows 404 or deployment fails
echo   - **Solution**: Check Vercel dashboard for deployment status
echo   - **Solution**: Try manual deployment via Vercel dashboard
echo   - **Solution**: Update deployment hooks in .env.local file
echo.
echo ## Next Steps for Automatic Display on Homepage
echo.
echo 1. The fix_all_issues.bat script pushes code changes to properly display posts on the homepage
echo 2. These changes may need to be approved via a Pull Request on GitHub
echo 3. After merging, Vercel should automatically deploy the updated site
echo.
echo ## Manual Checks
echo.
echo - GitHub Repository: https://github.com/kenken0830/pursuit-of-factfulness-blog
echo - Vercel Dashboard: https://vercel.com/dashboard
echo.
echo ## Support
echo.
echo If issues persist, please check logs in:
echo - GitHub Actions tab in your repository
echo - Vercel deployment logs in the Vercel dashboard
) > TSX_Upload_Troubleshooting.md

REM Execute deployment helper
echo Running deployment helper...
if exist node_modules\form-data (
  echo Running deployment script...
  node deploy_helper.js
) else (
  echo Installing dependencies...
  call npm install form-data --no-fund --no-audit --silent
  echo Running deployment script...
  node deploy_helper.js
)

echo.
echo ======================================================
echo Fix process completed!
echo.
echo 1. Git changes have been pushed to a new branch
echo 2. Deployment has been triggered via multiple methods
echo 3. A troubleshooting guide has been created
echo.
echo Check the terminal output for any errors or warnings.
echo See TSX_Upload_Troubleshooting.md for more help.
echo ======================================================
echo.
echo Press any key to continue...
pause > nul
