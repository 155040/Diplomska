package com.example.skejtpark.service;

import com.example.skejtpark.model.SkateSpot;
import com.example.skejtpark.repository.SkateSpotRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkateSpotService {

    private SkateSpotRepository skateSpotRepository;

    public SkateSpotService(SkateSpotRepository skateSpotRepository) {
        this.skateSpotRepository = skateSpotRepository;
    }

    public List<SkateSpot> findAll() {
        return skateSpotRepository.findAll();
    }

    public void add(String coordinate) {
        SkateSpot skateSpot = new SkateSpot(coordinate);
        skateSpotRepository.save(skateSpot);
    }

    public void edit(Long id, String coordinate) throws Exception {
        SkateSpot skateSpot = skateSpotRepository.findById(id).orElseThrow(Exception::new);
        skateSpot.setCoordinate(coordinate);
        skateSpotRepository.save(skateSpot);
    }

    public void delete(Long id) {
        skateSpotRepository.deleteById(id);
    }
}
