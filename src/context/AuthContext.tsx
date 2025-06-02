import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (firstName: string, lastName: string, email: string, university: string, password: string) => Promise<boolean>;
  logout: () => void;
  getToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken && refreshToken) {
      apiClient
        .post('/auth/validate', { token: refreshToken })
        .then((response) => {
          if (response.data.valid) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            setIsAuthenticated(false);
          }
        })
        .catch(() => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          setIsAuthenticated(false);
        });
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password,
      });

      const { success, token, refreshToken } = response.data;

      if (success && token && refreshToken) {
        localStorage.setItem('accessToken', token);
        localStorage.setItem('refreshToken', refreshToken);
        setIsAuthenticated(true);
        navigate('/main');
        return true;
      }
      throw new Error('Invalid credentials');
    } catch (error) {
      console.error('Login error:', error);
      throw error instanceof Error ? error : new Error('Server error');
    }
  };

  const register = async (firstName: string, lastName: string, email: string, university: string, password: string) => {
    try {
      const response = await apiClient.post('/auth/register', {
        firstName,
        lastName,
        email,
        university,
        password,
      });

      const { success, token, refreshToken } = response.data;

      if (success && token && refreshToken) {
        localStorage.setItem('accessToken', token);
        localStorage.setItem('refreshToken', refreshToken);
        setIsAuthenticated(true);
        navigate('/main');
        return true;
      }
      throw new Error('Registration failed');
    } catch (error) {
      console.error('Registration error:', error);
      throw error instanceof Error ? error : new Error('Server error');
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const getToken = () => {
    return localStorage.getItem('accessToken');
  };

  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          try {
            const response = await apiClient.post('/auth/refresh', { refreshToken });
            const { token: newAccessToken } = response.data;
            localStorage.setItem('accessToken', newAccessToken);
            return apiClient(error.config);
          } catch (refreshError) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            setIsAuthenticated(false);
            navigate('/login');
          }
        } else {
          localStorage.removeItem('accessToken');
          setIsAuthenticated(false);
          navigate('/login');
        }
      }
      return Promise.reject(error);
    }
  );

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout, getToken }}>
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