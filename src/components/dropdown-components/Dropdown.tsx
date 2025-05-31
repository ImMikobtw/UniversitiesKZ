import { useState, useEffect } from "react";
import "../../styles/Auth.css";
import { getMockUniversities, type University } from "../../MockData"; 


type DropdownProps = {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
};

const Dropdown = ({ label, id, value, onChange }: DropdownProps) => {
  const [object, setObject] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getMockUniversities();
        setObject([{ value: "", label: "Выберите университет" }, ...data]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Что-то пошло не так");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="auth-input-wrapper">
      <label htmlFor={id} className="auth-label">
        {label}
      </label>
      {loading ? (
        <div className="auth-input auth-select">Загрузка...</div>
      ) : error ? (
        <div className="auth-input auth-select auth-error">{error}</div>
      ) : (
        <select
          id={id}
          className="auth-input auth-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={loading}
        >
          {object.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      )}
      {error && <span id={`${id}-error`} className="auth-error">{error}</span>}
    </div>
  );
};

export default Dropdown;