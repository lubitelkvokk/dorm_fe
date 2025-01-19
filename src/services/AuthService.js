import React, { createContext, useContext, useState } from 'react';
import { apiService } from './ApiService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [authHeaders, setAuthHeaders] = useState(null); // Храним заголовки Authorization



  const login = async (credentials) => {
    try {
      const headers = apiService.createAuthHeader(credentials.username, credentials.password);
      const response = await apiService.post("auth/sign_in", {}, headers);
      console.log(response);
      if (response) {
        let data = await response.json();
        console.log(data);
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("username", credentials.username);
        localStorage.setItem("role", data.role);
        setAuthHeaders(headers); // Сохраняем заголовки Authorization
        localStorage.setItem("authHeaders", JSON.stringify(headers)); // Сохраняем в LocalStorage
      } else {
        alert("Login failed");
        localStorage.removeItem("authHeaders");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login error");
      localStorage.removeItem("authHeaders");
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
    console.log("Restoring authHeaders from localStorage:", storedHeaders);
    if (storedHeaders) {
      setAuthHeaders(JSON.parse(storedHeaders));
      setIsAuthenticated(true);
    } else {
      console.log("No stored authHeaders. Setting isAuthenticated to false.");
      setIsAuthenticated(false);
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

export const checkRole = {
  laundryOperatorRole(){
    return localStorage.getItem("role") === "LAUNDRY_OPERATOR";
  },

  engineerRole(){
    return localStorage.getItem("role") === "ENGINEER";
  },

  commandantRole(){
    return localStorage.getItem("role") === "COMMANDANT";
  }

}