package com.examly.springapp.model;

import jakarta.persistence.*;
import java.time.LocalTime;

@Entity
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String address;
    private String cuisine;
    private LocalTime openingTime;
    private LocalTime closingTime;
    private int totalTables;

    // Constructors
    public Restaurant() {}

    public Restaurant(Long id, String name, String address, String cuisine, LocalTime openingTime,
                      LocalTime closingTime, int totalTables) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.cuisine = cuisine;
        this.openingTime = openingTime;
        this.closingTime = closingTime;
        this.totalTables = totalTables;
    }

    // Getters and Setters
    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public String getAddress() { return address; }

    public void setAddress(String address) { this.address = address; }

    public String getCuisine() { return cuisine; }

    public void setCuisine(String cuisine) { this.cuisine = cuisine; }

    public LocalTime getOpeningTime() { return openingTime; }

    public void setOpeningTime(LocalTime openingTime) { this.openingTime = openingTime; }

    public LocalTime getClosingTime() { return closingTime; }

    public void setClosingTime(LocalTime closingTime) { this.closingTime = closingTime; }

    public int getTotalTables() { return totalTables; }

    public void setTotalTables(int totalTables) { this.totalTables = totalTables; }
}