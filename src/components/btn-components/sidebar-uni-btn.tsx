import { NavLink } from "react-router-dom";
import UniIcon from "../../assets/icons/sidebar-uni-icon.svg?react";
import "../../styles/styled-components.css";

type SidebarUniBtnProps = {
    label: string;
    to: string;
    active?: boolean;
};

const SidebarUniBtn = ({ label, to, active }: SidebarUniBtnProps) => {
    return (
        <NavLink
            to={to}
            className={`sidebar-uni-btn ${active ? "active" : ""}`}
        >
            <UniIcon />
            <span>{label}</span>
        </NavLink>
    );
}

export default SidebarUniBtn;