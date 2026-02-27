package com.example.skejtpark.controller;

import com.example.skejtpark.dto.SkateSpotDto;
import com.example.skejtpark.model.SkateSpot;
import com.example.skejtpark.service.SkateSpotService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skate-spot")
public class SkateSpotController {

    private final SkateSpotService skateSpotService;

    public SkateSpotController(SkateSpotService skateSpotService) {
        this.skateSpotService = skateSpotService;
    }

    @GetMapping
    public ResponseEntity<List<SkateSpot>> findAll() {
        return ResponseEntity.ok(skateSpotService.findAll());
    }

    @PostMapping
    public ResponseEntity<Void> add(@RequestBody SkateSpotDto skateSpotDto) {
        skateSpotService.add(skateSpotDto.coordinate);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> edit(@PathVariable Long id, @RequestBody SkateSpotDto skateSpotDto) throws Exception {
        skateSpotService.edit(id, skateSpotDto.coordinate);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        skateSpotService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
