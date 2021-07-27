import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    resources: {
      en: {
        translation: {
          'Press on me': 'Press on me'
        }
      },
      ua: {
        translation: {
          'Press on me': 'Натисни на мене'
        }
      }

    }
  });

export default i18n;
