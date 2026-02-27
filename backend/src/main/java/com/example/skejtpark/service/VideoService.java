package com.example.skejtpark.service;

import com.example.skejtpark.model.Video;
import com.example.skejtpark.repository.VideoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VideoService {

    private final VideoRepository videoRepository;

    public VideoService(VideoRepository videoRepository) {
        this.videoRepository = videoRepository;
    }

    public List<Video> findAll() {
        return videoRepository.findAll();
    }

    public void add(String url) {
        Video video = new Video(url);
        videoRepository.save(video);
    }

    public void delete(Long id) {
        videoRepository.deleteById(id);
    }
}
