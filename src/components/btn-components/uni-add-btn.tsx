import { NavLink } from 'react-router-dom';
import PlusIcon from '../../assets/icons/PlusIcon.svg?react';
import '../../styles/AddUniversityBtn.css'

const UniversityAddBtn = () => {
     return (
       <NavLink to="/add-university" className="add-university-btn">
           <PlusIcon className="add-icon" />
           <span> Добавить Университет </span>


           
       </NavLink>
     );
};

export default UniversityAddBtn;