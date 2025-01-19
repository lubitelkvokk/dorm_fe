import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import "../App.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Удаляем данные авторизации
    navigate('/'); // Переход на страницу логина
  };  

  return (
    <header className="header">
      <div className="header-content">
        <img src="/images/image.png" alt="Logo" className="header-logo" />
        <h1 className="logo">Dorm 2007. Univer</h1>
        <nav>
          <button onClick={() => navigate('/home')} className="nav-button">Home</button>
          <button onClick={handleLogout} className="nav-button">Logout</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
