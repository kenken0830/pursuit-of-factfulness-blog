@echo off
setlocal EnableDelayedExpansion

echo ===================================================
echo TSX自動アップロードツール (H1タグ自動抽出版)
echo ===================================================
echo.

cd /d D:\NvidiaGTCProject

rem TSXファイルの選択
set /p tsxfile=アップロードするTSXファイルのパスを入力してください: 

if not exist "%tsxfile%" (
  echo エラー: 指定されたファイルが見つかりません。
  goto :EOF
)

echo TSXファイルの内容からH1タグを検索しています...

rem 一時ファイルを作成
set "tempfile=%TEMP%\h1extract_%RANDOM%.txt"
type "%tsxfile%" > "%tempfile%"

rem H1タグの内容を抽出
set "title="
for /f "tokens=*" %%a in ('type "%tempfile%" ^| findstr /r "<h1[^>]*>"') do (
  set "h1line=%%a"
  set "h1line=!h1line:*<h1=!"
  set "h1line=!h1line:*>=!"
  set "h1line=!h1line:</h1>!"
  set "title=!h1line!"
  goto :found_title
)

:found_title
del "%tempfile%"

rem タイトルが見つからない場合
if "%title%"=="" (
  echo H1タグが見つかりませんでした。
  set /p title=タイトルを手動で入力してください: 
)

rem コンポーネント名を取得
for %%i in ("%tsxfile%") do set componentname=%%~ni

rem スラグを生成（タイトルから英数字とハイフンのみを抽出）
set "slug=%componentname%"
set /p slug=スラグ(URL)を入力してください [%slug%]: 
if "%slug%"=="" set "slug=%componentname%"

echo.
echo TSXファイル: %tsxfile%
echo タイトル: %title%
echo スラグ: %slug%
echo.

set /p confirm=この内容でアップロードしますか？ (Y/N): 
if /i not "%confirm%"=="Y" goto :eof

echo アップロード処理を実行中...

rem GitHubリポジトリ情報
set github_owner=%GITHUB_OWNER%
set github_repo=%GITHUB_REPO%
set github_token=%GITHUB_TOKEN%

if "%github_owner%"=="" set github_owner=kenken0830
if "%github_repo%"=="" set github_repo=pursuit-of-factfulness-blog
if "%github_token%"=="" echo 警告: GITHUB_TOKENが設定されていません。.env.localを確認してください。

rem コンポーネントをcomponentsフォルダにコピー
if not exist components mkdir components
copy /Y "%tsxfile%" "components\%componentname%.tsx"
echo TSXファイルをcomponentsフォルダにコピーしました。

rem ページファイルを作成
if not exist app\blog\%slug% mkdir app\blog\%slug%

echo import %componentname% from "@/components/%componentname%"> app\blog\%slug%\page.tsx
echo import { Metadata } from "next">> app\blog\%slug%\page.tsx
echo.>> app\blog\%slug%\page.tsx
echo export const metadata: Metadata = {>> app\blog\%slug%\page.tsx
echo   title: "%title% | Pursuit of Factfulness",>> app\blog\%slug%\page.tsx
echo   description: "%title%に関する詳細レポートと最新情報",>> app\blog\%slug%\page.tsx
echo   openGraph: {>> app\blog\%slug%\page.tsx
echo     title: "%title%",>> app\blog\%slug%\page.tsx
echo     description: "%title%に関する詳細情報",>> app\blog\%slug%\page.tsx
echo     type: "article",>> app\blog\%slug%\page.tsx
echo     images: [>> app\blog\%slug%\page.tsx
echo       {>> app\blog\%slug%\page.tsx
echo         url: "/placeholder.svg?height=600&width=800",>> app\blog\%slug%\page.tsx
echo         width: 1200,>> app\blog\%slug%\page.tsx
echo         height: 630,>> app\blog\%slug%\page.tsx
echo         alt: "%title%",>> app\blog\%slug%\page.tsx
echo       },>> app\blog\%slug%\page.tsx
echo     ],>> app\blog\%slug%\page.tsx
echo   },>> app\blog\%slug%\page.tsx
echo   twitter: {>> app\blog\%slug%\page.tsx
echo     card: "summary_large_image",>> app\blog\%slug%\page.tsx
echo     title: "%title%",>> app\blog\%slug%\page.tsx
echo     description: "%title%に関する詳細情報",>> app\blog\%slug%\page.tsx
echo     images: ["/placeholder.svg?height=600&width=800"],>> app\blog\%slug%\page.tsx
echo   },>> app\blog\%slug%\page.tsx
echo }>> app\blog\%slug%\page.tsx
echo.>> app\blog\%slug%\page.tsx
echo export default function %componentname%Page() {>> app\blog\%slug%\page.tsx
echo   return (>> app\blog\%slug%\page.tsx
echo     ^<div className="container mx-auto px-4 py-8"^>>> app\blog\%slug%\page.tsx
echo       ^<%componentname% /^>>> app\blog\%slug%\page.tsx
echo     ^</div^>>> app\blog\%slug%\page.tsx
echo   )>> app\blog\%slug%\page.tsx
echo }>> app\blog\%slug%\page.tsx

echo ページファイルを作成しました。

rem GitHub連携とVercelデプロイを自動実行
echo GitHub連携とVercelデプロイを開始します...

rem 変更をGitに追加
git add components\%componentname%.tsx
git add app\blog\%slug%\page.tsx

rem コミット
git commit -m "Add new article: %title%"

rem プッシュ（もしこれがエラーになる場合はfix_all_issues.batを使用）
git push origin main || (
  echo 通常のプッシュに失敗しました。fix_all_issues.batを実行します...
  call fix_all_issues.bat
)

rem Vercelデプロイフックを呼び出す
if not "%VERCEL_DEPLOY_HOOK_URL%"=="" (
  echo Vercelへのデプロイを開始しています...
  curl -X POST "%VERCEL_DEPLOY_HOOK_URL%"
) else (
  echo 警告: VERCEL_DEPLOY_HOOK_URLが設定されていません。手動でデプロイしてください。
)

rem サーバーが実行中かチェックして、リロード
netstat -ano | findstr "LISTENING" | findstr ":3000" > nul
if %errorlevel% equ 0 (
  echo 開発サーバーが実行中です。
) else (
  echo 開発サーバーを起動します...
  start cmd /k "npm run dev"
)

rem ブラウザで確認ページを開く
timeout /t 5
start http://localhost:3000/blog/%slug%

echo.
echo ========================================================
echo プロセス完了！
echo --------------------------------------------------------
echo ローカル: http://localhost:3000/blog/%slug%
echo 本番環境: https://www.pursuit-of-factfulness.com/blog/%slug%
echo --------------------------------------------------------
echo 本番環境への反映には5〜10分かかる場合があります。
echo ========================================================
echo.
pause
