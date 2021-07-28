import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import dictionaries from '../dictionaries';
import { Languages } from '../common/enums';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: Languages.UA,
    interpolation: {
      escapeValue: false
    },
    resources: dictionaries
  });

export default i18n;
