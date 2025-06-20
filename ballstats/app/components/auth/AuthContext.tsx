'use client';

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode
} from 'react';

type UserType = 'coach' | 'player';

interface User {
  id: string;
  email: string;
  name: string;
  userType: UserType;
  team: string;
  position?: string;
  experience?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType: UserType) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (profileData: Partial<User>) => void;
  register: (registrationData: Partial<User>) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const getInitialUser = (): User | null => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(getInitialUser());

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (
    email: string,
    password: string,
    userType: UserType
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        userType,
        team: 'Warriors'
      };
      setUser(mockUser);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (profileData: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...profileData } : prev));
  };

  const register = async (
    registrationData: Partial<User>
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const mockUser: User = {
        id: '2',
        email: registrationData.email || '',
        name: registrationData.name || '',
        userType: registrationData.userType || 'player',
        team: registrationData.team || '',
        position: registrationData.position || '',
        experience: registrationData.experience || ''
      };
      setUser(mockUser);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
