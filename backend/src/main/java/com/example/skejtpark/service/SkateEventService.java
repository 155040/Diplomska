package com.example.skejtpark.service;

import com.example.skejtpark.model.SkateEvent;
import com.example.skejtpark.repository.SkateEventRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class SkateEventService {

    private final SkateEventRepository skateEventRepository;

    public SkateEventService(SkateEventRepository skateEventRepository) {
        this.skateEventRepository = skateEventRepository;
    }

    public List<SkateEvent> findAll() {
        return skateEventRepository.findAll();
    }

    public void add(String name, String description, String location, LocalDate date) {
        SkateEvent skateEvent = new SkateEvent(name, description, location, date);
        skateEventRepository.save(skateEvent);
    }

    public void edit(Long id, String name, String description, String location, LocalDate date) throws Exception {
        SkateEvent skateEvent = skateEventRepository.findById(id).orElseThrow(Exception::new);
        skateEvent.setName(name);
        skateEvent.setDescription(description);
        skateEvent.setLocation(location);
        skateEvent.setDate(date);
        skateEventRepository.save(skateEvent);
    }

    public void delete(Long id) {
        skateEventRepository.deleteById(id);
    }
}
