# PDF 壓縮工具 / PDF Compressor

這是一個基於 Spring Boot 和 PDFBox 開發的 PDF 文件壓縮工具。

This is a PDF compression tool developed using Spring Boot and PDFBox.

## 功能特點 / Features

- 支援上傳最大 200MB 的 PDF 文件
- 透過降低 DPI 和圖片品質來壓縮 PDF
- 提供簡單的網頁界面
- 支援中文檔案名稱
- 保持 PDF 文件的可讀性

---

- Support PDF files up to 200MB
- Compress PDF by reducing DPI and image quality
- Simple web interface
- Support Chinese filename
- Maintain PDF readability

## 系統需求 / Requirements

- Java 21 或更高版本 / Java 21 or higher
- 支援的作業系統：Windows, macOS, Linux / Supported OS: Windows, macOS, Linux

## 安裝與執行 / Installation and Running

### 方法一：使用啟動腳本（推薦） / Method 1: Using Startup Scripts (Recommended)

#### Windows:
1. 下載並解壓縮發布包
2. 雙擊執行 `start-pdf-compressor.cmd`
3. 程式會自動啟動並開啟瀏覽器

#### macOS/Linux:
1. 下載並解壓縮發布包
2. 打開終端機，進入解壓目錄
3. 執行以下命令賦予腳本執行權限：
```
chmod +x start-pdf-compressor.sh
```
4. 雙擊執行 `start-pdf-compressor.sh` 或在終端機中執行：
```
./start-pdf-compressor.sh
```

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

1. 啟動應用程序後，打開瀏覽器訪問：http://localhost:8080
2. 點擊「選擇檔案」按鈕，選擇要壓縮的 PDF 文件
3. 點擊「壓縮 PDF」按鈕
4. 等待處理完成後，壓縮後的 PDF 文件會自動下載

## 技術細節 / Technical Details

- 框架 / Framework: Spring Boot 3.2.0
- PDF 處理庫 / PDF Library: Apache PDFBox 3.0.1
- 壓縮方式 / Compression Method:
  - 圖片品質 / Image Quality: 50%
  - 輸出 DPI: 150

## 注意事項 / Notes

- 處理大型文件可能需要較長時間
- 建議保留原始文件的備份
- 某些 PDF 可能因特殊字體而出現警告訊息，但不影響功能

---

處理大型文件時建議增加 Java 堆內存，可使用以下命令：
For large files, it's recommended to increase Java heap memory using:
```
java -Xmx4g -jar pdf-compressor-1.0.0.jar
```

## 啟動腳本功能 / Startup Scripts Features

- 自動檢查 Java 環境
- 自動配置 4GB 記憶體空間
- 自動開啟默認瀏覽器
- 提供友善的使用者介面
- 支援中文檔案名稱
- 適配 Windows/macOS/Linux 系統
