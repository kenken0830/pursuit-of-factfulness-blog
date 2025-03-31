@echo off
echo ===================================================
echo D×MirAI 自動アップロードシステム - Node.js版
echo ===================================================
echo.

cd /d D:\NvidiaGTCProject

echo Node.js監視スクリプトの毎日の自動実行スケジュールを設定します...

rem タスクスケジューラに登録するXMLファイルを作成
echo ^<?xml version="1.0" encoding="UTF-16"?^>> node_watcher_task.xml
echo ^<Task version="1.2" xmlns="http://schemas.microsoft.com/windows/2004/02/mit/task"^>>> node_watcher_task.xml
echo   ^<RegistrationInfo^>>> node_watcher_task.xml
echo     ^<Date^>%date:~0,4%-%date:~5,2%-%date:~8,2%T%time:~0,2%:%time:~3,2%:%time:~6,2%^</Date^>>> node_watcher_task.xml
echo     ^<Author^>%username%^</Author^>>> node_watcher_task.xml
echo     ^<Description^>毎日指定時刻にNode.jsスクリプトを起動し、記事フォルダを監視して新しいTSXファイルを自動アップロードします^</Description^>>> node_watcher_task.xml
echo   ^</RegistrationInfo^>>> node_watcher_task.xml
echo   ^<Triggers^>>> node_watcher_task.xml
echo     ^<CalendarTrigger^>>> node_watcher_task.xml
echo       ^<StartBoundary^>%date:~0,4%-%date:~5,2%-%date:~8,2%T09:00:00^</StartBoundary^>>> node_watcher_task.xml
echo       ^<Enabled^>true^</Enabled^>>> node_watcher_task.xml
echo       ^<ScheduleByDay^>>> node_watcher_task.xml
echo         ^<DaysInterval^>1^</DaysInterval^>>> node_watcher_task.xml
echo       ^</ScheduleByDay^>>> node_watcher_task.xml
echo     ^</CalendarTrigger^>>> node_watcher_task.xml
echo     ^<LogonTrigger^>>> node_watcher_task.xml
echo       ^<Enabled^>true^</Enabled^>>> node_watcher_task.xml
echo     ^</LogonTrigger^>>> node_watcher_task.xml
echo   ^</Triggers^>>> node_watcher_task.xml
echo   ^<Principals^>>> node_watcher_task.xml
echo     ^<Principal id="Author"^>>> node_watcher_task.xml
echo       ^<LogonType^>InteractiveToken^</LogonType^>>> node_watcher_task.xml
echo       ^<RunLevel^>HighestAvailable^</RunLevel^>>> node_watcher_task.xml
echo     ^</Principal^>>> node_watcher_task.xml
echo   ^</Principals^>>> node_watcher_task.xml
echo   ^<Settings^>>> node_watcher_task.xml
echo     ^<MultipleInstancesPolicy^>IgnoreNew^</MultipleInstancesPolicy^>>> node_watcher_task.xml
echo     ^<DisallowStartIfOnBatteries^>false^</DisallowStartIfOnBatteries^>>> node_watcher_task.xml
echo     ^<StopIfGoingOnBatteries^>false^</StopIfGoingOnBatteries^>>> node_watcher_task.xml
echo     ^<AllowHardTerminate^>true^</AllowHardTerminate^>>> node_watcher_task.xml
echo     ^<StartWhenAvailable^>true^</StartWhenAvailable^>>> node_watcher_task.xml
echo     ^<RunOnlyIfNetworkAvailable^>true^</RunOnlyIfNetworkAvailable^>>> node_watcher_task.xml
echo     ^<IdleSettings^>>> node_watcher_task.xml
echo       ^<StopOnIdleEnd^>false^</StopOnIdleEnd^>>> node_watcher_task.xml
echo       ^<RestartOnIdle^>false^</RestartOnIdle^>>> node_watcher_task.xml
echo     ^</IdleSettings^>>> node_watcher_task.xml
echo     ^<AllowStartOnDemand^>true^</AllowStartOnDemand^>>> node_watcher_task.xml
echo     ^<Enabled^>true^</Enabled^>>> node_watcher_task.xml
echo     ^<Hidden^>false^</Hidden^>>> node_watcher_task.xml
echo     ^<RunOnlyIfIdle^>false^</RunOnlyIfIdle^>>> node_watcher_task.xml
echo     ^<WakeToRun^>true^</WakeToRun^>>> node_watcher_task.xml
echo     ^<ExecutionTimeLimit^>PT24H^</ExecutionTimeLimit^>>> node_watcher_task.xml
echo   ^</Settings^>>> node_watcher_task.xml
echo   ^<Actions Context="Author"^>>> node_watcher_task.xml
echo     ^<Exec^>>> node_watcher_task.xml
echo       ^<Command^>%SystemRoot%\System32\cmd.exe^</Command^>>> node_watcher_task.xml
echo       ^<Arguments^>/c "D:\NvidiaGTCProject\start_node_watcher.bat"^</Arguments^>>> node_watcher_task.xml
echo       ^<WorkingDirectory^>D:\NvidiaGTCProject^</WorkingDirectory^>>> node_watcher_task.xml
echo     ^</Exec^>>> node_watcher_task.xml
echo   ^</Actions^>>> node_watcher_task.xml
echo ^</Task^>>> node_watcher_task.xml

echo XMLファイルを作成しました。タスクをシステムに登録します...

rem タスクスケジューラにタスクを登録
schtasks /create /tn "D×MirAI自動アップロード" /xml node_watcher_task.xml

if %ERRORLEVEL% EQU 0 (
  echo タスクが正常に登録されました！
  echo 毎日午前9時、およびコンピューター起動時に記事監視システムが自動的に起動します。
) else (
  echo タスクの登録中にエラーが発生しました。管理者権限で実行してください。
)

echo.
echo 今すぐNode.js監視スクリプトを実行しますか？(Y/N)
set /p answer=選択してください: 

if /i "%answer%"=="Y" (
  echo 監視スクリプトを起動します...
  start cmd /k "D:\NvidiaGTCProject\start_node_watcher.bat"
  echo バックグラウンドでスクリプトが実行されています。
  echo 終了するには、起動したコマンドプロンプトウィンドウを閉じてください。
) else (
  echo スクリプトは起動されませんでした。
  echo 「D:\NvidiaGTCProject\start_node_watcher.bat」を実行して手動で起動できます。
)

echo.
echo セットアップが完了しました。
pause
