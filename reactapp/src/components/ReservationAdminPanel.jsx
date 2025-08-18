import React, { useState, useEffect } from 'react';
import { Search, Edit3, Trash2, Plus, Calendar, Clock, Users, Phone, Mail, MessageSquare, X, Check } from 'lucide-react';

const ReservationAdminPanel = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Reservation
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
      </div>
    </div>
  );
};

export default ReservationAdminPanel;