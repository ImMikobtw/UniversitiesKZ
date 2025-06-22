import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthInput from "../components/input-components/AuthInput";
import "../styles/RegisterPage.css";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [university, setUniversity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!firstName || !lastName || !email || !university || !password || !confirmPassword) {
      setError("Пожалуйста, заполните все поля.");
      setIsLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Пароли не совпадают.");
      setIsLoading(false);
      return;
    }
    if (!email.includes("@")) {
      setError("Введите корректный адрес электронной почты.");
      setIsLoading(false);
      return;
    }

    try {
      const success = await register(firstName, lastName, email, university, password);
      if (!success) {
        setError("Ошибка регистрации. Пожалуйста, попробуйте еще раз.");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ошибка сервера. Попробуйте позже.";
      setError(
        errorMessage.includes("user already exists")
          ? "Этот email уже зарегистрирован."
          : errorMessage
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="blue-section"></div>
      <div className="form-section">
        <form onSubmit={handleSubmit}>
          <div className="register-header">
            <h1 className="register-title">Регистрация</h1>
            <p className="register-subtitle">Университеты Казахстана</p>
          </div>
          {error && <div className="error">{error}</div>}
          <div className="register-inputs">
            <div className="first-line">
              <AuthInput
                id="firstName"
                label="Имя"
                type="text"
                placeholder="Введите ваше имя"
                value={firstName}
                onChange={(value) => setFirstName(value)}
              />
              <AuthInput
                id="lastName"
                label="Фамилия"
                type="text"
                placeholder="Введите вашу фамилию"
                value={lastName}
                onChange={(value) => setLastName(value)}
              />
            </div>
            <div className="second-line">
              <AuthInput
                id="corporate-email"
                label="Корпоративная почта"
                type="email"
                placeholder="Введите вашу корпоративную почту"
                value={email}
                onChange={(value) => setEmail(value)}
              />
            </div>
            <div className="third-line">
              <AuthInput
                id="university"
                label="ID Университета"
                type="text"
                placeholder="Введите ID университета"
                value={university}
                onChange={(value) => setUniversity(value)}
              />
            </div>
            <div className="fourth-line">
              <AuthInput
                id="password"
                label="Пароль"
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(value) => setPassword(value)}
              />
              <AuthInput
                id="confirm-password"
                label="Подтверждение пароля"
                type="password"
                placeholder="Подтвердите пароль"
                value={confirmPassword}
                onChange={(value) => setConfirmPassword(value)}
              />
            </div>
          </div>
          <div className="register-btn-container">
            <button
              type="submit"
              className="register-btn"
              disabled={isLoading}
            >
              {isLoading ? "Загрузка..." : "Зарегистрироваться"}
            </button>
          </div>
          <div className="login-link">
            <span className="login-text">Уже есть аккаунт? </span>
            <Link to="/login" className="login-link-text">
              Войти
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;