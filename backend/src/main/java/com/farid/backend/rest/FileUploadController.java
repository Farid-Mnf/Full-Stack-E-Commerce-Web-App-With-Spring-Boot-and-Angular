package com.farid.backend.rest;

import com.farid.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;
@RequiredArgsConstructor
@RestController
@RequestMapping("/files")
public class FileUploadController {
    private final UserService userService;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @PostMapping("/user/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("userId") UUID id) {
        try {
            // Create the directory if it doesn't exist
            Path path = Paths.get(uploadDir);
            if (!Files.exists(path)) {
                Files.createDirectories(path);
            }
            String newPath = UUID.randomUUID() + file.getOriginalFilename();

            // Save the file locally
            Path filePath = path.resolve(newPath);
            Files.write(filePath, file.getBytes());

            String returnedImageName = filePath.getFileName().toString();
            userService.updateUserImage(returnedImageName, id);

            return new ResponseEntity<>(returnedImageName, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Could not upload file", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
