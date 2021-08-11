import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { Languages } from '../common/enums';
import dictionaries from '../dictionaries';

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
