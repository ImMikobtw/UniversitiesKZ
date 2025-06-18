import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Header.css";
import Logo from "../assets/icons/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="container">
      <div className="header">
        <img
          src={Logo}
          className="header-logo"
          onClick={() => navigate("/main")}
          alt="Logo"
        />
        <button
          className="logout-btn"
          onClick={handleLogout}
          aria-label="Выйти"
        >
          Выйти
        </button>
      </div>
    </header>
  );
};

export default Header;