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
@CrossOrigin(origins = {"http://localhost:3000", "https://myfrontend.com"})
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
    @CrossOrigin(origins = {"http://localhost:3000", "https://myfrontend.com"})
    @GetMapping
    public ResponseEntity<List<Reservation>> getAllReservations() {
        return ResponseEntity.ok(reservationService.getAllReservations());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reservation> getReservationById(@PathVariable Long id) {
        Reservation reservation = reservationService.getReservation(id);
        if (reservation == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(reservation);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Reservation> updateReservationStatus(@PathVariable Long id, @RequestBody String status) {
        ReservationStatus reservationStatus = ReservationStatus.valueOf(status);
        Reservation updated = reservationService.updateReservationStatus(id, reservationStatus);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelReservation(@PathVariable Long id) {
        reservationService.cancelReservation(id);
        return ResponseEntity.noContent().build();
    }
}