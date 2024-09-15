package com.farid.backend.rest;

import com.farid.backend.service.FileSaverService;
import com.farid.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;
@RequiredArgsConstructor
@RestController
@RequestMapping("/files")
public class FileUploadController {
    private final UserService userService;
    private final FileSaverService fileSaverService;
    @PostMapping("/user/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("userId") UUID id) {
        try {
            String returnedImageName = fileSaverService.saveFileToSystem(file);
            userService.updateUserImage(returnedImageName, id);
            return new ResponseEntity<>(returnedImageName, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Could not upload file", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
