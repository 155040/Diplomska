package com.example.skejtpark.model;

import jakarta.persistence.*;

@Entity
@Table
public class SkateSpot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String coordinate;

    public SkateSpot() {
    }

    public SkateSpot(String coordinate) {
        this.coordinate = coordinate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCoordinate() {
        return coordinate;
    }

    public void setCoordinate(String coordinate) {
        this.coordinate = coordinate;
    }
}
