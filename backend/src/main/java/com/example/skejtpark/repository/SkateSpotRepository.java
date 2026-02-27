package com.example.skejtpark.repository;

import com.example.skejtpark.model.SkateSpot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkateSpotRepository extends JpaRepository<SkateSpot, Long> {
}
