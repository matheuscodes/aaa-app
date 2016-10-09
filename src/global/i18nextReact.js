const i18next = require('i18next');
const fsBackend = require('i18next-node-fs-backend');
const i18nextMiddleware = require('i18next-express-middleware');
const xhrBackend = require('i18next-xhr-backend');
const browserLanguageDetector = require('i18next-browser-languagedetector');

const fsBackendOptions = {
  loadPath: 'content/languages/{{lng}}/{{ns}}.json',
  addPath: 'content/languages/missing/{{lng}}/{{ns}}.json',
  jsonIndent: 2
};

const xhrBackendOptions = {
  loadPath: '/languages/{{lng}}/{{ns}}.json',
  addPath: '/languages/missing/{{lng}}/{{ns}}.json',

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

const debug = false;

if (typeof window === 'undefined') { // If on Node.js
  module.exports.i18next
    .use(i18nextMiddleware.LanguageDetector)
    .use(fsBackend)
    .init({
      debug,
      interpolation: {
        escapeValue: false // not needed for react!!
      },
      saveMissing: true,
      fallbackLng: 'en',
      fallbackNS: 'common',
      ns: ['common', 'login'],
      preload: ['en', 'de'],
      whitelist: ['en', 'de'],
      detection: detectionServerOptions,
      backend: fsBackendOptions
    });
} else { // If on Browser
  module.exports.i18next
    .use(browserLanguageDetector)
    .use(xhrBackend)
    .init({
      debug: true,
      saveMissing: true,
      fallbackLng: 'en',
      fallbackNS: 'common',
      ns: ['common'],
      whitelist: ['en', 'de'],
      detection: detectionClientOptions,
      backend: xhrBackendOptions
    });
}

module.exports.setupTranslation = function setupTranslation(namespaces,
                                                            component) {
  return translate(namespaces, translateConfig)(component);
};
