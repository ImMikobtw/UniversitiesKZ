import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UniversityCard from '../components/UniversityCard';
import '../styles/UniPage.css';
import { mockUniversities } from '../MockData';
import { useAuth } from '../context/AuthContext';
import PencilLine from '../assets/icons/PencilLine.svg?react';

const UniPage = () => {
  const [university, setUniversity] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [viewMode, setViewMode] = useState<'card' | 'full'>('card');
  const { universityCode } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!universityCode) {
      setError('University information not available.');
      return;
    }
    const uni = mockUniversities.find((u) => u.code === universityCode);
    if (uni) {
      setUniversity(uni);
    } else {
      setError('University not found.');
    }
  }, [universityCode]);

  const handleEdit = (code: string) => {
    navigate(`/add-university?code=${code}`);
  };

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === 'card' ? 'full' : 'card'));
  };

  if (error) {
    return <div className="uni-page error">{error}</div>;
  }

  if (!university) {
    return <div className="uni-page loading">Loading...</div>;
  }

  return (
    <div className="uni-page">
      <div className="uni-page-actions">
        <button className="edit-btn" onClick={() => handleEdit(university.code)}>
          <PencilLine className="edit-icon" />
          Изменить
        </button>
        <button className="view-btn" onClick={toggleViewMode}>
          Вид: {viewMode === 'card' ? 'Карточный' : 'Полный'}
        </button>
      </div>

      {viewMode === 'card' ? (
        <UniversityCard
          logo={university.logo_url}
          name={university.name_ru}
          abbreviation={university.abbreviation_ru}
          address={university.address}
          code={university.code}
          studentCount={university.student_count}
          status={university.status}
          entScore={university.ent_score}
          qsScore={university.qs_score}
          onEdit={handleEdit}
        />
      ) : (
        <div className="uni-full-view">
          <h2>Основная информация об университете</h2>
          <div className="uni-details">
            <div className="uni-logo">
              <img src={university.logo_url} alt={`${university.name_ru} logo`} />
            </div>
            <div className="uni-info">
              <h3>Названия университета</h3>
              <p><strong>На казахском:</strong> {university.name_kz}</p>
              <p><strong>На русском:</strong> {university.name_ru}</p>
              <h3>Аббревиатуры</h3>
              <p><strong>На казахском:</strong> {university.abbreviation_kz}</p>
              <p><strong>На русском:</strong> {university.abbreviation_ru}</p>
              <h3>Общая информация</h3>
              <p><strong>Статус:</strong> {university.status}</p>
              <p><strong>Адрес:</strong> {university.address}</p>
              <p><strong>Код университета:</strong> {university.code}</p>
              <p><strong>Количество студентов:</strong> {university.student_count?.toLocaleString()}</p>
              <p><strong>Минимальный балл ЕНТ:</strong> {university.ent_score}</p>
              <p><strong>QS рейтинг:</strong> {university.qs_score}</p>
              <h3>Контакты</h3>
              <p><strong>Вебсайт:</strong> <a href={university.website} target="_blank" rel="noopener noreferrer">{university.website}</a></p>
              <p><strong>Телефон:</strong> {university.phone}</p>
              <p><strong>Email:</strong> {university.email}</p>
              <p><strong>WhatsApp:</strong> {university.whatsapp}</p>
              <h3>Дополнительно</h3>
              <p><strong>Точка на карте:</strong> {university.map_point}</p>
              <p><strong>Описание:</strong> {university.description}</p>
              <h3>Услуги</h3>
              <ul>
                {university.services?.map((service: string, index: number) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="uni-gallery">
            <h3>Галерея</h3>
            <div className="gallery-images">
              {/* Mock gallery images */}
              {[1, 2, 3].map((_, index) => (
                <img
                  key={index}
                  src={`https://via.placeholder.com/150?text=Gallery+${index + 1}`}
                  alt={`Gallery image ${index + 1}`}
                  className="gallery-image"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UniPage;