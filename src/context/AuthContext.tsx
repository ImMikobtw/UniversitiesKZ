import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockUsers, mockToken, mockDecodedToken } from '../MockData';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (firstName: string, lastName: string, email: string, university: string, password: string) => Promise<boolean>;
  logout: () => void;
  getToken: () => string | null;
  universityId?: number;
  universityCode?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [universityId, setUniversityId] = useState<number | undefined>(undefined);
  const [universityCode, setUniversityCode] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken && refreshToken) {
      if (refreshToken === mockToken.refreshToken) {
        setIsAuthenticated(true);
        setUniversityCode(mockDecodedToken.universityCode);
      } else {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsAuthenticated(false);
        setUniversityId(undefined);
        setUniversityCode(undefined);
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    const user = mockUsers.find((u) => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    localStorage.setItem('accessToken', mockToken.accessToken);
    localStorage.setItem('refreshToken', mockToken.refreshToken);
    setIsAuthenticated(true);
    setUniversityId(undefined); 
    setUniversityCode(user.universityCode);
    navigate('/main');
    return true;
  };

  const register = async (firstName: string, lastName: string, email: string, university: string, password: string) => {
    if (mockUsers.some((u) => u.email === email)) {
      throw new Error('Email already exists');
    }
    localStorage.setItem('accessToken', mockToken.accessToken);
    localStorage.setItem('refreshToken', mockToken.refreshToken);
    setIsAuthenticated(true);
    setUniversityId(undefined);
    setUniversityCode(university); 
    navigate('/main');
    return true;
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
    setUniversityId(undefined);
    setUniversityCode(undefined);
    navigate('/login');
  };

  const getToken = () => {
    return localStorage.getItem('accessToken');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout, getToken, universityId, universityCode }}>
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