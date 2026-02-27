package com.example.skejtpark.controller;

import com.example.skejtpark.dto.SkateShopDto;
import com.example.skejtpark.model.SkateShop;
import com.example.skejtpark.service.SkateShopService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skate-shop")
public class SkateShopController {

    private final SkateShopService skateShopService;

    public SkateShopController(SkateShopService skateShopService) {
        this.skateShopService = skateShopService;
    }

    @GetMapping
    public ResponseEntity<List<SkateShop>> findAll() {
        return ResponseEntity.ok(skateShopService.findAll());
    }

    @PostMapping
    public ResponseEntity<Void> add(@RequestBody SkateShopDto skateShopDto) {
        skateShopService.add(
                skateShopDto.name,
                skateShopDto.description,
                skateShopDto.location,
                skateShopDto.url
        );
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> edit(@PathVariable Long id, @RequestBody SkateShopDto skateShopDto) throws Exception {
        skateShopService.edit(
                id,
                skateShopDto.name,
                skateShopDto.description,
                skateShopDto.location,
                skateShopDto.url
        );
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        skateShopService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
