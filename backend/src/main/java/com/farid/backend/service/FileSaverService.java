package com.farid.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileSaverService {
    @Value("${file.upload-dir}")
    private String uploadDir;
    public String saveFileToSystem(MultipartFile file) throws IOException {
        // Create the directory if it doesn't exist
        Path path = Paths.get(uploadDir);
       String newPath = UUID.randomUUID() + file.getOriginalFilename();
        // Save the file locally
        Path filePath = path.resolve(newPath);
        Files.write(filePath, file.getBytes());
        return filePath.getFileName().toString();
    }
}
