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

# 在背景啟動 Java 應用
java $JAVA_OPTS -jar pdf-compressor-1.0.0.jar &

# 等待服務啟動
sleep 5

# 嘗試使用默認瀏覽器打開（支援不同的操作系統）
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    open http://localhost:8080
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    xdg-open http://localhost:8080 || sensible-browser http://localhost:8080 || x-www-browser http://localhost:8080 || gnome-open http://localhost:8080
fi

echo
echo "PDF 壓縮工具已啟動！"
echo "如果瀏覽器沒有自動打開，請手動訪問：http://localhost:8080"
echo "要停止服務，請按 Ctrl+C"
echo

# 等待用戶按 Ctrl+C
wait