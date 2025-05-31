import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import AuthInput from "../components/input-components/AuthInput";
import "../styles/LoginPage.css";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const success = await login(email, password);
            if (!success) {
                setError("Ошибка входа. Пожалуйста, проверьте свои учетные данные.");
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : "Ошибка сервера");
        }
    };

    return (
       <>
          <div className = "login-page">
            <div className="login-header">
                <h1 className="login-title">Вход в систему</h1>
                <p className="login-subtitle">Университеты Казахстана</p>
            </div>
            <form onSubmit={handleSubmit} id="login-form">
            <div className = "login-inputs">
                <AuthInput
                    id="email"
                    label="Корпоративная почта"
                    type="email"
                    placeholder="Введите вашу корпоративную почту"
                    value={ email }
                    onChange={(value) => setEmail(value)}
                />
                <AuthInput
                    id="password"
                    label="Пароль"
                    type="password"
                    placeholder="Введите пароль"
                    value= { password }
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
            <div className = "login-btn-container">
                <button type="submit" form="login-form" className="login-btn">
                    Войти
                </button>
            </div>
            <div className = "registration-link">
                <span className="registration-text">
                    Нет аккаунта?{" "}
                </span>
                <Link to="/register" className="registration-link-text">
                    Зарегистрироваться
                </Link>
            </div>
          </div>
       </>
    );
};

export default LoginPage;