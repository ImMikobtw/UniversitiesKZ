import { useNavigate } from "react-router-dom";
import "../styles/Header.css";
import Logo from "../assets/icons/logo.png";
import MainAddBtn from "./btn-components/main-add-btn";
import MainProfileBtn from "./btn-components/main-profile-btn";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="container">
      <div className="header">
        <img
          src={Logo}
          className="header-logo"
          onClick={() => navigate("/main")}
          alt="Logo"
        />
        <MainAddBtn />
        <MainProfileBtn />
      </div>
    </header>
  );
};

export default Header;