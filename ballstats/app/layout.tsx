'use client';

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import PersonIcon from '@mui/icons-material/Person';
import './globals.css';

import Home from './pages/Home';
import Stats from './pages/Stats';
import Analysis from './pages/Analysis';
import Profile from './pages/Profile';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { AuthProvider, useAuth } from './components/auth/AuthContext';

const NavigationBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const getPathValue = (path) => {
    switch (path) {
      case '/home':
        return 0;
      case '/stats':
        return 1;
      case '/analysis':
        return 2;
      case '/profile':
        return 3;
      default:
        return 0;
    }
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <BottomNavigation
        value={getPathValue(currentPath)}
        showLabels
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          href="/home"
        />
        <BottomNavigationAction
          label="Stats"
          icon={<AssessmentIcon />}
          href="/stats"
        />
        <BottomNavigationAction
          label="Analysis"
          icon={<AnalyticsIcon />}
          href="/analysis"
        />
        <BottomNavigationAction
          label="Profile"
          icon={<PersonIcon />}
          href="/profile"
        />
      </BottomNavigation>
    </Box>
  );
};

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Box sx={{ pb: 7 }}> {/* Add padding to account for bottom navigation */}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/stats"
              element={
                <PrivateRoute>
                  <Stats />
                </PrivateRoute>
              }
            />
            <Route
              path="/analysis"
              element={
                <PrivateRoute>
                  <Analysis />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
          </Routes>
          <NavigationBar />
        </Box>
      </Router>
    </AuthProvider>
  );
};

export default App;
