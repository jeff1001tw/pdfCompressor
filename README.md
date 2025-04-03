# PDF 壓縮工具 / PDF Compressor

這是一個基於 Spring Boot 和 PDFBox 開發的 PDF 文件壓縮工具。

This is a PDF compression tool developed using Spring Boot and PDFBox.

## 功能特點 / Features

- 支援上傳最大 200MB 的 PDF 文件
- 透過降低 DPI 和圖片品質來壓縮 PDF
- 提供簡單的網頁界面，支援繁體中文和英文雙語顯示
- 支援中文檔案名稱
- 支援自定義檔案名稱尾綴，預設為 "compressed"
- 下載完成時顯示煙火特效動畫
- 保持 PDF 文件的可讀性
- 提供便捷的啟動腳本，支援 Windows 和 Unix-like 系統

---

- Support PDF files up to 200MB
- Compress PDF by reducing DPI and image quality
- Simple web interface with Traditional Chinese and English bilingual display
- Support Chinese filename
- Support customized file name suffix, default is "compressed" 
- Fireworks animation effect after download completion
- Maintain PDF readability
- Convenient startup scripts for both Windows and Unix-like systems

## 系統需求 / Requirements

- Java 21 或更高版本 / Java 21 or higher
- 支援的作業系統：Windows, macOS, Linux / Supported OS: Windows, macOS, Linux
- 4GB 以上可用記憶體（已在啟動腳本中配置）/ 4GB or more available memory (configured in startup scripts)

## 安裝與執行 / Installation and Running

### 方法一：使用啟動腳本（推薦） / Method 1: Using Startup Scripts (Recommended)

#### Windows:
1. 下載並解壓縮發布包
2. 雙擊執行 `start-pdf-compressor.cmd`
3. 程式會自動啟動並開啟瀏覽器
4. 要停止服務，直接關閉命令提示字元視窗即可

Windows 用戶將看到完整的運行日誌，並可以通過關閉視窗來停止服務。

#### macOS/Linux:
1. 下載並解壓縮發布包
2. 打開終端機，進入解壓目錄
3. 執行以下命令賦予腳本執行權限：
```
chmod +x start-pdf-compressor.sh
```
4. 運行腳本：
```
./start-pdf-compressor.sh
```
5. 要停止服務，按 Ctrl+C 即可

Unix-like 系統用戶可以看到完整的運行日誌，並透過 Ctrl+C 正常終止服務。

### 方法二：直接執行 JAR 檔案 / Method 2: Run JAR file directly

1. 下載 `pdf-compressor-1.0.0.jar`
2. 開啟終端機，切換到 jar 檔案所在目錄
3. 執行以下命令：
```
java -jar pdf-compressor-1.0.0.jar
```

### 方法三：從原始碼構建 / Method 3: Build from source

1. 克隆專案 / Clone the repository
```
git clone https://github.com/jeff1001tw/pdfCompressor.git
```

2. 進入專案目錄 / Enter project directory
```
cd pdfCompressor
```

3. 使用 Maven 構建專案 / Build with Maven
```
./mvnw clean package
```

4. 執行應用程序 / Run the application
```
java -jar target/pdf-compressor-1.0.0.jar
```

## 使用方法 / Usage

1. 啟動應用程序後，瀏覽器會自動開啟並訪問：http://localhost:8080
   - 如果瀏覽器沒有自動開啟，請手動訪問上述網址
2. 點擊「選擇檔案」按鈕，選擇要壓縮的 PDF 文件
3. 輸入自定義檔案名稱尾綴（可選，若未輸入則預設使用 "compressed"）
4. 點擊「壓縮 PDF」按鈕
5. 等待處理完成後，壓縮後的 PDF 文件會自動下載，同時顯示煙火特效動畫
6. 下載的檔案名稱將顯示為「原始檔名_尾綴.pdf」格式

## 技術細節 / Technical Details

- 框架 / Framework: Spring Boot 3.2.0
- PDF 處理庫 / PDF Library: Apache PDFBox 3.0.1
- 前端技術 / Frontend:
  - 使用原生 JavaScript 實現煙火特效
  - 支援響應式佈局
  - 雙語界面設計
- 壓縮方式 / Compression Method:
  - 圖片品質 / Image Quality: 50%
  - 輸出 DPI: 150
- 啟動腳本特性 / Startup Script Features:
  - 自動配置 4GB Java 堆內存
  - 自動檢測 Java 環境
  - 自動打開默認瀏覽器
  - 優雅的服務終止處理
  - 完整的運行日誌顯示

## 最新更新 / Latest Updates (2025/04/03)

- 新增雙語界面（繁體中文+英文）
- 新增自定義檔案名稱尾綴功能
- 新增下載完成煙火特效
- 優化代碼結構，將 HTML、CSS 和 JavaScript 分離為獨立文件
- 改進錯誤處理機制

## 注意事項 / Notes

- 處理大型文件可能需要較長時間
- 建議保留原始文件的備份
- 某些 PDF 可能因特殊字體而出現警告訊息，但不影響功能
- 啟動腳本已經自動配置了合適的記憶體大小，一般無需手動調整

## 疑難排解 / Troubleshooting

1. 如果無法啟動服務：
   - 確認 Java 21 已正確安裝
   - 確認 8080 端口未被占用
   - 檢查系統可用記憶體是否足夠

2. 如果瀏覽器沒有自動打開：
   - Windows: 手動訪問 http://localhost:8080
   - macOS/Linux: 手動執行 `open http://localhost:8080`

3. 如果需要更改記憶體配置：
   - Windows: 編輯 start-pdf-compressor.cmd 中的 JAVA_OPTS
   - Unix: 編輯 start-pdf-compressor.sh 中的 JAVA_OPTS
