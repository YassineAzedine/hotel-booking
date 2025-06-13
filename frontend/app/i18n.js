// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationFR from './public/locales/fr/common.json';
import translationEN from './public/locales/en/common.json';
import translationAR from './public/locales/ar/common.json';

i18n.use(initReactI18next).init({
  resources: {
    fr: { translation: translationFR },
    en: { translation: translationEN },
    ar: { translation: translationAR },
  },
  lng: 'fr', // langue par défaut
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
