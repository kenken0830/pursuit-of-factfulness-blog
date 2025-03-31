@echo off
setlocal EnableDelayedExpansion

echo ===================================================
echo シンプル自動アップロードツール
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

echo フォルダ: %upload_folder%
echo 処理済みリスト: %processed_list%
echo.

rem 記事の処理
for %%f in ("%upload_folder%\*.tsx") do (
  set "filepath=%%f"
  set "filename=%%~nxf"
  set "componentname=%%~nf"
  
  echo 処理中: !filename!
  
  rem このファイルが既に処理済みかチェック
  findstr /C:"!filename!" "%processed_list%" >nul
  if !errorlevel! neq 0 (
    echo   ファイル !filename! を処理します...
    
    rem H1タグの内容を抽出
    set "title=!componentname!"
    for /f "tokens=*" %%a in ('findstr /C:"<h1" "!filepath!"') do (
      set "h1line=%%a"
      echo   検出されたH1行: !h1line!
      
      rem タイトル部分を抽出する簡易処理
      set "h1line=!h1line:*<h1=!"
      set "h1line=!h1line:*>=!"
      set "h1line=!h1line:</h1>=!"
      set "title=!h1line!"
      
      echo   抽出されたタイトル: !title!
      goto :found_title
    )
    
    :found_title
    rem スラグ名を設定
    set "slug=!componentname!"
    
    rem コンポーネントをcomponentsフォルダにコピー
    if not exist components mkdir components
    copy /Y "!filepath!" "components\!componentname!.tsx"
    echo   components\!componentname!.tsx にコピーしました
    
    rem ページファイルを作成
    if not exist app\blog\!slug! mkdir app\blog\!slug!
    
    echo import !componentname! from "@/components/!componentname!"> app\blog\!slug!\page.tsx
    echo import { Metadata } from "next">> app\blog\!slug!\page.tsx
    echo.>> app\blog\!slug!\page.tsx
    echo export const metadata: Metadata = {>> app\blog\!slug!\page.tsx
    echo   title: "!title! | Pursuit of Factfulness",>> app\blog\!slug!\page.tsx
    echo   description: "!title!に関する詳細レポートと最新情報",>> app\blog\!slug!\page.tsx
    echo   openGraph: {>> app\blog\!slug!\page.tsx
    echo     title: "!title!",>> app\blog\!slug!\page.tsx
    echo     description: "!title!に関する詳細情報",>> app\blog\!slug!\page.tsx
    echo     type: "article",>> app\blog\!slug!\page.tsx
    echo     images: [>> app\blog\!slug!\page.tsx
    echo       {>> app\blog\!slug!\page.tsx
    echo         url: "/placeholder.svg?height=600&width=800",>> app\blog\!slug!\page.tsx
    echo         width: 1200,>> app\blog\!slug!\page.tsx
    echo         height: 630,>> app\blog\!slug!\page.tsx
    echo         alt: "!title!",>> app\blog\!slug!\page.tsx
    echo       },>> app\blog\!slug!\page.tsx
    echo     ],>> app\blog\!slug!\page.tsx
    echo   },>> app\blog\!slug!\page.tsx
    echo   twitter: {>> app\blog\!slug!\page.tsx
    echo     card: "summary_large_image",>> app\blog\!slug!\page.tsx
    echo     title: "!title!",>> app\blog\!slug!\page.tsx
    echo     description: "!title!に関する詳細情報",>> app\blog\!slug!\page.tsx
    echo     images: ["/placeholder.svg?height=600&width=800"],>> app\blog\!slug!\page.tsx
    echo   },>> app\blog\!slug!\page.tsx
    echo }>> app\blog\!slug!\page.tsx
    echo.>> app\blog\!slug!\page.tsx
    echo export default function !componentname!Page() {>> app\blog\!slug!\page.tsx
    echo   return (>> app\blog\!slug!\page.tsx
    echo     ^<div className="container mx-auto px-4 py-8"^>>> app\blog\!slug!\page.tsx
    echo       ^<!componentname! /^>>> app\blog\!slug!\page.tsx
    echo     ^</div^>>> app\blog\!slug!\page.tsx
    echo   )>> app\blog\!slug!\page.tsx
    echo }>> app\blog\!slug!\page.tsx
    
    echo   app\blog\!slug!\page.tsx を作成しました
    
    rem 変更をGitに追加
    git add components\!componentname!.tsx
    git add app\blog\!slug!\page.tsx
    
    rem 処理済みリストに追加
    echo !filename!,!title!,!slug!,%date% %time% >> "%processed_list%"
    
    echo   処理完了: !filename!
    echo   タイトル: !title!
    echo   スラグ: !slug!
    echo.
  ) else (
    echo   ファイル !filename! は既に処理済みです。スキップします。
  )
)

rem コミットとプッシュ
echo Gitコミットを実行します...
git commit -m "Add new articles: %date%"
    
rem プッシュ（もしこれがエラーになる場合はfix_all_issues.batを使用）
git push origin main

if %errorlevel% neq 0 (
  echo 通常のプッシュに失敗しました。fix_all_issues.batを実行します...
  call fix_all_issues.bat
) else (
  echo Gitプッシュ成功しました！
)

rem Vercelデプロイフックを呼び出す
if not "%VERCEL_DEPLOY_HOOK_URL%"=="" (
  echo Vercelへのデプロイを開始しています...
  curl -X POST "%VERCEL_DEPLOY_HOOK_URL%"
) else (
  echo 警告: VERCEL_DEPLOY_HOOK_URLが設定されていません。手動でデプロイしてください。
)

echo.
echo ========================================================
echo 処理完了！
echo 記事は間もなく以下のURLで確認できるようになります：
echo https://www.pursuit-of-factfulness.com/blog/[スラグ名]
echo ========================================================
echo.
pause
