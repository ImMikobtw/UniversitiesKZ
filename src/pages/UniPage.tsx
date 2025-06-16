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
      <div className="page-header">
        <h1>Информация об университете</h1>
        <div className="uni-page-actions">
          <button className="edit-btn" onClick={() => handleEdit(university.code)}>
            <PencilLine className="edit-icon" />
            Изменить
          </button>
          <button className="view-btn" onClick={toggleViewMode}>
            Вид: {viewMode === 'card' ? 'Карточный' : 'Полный'}
          </button>
        </div>
      </div>

      {viewMode === 'card' ? (
        <div className="uni-card-view">
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
        </div>
      ) : (
        <div className="uni-full-view">
          <section className="view-section">
            <h2>Названия и идентичность</h2>
            <div className="view-grid">
              <div className="view-group">
                <span className="label">Название (KZ):</span>
                <span>{university.name_kz}</span>
              </div>
              <div className="view-group">
                <span className="label">Название (RU):</span>
                <span>{university.name_ru}</span>
              </div>
              <div className="view-group">
                <span className="label">Аббревиатура (KZ):</span>
                <span>{university.abbreviation_kz}</span>
              </div>
              <div className="view-group">
                <span className="label">Аббревиатура (RU):</span>
                <span>{university.abbreviation_ru}</span>
              </div>
              <div className="view-group">
                <span className="label">Логотип:</span>
                <img src={university.logo_url} alt={`${university.name_ru} logo`} className="logo-image" />
              </div>
            </div>
          </section>

          <section className="view-section">
            <h2>Общая информация</h2>
            <div className="view-grid">
              <div className="view-group">
                <span className="label">Статус:</span>
                <span>{university.status}</span>
              </div>
              <div className="view-group">
                <span className="label">Адрес:</span>
                <span>{university.address}</span>
              </div>
              <div className="view-group">
                <span className="label">Код университета:</span>
                <span>{university.code}</span>
              </div>
              <div className="view-group">
                <span className="label">Количество студентов:</span>
                <span>{university.student_count?.toLocaleString()}</span>
              </div>
              <div className="view-group">
                <span className="label">Минимальный балл ЕНТ:</span>
                <span>{university.ent_score}</span>
              </div>
              <div className="view-group">
                <span className="label">QS рейтинг:</span>
                <span>{university.qs_score}</span>
              </div>
            </div>
          </section>

          <section className="view-section">
            <h2>Контактная информация</h2>
            <div className="view-grid">
              <div className="view-group">
                <span className="label">Вебсайт:</span>
                <a href={university.website} target="_blank" rel="noopener noreferrer">{university.website}</a>
              </div>
              <div className="view-group">
                <span className="label">Телефон:</span>
                <span>{university.phone}</span>
              </div>
              <div className="view-group">
                <span className="label">Email:</span>
                <span>{university.email}</span>
              </div>
              <div className="view-group">
                <span className="label">WhatsApp:</span>
                <span>{university.whatsapp}</span>
              </div>
            </div>
          </section>

          <section className="view-section">
            <h2>Дополнительная информация</h2>
            <div className="view-grid">
              <div className="view-group full-width">
                <span className="label">Точка на карте:</span>
                <span>{university.map_point}</span>
              </div>
              <div className="view-group full-width">
                <span className="label">Описание:</span>
                <span>{university.description}</span>
              </div>
            </div>
          </section>

          <section className="view-section">
            <h2>Услуги</h2>
            <ul className="services-list">
              {university.services?.map((service: string, index: number) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </section>

          <section className="view-section">
            <h2>Галерея</h2>
            <div className="gallery-grid">
              {[1, 2, 3].map((_, index) => (
                <img
                  key={index}
                  src={`https://via.placeholder.com/200?text=Gallery+${index + 1}`}
                  alt={`Gallery image ${index + 1}`}
                  className="gallery-image"
                />
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default UniPage;