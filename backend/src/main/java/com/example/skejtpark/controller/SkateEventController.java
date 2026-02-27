package com.example.skejtpark.controller;

import com.example.skejtpark.dto.SkateEventDto;
import com.example.skejtpark.model.SkateEvent;
import com.example.skejtpark.service.SkateEventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skate-event")
public class SkateEventController {

    private final SkateEventService skateEventService;

    public SkateEventController(SkateEventService skateEventService) {
        this.skateEventService = skateEventService;
    }

    @GetMapping
    public ResponseEntity<List<SkateEvent>> findAll() {
        return ResponseEntity.ok(skateEventService.findAll());
    }

    @PostMapping
    public ResponseEntity<Void> add(@RequestBody SkateEventDto skateEventDto) {
        skateEventService.add(
                skateEventDto.name,
                skateEventDto.description,
                skateEventDto.location,
                skateEventDto.date
        );
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> edit(@PathVariable Long id, @RequestBody SkateEventDto skateEventDto) throws Exception {
        skateEventService.edit(
                id,
                skateEventDto.name,
                skateEventDto.description,
                skateEventDto.location,
                skateEventDto.date
        );
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        skateEventService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
