import React, { useState } from 'react';
import { useAuth } from '../services/AuthService';
import { apiService } from '../services/ApiService';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { authHeaders } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверяем совпадение паролей
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Отправляем запрос на смену пароля
      await apiService.post('auth/change_password', { newPassword: password }, authHeaders);
      apiService.createAuthHeader(localStorage.getItem("username"), password);
      alert('Password changed successfully');
      navigate('/home'); // Перенаправляем пользователя после успешного изменения
    } catch (error) {
      console.error('Failed to change password:', error);
      setError('Failed to change password. Please try again.');
    }
  };

  return (
    <div>
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm New Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}

export default ChangePassword;
