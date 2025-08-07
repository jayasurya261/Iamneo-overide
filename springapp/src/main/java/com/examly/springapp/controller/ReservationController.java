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
        Reservation reservation = Reservation.builder()
                .customerName(reservationDTO.getCustomerName())
                .customerEmail(reservationDTO.getCustomerEmail())
                .customerPhone(reservationDTO.getCustomerPhone())
                .reservationDate(LocalDate.parse(reservationDTO.getReservationDate()))
                .reservationTime(LocalTime.parse(reservationDTO.getReservationTime()))
                .partySize(reservationDTO.getPartySize())
                .specialRequests(reservationDTO.getSpecialRequests())
                .build();
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

class ReservationDTO {
    private Long restaurantId;
    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private String reservationDate;
    private String reservationTime;
    private int partySize;
    private String specialRequests;

    // Getters and setters
    public Long getRestaurantId() { return restaurantId; }
    public void setRestaurantId(Long restaurantId) { this.restaurantId = restaurantId; }
    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public String getCustomerEmail() { return customerEmail; }
    public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }
    public String getCustomerPhone() { return customerPhone; }
    public void setCustomerPhone(String customerPhone) { this.customerPhone = customerPhone; }
    public String getReservationDate() { return reservationDate; }
    public void setReservationDate(String reservationDate) { this.reservationDate = reservationDate; }
    public String getReservationTime() { return reservationTime; }
    public void setReservationTime(String reservationTime) { this.reservationTime = reservationTime; }
    public int getPartySize() { return partySize; }
    public void setPartySize(int partySize) { this.partySize = partySize; }
    public String getSpecialRequests() { return specialRequests; }
    public void setSpecialRequests(String specialRequests) { this.specialRequests = specialRequests; }
}