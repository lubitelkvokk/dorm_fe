import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/ApiService';

const AllBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const data = await apiService.get('booking');
        setBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>All Bookings</h1>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            <h3>Booking ID: {booking.id}</h3>
            <p>Room ID: {booking.sharedRoomId}</p>
            <p>Capacity: {booking.capacity}</p>
            <p>Date: {booking.date}</p>
            <p>Start Time: {booking.startTime}</p>
            <p>End Time: {booking.endTime}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { AllBookingsPage };
