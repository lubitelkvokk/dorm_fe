import React, { useState } from 'react';
import { apiService } from '../../services/ApiService';

const DeleteBookingPage = () => {
  const [bookingId, setBookingId] = useState('');
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      await apiService.delete(`booking/${bookingId}`);
      alert(`Booking with ID ${bookingId} deleted successfully!`);
      setBookingId('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Delete Booking</h1>
      <div>
        <label>Booking ID:</label>
        <input
          type="text"
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value)}
          required
        />
        <button onClick={handleDelete}>Delete Booking</button>
      </div>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export { DeleteBookingPage };
