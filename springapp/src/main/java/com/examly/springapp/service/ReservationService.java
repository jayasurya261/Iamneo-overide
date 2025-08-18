package com.examly.springapp.service;

import com.examly.springapp.model.*;
import com.examly.springapp.repository.ReservationRepository;
import com.examly.springapp.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    public Reservation createReservation(Reservation reservation, Long restaurantId) {
        // Verify restaurant exists and get opening hours for validation
        Restaurant restaurant = restaurantRepository.findById(restaurantId).orElse(null);
        if (restaurant == null) return null;

        // Validate reservation time against restaurant hours
        if (reservation.getReservationTime().isBefore(restaurant.getOpeningTime())
                || reservation.getReservationTime().isAfter(restaurant.getClosingTime())) {
            throw new IllegalArgumentException("Reservation time must be within restaurant opening hours");
        }

        // Set restaurant ID instead of restaurant object
        reservation.setRestaurantId(restaurantId);
        reservation.setStatus(ReservationStatus.PENDING);
        return reservationRepository.save(reservation);
    }

    public Reservation getReservation(Long id) {
        return reservationRepository.findById(id).orElse(null);
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public List<Reservation> getReservationsByRestaurantId(Long restaurantId) {
        return reservationRepository.findByRestaurantId(restaurantId);
    }

    public Reservation updateReservationStatus(Long id, ReservationStatus status) {
        Reservation reservation = reservationRepository.findById(id).orElse(null);
        if (reservation == null) return null;
        reservation.setStatus(status);
        return reservationRepository.save(reservation);
    }

    public void cancelReservation(Long id) {
        reservationRepository.deleteById(id);
    }

    // Additional helper method to get restaurant details if needed
    public Restaurant getRestaurantForReservation(Long reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId).orElse(null);
        if (reservation == null || reservation.getRestaurantId() == null) {
            return null;
        }
        return restaurantRepository.findById(reservation.getRestaurantId()).orElse(null);
    }
}