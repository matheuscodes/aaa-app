const moment = require('moment');
const i18next = require('i18next');
const fsBackend = require('i18next-node-fs-backend');
const i18nextMiddleware = require('i18next-express-middleware');
const xhrBackend = require('i18next-xhr-backend');
const browserLanguageDetector = require('i18next-browser-languagedetector');

const fsBackendOptions = {
  loadPath: 'node_modules/aaa-languages/src/{{lng}}/{{ns}}.json',
  addPath: 'build/missing/{{lng}}/{{ns}}.json',
  jsonIndent: 2
};

const xhrBackendOptions = {
  loadPath: 'languages/{{lng}}/{{ns}}.json',
  addPath: 'languages/missing/{{lng}}/{{ns}}.json',

  // your backend server supports multiloading
  // /locales/resources.json?lng=de+en&ns=ns1+ns2
  allowMultiLoading: false

  // parse data after it has been fetched
  // in example use https://www.npmjs.com/package/json5
  // here it removes the letter a from the json (bad idea)
  // parse: function(data) { return data.replace(/a/g, ''); },

  // allow cross domain requests
  // crossDomain: false,

  // allow credentials on cross domain requests
  // withCredentials: false,

  // define a custom xhr function
  // can be used to support XDomainRequest in IE 8 and 9
  // ajax: function (url, options, callback, data) {}
};

const detectionServerOptions = {
  // order and from where user language should be detected
  order: ['cookie', 'header'],
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  // lookupSession: 'lng',
  // lookupPath: 'lng',
  // lookupFromPathIndex: 0,

  // cache user language
  caches: ['cookie']

  // optional expire and domain for set cookie
  // cookieExpirationDate: new Date(),
  // cookieDomain: 'myDomain'
};

const detectionClientOptions = {
  // order and from where user language should be detected
  order: ['querystring', 'cookie'/* , 'localStorage', 'navigator', 'htmlTag'*/],

  // keys or params to lookup language from
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  // lookupLocalStorage: 'i18nextLng',

  // cache user language on
  caches: ['cookie']

  // optional expire and domain for set cookie
  // cookieMinutes: 10,
  // cookieDomain: 'myDomain',

  // optional htmlTag with lang attribute, the default is:
  // htmlTag: document.documentElement
};

module.exports = {
  i18next,
  i18nextMiddleware
};

const translate = require('react-i18next').translate;

const translateConfig = {withRef: true, wait: false};

i18next.on('languageChanged', function(lng) {
  moment.locale(lng);
  // TODO add this to date pickers to get localized dialogs.
  module.exports.DateTimeFormat = new Intl.DateTimeFormat(lng);
});

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
const serverDebug = JSON.parse(process.env.i18nServerDebug);
const browserDebug = JSON.parse(process.env.i18nBrowserDebug);

if (typeof window === 'undefined') { // If on Node.js
  module.exports.i18next
    .use(i18nextMiddleware.LanguageDetector)
    .use(fsBackend)
    .init({
      debug: serverDebug,
      interpolation: {
        escapeValue: false // not needed for react!!
      },
      saveMissing: true,
      fallbackLng: 'en',
      fallbackNS: 'common',
      ns: ['common', 'login', 'assessment', 'season', 'training', 'home', 'report'],
      preload: ['en', 'de'],
      whitelist: ['en', 'de'],
      detection: detectionServerOptions,
      backend: fsBackendOptions,
      interpolation: {
        formatSeparator: ',',
        format: function(value, formatting, lng) {
          if (value instanceof Date) return moment(value).format(formatting);
          return value.toString();
        }
      }
    });
} else { // If on Browser
  module.exports.i18next
    .use(browserLanguageDetector)
    .use(xhrBackend)
    .init({
      debug: browserDebug,
      saveMissing: true,
      fallbackLng: 'en',
      fallbackNS: 'common',
      ns: ['common'],
      whitelist: ['en', 'de'],
      detection: detectionClientOptions,
      backend: xhrBackendOptions,
      interpolation: {
        formatSeparator: ',',
        format: formatter
      }
    });
}

module.exports.setupTranslation = function setupTranslation(namespaces,
                                                            component) {
  return translate(namespaces, translateConfig)(component);
};
