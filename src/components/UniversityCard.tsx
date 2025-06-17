import React from "react";
import "../styles/UniversityCard.css";
import Test from "../assets/icons/test.svg?react";
import QS from "../assets/icons/qs.svg?react";
import Uni from "../assets/icons/uni.svg?react";
import Pocket from "../assets/icons/pocket.svg?react";

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
}) => {

  return (
    <div className="university-card">
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
           <p></p>
         </div>
         <div className="card-right-side">
            <div className="right-icons">
                <Pocket className="icon" />
                <Uni className="icon-uni" />
                <Test className="icon" />
                <QS className="icon" />
            </div>
           <div className="university-details">
               <p>
                <strong>Количество студентов:</strong> {studentCount.toLocaleString()}
               </p>
               <p>
                <strong>Статус:</strong> {status}
               </p>
               <p>
                <strong>ЕНТ:</strong> {entScore}
               </p>
               <p>
                <strong>QS:</strong> {qsScore}
               </p>
           </div>
         </div>
      </div>
    </div>
  );
};

export default UniversityCard;