import { useState, useEffect } from 'react';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import Select from 'react-select';
import '../styles/AddUniversityPage.css';
import BackIcon from '../assets/icons/BackIcon.svg?react';
import { mockUniversities, mockSpecialties } from '../MockData';

interface FormData {
  nameKZ: string;
  nameRU: string;
  status: string;
  address: string;
  website: string;
  phone: string;
  email: string;
  whatsapp: string;
  code: string;
  abbreviationKZ: string;
  abbreviationRU: string;
  services: string[];
  logo: File | null;
  gallery: File[];
  mapPoint: string;
  description: string;
  universityId?: number;
  student_count?: number;
  ent_score?: number;
  qs_score?: string;
}

interface Specialty {
  code: string;
  name: string;
  description: string;
  entScore: number;
}

const serviceOptions = [
  { value: 'общежитие', label: 'Общежитие' },
  { value: 'бесплатный Wi-Fi', label: 'Бесплатный Wi-Fi' },
  { value: 'столовая', label: 'Столовая' },
  { value: 'библиотека', label: 'Библиотека' },
];

const AddUniversityPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'university' | 'specialties'>('university');
  const [formData, setFormData] = useState<FormData>({
    nameKZ: '',
    nameRU: '',
    status: '',
    address: '',
    website: '',
    phone: '',
    email: '',
    whatsapp: '',
    code: '',
    abbreviationKZ: '',
    abbreviationRU: '',
    services: [],
    logo: null,
    gallery: [],
    mapPoint: '',
    description: '',
    student_count: undefined,
    ent_score: undefined,
    qs_score: '',
  });
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [specialtyForm, setSpecialtyForm] = useState<Specialty>({
    code: '',
    name: '',
    description: '',
    entScore: 0,
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    if (code) {
      const uni = mockUniversities.find((u) => u.code === code);
      if (uni) {
        setFormData({
          ...formData,
          universityId: uni.id,
          nameKZ: uni.name_kz || '',
          nameRU: uni.name_ru || '',
          abbreviationKZ: uni.abbreviation_kz || '',
          abbreviationRU: uni.abbreviation_ru || '',
          status: uni.status || '',
          address: uni.address || '',
          website: uni.website || '',
          phone: uni.phone || '',
          email: uni.email || '',
          whatsapp: uni.whatsapp || '',
          code: uni.code || '',
          services: uni.services || [],
          mapPoint: uni.map_point || '',
          description: uni.description || '',
          student_count: uni.student_count,
          ent_score: uni.ent_score,
          qs_score: uni.qs_score || '',
        });
        setSpecialties(mockSpecialties.filter((s) => s.universityId === uni.id));
      }
    }
  }, [location.search]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'student_count' || name === 'ent_score' ? (value ? Number(value) : undefined) : value,
    }));
  };

  const handleServicesChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
    setFormData((prev) => ({ ...prev, services: selectedValues }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const files = e.target.files;
    if (field === 'logo' && files && files[0]) {
      setFormData((prev) => ({ ...prev, logo: files[0] }));
    } else if (field === 'gallery' && files) {
      setFormData((prev) => ({ ...prev, gallery: Array.from(files) }));
    }
  };

  const handleSubmitUniversity = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate saving university (no persistent storage in mock)
    if (!formData.universityId) {
      setFormData((prev) => ({ ...prev, universityId: 1 })); // Mock ID
    }
    setActiveTab('specialties');
  };

  const handleCancel = () => {
    navigate('/main/uni');
  };

  const handleSpecialtyInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSpecialtyForm((prev) => ({
      ...prev,
      [name]: name === 'entScore' ? Number(value) : value,
    }));
  };

  const handleAddSpecialty = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!specialtyForm.code || !specialtyForm.name || !formData.universityId) {
      alert('Пожалуйста, заполните код, название специальности и сохраните университет');
      return;
    }
    const newSpecialty = {
      universityId: formData.universityId,
      code: specialtyForm.code,
      name: specialtyForm.name,
      description: specialtyForm.description,
      entScore: specialtyForm.entScore,
    };
    setSpecialties((prev) => [...prev, newSpecialty]);
    setSpecialtyForm({ code: '', name: '', description: '', entScore: 0 });
  };

  return (
    <div className="add-university-page">
      <div className="page-header">
        <NavLink to="/main/uni" className="back-btn">
          <BackIcon className="back-icon" />
          Назад
        </NavLink>
        <h1>{formData.universityId ? 'Редактирование университета' : 'Добавление университета'}</h1>
      </div>

      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === 'university' ? 'active' : ''}`}
          onClick={() => setActiveTab('university')}
        >
          {formData.universityId ? 'Редактировать Университет' : 'Добавить Университет'}
        </button>
        <button
          className={`tab-btn ${activeTab === 'specialties' ? 'active' : ''}`}
          onClick={() => setActiveTab('specialties')}
          disabled={!formData.universityId}
        >
          Список Специальностей
        </button>
      </div>

      {activeTab === 'university' && (
        <form onSubmit={handleSubmitUniversity} className="add-university-form">
          <div className="form-content">
            <div className="form-group">
              <label>Название университета (KZ)</label>
              <input
                type="text"
                name="nameKZ"
                value={formData.nameKZ}
                onChange={handleInputChange}
                placeholder="Введите название..."
                required
              />
            </div>
            <div className="form-group">
              <label>Название университета (RU)</label>
              <input
                type="text"
                name="nameRU"
                value={formData.nameRU}
                onChange={handleInputChange}
                placeholder="Введите название..."
                required
              />
            </div>
            <div className="form-group">
              <label>Аббревиатура (KZ)</label>
              <input
                type="text"
                name="abbreviationKZ"
                value={formData.abbreviationKZ}
                onChange={handleInputChange}
                placeholder="Введите аббревиатуру..."
                required
              />
            </div>
            <div className="form-group">
              <label>Аббревиатура (RU)</label>
              <input
                type="text"
                name="abbreviationRU"
                value={formData.abbreviationRU}
                onChange={handleInputChange}
                placeholder="Введите аббревиатуру..."
                required
              />
            </div>
            <div className="form-group">
              <label>Статус</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
              >
                <option value="">Выберите статус</option>
                <option value="государственный">Государственный</option>
                <option value="автономный">Автономный</option>
                <option value="частный">Частный</option>
              </select>
            </div>
            <div className="form-group">
              <label>Адрес</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Введите адрес..."
                required
              />
            </div>
            <div className="form-group">
              <label>Вебсайт</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="Введите URL..."
              />
            </div>
            <div className="form-group">
              <label>Телефон</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Введите телефон..."
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Введите email..."
              />
            </div>
            <div className="form-group">
              <label>WhatsApp</label>
              <input
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleInputChange}
                placeholder="Введите номер WhatsApp..."
              />
            </div>
            <div className="form-group">
              <label>Код университета</label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                placeholder="Введите код..."
                required
              />
            </div>
            <div className="form-group">
              <label>Количество студентов</label>
              <input
                type="number"
                name="student_count"
                value={formData.student_count || ''}
                onChange={handleInputChange}
                placeholder="Введите количество студентов..."
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Минимальный балл ЕНТ</label>
              <input
                type="number"
                name="ent_score"
                value={formData.ent_score || ''}
                onChange={handleInputChange}
                placeholder="Введите балл ЕНТ..."
                min="0"
              />
            </div>
            <div className="form-group">
              <label>QS рейтинг</label>
              <input
                type="text"
                name="qs_score"
                value={formData.qs_score}
                onChange={handleInputChange}
                placeholder="Введите рейтинг QS (например, 301-350)..."
              />
            </div>
            <div className="form-group">
              <label>Логотип</label>
              <input
                type="file"
                name="logo"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'logo')}
              />
            </div>
            <div className="form-group">
              <label>Галерея</label>
              <input
                type="file"
                name="gallery"
                accept="image/*"
                multiple
                onChange={(e) => handleFileChange(e, 'gallery')}
              />
            </div>
            <div className="form-group">
              <label>Точка на карте</label>
              <input
                type="text"
                name="mapPoint"
                value={formData.mapPoint}
                onChange={handleInputChange}
                placeholder="Введите координаты или адрес..."
              />
            </div>
            <div className="form-group">
              <label>Описание</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Введите описание..."
                rows={4}
              />
            </div>
            <div className="form-group">
              <label>Услуги</label>
              <Select
                isMulti
                options={serviceOptions}
                value={serviceOptions.filter((option) => formData.services.includes(option.value))}
                onChange={handleServicesChange}
                placeholder="Выберите услуги..."
                className="services-select"
              />
            </div>
            <div className="form-actions">
              <button type="button" onClick={handleCancel} className="cancel-btn">
                Отмена
              </button>
              <button type="submit" className="save-btn">
                Сохранить и далее
              </button>
            </div>
          </div>
        </form>
      )}

      {activeTab === 'specialties' && (
        <div className="specialties-section">
          <form onSubmit={handleAddSpecialty} className="specialty-form">
            <div className="form-content">
              <div className="form-row">
                <div className="form-group">
                  <label>Код специальности</label>
                  <input
                    type="text"
                    name="code"
                    value={specialtyForm.code}
                    onChange={handleSpecialtyInputChange}
                    placeholder="Введите код..."
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Название специальности</label>
                  <input
                    type="text"
                    name="name"
                    value={specialtyForm.name}
                    onChange={handleSpecialtyInputChange}
                    placeholder="Введите название..."
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Описание</label>
                <textarea
                  name="description"
                  value={specialtyForm.description}
                  onChange={handleSpecialtyInputChange}
                  placeholder="Введите описание..."
                  rows={3}
                />
              </div>
              <div className="form-group">
                <label>Минимальный балл ЕНТ</label>
                <input
                  type="number"
                  name="entScore"
                  value={specialtyForm.entScore}
                  onChange={handleSpecialtyInputChange}
                  placeholder="Введите балл..."
                  min="0"
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="add-specialty-btn">
                  Добавить специальность
                </button>
              </div>
            </div>
          </form>

          <div className="specialties-list">
            <h2>Добавленные специальности</h2>
            {specialties.length === 0 ? (
              <p>Специальности пока не добавлены</p>
            ) : (
              specialties.map((specialty, index) => (
                <div key={index} className="specialty-item">
                  <h3>
                    {specialty.name} ({specialty.code})
                  </h3>
                  <p>{specialty.description || 'Описание отсутствует'}</p>
                  <p>Минимальный балл ЕНТ: {specialty.entScore}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddUniversityPage;