import React, { useState } from 'react';
import { apiService } from '../../services/ApiService';
import { useNavigate } from 'react-router-dom';

const CreateBookingPage = () => {
  const [formData, setFormData] = useState({
    sharedRoomId: '',
    date: '',
    startTime: '',
    endTime: '',
    capacity: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.post('booking', formData);
      alert('Booking created successfully!');
      navigate('/bookings');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Create Booking</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Room ID:</label>
          <input
            type="text"
            name="sharedRoomId"
            value={formData.sharedRoomId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Start Time:</label>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>End Time:</label>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Capacity:</label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p>Error: {error}</p>}
        <button type="submit">Create Booking</button>
      </form>
    </div>
  );
};

export { CreateBookingPage };
