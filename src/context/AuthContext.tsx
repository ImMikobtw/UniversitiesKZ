import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockLogin, mockRegister } from "../MockData"; 

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (firstName: string, lastName: string, email: string, university: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const data = await mockLogin(email, password);
      if (data.success) {
        setIsAuthenticated(true);
        navigate("/main");
        return true;
      }
      throw new Error(data.error || "Ошибка входа");
    } catch (error) {
      console.error("Login error:", error);
      throw error instanceof Error ? error : new Error("Ошибка сервера");
    }
  };

  const register = async (firstName: string, lastName: string, email: string, university: string, password: string) => {
    try {
      const data = await mockRegister(firstName, lastName, email, university, password);
      if (data.success) {
        setIsAuthenticated(true);
        navigate("/main");
        return true;
      }
      throw new Error(data.error || "Ошибка регистрации");
    } catch (error) {
      console.error("Registration error:", error);
      throw error instanceof Error ? error : new Error("Ошибка сервера");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};