import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import api from '../api/axios';

interface BackendError {
  error?: string;
}

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
    if (accessToken) {
      api.get('/api/profile')
        .then((response) => {
          setIsAuthenticated(true);
          setUniversityId(response.data.university_id || 1); // По умолчанию
        })
        .catch(() => {
          localStorage.removeItem('accessToken');
          setIsAuthenticated(false);
          setUniversityId(undefined);
          setUniversityCode(undefined);
        });
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('accessToken', token);
      setIsAuthenticated(true);
      navigate('/main');
      return true;
    } catch (error) {
      const axiosError = error as AxiosError<BackendError>;
      throw new Error(axiosError.response?.data?.error || 'Login failed');
    }
  };

  const register = async (firstName: string, lastName: string, email: string, university: string, password: string) => {
    try {
      const response = await api.post('/auth/register', {
        first_name: firstName,
        last_name: lastName,
        email,
        university_id: university,
        password,
      });
      const { token, user } = response.data;
      localStorage.setItem('accessToken', token);
      setIsAuthenticated(true);
      setUniversityId(user.university_id);
      setUniversityCode(user.university_code || 'TEST'); // По умолчанию
      navigate('/main');
      return true;
    } catch (error) {
      const axiosError = error as AxiosError<BackendError>;
      throw new Error(axiosError.response?.data?.error || 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
    setUniversityId(undefined);
    setUniversityCode(undefined);
    navigate('/login');
  };

  const getToken = () => {
    return localStorage.getItem('accessToken');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        register,
        logout,
        getToken,
        universityId,
        universityCode,
      }}
    >
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