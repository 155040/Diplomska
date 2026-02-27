package com.example.skejtpark.service;

import com.example.skejtpark.model.SkateShop;
import com.example.skejtpark.repository.SkateShopRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkateShopService {

    private final SkateShopRepository skateShopRepository;

    public SkateShopService(SkateShopRepository skateShopRepository) {
        this.skateShopRepository = skateShopRepository;
    }

    public List<SkateShop> findAll() {
        return skateShopRepository.findAll();
    }

    public void add(String name, String description, String location, String url) {
        SkateShop skateShop = new SkateShop(name, description, location, url);
        skateShopRepository.save(skateShop);
    }

    public void edit(Long id, String name, String description, String location, String url) throws Exception {
        SkateShop skateShop = skateShopRepository.findById(id).orElseThrow(Exception::new);
        skateShop.setName(name);
        skateShop.setDescription(description);
        skateShop.setLocation(location);
        skateShop.setUrl(url);
        skateShopRepository.save(skateShop);
    }

    public void delete(Long id) {
        skateShopRepository.deleteById(id);
    }
}
