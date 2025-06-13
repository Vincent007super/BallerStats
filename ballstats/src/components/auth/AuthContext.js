import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile }}>
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