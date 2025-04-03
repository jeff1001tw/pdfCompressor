package com.pdfcompressor.service;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.graphics.image.JPEGFactory;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
public class PdfCompressionService {
    
    // Default values
    private static final float DEFAULT_COMPRESSION_QUALITY = 0.5f; // Default compression quality (0.0-1.0)
    private static final int DEFAULT_DPI = 150; // Default DPI for smaller file size
    
    /**
     * 壓縮 PDF 檔案
     * @param file 要壓縮的 PDF 檔案
     * @return 壓縮後的 PDF 檔案二進位資料
     */
    public byte[] compressPdf(MultipartFile file) throws IOException {
        return compressPdf(file, DEFAULT_COMPRESSION_QUALITY, DEFAULT_DPI);
    }
    
    /**
     * 壓縮 PDF 檔案，並自訂壓縮參數
     * @param file 要壓縮的 PDF 檔案
     * @param compressionQuality 壓縮品質 (0.0-1.0)
     * @param dpi 輸出圖像解析度 (DPI)
     * @return 壓縮後的 PDF 檔案二進位資料
     */
    public byte[] compressPdf(MultipartFile file, float compressionQuality, int dpi) throws IOException {
        try (PDDocument document = Loader.loadPDF(file.getBytes());
             PDDocument compressedDoc = new PDDocument()) {
             
            PDFRenderer pdfRenderer = new PDFRenderer(document);
            
            // Process each page
            for (int pageIndex = 0; pageIndex < document.getNumberOfPages(); pageIndex++) {
                // Render page to image
                BufferedImage image = pdfRenderer.renderImageWithDPI(pageIndex, dpi);
                
                // Create new page
                PDPage newPage = new PDPage(new PDRectangle(image.getWidth(), image.getHeight()));
                compressedDoc.addPage(newPage);
                
                // Convert to compressed JPEG
                PDImageXObject pdImage = JPEGFactory.createFromImage(compressedDoc, image, compressionQuality);
                
                // Draw image on page
                try (PDPageContentStream contentStream = new PDPageContentStream(compressedDoc, newPage)) {
                    contentStream.drawImage(pdImage, 0, 0, newPage.getMediaBox().getWidth(), newPage.getMediaBox().getHeight());
                }
            }
            
            // Save to byte array
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            compressedDoc.save(baos);
            return baos.toByteArray();
        } catch (IOException e) {
            throw new IOException("PDF壓縮過程中發生錯誤: " + e.getMessage(), e);
        }
    }
}