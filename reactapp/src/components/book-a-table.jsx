import React, { useState, useEffect } from "react";

// BasicDateTimePicker component (using native Date instead of dayjs)
const BasicDateTimePicker = ({ value, onChange }) => {
  const handleDateTimeChange = (e) => {
    if (e.target.value) {
      const dateValue = new Date(e.target.value);
      onChange(dateValue);
    } else {
      onChange(null);
    }
  };

  const formatValue = () => {
    if (value && value instanceof Date && !isNaN(value)) {
      // Format to YYYY-MM-DDTHH:mm for datetime-local input
      const year = value.getFullYear();
      const month = String(value.getMonth() + 1).padStart(2, '0');
      const day = String(value.getDate()).padStart(2, '0');
      const hours = String(value.getHours()).padStart(2, '0');
      const minutes = String(value.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    }
    return '';
  };

  const getMinDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <input
      type="datetime-local"
      value={formatValue()}
      onChange={handleDateTimeChange}
      className="w-full bg-neutral-900 text-white px-4 py-2 rounded-md focus:outline-none"
      min={getMinDateTime()}
    />
  );
};

const BookATable = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    restaurantId: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    dateTime: null,
    partySize: "",
    specialRequests: ""
  });

  // Fetch restaurants on component mount
  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('http://localhost:8080/api/restaurants');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setRestaurants(data);
    } catch (err) {
      setError('Failed to load restaurants. Please try again.');
      console.error('Error fetching restaurants:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateTimeChange = (newValue) => {
    if (newValue && newValue instanceof Date && !isNaN(newValue)) {
      setFormData({ ...formData, dateTime: newValue });
    } else {
      setFormData({ ...formData, dateTime: null });
    }
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10), parseInt(minutes, 10));
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
  };

  const formatDateForAPI = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatTimeForAPI = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const getSelectedRestaurant = () => {
    return restaurants.find(r => r.id === parseInt(formData.restaurantId));
  };

  const isTimeWithinHours = (selectedDateTime, openingTime, closingTime) => {
    const selectedTime = formatTimeForAPI(selectedDateTime);
    return selectedTime >= openingTime && selectedTime <= closingTime;
  };

  const handleSubmit = async () => {
    if (!formData.restaurantId) {
      alert("Please select a restaurant");
      return;
    }

    if (!formData.customerName.trim()) {
      alert("Please enter your name");
      return;
    }

    if (!formData.customerEmail.trim()) {
      alert("Please enter your email");
      return;
    }

    if (!formData.customerPhone.trim()) {
      alert("Please enter your phone number");
      return;
    }

    if (!formData.partySize || parseInt(formData.partySize) < 1) {
      alert("Please enter a valid number of guests");
      return;
    }

    if (!formData.dateTime || !(formData.dateTime instanceof Date) || isNaN(formData.dateTime)) {
      alert("Please select a valid date and time");
      return;
    }

    // Check if selected time is within restaurant hours
    const selectedRestaurant = getSelectedRestaurant();
    if (selectedRestaurant) {
      if (!isTimeWithinHours(formData.dateTime, selectedRestaurant.openingTime, selectedRestaurant.closingTime)) {
        alert(`Please select a time between ${formatTime(selectedRestaurant.openingTime)} and ${formatTime(selectedRestaurant.closingTime)}`);
        return;
      }
    }

    const payload = {
      restaurantId: parseInt(formData.restaurantId, 10),
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      reservationDate: formatDateForAPI(formData.dateTime),
      reservationTime: formatTimeForAPI(formData.dateTime),
      partySize: parseInt(formData.partySize, 10),
      specialRequests: formData.specialRequests
    };

    try {
      setSubmitting(true);
      const res = await fetch("http://localhost:8080/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("Reservation booked successfully!");
        setFormData({
          restaurantId: "",
          customerName: "",
          customerEmail: "",
          customerPhone: "",
          dateTime: null,
          partySize: "",
          specialRequests: ""
        });
      } else {
        const errorData = await res.text();
        alert(`Failed to book reservation: ${errorData}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to server");
    } finally {
      setSubmitting(false);
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
            <div className="min-w-full space-y-5">
              
              {/* Restaurant Selection */}
              <div>
                <label className="block text-sm text-yellow-100 mb-1">Select Restaurant</label>
                {loading ? (
                  <div className="w-full bg-neutral-900 text-gray-400 px-4 py-2 rounded-md">
                    Loading restaurants...
                  </div>
                ) : error ? (
                  <div className="w-full bg-red-900 text-red-200 px-4 py-2 rounded-md text-sm">
                    {error}
                    <button
                      type="button"
                      onClick={fetchRestaurants}
                      className="ml-2 text-red-100 underline hover:text-white"
                    >
                      Retry
                    </button>
                  </div>
                ) : (
                  <select
                    name="restaurantId"
                    value={formData.restaurantId}
                    onChange={handleChange}
                    className="w-full bg-neutral-900 text-white px-4 py-2 rounded-md focus:outline-none"
                    required
                  >
                    <option value="">Choose a restaurant</option>
                    {restaurants.map((restaurant) => (
                      <option key={restaurant.id} value={restaurant.id}>
                        {restaurant.name} - {restaurant.cuisine} ({restaurant.address})
                      </option>
                    ))}
                  </select>
                )}
                
                {/* Restaurant Details */}
                {formData.restaurantId && getSelectedRestaurant() && (
                  <div className="mt-2 p-3 bg-neutral-800 rounded-md">
                    <div className="text-sm text-yellow-100">
                      <p><strong>Address:</strong> {getSelectedRestaurant().address}</p>
                      <p><strong>Cuisine:</strong> {getSelectedRestaurant().cuisine}</p>
                      <p><strong>Hours:</strong> {formatTime(getSelectedRestaurant().openingTime)} - {formatTime(getSelectedRestaurant().closingTime)}</p>
                      <p><strong>Available Tables:</strong> {getSelectedRestaurant().totalTables}</p>
                    </div>
                  </div>
                )}
              </div>

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
                {formData.restaurantId && getSelectedRestaurant() && (
                  <p className="text-xs text-gray-400 mt-1">
                    Restaurant hours: {formatTime(getSelectedRestaurant().openingTime)} - {formatTime(getSelectedRestaurant().closingTime)}
                  </p>
                )}
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
                  min="1"
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
                onClick={handleSubmit}
                disabled={loading || submitting}
                className="w-full bg-yellow-200 text-black font-medium py-3 rounded-md hover:bg-yellow-300 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
              >
                {submitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                    Booking...
                  </div>
                ) : loading ? (
                  'Loading...'
                ) : (
                  'BOOK A TABLE'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookATable;