package com.examly.springapp.controller;

import com.examly.springapp.model.Reservation;
import com.examly.springapp.model.ReservationStatus;
import com.examly.springapp.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @PostMapping
    public ResponseEntity<Reservation> createReservation(@RequestBody ReservationDTO reservationDTO) {
        Reservation reservation = new Reservation();
        reservation.setCustomerName(reservationDTO.getCustomerName());
        reservation.setCustomerEmail(reservationDTO.getCustomerEmail());
        reservation.setCustomerPhone(reservationDTO.getCustomerPhone());
        reservation.setReservationDate(LocalDate.parse(reservationDTO.getReservationDate()));
        reservation.setReservationTime(LocalTime.parse(reservationDTO.getReservationTime()));
        reservation.setPartySize(reservationDTO.getPartySize());
        reservation.setSpecialRequests(reservationDTO.getSpecialRequests());

        Reservation saved = reservationService.createReservation(reservation, reservationDTO.getRestaurantId());
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<List<Reservation>> getAllReservations() {
        return ResponseEntity.ok(reservationService.getAllReservations());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Reservation> updateReservationStatus(@PathVariable Long id, @RequestBody String status) {
        ReservationStatus reservationStatus = ReservationStatus.valueOf(status);
        return ResponseEntity.ok(reservationService.updateReservationStatus(id, reservationStatus));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelReservation(@PathVariable Long id) {
        reservationService.cancelReservation(id);
        return ResponseEntity.noContent().build();
    }
}
