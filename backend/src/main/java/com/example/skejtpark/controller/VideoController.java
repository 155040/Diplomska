package com.example.skejtpark.controller;

import com.example.skejtpark.dto.SkateSpotDto;
import com.example.skejtpark.dto.VideoDto;
import com.example.skejtpark.model.SkateSpot;
import com.example.skejtpark.model.Video;
import com.example.skejtpark.service.VideoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/video")
public class VideoController {

    private final VideoService videoService;

    public VideoController(VideoService videoService) {
        this.videoService = videoService;
    }

    @GetMapping
    public ResponseEntity<List<Video>> findAll() {
        return ResponseEntity.ok(videoService.findAll());
    }

    @PostMapping
    public ResponseEntity<Void> add(@RequestBody VideoDto videoDto) {
        videoService.add(videoDto.url);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        videoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
