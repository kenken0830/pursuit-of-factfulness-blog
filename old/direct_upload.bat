@echo off
echo ===================================================
echo TSXファイル直接アップロードツール
echo ===================================================
echo.

cd /d D:\NvidiaGTCProject

set /p tsxfile=アップロードするTSXファイルのパスを入力してください: 
set /p title=タイトルを入力してください: 
set /p slug=スラグ(URL)を入力してください: 

echo.
echo TSXファイル: %tsxfile%
echo タイトル: %title%
echo スラグ: %slug%
echo.

set /p confirm=この内容でアップロードしますか？ (Y/N): 
if /i not "%confirm%"=="Y" goto :eof

echo アップロード処理を実行中...

rem コンポーネント名を取得
for %%i in ("%tsxfile%") do set componentname=%%~ni

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

echo ファイルを作成しました。

rem サーバーが実行中かチェックして、リロード
netstat -ano | findstr "LISTENING" | findstr ":3000" > nul
if %errorlevel% equ 0 (
  echo 開発サーバーが実行中です。再起動は不要です。
) else (
  echo 開発サーバーを起動します...
  start cmd /k "npm run dev"
)

rem ブラウザで確認ページを開く
timeout /t 5
start http://localhost:3000/blog/%slug%

echo.
echo 完了しました！
echo 記事は http://localhost:3000/blog/%slug% で確認できます
echo.
echo Vercelへのデプロイを開始するには、fix_all_issues.batを実行してください
pause
