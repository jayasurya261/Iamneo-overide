package com.examly.springapp.controller;

public class ReservationDTO {
    private Long restaurantId;
    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private String reservationDate;
    private String reservationTime;
    private int partySize;
    private String specialRequests;

    // Getters
    public Long getRestaurantId() {
        return restaurantId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public String getReservationDate() {
        return reservationDate;
    }

    public String getReservationTime() {
        return reservationTime;
    }

    public int getPartySize() {
        return partySize;
    }

    public String getSpecialRequests() {
        return specialRequests;
    }

    // Setters
    public void setRestaurantId(Long restaurantId) {
        this.restaurantId = restaurantId;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }

    public void setReservationDate(String reservationDate) {
        this.reservationDate = reservationDate;
    }

    public void setReservationTime(String reservationTime) {
        this.reservationTime = reservationTime;
    }

    public void setPartySize(int partySize) {
        this.partySize = partySize;
    }

    public void setSpecialRequests(String specialRequests) {
        this.specialRequests = specialRequests;
    }
}
