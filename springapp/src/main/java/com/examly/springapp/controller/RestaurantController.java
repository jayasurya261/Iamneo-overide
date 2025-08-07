package com.examly.springapp.controller;

import com.examly.springapp.model.Restaurant;
import com.examly.springapp.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @PostMapping
    public ResponseEntity<Restaurant> createRestaurant(@RequestBody RestaurantDTO restaurantDTO) {
        Restaurant restaurant = Restaurant.builder()
                .name(restaurantDTO.getName())
                .address(restaurantDTO.getAddress())
                .cuisine(restaurantDTO.getCuisine())
                .openingTime(LocalTime.parse(restaurantDTO.getOpeningTime()))
                .closingTime(LocalTime.parse(restaurantDTO.getClosingTime()))
                .totalTables(restaurantDTO.getTotalTables())
                .build();
        Restaurant saved = restaurantService.createRestaurant(restaurant);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<List<Restaurant>> getAllRestaurants() {
        return ResponseEntity.ok(restaurantService.getAllRestaurants());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Restaurant> getRestaurantById(@PathVariable Long id) {
        return ResponseEntity.ok(restaurantService.getRestaurantById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Restaurant>> searchByCuisine(@RequestParam String cuisine) {
        return ResponseEntity.ok(restaurantService.searchByCuisine(cuisine));
    }
}

class RestaurantDTO {
    private String name;
    private String address;
    private String cuisine;
    private String openingTime;
    private String closingTime;
    private int totalTables;

    // Getters and setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getCuisine() { return cuisine; }
    public void setCuisine(String cuisine) { this.cuisine = cuisine; }
    public String getOpeningTime() { return openingTime; }
    public void setOpeningTime(String openingTime) { this.openingTime = openingTime; }
    public String getClosingTime() { return closingTime; }
    public void setClosingTime(String closingTime) { this.closingTime = closingTime; }
    public int getTotalTables() { return totalTables; }
    public void setTotalTables(int totalTables) { this.totalTables = totalTables; }
}