'use strict';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
var injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

var i18next = require('i18next');
var xhrBackend = require('i18next-xhr-backend');
var languageDetector = require('i18next-browser-languagedetector');

var PageSwitcher = require('app/common/PageSwitcher');

console.log("Loading");

var container = document.getElementById('aaa-baseLayout'); // eslint-disable-line
var pageTitle = container.className;

var xhrBackendOptions = {
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

var detectionOptions = {
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

i18next
  .use(languageDetector)
  .use(xhrBackend)
  .init({
    debug: true,
    saveMissing: true,
    fallbackLng: 'de',
    fallbackNS: 'common',
    ns: ['common'],
    detection: detectionOptions,
    backend: xhrBackendOptions
  });

var pageSwitcher = new PageSwitcher(i18next);
pageSwitcher.loadClient(pageTitle);

console.log("Loaded");
