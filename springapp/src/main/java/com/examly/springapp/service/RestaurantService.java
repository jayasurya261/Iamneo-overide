package com.examly.springapp.service;

import com.examly.springapp.model.Restaurant;
import com.examly.springapp.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    public Restaurant createRestaurant(Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }

    public Restaurant getRestaurant(Long id) {
        return restaurantRepository.findById(id).orElse(null);
    }

    public Restaurant updateRestaurant(Long id, Restaurant updated) {
        updated.setId(id);
        return restaurantRepository.save(updated);
    }

    public void deleteRestaurant(Long id) {
        restaurantRepository.deleteById(id);
    }

    public List<Restaurant> getRestaurantsByCuisine(String cuisine) {
        return restaurantRepository.findByCuisine(cuisine);
    }

    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }
}
