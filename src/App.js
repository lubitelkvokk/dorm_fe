import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Login from './pages/Login';
import ChangePassword from './pages/ChangePassword';
import ProtectedRoute from './services/ProtectedRouter';
import { AuthProvider } from './services/AuthService';
import { UserQuestsPage } from './pages/quests/UserQuestsPage';
import { QuestsPage } from './pages/quests/QuestPage';
import { CreateQuestPage } from './pages/quests/CreateQuestPage';
import { LaundrySchedulePage } from './pages/laundry/LaundrySchedulePage';
import { LaundryOperatorPage } from './pages/laundry/LaundryOperatorPage';
import {ApplicationPage} from "./pages/applications/ApplicationPage";
import {CreateAppPage} from "./pages/applications/CreateAppPage";

function App() {
  return (
    <AuthProvider>
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

        <Route path="/laundry/schedule" element={<LaundrySchedulePage />} />
        <Route path="/laundry/operator" element={<LaundryOperatorPage />} />

          <Route path="/apps" element={<ApplicationPage />} />
          <Route path="/apps/create" element={<CreateAppPage />} />

      </Routes>
    </AuthProvider>
  );
}


export default App;