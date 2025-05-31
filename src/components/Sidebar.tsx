import { NavLink } from "react-router-dom";
import SidebarMainBtn from "./btn-components/sidebar-main-btn";
import SidebarUniBtn from "./btn-components/sidebar-uni-btn";
import SidebarOopBtn from "./btn-components/sidebar-oop-icon";
import "../styles/Sidebar.css";

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebar-container">
      <button
        className="sidebar-toggle-btn"
        onClick={toggleSidebar}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        aria-expanded={isOpen}
      >
        {isOpen ? "←" : "→"}
      </button>
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <NavLink to="/main/main" end>
          {({ isActive }) => (
            <SidebarMainBtn label="Главная" active={isActive} to="/main/main" />
          )}
        </NavLink>
        <NavLink to="/main/uni" end>
          {({ isActive }) => (
            <SidebarUniBtn label="Университеты" active={isActive} to="/main/uni" />
          )}
        </NavLink>
        <NavLink to="/main/oop" end>
          {({ isActive }) => (
            <SidebarOopBtn label="ООП" active={isActive} to="/main/oop" />
          )}
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;