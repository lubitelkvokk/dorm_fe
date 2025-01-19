import React, { useState } from 'react';
import { useAuth } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    await login(credentials);
    navigate('/home');
  };

  return (
    <div>
      <h1>Sign-up</h1>
      <form onSubmit={handleSign-up}>
        <input
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        <button type="submit">Sign-up</button>
      </form>
    </div>
  );
}

export default SignUp;