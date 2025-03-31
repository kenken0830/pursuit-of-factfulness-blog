@echo off
setlocal EnableDelayedExpansion

echo ===================================================
echo 複数TSXファイル一括アップロードツール
echo ===================================================
echo.

cd /d D:\NvidiaGTCProject

rem フォルダパスの入力
set /p folder=TSXファイルが含まれるフォルダのパスを入力してください: 

if not exist "%folder%" (
  echo エラー: 指定されたフォルダが見つかりません。
  goto :EOF
)

echo フォルダ内のTSXファイルを検索しています...
set "filecount=0"
for %%f in ("%folder%\*.tsx") do (
  set /a filecount+=1
)

if %filecount% equ 0 (
  echo TSXファイルが見つかりませんでした。
  goto :EOF
)

echo %filecount%個のTSXファイルが見つかりました。

set /p confirm=これらのファイルをすべてアップロードしますか？ (Y/N): 
if /i not "%confirm%"=="Y" goto :eof

echo アップロード処理を開始します...
echo.

rem 各TSXファイルを処理
set "processed=0"
for %%f in ("%folder%\*.tsx") do (
  echo ファイル !processed!/%filecount% を処理中: %%f
  
  rem コンポーネント名を取得
  set "componentname=%%~nf"
  
  rem H1タグの内容を抽出
  set "title="
  set "tempfile=%TEMP%\h1extract_!RANDOM!.txt"
  type "%%f" > "!tempfile!"
  
  for /f "tokens=*" %%a in ('type "!tempfile!" ^| findstr /r "<h1[^>]*>"') do (
    set "h1line=%%a"
    set "h1line=!h1line:*<h1=!"
    set "h1line=!h1line:*>=!"
    set "h1line=!h1line:</h1>!"
    set "title=!h1line!"
    goto :found_title_!processed!
  )
  
  :found_title_!processed!
  del "!tempfile!"
  
  rem タイトルが見つからない場合はファイル名を使用
  if "!title!"=="" (
    set "title=!componentname!"
    echo   警告: H1タグが見つかりませんでした。ファイル名をタイトルとして使用します。
  )
  
  rem スラグを生成
  set "slug=!componentname!"
  
  echo   タイトル: !title!
  echo   スラグ: !slug!
  
  rem コンポーネントをcomponentsフォルダにコピー
  if not exist components mkdir components
  copy /Y "%%f" "components\!componentname!.tsx" > nul
  
  rem ページファイルを作成
  if not exist app\blog\!slug! mkdir app\blog\!slug!
  
  (
    echo import !componentname! from "@/components/!componentname!"
    echo import { Metadata } from "next"
    echo.
    echo export const metadata: Metadata = {
    echo   title: "!title! | Pursuit of Factfulness",
    echo   description: "!title!に関する詳細レポートと最新情報",
    echo   openGraph: {
    echo     title: "!title!",
    echo     description: "!title!に関する詳細情報",
    echo     type: "article",
    echo     images: [
    echo       {
    echo         url: "/placeholder.svg?height=600&width=800",
    echo         width: 1200,
    echo         height: 630,
    echo         alt: "!title!",
    echo       },
    echo     ],
    echo   },
    echo   twitter: {
    echo     card: "summary_large_image",
    echo     title: "!title!",
    echo     description: "!title!に関する詳細情報",
    echo     images: ["/placeholder.svg?height=600&width=800"],
    echo   },
    echo }
    echo.
    echo export default function !componentname!Page() {
    echo   return (
    echo     ^<div className="container mx-auto px-4 py-8"^>
    echo       ^<!componentname! /^>
    echo     ^</div^>
    echo   )
    echo }
  ) > app\blog\!slug!\page.tsx
  
  rem 変更をGitに追加
  git add components\!componentname!.tsx
  git add app\blog\!slug!\page.tsx
  
  set /a processed+=1
  echo   処理完了 (!processed!/%filecount%)
  echo.
)

rem コミットとプッシュ
echo すべての記事をGitHubにコミットしています...
git commit -m "Add %filecount% new articles"

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

rem サーバーが実行中かチェック
netstat -ano | findstr "LISTENING" | findstr ":3000" > nul
if %errorlevel% equ 0 (
  echo 開発サーバーが実行中です。
) else (
  echo 開発サーバーを起動します...
  start cmd /k "npm run dev"
)

echo.
echo ========================================================
echo 一括アップロード完了！
echo --------------------------------------------------------
echo %filecount%個の記事がアップロードされました。
echo 本番環境への反映には5〜10分かかる場合があります。
echo ========================================================
echo.
pause
