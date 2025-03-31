@echo off
echo ===================================================
echo 記事アップロード自動化システムのセットアップ
echo ===================================================
echo.

cd /d D:\NvidiaGTCProject

echo 毎日の自動実行スケジュールを設定します...

rem タスクスケジューラに登録するXMLファイルを作成
echo ^<?xml version="1.0" encoding="UTF-16"?^>> auto_upload_task.xml
echo ^<Task version="1.2" xmlns="http://schemas.microsoft.com/windows/2004/02/mit/task"^>>> auto_upload_task.xml
echo   ^<RegistrationInfo^>>> auto_upload_task.xml
echo     ^<Date^>%date:~0,4%-%date:~5,2%-%date:~8,2%T%time:~0,2%:%time:~3,2%:%time:~6,2%^</Date^>>> auto_upload_task.xml
echo     ^<Author^>%username%^</Author^>>> auto_upload_task.xml
echo     ^<Description^>毎日指定時刻に記事フォルダを監視し、新しいTSXファイルを自動アップロードします^</Description^>>> auto_upload_task.xml
echo   ^</RegistrationInfo^>>> auto_upload_task.xml
echo   ^<Triggers^>>> auto_upload_task.xml
echo     ^<CalendarTrigger^>>> auto_upload_task.xml
echo       ^<StartBoundary^>%date:~0,4%-%date:~5,2%-%date:~8,2%T09:00:00^</StartBoundary^>>> auto_upload_task.xml
echo       ^<Enabled^>true^</Enabled^>>> auto_upload_task.xml
echo       ^<ScheduleByDay^>>> auto_upload_task.xml
echo         ^<DaysInterval^>1^</DaysInterval^>>> auto_upload_task.xml
echo       ^</ScheduleByDay^>>> auto_upload_task.xml
echo     ^</CalendarTrigger^>>> auto_upload_task.xml
echo   ^</Triggers^>>> auto_upload_task.xml
echo   ^<Principals^>>> auto_upload_task.xml
echo     ^<Principal id="Author"^>>> auto_upload_task.xml
echo       ^<LogonType^>InteractiveToken^</LogonType^>>> auto_upload_task.xml
echo       ^<RunLevel^>HighestAvailable^</RunLevel^>>> auto_upload_task.xml
echo     ^</Principal^>>> auto_upload_task.xml
echo   ^</Principals^>>> auto_upload_task.xml
echo   ^<Settings^>>> auto_upload_task.xml
echo     ^<MultipleInstancesPolicy^>IgnoreNew^</MultipleInstancesPolicy^>>> auto_upload_task.xml
echo     ^<DisallowStartIfOnBatteries^>false^</DisallowStartIfOnBatteries^>>> auto_upload_task.xml
echo     ^<StopIfGoingOnBatteries^>false^</StopIfGoingOnBatteries^>>> auto_upload_task.xml
echo     ^<AllowHardTerminate^>true^</AllowHardTerminate^>>> auto_upload_task.xml
echo     ^<StartWhenAvailable^>true^</StartWhenAvailable^>>> auto_upload_task.xml
echo     ^<RunOnlyIfNetworkAvailable^>true^</RunOnlyIfNetworkAvailable^>>> auto_upload_task.xml
echo     ^<IdleSettings^>>> auto_upload_task.xml
echo       ^<StopOnIdleEnd^>false^</StopOnIdleEnd^>>> auto_upload_task.xml
echo       ^<RestartOnIdle^>false^</RestartOnIdle^>>> auto_upload_task.xml
echo     ^</IdleSettings^>>> auto_upload_task.xml
echo     ^<AllowStartOnDemand^>true^</AllowStartOnDemand^>>> auto_upload_task.xml
echo     ^<Enabled^>true^</Enabled^>>> auto_upload_task.xml
echo     ^<Hidden^>false^</Hidden^>>> auto_upload_task.xml
echo     ^<RunOnlyIfIdle^>false^</RunOnlyIfIdle^>>> auto_upload_task.xml
echo     ^<WakeToRun^>true^</WakeToRun^>>> auto_upload_task.xml
echo     ^<ExecutionTimeLimit^>PT4H^</ExecutionTimeLimit^>>> auto_upload_task.xml
echo     ^<Priority^>7^</Priority^>>> auto_upload_task.xml
echo   ^</Settings^>>> auto_upload_task.xml
echo   ^<Actions Context="Author"^>>> auto_upload_task.xml
echo     ^<Exec^>>> auto_upload_task.xml
echo       ^<Command^>D:\NvidiaGTCProject\auto_folder_monitor.bat^</Command^>>> auto_upload_task.xml
echo       ^<WorkingDirectory^>D:\NvidiaGTCProject^</WorkingDirectory^>>> auto_upload_task.xml
echo     ^</Exec^>>> auto_upload_task.xml
echo   ^</Actions^>>> auto_upload_task.xml
echo ^</Task^>>> auto_upload_task.xml

rem 修正版の自動実行ファイルを作成
echo @echo off> D:\NvidiaGTCProject\auto_daily_upload.bat
echo setlocal EnableDelayedExpansion>> D:\NvidiaGTCProject\auto_daily_upload.bat
echo.>> D:\NvidiaGTCProject\auto_daily_upload.bat
echo echo ===============================================>> D:\NvidiaGTCProject\auto_daily_upload.bat
echo echo 毎日の自動記事アップロードを実行中...>> D:\NvidiaGTCProject\auto_daily_upload.bat
echo echo ===============================================>> D:\NvidiaGTCProject\auto_daily_upload.bat
echo echo.>> D:\NvidiaGTCProject\auto_daily_upload.bat
echo.>> D:\NvidiaGTCProject\auto_daily_upload.bat
echo cd /d D:\NvidiaGTCProject>> D:\NvidiaGTCProject\auto_daily_upload.bat
echo.>> D:\NvidiaGTCProject\auto_daily_upload.bat
echo set "upload_folder=D:\NvidiaGTCProject\articles">> D:\NvidiaGTCProject\auto_daily_upload.bat
echo set "processed_list=D:\NvidiaGTCProject\processed_files.txt">> D:\NvidiaGTCProject\auto_daily_upload.bat
echo set "log_file=D:\NvidiaGTCProject\daily_upload_log.txt">> D:\NvidiaGTCProject\auto_daily_upload.bat
echo.>> D:\NvidiaGTCProject\auto_daily_upload.bat
echo echo %date% %time% - 自動アップロード開始 >> "!log_file!">> D:\NvidiaGTCProject\auto_daily_upload.bat
echo.>> D:\NvidiaGTCProject\auto_daily_upload.bat
echo rem 処理済みファイルリストがなければ作成>> D:\NvidiaGTCProject\auto_daily_upload.bat
echo if not exist "%%processed_list%%" (>> D:\NvidiaGTCProject\auto_daily_upload.bat
echo   echo # 処理済みTSXファイルリスト > "%%processed_list%%">> D:\NvidiaGTCProject\auto_daily_upload.bat
echo   echo # 形式: ファイル名,タイトル,スラグ,処理日時 >> "%%processed_list%%">> D:\NvidiaGTCProject\auto_daily_upload.bat
echo   echo. >> "%%processed_list%%">> D:\NvidiaGTCProject\auto_daily_upload.bat
echo   echo %date% %time% - 処理済みリストを新規作成 >> "!log_file!">> D:\NvidiaGTCProject\auto_daily_upload.bat
echo )>> D:\NvidiaGTCProject\auto_daily_upload.bat
echo.>> D:\NvidiaGTCProject\auto_daily_upload.bat
echo rem フォルダ内の未処理のTSXファイルを探す>> D:\NvidiaGTCProject\auto_daily_upload.bat
echo set "new_files_found=0">> D:\NvidiaGTCProject\auto_daily_upload.bat
echo set "files_list=%%TEMP%%\new_tsx_files_%%RANDOM%%.txt">> D:\NvidiaGTCProject\auto_daily_upload.bat
echo dir /b "%%upload_folder%%\*.tsx" > "%%files_list%%" 2^>nul>> D:\NvidiaGTCProject\auto_daily_upload.bat
echo.>> D:\NvidiaGTCProject\auto_daily_upload.bat
echo for /f "tokens=*" %%%%f in (%%files_list%%) do (>> D:\NvidiaGTCProject\auto_daily_upload.bat
echo   set "filename=%%%%f">> D:\NvidiaGTCProject\auto_daily_upload.bat
echo   rem このファイルが既に処理済みかチェック>> D:\NvidiaGTCProject\auto_daily_upload.bat
echo   findstr /C:"!filename!" "%%processed_list%%" ^>nul>> D:\NvidiaGTCProject\auto_daily_upload.bat
echo   if !errorlevel! neq 0 (>> D:\NvidiaGTCProject\auto_daily_upload.bat
echo     set /a new_files_found+=1>> D:\NvidiaGTCProject\auto_daily_upload.bat
echo     echo %date% %time% - 新しいファイルを発見: !filename! >> "!log_file!">> D:\NvidiaGTCProject\auto_daily_upload.bat
echo   )>> D:\NvidiaGTCProject\auto_daily_upload.bat
echo )>> D:\NvidiaGTCProject\auto_daily_upload.bat
echo.>> D:\NvidiaGTCProject\auto_daily_upload.bat
echo echo %date% %time% - 検出された新規ファイル数: %%new_files_found%% >> "!log_file!">> D:\NvidiaGTCProject\auto_daily_upload.bat
echo.>> D:\NvidiaGTCProject\auto_daily_upload.bat
echo if %%new_files_found%% equ 0 (>> D:\NvidiaGTCProject\auto_daily_upload.bat
echo   echo %date% %time% - 新規ファイルなし。処理終了 >> "!log_file!">> D:\NvidiaGTCProject\auto_daily_upload.bat
echo   del "%%files_list%%" 2^>nul>> D:\NvidiaGTCProject\auto_daily_upload.bat
echo   exit /b 0>> D:\NvidiaGTCProject\auto_daily_upload.bat
echo )>> D:\NvidiaGTCProject\auto_daily_upload.bat
echo.>> D:\NvidiaGTCProject\auto_daily_upload.bat
echo rem ここから下は新しいファイルが見つかった場合の処理>> D:\NvidiaGTCProject\auto_daily_upload.bat
echo echo %date% %time% - 新規ファイルの処理を開始 >> "!log_file!">> D:\NvidiaGTCProject\auto_daily_upload.bat
echo.>> D:\NvidiaGTCProject\auto_daily_upload.bat

rem 続きを書き込む
type D:\NvidiaGTCProject\auto_folder_monitor.bat | findstr /v "@echo off" | findstr /v "setlocal" | findstr /v "rem フォルダ内の未処理" | findstr /v "echo 新しいTSXファイルはありません" | findstr /v "timeout /t" | findstr /v "goto check_folder" | findstr /v "if %%new_files_found%% equ 0" | findstr /v "echo 新しいファイルを発見" | findstr /v "set /p confirm=" | findstr /v "if /i not \"%%confirm%%\"==\"Y\"" >> D:\NvidiaGTCProject\auto_daily_upload.bat

echo.>> D:\NvidiaGTCProject\auto_daily_upload.bat
echo echo %date% %time% - 処理完了。ログファイル: %%log_file%% >> "!log_file!">> D:\NvidiaGTCProject\auto_daily_upload.bat
echo exit /b 0>> D:\NvidiaGTCProject\auto_daily_upload.bat

echo タスクスケジューラ登録用のXMLファイルを作成しました: auto_upload_task.xml
echo 毎日の自動実行バッチファイルを作成しました: auto_daily_upload.bat

echo.
echo ===================================================
echo 自動化設定の手順
echo ===================================================
echo 以下の手順で自動化を完了してください:
echo.
echo 1. 管理者として以下のコマンドを実行:
echo    schtasks /create /tn "TSX記事自動アップロード" /xml "D:\NvidiaGTCProject\auto_upload_task.xml"
echo.
echo 2. または、Windowsのタスクスケジューラを開き:
echo    - 「タスクスケジューラライブラリ」を右クリック
echo    - 「タスクのインポート」を選択
echo    - "D:\NvidiaGTCProject\auto_upload_task.xml" を選択
echo.
echo これで毎朝9時に自動的にTSXファイルのアップロードが実行されます。
echo 時間を変更したい場合は、XMLファイル内の「09:00:00」を編集してください。
echo.
pause
