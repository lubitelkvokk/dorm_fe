import React, { createContext, useContext, useState } from 'react';
import { apiService } from './ApiService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authHeaders, setAuthHeaders] = useState(null); // Храним заголовки Authorization

  const login = async (credentials) => {
    try {
      const headers = apiService.createAuthHeader(credentials.username, credentials.password);
      const response = await apiService.post("auth/sign_in", {}, headers);

      if (response) {
        setIsAuthenticated(true);
        setAuthHeaders(headers); // Сохраняем заголовки Authorization
        localStorage.setItem("authHeaders", JSON.stringify(headers)); // Сохраняем в LocalStorage
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login error");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAuthHeaders(null);
    localStorage.removeItem("authHeaders"); // Удаляем из LocalStorage
  };

  // Восстанавливаем состояние авторизации при загрузке страницы
  React.useEffect(() => {
    const storedHeaders = localStorage.getItem("authHeaders");
    if (storedHeaders) {
      setAuthHeaders(JSON.parse(storedHeaders));
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, authHeaders, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
