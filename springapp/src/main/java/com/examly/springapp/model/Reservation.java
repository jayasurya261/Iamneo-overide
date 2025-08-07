package com.examly.springapp.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data

@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;

    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private LocalDate reservationDate;
    private LocalTime reservationTime;
    private int partySize;

    @Enumerated(EnumType.STRING)
    private ReservationStatus status;

    private String specialRequests;
}