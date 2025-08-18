import React, { useState } from "react";
import BasicDateTimePicker from "./ui/BasicDatetimePicker";
import dayjs from "dayjs";

const BookATable = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    dateTime: null, // Will store date + time from picker
    partySize: "",
    specialRequests: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateTimeChange = (newValue) => {
    if (newValue && dayjs(newValue).isValid()) {
      setFormData({ ...formData, dateTime: newValue });
    } else {
      setFormData({ ...formData, dateTime: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.dateTime || !dayjs(formData.dateTime).isValid()) {
      alert("Please select a valid date and time");
      return;
    }

    const payload = {
      restaurantId: 1,
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      reservationDate: dayjs(formData.dateTime).format("YYYY-MM-DD"),
      reservationTime: dayjs(formData.dateTime).format("HH:mm:ss"),
      partySize: parseInt(formData.partySize, 10),
      specialRequests: formData.specialRequests
    };

    try {
      const res = await fetch("http://localhost:8080/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("Reservation booked successfully!");
        setFormData({
          customerName: "",
          customerEmail: "",
          customerPhone: "",
          dateTime: null,
          partySize: "",
          specialRequests: ""
        });
      } else {
        alert("Failed to book reservation");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to server");
    }
  };

  return (
    <div className="flex">
      {/* Left Side Image */}
      <div className="relative w-4/6">
        <img
          src="https://framerusercontent.com/images/DXQ6CScAGLm28TyBbKjUbd6nwQ.png"
          alt="booking table img"
          className="max-h-screen w-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-white text-7xl px-6 py-3 rounded-lg font-playfair font-thin">
            BOOK A TABLE
          </h2>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-2/3 flex justify-center bg-black">
        <div className="w-full px-10">
          <h1 className="text-2xl font-thin font-playfair text-[#e6dab8] lg:pt-5">
            RESERVATION TABLE
          </h1>

          <div className="lg:pt-5 bg-black flex items-center justify-center">
            <form className="min-w-full space-y-5" onSubmit={handleSubmit}>
              {/* Name */}
              <div>
                <label className="block text-sm text-yellow-100 mb-1">Name</label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-neutral-900 text-white px-4 py-2 rounded-md focus:outline-none"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm text-yellow-100 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  placeholder="+1 234 567 8901"
                  className="w-full bg-neutral-900 text-white px-4 py-2 rounded-md focus:outline-none"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-yellow-100 mb-1">Email Address</label>
                <input
                  type="email"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  placeholder="johndoe@example.com"
                  className="w-full bg-neutral-900 text-white px-4 py-2 rounded-md focus:outline-none"
                  required
                />
              </div>

              {/* Date & Time */}
              <div>
                <label className="block text-sm text-yellow-100 mb-1">Date & Time</label>
                <BasicDateTimePicker
                  value={formData.dateTime}
                  onChange={handleDateTimeChange}
                />
              </div>

              {/* Guests */}
              <div>
                <label className="block text-sm text-yellow-100 mb-1">Number of Guests</label>
                <input
                  type="number"
                  name="partySize"
                  value={formData.partySize}
                  onChange={handleChange}
                  placeholder="Enter Count"
                  className="w-full bg-neutral-900 text-white px-4 py-2 rounded-md focus:outline-none"
                  required
                />
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-sm text-yellow-100 mb-1">Special Requests</label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  placeholder="Celebrating a birthday, please prepare a small dessert with a candle."
                  className="w-full bg-neutral-900 text-white px-4 py-2 rounded-md focus:outline-none"
                  rows="3"
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-yellow-200 text-black font-medium py-3 rounded-md hover:bg-yellow-300 transition"
              >
                BOOK A TABLE
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookATable;
