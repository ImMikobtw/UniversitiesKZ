import { useState, useEffect } from 'react';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import { AxiosError } from 'axios';
import '../styles/AddUniversityPage.css';
import api from '../api/axios';
import BackIcon from '../assets/icons/BackIcon.svg?react';
import Stack from '../assets/icons/Stack.svg?react';
import Clipboard from '../assets/icons/Clipboard.svg?react';

interface BackendError {
  error?: string;
}

interface FormData {
  name_kz: string;
  name_rus: string;
  status: string;
  adress: string;
  website: string;
  phone_number: string;
  email: string;
  whatsapp: string;
  code: string;
  short_kz: string;
  short_rus: string;
  logo_path: string;
  gallery_path: string;
  map_point: string;
  description: string;
  uni_id?: number;
  students_number?: number;
  ent_min?: number;
  qs_rate?: string;
}

interface Specialty {
  code: string;
  name: string;
  description: string;
  entScore: number;
}

const AddUniversityPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'university' | 'specialties'>('university');
  const [formData, setFormData] = useState<FormData>({
    name_kz: '',
    name_rus: '',
    status: '',
    adress: '',
    website: '',
    phone_number: '',
    email: '',
    whatsapp: '',
    code: '',
    short_kz: '',
    short_rus: '',
    logo_path: '',
    gallery_path: '',
    map_point: '',
    description: '',
    students_number: undefined,
    ent_min: undefined,
    qs_rate: '',
  });
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [specialtyForm, setSpecialtyForm] = useState<Specialty>({
    code: '',
    name: '',
    description: '',
    entScore: 0,
  });
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const uni_id = queryParams.get('uni_id');
    if (uni_id) {
      api.get(`/api/universities/${uni_id}`)
        .then((response) => {
          setFormData({
            uni_id: response.data.uni_id,
            name_kz: response.data.uni_name_kz || '',
            name_rus: response.data.uni_name_rus || '',
            short_kz: response.data.uni_short_kz || '',
            short_rus: response.data.uni_short_rus || '',
            status: response.data.uni_status || '',
            adress: response.data.uni_adress || '',
            website: response.data.uni_website || '',
            phone_number: response.data.uni_phone_number || '',
            email: response.data.uni_email || '',
            whatsapp: response.data.uni_whatsapp || '',
            code: response.data.uni_code || '',
            map_point: response.data.map_point || '',
            description: response.data.uni_description || '',
            students_number: response.data.students_number,
            ent_min: response.data.ent_min,
            qs_rate: response.data.qs_rate || '',
            logo_path: response.data.logo_path || '',
            gallery_path: response.data.gallery_path || '',
          });
          // Fetch specialties for this university
          api.get(`/api/specialities?uni_id=${uni_id}`)
            .then((specResponse) => {
              setSpecialties(specResponse.data.map((spec: any) => ({
                code: spec.spec_code,
                name: spec.spec_name_rus,
                description: spec.subjects,
                entScore: spec.ent_min || 0,
              })));
            })
            .catch(() => {
              setError('Failed to load specialties');
            });
        })
        .catch((err: unknown) => {
          const error = err as AxiosError<BackendError>;
          setError(error.response?.data?.error || 'Failed to load university data');
        });
    }
  }, [location.search]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'students_number' || name === 'ent_min' ? (value ? Number(value) : undefined) : value,
    }));
  };

  const validateUniversityForm = () => {
    if (!formData.name_kz || !formData.name_rus || !formData.short_kz || !formData.short_rus || !formData.status || !formData.adress || !formData.code) {
      return 'Please fill in all required fields.';
    }
    if (formData.email && !formData.email.includes('@')) {
      return 'Please enter a valid email address.';
    }
    if (formData.website && !formData.website.match(/^https?:\/\/.+/)) {
      return 'Please enter a valid website URL.';
    }
    return '';
  };

  const handleSubmitUniversity = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    const validationError = validateUniversityForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const data = {
        uni_id: formData.uni_id,
        uni_name_kz: formData.name_kz,
        uni_name_rus: formData.name_rus,
        uni_short_kz: formData.short_kz,
        uni_short_rus: formData.short_rus,
        uni_status: formData.status,
        uni_adress: formData.adress,
        uni_website: formData.website,
        uni_phone_number: formData.phone_number,
        uni_email: formData.email,
        uni_whatsapp: formData.whatsapp,
        uni_code: formData.code,
        students_number: formData.students_number,
        ent_min: formData.ent_min,
        qs_rate: formData.qs_rate,
        logo_path: formData.logo_path,
        gallery_path: formData.gallery_path,
        map_point: formData.map_point,
        uni_description: formData.description,
      };
      if (formData.uni_id) {
        await api.put(`/api/universities/${formData.uni_id}`, data);
      } else {
        const response = await api.post('/api/universities', data);
        setFormData((prev) => ({ ...prev, uni_id: response.data.uni_id }));
      }
      setActiveTab('specialties');
    } catch (err: unknown) {
      const error = err as AxiosError<BackendError>;
      setError(error.response?.data?.error || 'Failed to save university');
    }
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

  const validateSpecialtyForm = () => {
    if (!specialtyForm.code || !specialtyForm.name) {
      return 'Please fill in code and name for the specialty.';
    }
    return '';
  };

  const handleAddSpecialty = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    const validationError = validateSpecialtyForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    if (!formData.uni_id) {
      setError('Please save the university first.');
      return;
    }
    try {
      const newSpecialty = {
        spec_name_rus: specialtyForm.name,
        spec_code: specialtyForm.code,
        subjects: specialtyForm.description,
        spec_type: 'бакалавриат',
        scholarship: 0,
        spec_duration: 4,
        uni_id: formData.uni_id,
      };
      await api.post('/api/specialities', newSpecialty);
      setSpecialties((prev) => [...prev, {
        code: specialtyForm.code,
        name: specialtyForm.name,
        description: specialtyForm.description,
        entScore: specialtyForm.entScore,
      }]);
      setSpecialtyForm({ code: '', name: '', description: '', entScore: 0 });
    } catch (err: unknown) {
      const error = err as AxiosError<BackendError>;
      setError(error.response?.data?.error || 'Failed to add specialty');
    }
  };

  return (
    <div className="add-university-page">
      <div className="page-header">
        <NavLink to="/main/uni" className="back-btn">
          <BackIcon className="back-icon" />
          Назад
        </NavLink>
        <h1>{formData.uni_id ? 'Редактирование университета' : 'Добавление университета'}</h1>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === 'university' ? 'active' : ''}`}
          onClick={() => setActiveTab('university')}
        >
          <Stack className="uni-icon" />
          {formData.uni_id ? 'Редактировать Университет' : 'Добавить Университет'}
        </button>
        <button
          className={`tab-btn ${activeTab === 'specialties' ? 'active' : ''}`}
          onClick={() => setActiveTab('specialties')}
          disabled={!formData.uni_id}
        >
          <Clipboard className="specialty-icon" />
          Список Специальностей
        </button>
      </div>

      {activeTab === 'university' && (
        <form onSubmit={handleSubmitUniversity} className="add-university-form">
          <div className="form-content">
            <section className="form-section">
              <h2>Основная информация</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>Название (KZ)</label>
                  <input
                    type="text"
                    name="name_kz"
                    value={formData.name_kz}
                    onChange={handleInputChange}
                    placeholder="Введите название на казахском"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Название (RU)</label>
                  <input
                    type="text"
                    name="name_rus"
                    value={formData.name_rus}
                    onChange={handleInputChange}
                    placeholder="Введите название на русском"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Аббревиатура (KZ)</label>
                  <input
                    type="text"
                    name="short_kz"
                    value={formData.short_kz}
                    onChange={handleInputChange}
                    placeholder="Введите аббревиатуру на казахском"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Аббревиатура (RU)</label>
                  <input
                    type="text"
                    name="short_rus"
                    value={formData.short_rus}
                    onChange={handleInputChange}
                    placeholder="Введите аббревиатуру на русском"
                    required
                  />
                </div>
                <div className="form-group full-width">
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
                <div className="form-group full-width">
                  <label>Адрес</label>
                  <input
                    type="text"
                    name="adress"
                    value={formData.adress}
                    onChange={handleInputChange}
                    placeholder="Введите адрес университета"
                    required
                  />
                </div>
              </div>
            </section>

            <section className="form-section">
              <h2>Контактная информация</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>Вебсайт</label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="Введите URL вебсайта"
                  />
                </div>
                <div className="form-group">
                  <label>Телефон</label>
                  <input
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    placeholder="Введите номер телефона"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Введите email"
                  />
                </div>
                <div className="form-group">
                  <label>WhatsApp</label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    placeholder="Введите номер WhatsApp"
                  />
                </div>
              </div>
            </section>

            <section className="form-section">
              <h2>Дополнительная информация</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>Код университета</label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    placeholder="Введите код университета"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Количество студентов</label>
                  <input
                    type="number"
                    name="students_number"
                    value={formData.students_number || ''}
                    onChange={handleInputChange}
                    placeholder="Введите количество студентов"
                    min="0"
                  />
                </div>
                <div className="form-group">
                  <label>Минимальный балл ЕНТ</label>
                  <input
                    type="number"
                    name="ent_min"
                    value={formData.ent_min || ''}
                    onChange={handleInputChange}
                    placeholder="Введите балл ЕНТ"
                    min="0"
                  />
                </div>
                <div className="form-group">
                  <label>QS рейтинг</label>
                  <input
                    type="text"
                    name="qs_rate"
                    value={formData.qs_rate}
                    onChange={handleInputChange}
                    placeholder="Введите рейтинг QS (например, 301-350)"
                  />
                </div>
                <div className="form-group full-width">
                  <label>Точка на карте</label>
                  <input
                    type="text"
                    name="map_point"
                    value={formData.map_point}
                    onChange={handleInputChange}
                    placeholder="Введите координаты или адрес"
                  />
                </div>
                <div className="form-group full-width">
                  <label>Описание</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Введите описание университета"
                    rows={5}
                  />
                </div>
              </div>
            </section>

            <section className="form-section">
              <h2>Медиа</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>URL логотипа</label>
                  <input
                    type="text"
                    name="logo_path"
                    value={formData.logo_path}
                    onChange={handleInputChange}
                    placeholder="Введите URL логотипа"
                  />
                </div>
                <div className="form-group">
                  <label>URL галереи</label>
                  <input
                    type="text"
                    name="gallery_path"
                    value={formData.gallery_path}
                    onChange={handleInputChange}
                    placeholder="Введите URL галереи"
                  />
                </div>
              </div>
            </section>

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
              <section className="form-section">
                <h2>Добавить специальность</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Код специальности</label>
                    <input
                      type="text"
                      name="code"
                      value={specialtyForm.code}
                      onChange={handleSpecialtyInputChange}
                      placeholder="Введите код специальности"
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
                      placeholder="Введите название специальности"
                      required
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Описание</label>
                    <textarea
                      name="description"
                      value={specialtyForm.description}
                      onChange={handleSpecialtyInputChange}
                      placeholder="Введите описание специальности"
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
                      placeholder="Введите балл ЕНТ"
                      min="0"
                    />
                  </div>
                </div>
              </section>
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