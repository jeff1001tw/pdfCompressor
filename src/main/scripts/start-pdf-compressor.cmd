@echo off
setlocal

:: 設置 Java 記憶體配置
set JAVA_OPTS=-Xmx4g

:: 檢查 Java 是否安裝
java -version >nul 2>&1
if errorlevel 1 (
    echo Java 未安裝或未設置在 PATH 中。請安裝 Java 21 或更高版本。
    pause
    exit /b 1
)

:: 啟動應用程序
echo 正在啟動 PDF 壓縮工具...
echo 請稍候，程式啟動後將自動打開瀏覽器...
start java %JAVA_OPTS% -jar pdf-compressor-1.0.0.jar
timeout /t 5 /nobreak > nul
start http://localhost:8080

echo.
echo PDF 壓縮工具已啟動！
echo 如果瀏覽器沒有自動打開，請手動訪問：http://localhost:8080
echo 要停止服務，請關閉這個視窗。
echo.

:: 保持視窗開啟
pause > nul