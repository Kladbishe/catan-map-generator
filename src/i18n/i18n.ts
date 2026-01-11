// src/i18n/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enFirstPage from './en/firstPage.json';
import ruFirstPage from './ru/firstPage.json';
import heFirstPage from './he/firstPage.json';

import enGenerate from './en/generate.json';
import ruGenerate from './ru/generate.json';
import heGenerate from './he/generate.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          ...enFirstPage,
          ...enGenerate
        }
      },
      ru: {
        translation: {
          ...ruFirstPage,
          ...ruGenerate
        }
      },
      he: {
        translation: {
          ...heFirstPage,
          ...heGenerate
        }
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;