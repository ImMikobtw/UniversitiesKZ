import { NavLink } from "react-router-dom";
import MainIcon from "../../assets/icons/sidebar-main-icon.svg?react";
import "../../styles/styled-components.css";

type SidebarMainBtnProps = {
    label: string;
    to: string;
    active?: boolean;
};

const SidebarMainBtn = ({ label, to, active }: SidebarMainBtnProps) => {
    return (
        <NavLink
            to={to}
            className={`sidebar-main-btn ${active ? "active" : ""}`}
        >
            <MainIcon />
            <span>{label}</span>
        </NavLink>
    );
}

export default SidebarMainBtn;
