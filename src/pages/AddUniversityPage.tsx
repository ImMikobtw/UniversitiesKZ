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
  university_id?: number;
  uni_name_kz: string;
  uni_name_rus: string;
  uni_short_kz: string;
  uni_short_rus: string;
  uni_status: number;
  uni_address: string;
  uni_website: string;
  uni_phone_number: string;
  uni_email: string;
  uni_whatsapp: string;
  uni_code: string;
  uni_description: string;
  uni_description_kz: string;
  students_number?: number;
  ent_min?: number;
  qs_rate?: number;
  logo_path: string;
  gallery_path: string;
  map_point: string;
  cookies?: number;
  status_id: number;
}

interface Specialty {
  spec_id?: number;
  spec_name_kz: string;
  spec_name_rus: string;
  spec_name_eng: string;
  subjects: string;
  spec_code: string;
  spec_type: string;
  scholarship: number;
  spec_duration: number;
  ent_min: number;
  type_id: number;
  university_id: number;
}

const AddUniversityPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'university' | 'specialties'>('university');
  const [formData, setFormData] = useState<FormData>({
    uni_name_kz: '',
    uni_name_rus: '',
    uni_short_kz: '',
    uni_short_rus: '',
    uni_status: 1,
    uni_address: '',
    uni_website: '',
    uni_phone_number: '',
    uni_email: '',
    uni_whatsapp: '',
    uni_code: '',
    uni_description: '',
    uni_description_kz: '',
    ent_min: 0,
    logo_path: '',
    gallery_path: '',
    map_point: '',
    students_number: undefined,
    qs_rate: undefined,
    cookies: 0,
    status_id: 1,
  });
  
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [specialtyForm, setSpecialtyForm] = useState<Specialty>({
    spec_name_kz: '',
    spec_name_rus: '',
    spec_name_eng: '',
    subjects: '',
    spec_code: '',
    spec_type: 'бакалавриат',
    scholarship: 0,
    spec_duration: 4,
    ent_min: 0,
    type_id: 1,
    university_id: 0,
  });
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const university_id = queryParams.get('university_id');
    if (university_id) {
      api.get(`/api/public/universities/${university_id}`)
        .then((response) => {
          const uni = response.data;
          console.log('Loaded university data:', uni); // Отладка
          setFormData({
            university_id: uni.university_id,
            uni_name_kz: uni.uni_name_kz || '',
            uni_name_rus: uni.uni_name_rus || '',
            uni_short_kz: uni.uni_short_kz || '',
            uni_short_rus: uni.uni_short_rus || '',
            uni_status: uni.uni_status || 1,
            uni_address: uni.uni_address || '',
            uni_website: uni.uni_website || '',
            uni_phone_number: uni.uni_phone_number || '',
            uni_email: uni.uni_email || '',
            uni_whatsapp: uni.uni_whatsapp || '',
            uni_code: uni.uni_code || '',
            uni_description: uni.uni_description || '',
            uni_description_kz: uni.uni_description_kz || '',
            students_number: uni.students_number,
            qs_rate: uni.qs_rate,
            logo_path: uni.logo_path || '',
            gallery_path: uni.gallery_path || '',
            map_point: uni.map_point || '',
            cookies: uni.cookies || 0,
            status_id: uni.status_id || 1,
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
    console.log(`Input changed: ${name}=${value}`); // Отладка
    setFormData((prev) => ({
      ...prev,
      [name]: (name === 'students_number' || name === 'qs_rate' || name === 'uni_status' || name === 'status_id' || name === 'cookies') 
        ? (value ? Number(value) : undefined) 
        : value,
    }));
  };

  const validateUniversityForm = () => {
    if (!formData.uni_name_kz || !formData.uni_name_rus || !formData.uni_short_kz || 
        !formData.uni_short_rus || !formData.uni_address || !formData.uni_code || 
        !formData.uni_phone_number || !formData.uni_email) {
      return 'Please fill in all required fields.';
    }
    if (formData.uni_email && !formData.uni_email.includes('@')) {
      return 'Please enter a valid email address.';
    }
    if (formData.uni_website && !formData.uni_website.match(/^https?:\/\/.+/)) {
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
        university_id: formData.university_id,
        uni_name_kz: formData.uni_name_kz,
        uni_name_rus: formData.uni_name_rus,
        uni_short_kz: formData.uni_short_kz,
        uni_short_rus: formData.uni_short_rus,
        uni_status: formData.uni_status,
        uni_address: formData.uni_address,
        uni_website: formData.uni_website,
        uni_phone_number: formData.uni_phone_number,
        uni_email: formData.uni_email,
        uni_whatsapp: formData.uni_whatsapp,
        uni_code: formData.uni_code,
        uni_description: formData.uni_description,
        uni_description_kz: formData.uni_description_kz,
        students_number: formData.students_number,
        qs_rate: formData.qs_rate,
        logo_path: formData.logo_path,
        gallery_path: formData.gallery_path,
        map_point: formData.map_point,
        cookies: formData.cookies,
        status_id: formData.status_id,
      };

      if (formData.university_id) {
        // Для редактирования используем PUT (нужен соответствующий эндпоинт в бэкенде)
        await api.put(`/api/universities/${formData.university_id}`, data);
      } else {
        const response = await api.post('/api/universities', data);
        setFormData((prev) => ({ ...prev, university_id: response.data.university_id }));
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

  const handleSpecialtyInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(`Specialty input changed: ${name}=${value}`); // Отладка
    setSpecialtyForm((prev) => ({
      ...prev,
      [name]: (name === 'ent_min' || name === 'scholarship' || name === 'spec_duration' || name === 'type_id' || name === 'university_id') 
        ? Number(value) 
        : value,
    }));
  };

  const validateSpecialtyForm = () => {
    if (!specialtyForm.spec_code || !specialtyForm.spec_name_rus || !specialtyForm.spec_name_kz) {
      return 'Please fill in code and names for the specialty.';
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
    if (!formData.university_id) {
      setError('Please save the university first.');
      return;
    }

    try {
      const newSpecialty = {
        spec_name_kz: specialtyForm.spec_name_kz,
        spec_name_rus: specialtyForm.spec_name_rus,
        spec_name_eng: specialtyForm.spec_name_eng,
        subjects: specialtyForm.subjects,
        spec_code: specialtyForm.spec_code,
        spec_type: specialtyForm.spec_type,
        scholarship: specialtyForm.scholarship,
        spec_duration: specialtyForm.spec_duration,
        ent_min: specialtyForm.ent_min,
        type_id: specialtyForm.type_id,
        university_id: formData.university_id,
      };

      await api.post('/api/specialities', newSpecialty);
      setSpecialties((prev) => [...prev, {
        ...newSpecialty,
        university_id: formData.university_id!,
      }]);
      setSpecialtyForm({
        spec_name_kz: '',
        spec_name_rus: '',
        spec_name_eng: '',
        subjects: '',
        spec_code: '',
        spec_type: 'бакалавриат',
        scholarship: 0,
        spec_duration: 4,
        ent_min: 0,
        type_id: 1,
        university_id: formData.university_id!,
      });
    } catch (err: unknown) {
      const error = err as AxiosError<BackendError>;
      setError(error.response?.data?.error || 'Failed to add specialty');
    }
  };

  // Маппинг значений uni_status для отображения в select
  const statusOptions = [
    { value: 1, label: 'Государственный' },
    { value: 2, label: 'Автономный' },
    { value: 3, label: 'Частный' },
  ];

  return (
    <div className="add-university-page">
      <div className="page-header">
        <NavLink to="/main/uni" className="back-btn">
          <BackIcon className="back-icon" />
          Назад
        </NavLink>
        <h1>{formData.university_id ? 'Редактирование университета' : 'Добавление университета'}</h1>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === 'university' ? 'active' : ''}`}
          onClick={() => setActiveTab('university')}
        >
          <Stack className="uni-icon" />
          {formData.university_id ? 'Редактировать Университет' : 'Добавить Университет'}
        </button>
        <button
          className={`tab-btn ${activeTab === 'specialties' ? 'active' : ''}`}
          onClick={() => setActiveTab('specialties')}
          disabled={!formData.university_id}
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
                    name="uni_name_kz"
                    value={formData.uni_name_kz}
                    onChange={handleInputChange}
                    placeholder="Введите название на казахском"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Название (RU)</label>
                  <input
                    type="text"
                    name="uni_name_rus"
                    value={formData.uni_name_rus}
                    onChange={handleInputChange}
                    placeholder="Введите название на русском"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Аббревиатура (KZ)</label>
                  <input
                    type="text"
                    name="uni_short_kz"
                    value={formData.uni_short_kz}
                    onChange={handleInputChange}
                    placeholder="Введите аббревиатуру на казахском"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Аббревиатура (RU)</label>
                  <input
                    type="text"
                    name="uni_short_rus"
                    value={formData.uni_short_rus}
                    onChange={handleInputChange}
                    placeholder="Введите аббревиатуру на русском"
                    required
                  />
                </div>
                <div className="form-group full-width">
                  <label>Статус</label>
                  <select
                    name="uni_status"
                    value={formData.uni_status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Выберите статус</option>
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group full-width">
                  <label>Адрес</label>
                  <input
                    type="text"
                    name="uni_address"
                    value={formData.uni_address}
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
                    name="uni_website"
                    value={formData.uni_website}
                    onChange={handleInputChange}
                    placeholder="Введите URL вебсайта"
                  />
                </div>
                <div className="form-group">
                  <label>Телефон</label>
                  <input
                    type="tel"
                    name="uni_phone_number"
                    value={formData.uni_phone_number}
                    onChange={handleInputChange}
                    placeholder="Введите номер телефона"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="uni_email"
                    value={formData.uni_email}
                    onChange={handleInputChange}
                    placeholder="Введите email"
                  />
                </div>
                <div className="form-group">
                  <label>WhatsApp</label>
                  <input
                    type="tel"
                    name="uni_whatsapp"
                    value={formData.uni_whatsapp}
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
                    name="uni_code"
                    value={formData.uni_code}
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
                    type="number"
                    name="qs_rate"
                    value={formData.qs_rate || ''}
                    onChange={handleInputChange}
                    placeholder="Введите рейтинг QS"
                    min="0"
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
                    name="uni_description"
                    value={formData.uni_description}
                    onChange={handleInputChange}
                    placeholder="Введите описание университета"
                    rows={5}
                  />
                </div>
                <div className="form-group full-width">
                  <label>Описание (KZ)</label>
                  <textarea
                    name="uni_description_kz"
                    value={formData.uni_description_kz}
                    onChange={handleInputChange}
                    placeholder="Введите описание на казахском"
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
                      name="spec_code"
                      value={specialtyForm.spec_code}
                      onChange={handleSpecialtyInputChange}
                      placeholder="Введите код специальности"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Название (KZ)</label>
                    <input
                      type="text"
                      name="spec_name_kz"
                      value={specialtyForm.spec_name_kz}
                      onChange={handleSpecialtyInputChange}
                      placeholder="Введите название на казахском"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Название (RU)</label>
                    <input
                      type="text"
                      name="spec_name_rus"
                      value={specialtyForm.spec_name_rus}
                      onChange={handleSpecialtyInputChange}
                      placeholder="Введите название на русском"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Название (ENG)</label>
                    <input
                      type="text"
                      name="spec_name_eng"
                      value={specialtyForm.spec_name_eng}
                      onChange={handleSpecialtyInputChange}
                      placeholder="Введите название на английском"
                    />
                  </div>
                  <div className="form-group">
                    <label>Предметы</label>
                    <input
                      type="text"
                      name="subjects"
                      value={specialtyForm.subjects}
                      onChange={handleSpecialtyInputChange}
                      placeholder="Введите предметы"
                    />
                  </div>
                  <div className="form-group">
                    <label>Тип специальности</label>
                    <select
                      name="spec_type"
                      value={specialtyForm.spec_type}
                      onChange={handleSpecialtyInputChange}
                      required
                    >
                      <option value="бакалавриат">Бакалавриат</option>
                      <option value="магистратура">Магистратура</option>
                      <option value="докторантура">Докторантура</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Стипендия</label>
                    <input
                      type="number"
                      name="scholarship"
                      value={specialtyForm.scholarship}
                      onChange={handleSpecialtyInputChange}
                      placeholder="Введите сумму стипендии"
                      min="0"
                    />
                  </div>
                  <div className="form-group">
                    <label>Продолжительность (годы)</label>
                    <input
                      type="number"
                      name="spec_duration"
                      value={specialtyForm.spec_duration}
                      onChange={handleSpecialtyInputChange}
                      placeholder="Введите продолжительность"
                      min="1"
                    />
                  </div>
                  <div className="form-group">
                    <label>Минимальный балл ЕНТ</label>
                    <input
                      type="number"
                      name="ent_min"
                      value={specialtyForm.ent_min}
                      onChange={handleSpecialtyInputChange}
                      placeholder="Введите балл ЕНТ"
                      min="0"
                    />
                  </div>
                  <div className="form-group">
                    <label>Тип ID</label>
                    <input
                      type="number"
                      name="type_id"
                      value={specialtyForm.type_id}
                      onChange={handleSpecialtyInputChange}
                      placeholder="Введите ID типа"
                      min="1"
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
                    {specialty.spec_name_rus} ({specialty.spec_code})
                  </h3>
                  <p>Название (KZ): {specialty.spec_name_kz}</p>
                  <p>Название (ENG): {specialty.spec_name_eng}</p>
                  <p>Минимальный балл ЕНТ: {specialty.ent_min}</p>
                  <p>Тип: {specialty.spec_type}</p>
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