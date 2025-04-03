#!/bin/bash

# 設置 Java 記憶體配置
JAVA_OPTS="-Xmx4g"

# 檢查 Java 是否安裝
if ! command -v java &> /dev/null; then
    echo "Java 未安裝。請安裝 Java 21 或更高版本。"
    exit 1
fi

# 設置腳本所在目錄為當前目錄
cd "$(dirname "$0")"

# 啟動應用程序
echo "正在啟動 PDF 壓縮工具..."
echo "請稍候，程式啟動後將自動打開瀏覽器..."

# 定義清理函數
cleanup() {
    echo
    echo "正在關閉 PDF 壓縮工具..."
    # 獲取所有相關的 Java 進程
    local pids=$(ps -ef | grep "pdf-compressor-1.0.0.jar" | grep -v grep | awk '{print $2}')
    if [ ! -z "$pids" ]; then
        kill $pids 2>/dev/null
    fi
    exit 0
}

# 註冊清理函數
trap cleanup SIGINT SIGTERM

# 在後台打開瀏覽器（延遲執行）
(
    sleep 5
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        open http://localhost:8080
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        xdg-open http://localhost:8080 || sensible-browser http://localhost:8080 || x-www-browser http://localhost:8080 || gnome-open http://localhost:8080
    fi
) &

echo
echo "要停止服務，請按 Ctrl+C"
echo

# 在前台運行 Java 應用
java $JAVA_OPTS -jar pdf-compressor-1.0.0.jar