import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Login from './pages/Login';
import ChangePassword from './pages/ChangePassword';
import ProtectedRoute from './services/ProtectedRouter';
import { AuthProvider, checkRole } from './services/AuthService';
import { UserQuestsPage } from './pages/quests/UserQuestsPage';
import { QuestsPage } from './pages/quests/QuestPage';
import { CreateQuestPage } from './pages/quests/CreateQuestPage';
import Header from './components/Header';
import { AllBookingsPage } from './pages/booking/AllBookingsPage';
import {LaundryOperatorPage} from './pages/laundry/LaundryOperatorPage';
import {LaundrySchedulePage} from './pages/laundry/LaundrySchedulePage';

function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />
        <Route path="/quests" element={<QuestsPage />} />
        <Route path="/my-quests" element={<UserQuestsPage />} />
        <Route path="/create-quest" element={<CreateQuestPage />} />
        <Route path="/laundry" element={<LaundryOperatorPage />} />
        <Route path="/laundry-schedule" element={<LaundrySchedulePage />} />
        
        
        <Route path="/booking" element={<AllBookingsPage/>}/>
      </Routes>
    </AuthProvider>
  );
}

export default App;

