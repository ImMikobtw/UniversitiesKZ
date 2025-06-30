import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthInput from "../components/input-components/AuthInput";
import api from "../api/axios";
import "../styles/RegisterPage.css";

interface University {
  university_id?: number;
  id?: number;
  uni_name_kz: string;
  uni_name_rus?: string;
}

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [university, setUniversity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUniversities, setIsLoadingUniversities] = useState(false);
  const [universities, setUniversities] = useState<University[]>([]);
  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUniversities = async () => {
      setIsLoadingUniversities(true);
      try {
        const response = await api.get("api/public/universities");
        console.log("API Response for universities:", response.data);
        const validUniversities = response.data.filter((uni: University) => {
          const id = uni.university_id ?? uni.id;
          return typeof id === "number" && id > 0;
        });
        console.log("Filtered universities:", validUniversities);
        setUniversities(validUniversities);
        if (validUniversities.length === 0) {
          setError("Нет доступных университетов. Пожалуйста, попробуйте позже.");
        }
      } catch (err) {
        console.error("Failed to load universities:", err);
        setError("Не удалось загрузить список университетов. Пожалуйста, проверьте соединение.");
      } finally {
        setIsLoadingUniversities(false);
      }
    };
    fetchUniversities();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!firstName || !lastName || !email || !university || !password || !confirmPassword) {
      setError("Пожалуйста, заполните все поля, включая выбор университета.");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Пароли не совпадают.");
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Введите корректный адрес электронной почты.");
      setIsLoading(false);
      return;
    }

    const universityId = parseInt(university, 10);
    if (isNaN(universityId) || universityId <= 0) {
      setError("Пожалуйста, выберите действительный университет.");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Submitting with:", { firstName, lastName, email, universityId, password });
      const success = await register(firstName, lastName, email, universityId.toString(), password);
      if (success) {
        navigate("/main");
      } else {
        setError("Ошибка регистрации. Пожалуйста, попробуйте еще раз.");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ошибка сервера. Попробуйте позже.";
      setError(
        errorMessage.includes("user already exists")
          ? "Этот email уже зарегистрирован."
          : errorMessage.includes("university not found")
          ? "Выбранный университет не найден."
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
                onChange={(value: string) => setFirstName(value)}
              />
              <AuthInput
                id="lastName"
                label="Фамилия"
                type="text"
                placeholder="Введите вашу фамилию"
                value={lastName}
                onChange={(value: string) => setLastName(value)}
              />
            </div>
            <div className="second-line">
              <AuthInput
                id="user-email"
                label="Корпоративная почта"
                type="email"
                placeholder="Введите вашу корпоративную почту"
                value={email}
                onChange={(value: string) => setEmail(value)}
              />
            </div>
            <div className="third-line">
              <label htmlFor="university">Университет</label>
              <select
                id="university"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="auth-input"
                disabled={isLoading || isLoadingUniversities || universities.length === 0}
              >
                <option value="">{isLoadingUniversities ? "Загрузка..." : "Выберите университет"}</option>
                {universities.map((uni) => (
                  <option
                    key={uni.university_id ?? uni.id ?? `uni-${Math.random()}`}
                    value={(uni.university_id ?? uni.id)?.toString() ?? ""}
                  >
                    {uni.uni_name_rus || uni.uni_name_kz || "Без названия"}
                  </option>
                ))}
              </select>
            </div>
            <div className="fourth-line">
              <AuthInput
                id="password"
                label="Пароль"
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(value: string) => setPassword(value)}
              />
              <AuthInput
                id="confirm-password"
                label="Подтверждение пароля"
                type="password"
                placeholder="Подтвердите пароль"
                value={confirmPassword}
                onChange={(value: string) => setConfirmPassword(value)}
              />
            </div>
          </div>
          <div className="register-btn-container">
            <button
              type="submit"
              className="register-btn"
              disabled={isLoading || isLoadingUniversities || universities.length === 0}
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