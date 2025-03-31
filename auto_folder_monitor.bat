@echo off
setlocal EnableDelayedExpansion

echo ===================================================
echo フォルダ監視型自動アップロードシステム
echo ===================================================
echo.

cd /d D:\NvidiaGTCProject

set "upload_folder=D:\NvidiaGTCProject\articles"
set "processed_list=D:\NvidiaGTCProject\processed_files.txt"

rem 処理済みファイルリストがなければ作成
if not exist "%processed_list%" (
  echo # 処理済みTSXファイルリスト > "%processed_list%"
  echo # 形式: ファイル名,タイトル,スラグ,処理日時 >> "%processed_list%"
  echo. >> "%processed_list%"
)

:check_folder
cls
echo ===================================================
echo フォルダ監視中: %upload_folder%
echo 処理済みファイル記録: %processed_list%
echo ===================================================
echo.

rem フォルダ内の未処理のTSXファイルを探す
set "new_files_found=0"
set "files_list=%TEMP%\new_tsx_files_%RANDOM%.txt"
dir /b "%upload_folder%\*.tsx" > "%files_list%" 2>nul

for /f "tokens=*" %%f in (%files_list%) do (
  set "filename=%%f"
  
  rem このファイルが既に処理済みかチェック
  findstr /C:"!filename!" "%processed_list%" >nul
  if !errorlevel! neq 0 (
    set /a new_files_found+=1
    echo 新しいファイルを発見: !filename!
  )
)

if %new_files_found% equ 0 (
  echo 新しいTSXファイルはありません。監視を続けています...
  echo 終了するには Ctrl+C を押してください。
  echo.
  timeout /t 30 >nul
  goto check_folder
)

echo %new_files_found%個の新しいTSXファイルを処理します。
echo.

set /p confirm=これらのファイルを自動処理しますか？ (Y/N): 
if /i not "%confirm%"=="Y" goto check_folder

echo.
echo 新しいファイルを処理しています...

rem GitHubリポジトリ情報
set github_owner=%GITHUB_OWNER%
set github_repo=%GITHUB_REPO%
set github_token=%GITHUB_TOKEN%

rem 各新規TSXファイルを処理
set "processed_count=0"
for /f "tokens=*" %%f in (%files_list%) do (
  set "filename=%%f"
  
  rem このファイルが既に処理済みかチェック
  findstr /C:"!filename!" "%processed_list%" >nul
  if !errorlevel! neq 0 (
    set /a processed_count+=1
    echo [!processed_count!/%new_files_found%] 処理中: !filename!
    
    rem ファイルの完全パス
    set "filepath=%upload_folder%\!filename!"
    
    rem コンポーネント名を取得
    set "componentname=%%~nf"
    
    rem H1タグの内容を抽出
    set "title="
    set "tempfile=%TEMP%\h1extract_!RANDOM!.txt"
    type "!filepath!" > "!tempfile!"
    
    for /f "tokens=*" %%a in ('type "!tempfile!" ^| findstr /r "<h1[^>]*>"') do (
      set "h1line=%%a"
      set "h1line=!h1line:*<h1=!"
      set "h1line=!h1line:*>=!"
      set "h1line=!h1line:</h1>!"
      set "title=!h1line!"
      goto :found_title_!processed_count!
    )
    
    :found_title_!processed_count!
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
    copy /Y "!filepath!" "components\!componentname!.tsx" > nul
    
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
    
    rem 処理済みリストに追加
    echo !filename!,!title!,!slug!,%date% %time% >> "%processed_list%"
    
    echo   処理完了: !filename!
    echo.
  )
)

if %processed_count% gtr 0 (
  rem コミットとプッシュ
  echo すべての新規記事をGitHubにコミットしています...
  git commit -m "Add %processed_count% new articles: %date%"
  
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
)

del "%files_list%" 2>nul

rem サーバーが実行中かチェック
netstat -ano | findstr "LISTENING" | findstr ":3000" > nul
if %errorlevel% neq 0 (
  echo 開発サーバーを起動します...
  start cmd /k "npm run dev"
)

echo.
echo ========================================================
echo 自動処理完了！
echo --------------------------------------------------------
if %processed_count% gtr 0 (
  echo %processed_count%個の新規記事がアップロードされました。
  echo 本番環境への反映には5〜10分かかる場合があります。
) else (
  echo 新規記事はありませんでした。
)
echo ========================================================
echo.
echo フォルダ監視を続けます...
timeout /t 15 >nul
goto check_folder
