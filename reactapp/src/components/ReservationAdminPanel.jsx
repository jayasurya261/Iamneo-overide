import React, { useState, useEffect } from 'react';
import { Search, Edit3, Trash2, Plus, Calendar, Clock, Users, Phone, Mail, MessageSquare, X, Check } from 'lucide-react';

// Restaurant Registration Form Component
const RestaurantRegistrationForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    cuisine: '',
    openingTime: '',
    closingTime: '',
    totalTables: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      const submitData = {
        ...formData,
        totalTables: parseInt(formData.totalTables, 10)
      };

      const response = await fetch('http://localhost:8080/api/restaurants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Registration successful:', result);
      
      setSuccess(true);
      // Reset form after 2 seconds and close
      setTimeout(() => {
        setFormData({
          name: '',
          address: '',
          cuisine: '',
          openingTime: '',
          closingTime: '',
          totalTables: ''
        });
        setSuccess(false);
        onClose();
      }, 2000);

    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      address: '',
      cuisine: '',
      openingTime: '',
      closingTime: '',
      totalTables: ''
    });
    setError('');
    setSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={handleCancel}
      />
      
      {/* Form Container */}
      <div 
        className={`fixed top-0 left-0 h-full w-1/2 bg-gray-900 z-50 transform transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-white">Restaurant Registration</h2>
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-white transition-colors p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {/* Restaurant Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Restaurant Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter restaurant name"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Enter complete address"
                />
              </div>

              {/* Cuisine */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Cuisine Type
                </label>
                <select
                  name="cuisine"
                  value={formData.cuisine}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select cuisine type</option>
                  <option value="Italian">Italian</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Indian">Indian</option>
                  <option value="Mexican">Mexican</option>
                  <option value="Japanese">Japanese</option>
                  <option value="American">American</option>
                  <option value="Thai">Thai</option>
                  <option value="French">French</option>
                  <option value="Mediterranean">Mediterranean</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Opening Hours */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Opening Time
                  </label>
                  <input
                    type="time"
                    name="openingTime"
                    value={formData.openingTime}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Closing Time
                  </label>
                  <input
                    type="time"
                    name="closingTime"
                    value={formData.closingTime}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Total Tables */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Total Tables
                </label>
                <input
                  type="number"
                  name="totalTables"
                  value={formData.totalTables}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter number of tables"
                />
              </div>

              {/* Success Message */}
              {success && (
                <div className="bg-green-900 border border-green-600 text-green-200 px-4 py-3 rounded-lg">
                  ✅ Restaurant registered successfully! Closing form...
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-900 border border-red-600 text-red-200 px-4 py-3 rounded-lg">
                  ❌ {error}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-gray-700">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.name || !formData.address || !formData.cuisine || !formData.openingTime || !formData.closingTime || !formData.totalTables}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Registering...
                    </div>
                  ) : (
                    'Register Restaurant'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Main Reservation Admin Panel Component
const ReservationAdminPanel = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRegistrationFormOpen, setIsRegistrationFormOpen] = useState(false);

  const [filteredReservations, setFilteredReservations] = useState(reservations);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [editingReservation, setEditingReservation] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Fetch reservations from API
  const fetchReservations = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:8080/api/reservations');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setReservations(data);
    } catch (err) {
      setError(`Failed to fetch reservations: ${err.message}`);
      console.error('Error fetching reservations:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load reservations on component mount
  useEffect(() => {
    fetchReservations();
  }, []);

  // Filter reservations based on search and date
  useEffect(() => {
    let filtered = reservations.filter(reservation => {
      const matchesSearch = reservation.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           reservation.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           reservation.customerPhone.includes(searchTerm);
      
      const matchesDate = selectedDate === '' || reservation.reservationDate === selectedDate;
      
      return matchesSearch && matchesDate;
    });
    setFilteredReservations(filtered);
  }, [searchTerm, selectedDate, reservations]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(hours, minutes);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
  };

  const handleEdit = (reservation) => {
    setEditingReservation(reservation.id);
    setEditForm({ ...reservation });
  };

  const handleSaveEdit = () => {
    // Here you would make an API call to update the reservation
    // For demo purposes, we'll update the local state
    setReservations(prev => 
      prev.map(res => res.id === editingReservation ? editForm : res)
    );
    setEditingReservation(null);
    setEditForm({});
  };

  const handleCancelEdit = () => {
    setEditingReservation(null);
    setEditForm({});
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/reservations/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Remove from local state on successful deletion
      setReservations(prev => prev.filter(res => res.id !== id));
      setShowDeleteConfirm(null);
      
      // Show success message (you can add a toast notification here)
      console.log(`Reservation ${id} deleted successfully`);
      
    } catch (err) {
      console.error('Error deleting reservation:', err);
      setError(`Failed to delete reservation: ${err.message}`);
      // Keep the confirmation dialog open on error
    }
  };

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Reservations Admin</h1>
              <p className="text-gray-600 mt-1">Manage restaurant reservations</p>
              {loading && <p className="text-sm text-blue-600 mt-1">Loading reservations...</p>}
              {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
            </div>
            <div className="flex gap-3">
              <button 
                onClick={fetchReservations}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                disabled={loading}
              >
                <Search className="w-4 h-4" />
                Refresh
              </button>
              <button 
                onClick={() => setIsRegistrationFormOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Restaurant
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="date"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Reservations Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading reservations...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-500 text-xl mb-4">⚠️</div>
              <h3 className="text-lg font-medium text-gray-900">Error Loading Reservations</h3>
              <p className="mt-2 text-sm text-gray-500">{error}</p>
              <button 
                onClick={fetchReservations}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Party Size</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Special Requests</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReservations.map((reservation) => (
                  <tr key={reservation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingReservation === reservation.id ? (
                        <input
                          type="text"
                          value={editForm.customerName}
                          onChange={(e) => handleInputChange('customerName', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                      ) : (
                        <div className="text-sm font-medium text-gray-900">{reservation.customerName}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingReservation === reservation.id ? (
                        <div className="space-y-1">
                          <input
                            type="email"
                            value={editForm.customerEmail}
                            onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                          />
                          <input
                            type="tel"
                            value={editForm.customerPhone}
                            onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                          />
                        </div>
                      ) : (
                        <div>
                          <div className="text-sm text-gray-900 flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {reservation.customerEmail}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {reservation.customerPhone}
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingReservation === reservation.id ? (
                        <div className="space-y-1">
                          <input
                            type="date"
                            value={editForm.reservationDate}
                            onChange={(e) => handleInputChange('reservationDate', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                          />
                          <input
                            type="time"
                            value={editForm.reservationTime}
                            onChange={(e) => handleInputChange('reservationTime', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                          />
                        </div>
                      ) : (
                        <div>
                          <div className="text-sm text-gray-900 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(reservation.reservationDate)}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTime(reservation.reservationTime)}
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingReservation === reservation.id ? (
                        <input
                          type="number"
                          min="1"
                          value={editForm.partySize}
                          onChange={(e) => handleInputChange('partySize', parseInt(e.target.value))}
                          className="w-16 px-2 py-1 border border-gray-300 rounded"
                        />
                      ) : (
                        <div className="text-sm text-gray-900 flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {reservation.partySize}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingReservation === reservation.id ? (
                        <textarea
                          value={editForm.specialRequests}
                          onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                          rows="2"
                        />
                      ) : (
                        <div className="text-sm text-gray-900 max-w-xs">
                          {reservation.specialRequests && (
                            <div className="flex items-start gap-1">
                              <MessageSquare className="w-3 h-3 mt-0.5 flex-shrink-0" />
                              <span className="break-words">{reservation.specialRequests}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {editingReservation === reservation.id ? (
                        <div className="flex gap-2">
                          <button
                            onClick={handleSaveEdit}
                            className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(reservation)}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(reservation.id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredReservations.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No reservations found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {reservations.length === 0 
                  ? "No reservations available yet." 
                  : "Try adjusting your search or date filter."
                }
              </p>
            </div>
          )}
            </>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3 text-center">
                <Trash2 className="mx-auto h-12 w-12 text-red-500 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">Delete Reservation</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Are you sure you want to delete this reservation? This action cannot be undone.
                </p>
                <div className="mt-6 flex justify-center gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(null)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(showDeleteConfirm)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Restaurant Registration Form */}
        <RestaurantRegistrationForm
          isOpen={isRegistrationFormOpen}
          onClose={() => setIsRegistrationFormOpen(false)}
        />
      </div>
    </div>
  );
};

export default ReservationAdminPanel;