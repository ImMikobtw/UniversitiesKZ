import UniversityCard from "../components/UniversityCard";
import UniversityAddBtn from "../components/btn-components/uni-add-btn";
import "../styles/UniPage.css";

const universities = [
  {
    logo: "https://via.placeholder.com/60x60.png?text=KBTU",
    name: "Kazakh-British Technical University",
    abbreviation: "KBTU",
    address: "г. Алматы, ул. Толе би, 51",
    code: "KZ001",
    studentCount: 5000,
    status: "государственный",
    entScore: 90,
    qsScore: "QS 1001-1200",
  },
  {
    logo: "https://via.placeholder.com/60x60.png?text=ENU",
    name: "Eurasian National University",
    abbreviation: "ENU",
    address: "г. Астана, ул. Сатпаева, 2",
    code: "KZ002",
    studentCount: 12000,
    status: "государственный",
    entScore: 85,
    qsScore: "QS 301-350",
  },
  {
    logo: "https://via.placeholder.com/60x60.png?text=NU",
    name: "Nazarbayev University",
    abbreviation: "NU",
    address: "г. Астана, ул. Кабанбай батыра, 53",
    code: "KZ003",
    studentCount: 4000,
    status: "частный",
    entScore: 95,
    qsScore: "QS 201-250",
  },
];

const UniPage = () => {
  return (
    <div>
        <div className="uni-page">
            <UniversityAddBtn />
          <div className="universities-list">
            {universities.map((uni, index) => (
              <UniversityCard
                key={index}
                logo={uni.logo}
                name={uni.name}
                abbreviation={uni.abbreviation}
                address={uni.address}
                code={uni.code}
                studentCount={uni.studentCount}
                status={uni.status}
                entScore={uni.entScore}
                qsScore={uni.qsScore}
              />
            ))}
          </div>
        </div>
    </div>
  );
};

export default UniPage;