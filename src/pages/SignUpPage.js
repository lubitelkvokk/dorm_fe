import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/ApiService';

function SignUp() {
  const [formData, setFormData] = useState({
    personDTO: {
      name: '',
      isuNumber: '',
      roomId: '',
      gender: '',
      role: 'RESIDENT', // Значение по умолчанию
    },
    username: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in formData.personDTO) {
      // Обновляем поля внутри personDTO
      setFormData((prev) => ({
        ...prev,
        personDTO: {
          ...prev.personDTO,
          [name]: value,
        },
      }));
    } else {
      // Обновляем username и password
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await apiService.post('register', formData); // Отправка JSON на сервер
      if (response.ok) {
        alert('Registration successful!');
        navigate('/home'); // Перенаправляем пользователя
      } else {
        setError('Registration failed. Please check the input data.');
      }
    } catch (err) {
      setError('An error occurred during registration.');
    }
  };

  return (
    <div>
      <h1>Sign-up</h1>
      <form onSubmit={handleSignUp}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.personDTO.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>ISU Number:</label>
          <input
            type="number"
            name="isuNumber"
            placeholder="ISU Number"
            value={formData.personDTO.isuNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Room ID:</label>
          <input
            type="number"
            name="roomId"
            placeholder="Room ID"
            value={formData.personDTO.roomId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.personDTO.gender}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>
        <div>
          <label>Role:</label>
          <select
            name="role"
            value={formData.personDTO.role}
            onChange={handleChange}
            required
          >
            <option value="RESIDENT">Resident</option>
            <option value="OPERATOR">Operator</option>
          </select>
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Sign-up</button>
      </form>
    </div>
  );
}

export default SignUp;
