import { NavLink } from "react-router-dom";
import OopIcon from "../../assets/icons/sidebar-oop-icon.svg?react";
import "../../styles/styled-components.css";

type SidebarOopBtnProps = {
    label: string;
    to: string;
    active?: boolean;
};

const SidebarOopBtn = ({ label, to, active }: SidebarOopBtnProps) => {
    return (
        <NavLink
            to={to}
            className={`sidebar-oop-btn ${active ? "active" : ""}`}
        >
            <OopIcon />
            <span>{label}</span>
        </NavLink>
    );
}

export default SidebarOopBtn;