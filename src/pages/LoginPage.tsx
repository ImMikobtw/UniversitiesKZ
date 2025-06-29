import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthInput from "../components/input-components/AuthInput";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [User_email, setEmail] = useState("");
  const [User_password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted, preventing default");
    setError("");
    setIsLoading(true);

    try {
      console.log("Attempting login with:", { User_email, User_password });
      const success = await login(User_email, User_password);
      if (success) {
        navigate('/main');
      } else {
        setError("Ошибка входа. Проверьте email или пароль.");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ошибка сервера. Попробуйте позже.";
      setError(errorMessage);
      console.error("Login error:", errorMessage);
    } finally {
      setIsLoading(false);
      console.log("Login attempt finished");
    }
  };

  return (
    <div className="login-page">
      <div className="login-header">
        <h1 className="login-title">Вход в систему</h1>
        <p className="login-subtitle">Университеты Казахстана</p>
      </div>
      <form onSubmit={handleSubmit} id="login-form">
        <div className="login-inputs">
          <AuthInput
            id="email"
            label="Корпоративная почта"
            type="email"
            placeholder="Введите вашу корпоративную почту"
            value={User_email}
            onChange={(value) => setEmail(value)}
          />
          <AuthInput
            id="password"
            label="Пароль"
            type="password"
            placeholder="Введите пароль"
            value={User_password}
            onChange={(value) => setPassword(value)}
          />
        </div>
        {error && <div className="login-error">{error}</div>}
      </form>
      <div className="forgot-password">
        <a href="#" className="forgot-password-link">
          Забыли пароль?
        </a>
      </div>
      <div className="login-btn-container">
        <button
          type="submit"
          form="login-form"
          className="login-btn"
          disabled={isLoading}
        >
          {isLoading ? "Загрузка..." : "Войти"}
        </button>
      </div>
      <div className="registration-link">
        <span className="registration-text">Нет аккаунта? </span>
        <Link to="/register" className="login-link-text">
          Зарегистрироваться
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;