# Troubleshooting Guide for TSX Upload System

## Current Setup

- **Local Development**: http://localhost:3000
  - Upload page: http://localhost:3000/upload
  - Blog index: http://localhost:3000/blog

- **Production Site**: https://www.pursuit-of-factfulness.com
  - Blog index: https://www.pursuit-of-factfulness.com/blog

## Common Issues and Solutions

### 1. TSX File Upload Issues

- **Problem**: File doesn't upload or generates an error
  - **Solution**: Check that the file is a valid TSX React component
  - **Solution**: Ensure your GitHub token has sufficient permissions

### 2. Git Synchronization Issues

- **Problem**: Local changes can't be pushed to GitHub
  - **Solution**: Use the repair script or create a new branch:
    ```
    git checkout -b feature/my-fix
    git add .
    git commit -m "My changes"
    git push -u origin feature/my-fix
    ```

### 3. Vercel Deployment Issues

- **Problem**: Site shows 404 or deployment fails
  - **Solution**: Check Vercel dashboard for deployment status
  - **Solution**: Try manual deployment via Vercel dashboard
  - **Solution**: Update deployment hooks in .env.local file

## Next Steps for Automatic Display on Homepage

1. The fix_all_issues.bat script pushes code changes to properly display posts on the homepage
2. These changes may need to be approved via a Pull Request on GitHub
3. After merging, Vercel should automatically deploy the updated site

## Manual Checks

- GitHub Repository: https://github.com/kenken0830/pursuit-of-factfulness-blog
- Vercel Dashboard: https://vercel.com/dashboard

## Support

If issues persist, please check logs in:
- GitHub Actions tab in your repository
- Vercel deployment logs in the Vercel dashboard
