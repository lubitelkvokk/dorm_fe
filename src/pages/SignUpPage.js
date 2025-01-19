import React, { useState } from 'react';
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
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // Для вывода сообщения из ответа

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      personDTO: {
        ...prev.personDTO,
        [name]: value,
      },
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...formData,
        personDTO: {
          ...formData.personDTO,
          gender: formData.personDTO.gender.toUpperCase(), // Приведение к верхнему регистру
          role: formData.personDTO.role.toUpperCase(), // Приведение к верхнему регистру
        },
      };

      const response = await apiService.post('auth/sign_up', formattedData); // Отправка JSON на сервер

      if (response.ok) {
        const data = await response.text(); // Получаем JSON-ответ с сервера
        alert(data);
        setSuccessMessage(`Registration successful! Temporary password: ${data.tempPassword}`); // Выводим временный пароль
        setError(null); // Сбрасываем ошибки
      } else {
        const errorText = await response.text();
        setError(`Registration failed: ${errorText}`);
        setSuccessMessage(null); // Сбрасываем сообщение успеха
      }
    } catch (err) {
      setError('An error occurred during registration.');
      setSuccessMessage(null); // Сбрасываем сообщение успеха
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
        <button type="submit">Sign-up</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
}

export default SignUp;
