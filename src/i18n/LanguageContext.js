import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('contabilita-language');
    return saved || 'en';
  });

  useEffect(() => {
    localStorage.setItem('contabilita-language', language);
  }, [language]);

  const t = (key, params = {}) => {
    let text = translations[language][key] || translations['en'][key] || key;
    
    // Replace placeholders like {name}, {amount}, etc.
    Object.keys(params).forEach(param => {
      text = text.replace(new RegExp(`\\{${param}\\}`, 'g'), params[param]);
    });
    
    return text;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'it' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
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

export default LanguageContext;

