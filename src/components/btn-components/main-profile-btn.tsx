import "../../styles/styled-components.css";
import Faicon from "../../assets/icons/Faicon.svg?react";

const MainProfileBtn = () => {

  return (
    <>
     <div className="profile-container">
        <a 
           href="#link" 
           className="main-profile-btn"
        >
           <Faicon width={30} height={30} viewBox="0 0 35 30" />
           Мой Кабинет
        </a>
      </div>
    </>
  );
};

export default MainProfileBtn;