import { useState, useEffect } from 'react';
import EnglishTranslations from '../translations/English.json';
import HindiTranslations from '../translations/Hindi.json';
import MarathiTranslations from '../translations/Marathi.json';

// Import other translations as needed...

const useLanguage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    // Select the appropriate translations based on the selected language
    const selectedTranslations = getTranslations(selectedLanguage);
    setTranslations(selectedTranslations);
  }, [selectedLanguage]);

  const getTranslations = (language) => {
    switch (language) {
      case 'English':
        return englishTranslations;
      case 'Hindi':
        return HindiTranslations;
      case 'Marathi':
        return MarathiTranslations;
      // Add cases for other languages as needed...
      default:
        return englishTranslations; // Default to English
    }
  };

  return { translations, selectedLanguage, setSelectedLanguage };
};

export default useLanguage;

