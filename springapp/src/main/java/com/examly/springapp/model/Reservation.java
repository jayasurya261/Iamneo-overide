package com.examly.springapp.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
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

    // Default constructor
    public Reservation() {}

    // All-arguments constructor
    public Reservation(Long id, Restaurant restaurant, String customerName, String customerEmail,
                       String customerPhone, LocalDate reservationDate, LocalTime reservationTime,
                       int partySize, ReservationStatus status, String specialRequests) {
        this.id = id;
        this.restaurant = restaurant;
        this.customerName = customerName;
        this.customerEmail = customerEmail;
        this.customerPhone = customerPhone;
        this.reservationDate = reservationDate;
        this.reservationTime = reservationTime;
        this.partySize = partySize;
        this.status = status;
        this.specialRequests = specialRequests;
    }

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }

    public LocalDate getReservationDate() {
        return reservationDate;
    }

    public void setReservationDate(LocalDate reservationDate) {
        this.reservationDate = reservationDate;
    }

    public LocalTime getReservationTime() {
        return reservationTime;
    }

    public void setReservationTime(LocalTime reservationTime) {
        this.reservationTime = reservationTime;
    }

    public int getPartySize() {
        return partySize;
    }

    public void setPartySize(int partySize) {
        this.partySize = partySize;
    }

    public ReservationStatus getStatus() {
        return status;
    }

    public void setStatus(ReservationStatus status) {
        this.status = status;
    }

    public String getSpecialRequests() {
        return specialRequests;
    }

    public void setSpecialRequests(String specialRequests) {
        this.specialRequests = specialRequests;
    }

    @Override
    public String toString() {
        return "Reservation{" +
                "id=" + id +
                ", restaurant=" + (restaurant != null ? restaurant.getId() : null) +
                ", customerName='" + customerName + '\'' +
                ", customerEmail='" + customerEmail + '\'' +
                ", customerPhone='" + customerPhone + '\'' +
                ", reservationDate=" + reservationDate +
                ", reservationTime=" + reservationTime +
                ", partySize=" + partySize +
                ", status=" + status +
                ", specialRequests='" + specialRequests + '\'' +
                '}';
    }
}
