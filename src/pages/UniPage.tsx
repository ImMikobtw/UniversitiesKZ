import { useState, useEffect } from 'react';
import UniversityCard from '../components/UniversityCard';
import UniversityAddBtn from '../components/btn-components/uni-add-btn';
import '../styles/UniPage.css';
import apiClient from '../api/apiClient'; 

const UniPage = () => {
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await apiClient.get('/universities');
        setUniversities(response.data);
      } catch (error) {
        console.error('Error fetching universities:', error);
      }
    };
    fetchUniversities();
  }, []);

  return (
    <div className="uni-page">
      <UniversityAddBtn />
      <div className="universities-list">
        {universities.map((uni: any, index: number) => (
          <UniversityCard
            key={index}
            logo={uni.logo_url}
            name={uni.name_ru}
            abbreviation={uni.abbreviation_ru}
            address={uni.address}
            code={uni.code}
            studentCount={uni.student_count}
            status={uni.status}
            entScore={uni.ent_score}
            qsScore={uni.qs_score}
          />
        ))}
      </div>
    </div>
  );
};

export default UniPage;