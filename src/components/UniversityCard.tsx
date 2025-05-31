import React from "react";
import PencilLine from "../assets/icons/PencilLine.svg?react";
import Trash from "../assets/icons/Trash.svg?react";
import "../styles/UniversityCard.css";

type UniversityCardProps = {
  logo: string;
  name: string;
  abbreviation: string;
  address: string;
  code: string;
  studentCount: number;
  status: string;
  entScore: number;
  qsScore: string;
  onEdit?: (code: string) => void;
  onDelete?: (code: string) => void;
};

const UniversityCard: React.FC<UniversityCardProps> = ({
  logo,
  name,
  abbreviation,
  address,
  code,
  studentCount,
  status,
  entScore,
  qsScore,
  onEdit,
  onDelete,
}) => {
  const handleEdit = () => {
    if (onEdit) onEdit(code);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(code);
  };

  return (
    <div className="university-card">
      <div className="university-actions">
        <button onClick={handleEdit} className="action-btn edit-btn">
          <PencilLine />
        </button>
        <button onClick={handleDelete} className="action-btn delete-btn">
          <Trash />
        </button>
      </div>
      <div className="card-content">
         <div className="card-left-side">
            <div className="university-header">
                <img src={logo} alt={`${name} logo`} className="university-logo" />
                <div className="university-title">
                  <h3>{name}</h3>
                  <p className="abbreviation">{abbreviation}</p>
                </div>
            </div>
           <p><strong>Адрес:</strong> {address}</p>
           <p><strong>Код университета:</strong> {code}</p>
         </div>
         <div className="card-right-side">
           <div className="university-details">
               <p><strong>Количество студентов:</strong> {studentCount.toLocaleString()}</p>
               <p><strong>Статус:</strong> {status}</p>
               <p><strong>ЕНТ:</strong> {entScore}</p>
               <p><strong>QS:</strong> {qsScore}</p>
           </div>
         </div>
      </div>
    </div>
  );
};

export default UniversityCard;