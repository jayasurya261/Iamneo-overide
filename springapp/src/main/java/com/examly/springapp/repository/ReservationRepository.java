package com.examly.springapp.repository;

import com.examly.springapp.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByRestaurant_IdAndReservationDate(Long restaurantId, LocalDate reservationDate);
}