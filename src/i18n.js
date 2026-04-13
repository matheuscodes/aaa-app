import i18n from 'i18next';
import moment from 'moment';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  // load translation using http -> see /public/locales
  // learn more: https://github.com/i18next/i18next-http-backend
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
    supportedLngs: ['de', 'en'],

    fallbackNS: 'common',
    ns: ['common', 'login', 'assessment', 'season', 'training', 'home', 'report', 'terms', 'about', 'trainer'],

    debug: true,

    backend: {
      loadPath: 'locales/{{lng}}/{{ns}}.json',
      addPath: 'locales/missing/{{lng}}/{{ns}}.json',
    },

    interpolation: {
      formatSeparator: ',',
    },
  },
  (err) => {
    if (err) console.error(err);

    // i18next v26 formatter registry expects lowercase keys
    i18n.services.formatter.add('datelong', (value, lng, options) =>
      moment(value).format('MMMM Do YYYY')
    );
    i18n.services.formatter.add('datetimelong', (value, lng, options) =>
      moment(value).format('dddd, MMMM Do YYYY, h:mm a')
    );
    i18n.services.formatter.add('monthlong', (value, lng, options) =>
      moment(value).format('MMMM, YYYY')
    );
    i18n.services.formatter.add('floatshort', (value) =>
      typeof value === 'number' ? value.toFixed(2) : value
    );
  });

export default i18n;
