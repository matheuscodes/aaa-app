import i18n from 'i18next';
import moment from 'moment';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';


function formatter(value, format, lng) {
  switch (format) {
    case 'dateTimeLong':
      return moment(value).format("dddd, MMMM Do YYYY, h:mm a");
    case 'dateLong':
      return moment(value).format("MMMM Do YYYY");
    case 'monthLong':
      return moment(value).format("MMMM, YYYY");
    case 'floatShort':
      return typeof value === 'number' ? value.toFixed(2) : value;
    default:
      return value;
  }
}

i18n
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    order: ['localStorage'],
    lookupLocalStorage: 'i18nextLng',
    caches: ['localStorage'],

    fallbackLng: 'de',
    whitelist: ['de', 'en'],
    checkWhitelist: true,

    fallbackNS: 'common',
    ns: ['common', 'login', 'assessment', 'season', 'training', 'home', 'report', 'terms', 'about', 'trainer'],

    debug: true,

    backend: {
      loadPath: 'locales/{{lng}}/{{ns}}.json',
      addPath: 'locales/missing/{{lng}}/{{ns}}.json',
    },

    interpolation: {
      formatSeparator: ',',
      format: formatter
    },
  });

export default i18n;
