import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Select from "react-select";
import "../styles/AddUniversityPage.css";
import BackIcon from '../assets/icons/BackIcon.svg?react'

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
}

interface Specialty {
  code: string;
  name: string;
  description: string;
  entScore: number;
}

const serviceOptions = [
  { value: "общежитие", label: "Общежитие" },
  { value: "бесплатный Wi-Fi", label: "Бесплатный Wi-Fi" },
  { value: "столовая", label: "Столовая" },
  { value: "библиотека", label: "Библиотека" },
];

const AddUniversityPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"university" | "specialties">("university");

  const [formData, setFormData] = useState<FormData>({
    nameKZ: "",
    nameRU: "",
    status: "",
    address: "",
    website: "",
    phone: "",
    email: "",
    whatsapp: "",
    code: "",
    abbreviationKZ: "",
    abbreviationRU: "",
    services: [],
    logo: null,
    gallery: [],
    mapPoint: "",
    description: "",
  });

  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [specialtyForm, setSpecialtyForm] = useState<Specialty>({
    code: "",
    name: "",
    description: "",
    entScore: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServicesChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
    setFormData((prev) => ({ ...prev, services: selectedValues }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const files = e.target.files;
    if (field === "logo" && files && files[0]) {
      setFormData((prev) => ({ ...prev, logo: files[0] }));
    } else if (field === "gallery" && files) {
      setFormData((prev) => ({ ...prev, gallery: Array.from(files) }));
    }
  };

  const handleSubmitUniversity = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("University Form submitted:", formData);
    navigate("/main/uni");
  };

  const handleCancel = () => {
    navigate("/main/uni");
  };

  const handleSpecialtyInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSpecialtyForm((prev) => ({
      ...prev,
      [name]: name === "entScore" ? Number(value) : value,
    }));
  };

  const handleAddSpecialty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!specialtyForm.code || !specialtyForm.name) {
      alert("Пожалуйста, заполните код и название специальности");
      return;
    }
    setSpecialties((prev) => [...prev, specialtyForm]);
    setSpecialtyForm({ code: "", name: "", description: "", entScore: 0 });
  };

  return (
    <div className="add-university-page">
      <div className="page-header">
        <NavLink to="/main/uni" className="back-btn">
          <BackIcon className='back-icon' />
          Назад
        </NavLink>
        <h1>Добавление университета</h1>
      </div>

      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === "university" ? "active" : ""}`}
          onClick={() => setActiveTab("university")}
        >
          Добавить Университет
        </button>
        <button
          className={`tab-btn ${activeTab === "specialties" ? "active" : ""}`}
          onClick={() => setActiveTab("specialties")}
        >
          Список Специальностей
        </button>
      </div>

      {activeTab === "university" && (
        <form onSubmit={handleSubmitUniversity} className="add-university-form">
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
            <label>Статус</label>
            <select name="status" value={formData.status} onChange={handleInputChange} required>
              <option value="">Выберите статус...</option>
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

          <div className="form-row">
            <div className="form-group">
              <label>Веб-сайт</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="Введите URL..."
              />
            </div>
            <div className="form-group">
              <label>Номер телефона</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Введите номер..."
              />
            </div>
          </div>

          <div className="form-row">
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
                placeholder="Введите номер..."
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Код</label>
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
          </div>

          <div className="form-group">
            <label>Сервисы</label>
            <Select
              isMulti
              options={serviceOptions}
              value={serviceOptions.filter((option) => formData.services.includes(option.value))}
              onChange={handleServicesChange}
              placeholder="Выберите сервисы..."
              className="services-select"
              classNamePrefix="react-select"
            />
          </div>

          <div className="form-group">
            <label>Логотип</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "logo")}
            />
            {formData.logo && <p>Выбран файл: {(formData.logo as File).name}</p>}
          </div>

          <div className="form-group">
            <label>Галерея</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFileChange(e, "gallery")}
            />
            {formData.gallery.length > 0 && (
              <p>Выбрано файлов: {formData.gallery.length}</p>
            )}
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
            <label>Описание в ВУЗе</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Введите описание..."
              rows={5}
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={handleCancel} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save & Next
            </button>
          </div>
        </form>
      )}

      {activeTab === "specialties" && (
        <div className="specialties-section">
          <form onSubmit={handleAddSpecialty} className="specialty-form">
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
          </form>

          <div className="specialties-list">
            <h2>Добавленные специальности</h2>
            {specialties.length === 0 ? (
              <p>Специальности пока не добавлены</p>
            ) : (
              specialties.map((specialty, index) => (
                <div key={index} className="specialty-item">
                  <h3>{specialty.name} ({specialty.code})</h3>
                  <p>{specialty.description || "Описание отсутствует"}</p>
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