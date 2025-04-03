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
    
    private static final float COMPRESSION_QUALITY = 0.5f; // Compression quality (0.0-1.0)
    private static final int DPI = 150; // Lower DPI for smaller file size
    
    public byte[] compressPdf(MultipartFile file) throws IOException {
        try (PDDocument document = Loader.loadPDF(file.getBytes());
             PDDocument compressedDoc = new PDDocument()) {
             
            PDFRenderer pdfRenderer = new PDFRenderer(document);
            
            // Process each page
            for (int pageIndex = 0; pageIndex < document.getNumberOfPages(); pageIndex++) {
                // Render page to image
                BufferedImage image = pdfRenderer.renderImageWithDPI(pageIndex, DPI);
                
                // Create new page
                PDPage newPage = new PDPage(new PDRectangle(image.getWidth(), image.getHeight()));
                compressedDoc.addPage(newPage);
                
                // Convert to compressed JPEG
                PDImageXObject pdImage = JPEGFactory.createFromImage(compressedDoc, image, COMPRESSION_QUALITY);
                
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