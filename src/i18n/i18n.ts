// src/i18n/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './en/firstPage.json';
import ru from './ru/firstPage.json';
import he from './he/firstPage.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
      he: { translation: he }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;