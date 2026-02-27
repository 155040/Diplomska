package com.example.skejtpark.repository;

import com.example.skejtpark.model.SkateShop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkateShopRepository extends JpaRepository<SkateShop, Long> {
}
