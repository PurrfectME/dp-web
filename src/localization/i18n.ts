import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getSettings } from '../services/settingsProvider';
import translationEN from './locales/en/translation.json';
import translationRu from './locales/ru/translation.json';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: getSettings().language,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: translationEN
      },
      ru: {
        translation: translationRu
      }
    }
  });

export default i18n;
