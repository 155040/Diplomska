package com.example.skejtpark.repository;

import com.example.skejtpark.model.SkateEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkateEventRepository extends JpaRepository<SkateEvent, Long> {
}
