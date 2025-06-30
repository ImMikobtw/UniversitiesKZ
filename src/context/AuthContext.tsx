import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import api from '../api/axios';

interface BackendError {
  error?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean; // Новое поле для состояния загрузки
  login: (email: string, password: string) => Promise<boolean>;
  register: (firstName: string, lastName: string, email: string, university: string, password: string) => Promise<boolean>;
  logout: () => void;
  getToken: () => string | null;
  universityId?: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Изначально true
  const [universityId, setUniversityId] = useState<number | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      api.get('/api/profile')
        .then((response) => {
          setIsAuthenticated(true);
          setUniversityId(response.data.university_id); // Устанавливаем university_id из ответа
          setIsLoading(false); // Завершаем загрузку
        })
        .catch(() => {
          localStorage.removeItem('accessToken');
          setIsAuthenticated(false);
          setUniversityId(undefined);
          setIsLoading(false); // Завершаем загрузку даже при ошибке
          navigate('/login'); // Перенаправляем на логин при ошибке
        });
    } else {
      setIsLoading(false); // Если токена нет, завершаем загрузку
    }
  }, [navigate]);

  const login = async (email: string, password: string) => {
    try {
      console.log("Sending login request with:", { email, password });
      const response = await api.post('/auth/login', { email, password });
      const { token } = response.data;
      console.log("Login successful, received token:", token);
      localStorage.setItem('accessToken', token);
      setIsAuthenticated(true);
      // Получаем university_id после логина
      const profileResponse = await api.get('/api/profile');
      setUniversityId(profileResponse.data.university_id);
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
        email: email, // Исправлено с user_email
        university_id: universityId,
        password: password, // Исправлено с user_password
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
    setIsLoading(false);
    navigate('/login');
  };

  const getToken = () => {
    return localStorage.getItem('accessToken');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading, // Добавляем в контекст
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