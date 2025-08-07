package com.examly.springapp.service;

import com.examly.springapp.exception.ResourceNotFoundException;
import com.examly.springapp.model.Reservation;
import com.examly.springapp.model.ReservationStatus;
import com.examly.springapp.model.Restaurant;
import com.examly.springapp.repository.ReservationRepository;
import com.examly.springapp.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    public Reservation createReservation(Reservation reservation, Long restaurantId) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found with id: " + restaurantId));

        // Check if reservation time is within restaurant's operating hours
        if (reservation.getReservationTime().isBefore(restaurant.getOpeningTime()) ||
                reservation.getReservationTime().isAfter(restaurant.getClosingTime())) {
            throw new IllegalArgumentException("Reservation time is outside restaurant operating hours");
        }

        // Check table availability (simplified: assume partySize <= totalTables)
        List<Reservation> existingReservations = reservationRepository
                .findByRestaurant_IdAndReservationDate(restaurantId, reservation.getReservationDate());
        int reservedTables = existingReservations.stream().mapToInt(Reservation::getPartySize).sum();
        if (reservedTables + reservation.getPartySize() > restaurant.getTotalTables()) {
            throw new IllegalArgumentException("No tables available for the requested party size");
        }

        reservation.setRestaurant(restaurant);
        reservation.setStatus(ReservationStatus.PENDING);
        return reservationRepository.save(reservation);
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Reservation updateReservationStatus(Long reservationId, ReservationStatus status) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found with id: " + reservationId));
        reservation.setStatus(status);
        return reservationRepository.save(reservation);
    }

    public void cancelReservation(Long reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found with id: " + reservationId));
        reservationRepository.delete(reservation);
    }
}