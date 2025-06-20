import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

const getInitialUser = () => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getInitialUser());

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email, password, userType) => {
    try {
      // TODO: Integrate with PHP/MySQL backend
      // Temporary mock authentication
      const mockUser = {
        id: '1',
        email,
        name: email.split('@')[0],
        userType, // 'coach' or 'player'
        team: 'Warriors',
      };
      setUser(mockUser);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (profileData) => {
    setUser(prev => ({ ...prev, ...profileData }));
  };

  const register = async (registrationData) => {
    try {
      // TODO: Integrate with PHP/MySQL backend for registration
      // Temporary mock registration
      const mockUser = {
        id: '2',
        email: registrationData.email,
        name: registrationData.name,
        userType: registrationData.userType,
        team: registrationData.team,
        position: registrationData.position || '',
        experience: registrationData.experience || ''
      };
      setUser(mockUser);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};