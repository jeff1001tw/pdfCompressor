package com.pdfcompressor.controller;

import com.pdfcompressor.service.PdfCompressionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import org.apache.commons.lang3.StringUtils;

@Controller
public class PdfController {

    @Autowired
    private PdfCompressionService pdfCompressionService;

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @PostMapping("/compress")
    public ResponseEntity<Resource> compressPdf(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "fileSuffix", required = false) String fileSuffix) throws IOException {
        try {
            byte[] compressedPdf = pdfCompressionService.compressPdf(file);
            ByteArrayResource resource = new ByteArrayResource(compressedPdf);

            // 如果未提供尾綴或為空白，使用預設值 "compressed"
            String suffix = StringUtils.isBlank(fileSuffix) ? "_compressed" : "_" + fileSuffix;
            String filename = file.getOriginalFilename();
            if (filename != null && filename.toLowerCase().endsWith(".pdf")) {
                String baseName = filename.substring(0, filename.lastIndexOf("."));
                filename = baseName + suffix + ".pdf";
            } else {
                filename = "compressed" + suffix + ".pdf";
            }
            
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_PDF)
                    .header(HttpHeaders.CONTENT_DISPOSITION, 
                        "attachment; filename*=UTF-8''" + URLEncoder.encode(filename, StandardCharsets.UTF_8))
                    .contentLength(compressedPdf.length)
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}