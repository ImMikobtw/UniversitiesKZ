import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import api from '../api/axios';

interface BackendError {
  error?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (Email: string, Password: string) => Promise<boolean>;
  register: (firstName: string, lastName: string, Email: string, university: string, Password: string) => Promise<boolean>;
  logout: () => void;
  getToken: () => string | null;
  universityId?: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [universityId, setUniversityId] = useState<number | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      api.get('/api/profile')
        .then((response) => {
          setIsAuthenticated(true);
          setUniversityId(response.data.uni_id || 1);
        })
        .catch(() => {
          localStorage.removeItem('accessToken');
          setIsAuthenticated(false);
          setUniversityId(undefined);
        });
    }
  }, []);

  const login = async (Email: string, Password: string) => {
    try {
      console.log("Sending login request with:", { Email, Password });
      const response = await api.post('/auth/login', { Email, Password });
      const { token } = response.data;
      console.log("Login successful, received token:", token);
      localStorage.setItem('accessToken', token);
      setIsAuthenticated(true);
      navigate('/main');
      return true;
    } catch (error) {
      const axiosError = error as AxiosError<BackendError>;
      const errorMessage = axiosError.response?.data?.error || 'Login failed';
      console.error("Login failed:", errorMessage);
      throw new Error(errorMessage);
    }
  };

  const register = async (firstName: string, lastName: string, email: string, university: string, password: string) => {
    try {
      const universityId = parseInt(university, 10);
      if (isNaN(universityId)) {
        throw new Error("ID университета должен быть числом.");
      }

      const response = await api.post('/auth/register', {
        first_name: firstName,
        last_name: lastName,
        Email: email,
        university_id: universityId,
        Password: password,
      });
      const { token, user } = response.data;
      localStorage.setItem('accessToken', token);
      setIsAuthenticated(true);
      setUniversityId(user.university_id);
      navigate('/main');
      return true;
    } catch (error) {
      const axiosError = error as AxiosError<BackendError>;
      throw new Error(axiosError.response?.data?.error || (error instanceof Error ? error.message : 'Registration failed'));
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
    setUniversityId(undefined);
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