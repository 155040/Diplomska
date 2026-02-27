package com.example.skejtpark.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/image")
public class ImageController {

    private final Path imageFolder = Paths.get("uploaded-images");

    public ImageController() throws IOException {
        if (!Files.exists(imageFolder)) {
            Files.createDirectories(imageFolder);
        }
    }

    @GetMapping
    public ResponseEntity<List<String>> findAll() {
        try {
            if (!Files.exists(imageFolder)) {
                return ResponseEntity.ok(List.of());
            }

            List<String> fileNames = Files.list(imageFolder)
                    .filter(Files::isRegularFile)
                    .map(path -> path.getFileName().toString())
                    .collect(Collectors.toList());

            return ResponseEntity.ok(fileNames);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Map<String, String>>> getAllImagesWithBytes() {
        try {
            if (!Files.exists(imageFolder)) {
                return ResponseEntity.ok(List.of());
            }

            List<Map<String, String>> images = Files.list(imageFolder)
                    .filter(Files::isRegularFile)
                    .map(path -> {
                        try {
                            byte[] bytes = Files.readAllBytes(path);
                            String base64 = Base64.getEncoder().encodeToString(bytes);
                            return Map.of(
                                    "filename", path.getFileName().toString(),
                                    "image", base64
                            );
                        } catch (IOException e) {
                            // skip files that can't be read
                            return null;
                        }
                    })
                    .filter(m -> m != null)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(images);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("No file selected");
        }

        String contentType = file.getContentType();
        if (!contentType.startsWith("image/")) {
            return ResponseEntity.badRequest().body("File is not an image");
        }

        try {
            Path destination = imageFolder.resolve(file.getOriginalFilename());
            Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);
            return ResponseEntity.ok("Image uploaded successfully: " + file.getOriginalFilename());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Could not upload the image: " + e.getMessage());
        }
    }

    @DeleteMapping("/{filename}")
    public ResponseEntity<String> remove(@PathVariable String filename) {
        try {
            Path filePath = imageFolder.resolve(filename);
            if (!Files.exists(filePath) || !Files.isRegularFile(filePath)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Image not found: " + filename);
            }
            Files.delete(filePath);
            return ResponseEntity.ok("Image deleted successfully: " + filename);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Could not delete the image: " + e.getMessage());
        }
    }
}
