import { useLanguage } from '../context/LanguageContext';
import '../styles/LanguageToggler.css';

const LanguageToggler = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="language-toggler">
      <button
        className={`lang-btn ${language === 'kz' ? 'active' : ''}`}
        onClick={() => setLanguage('kz')}
      >
        Қазақша
      </button>
      <button
        className={`lang-btn ${language === 'ru' ? 'active' : ''}`}
        onClick={() => setLanguage('ru')}
      >
        Русский
      </button>
    </div>
  );
};

export default LanguageToggler;