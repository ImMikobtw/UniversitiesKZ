import { createContext, useContext, useState, useEffect } from 'react';
import kzTranslations from '../languages/kz.json';
import ruTranslations from '../languages/ru.json';

interface LanguageContextType {
  language: 'kz' | 'ru';
  t: (key: string) => string;
  setLanguage: (lang: 'kz' | 'ru') => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: { [key: string]: { [key: string]: string } } = {
  kz: kzTranslations,
  ru: ruTranslations,
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<'kz' | 'ru'>(
    (localStorage.getItem('language') as 'kz' | 'ru') || 'ru'
  );

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string) => {
    return translations[language][key] || translations['ru'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, t, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};