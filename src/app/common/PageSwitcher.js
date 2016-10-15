var React = require('react');
var ReactDOM = require('react-dom');
var ReactDOMServer = require('react-dom/server');

var baseHtml = require('app/common/BaseHtml.jsx');
var homePage = require('app/homescreen/HomePage.jsx');
var loginPage = require('app/login/LoginPage.jsx');
var trainingsPage = require('app/trainings/TrainingsPage.jsx');
var assessmentsPage = require('app/assessments/AssessmentsPage.jsx');
var reportsPage = require('app/reports/ReportsPage.jsx');
var seasonsPage = require('app/seasons/SeasonsPage.jsx');

/**
 * Controller for switching between pages.
 * @param {Object} i18next controller to translations
 * @author Matheus
 * @since 1.0.0
 */
function PageSwitcher(i18next) {
  this.i18n = i18next;
}

const getPageReactClass = function(pageTitle) {
  switch (pageTitle) {
    case 'seasonsPage':
      return seasonsPage;
    case 'reportsPage':
      return reportsPage;
    case 'assessmentsPage':
      return assessmentsPage;
    case 'trainingsPage':
      return trainingsPage;
    case 'homePage':
      return homePage;
    case 'loginPage':
      return loginPage;
    default:
      console.error(new ReferenceError("Page not found!"));
      return undefined;
  }
};

// TODO find a better way to do universal rendering without conflict.
const getPageNamespaces = function(pageTitle) {
  switch (pageTitle) {
    case 'seasonsPage':
      return ['common', 'season'];
    case 'reportsPage':
      return ['common', 'season', 'report'];
    case 'assessmentsPage':
      return ['common', 'assessment'];
    case 'trainingsPage':
      return ['common', 'training'];
    case 'homePage':
      return [];
    case 'loginPage':
      return ['common', 'login'];
    default:
      console.error(new ReferenceError("Page not found!"));
      return [];
  }
};

PageSwitcher.prototype.switchTo = function switchTo(pageTitle) {
  // var renderParent = document.getElementById('aaa-baseLayout').parentNode;
  var renderParent = document.getElementsByTagName('html')[0].parentNode;
  // TODO move this to constants to share between server/app
  const props = {
    switcher: this,
    userAgent: navigator.userAgent,
    i18n: this.i18n
  };

  props.container = getPageReactClass(pageTitle);
  this.i18n.loadNamespaces(getPageNamespaces(pageTitle), function(err, t) {
    if (!err) {
      ReactDOM.render(React.createElement(baseHtml, props), renderParent);
      return;
    }
    console.error('Namespaces could not be loaded to switch!', err);
  });
};

PageSwitcher.prototype.loadClient = function load(pageTitle) {
  var renderParent = document.getElementsByTagName('html')[0].parentNode;
  // TODO move this to constants to share between server/app
  const props = {
    switcher: this,
    userAgent: navigator.userAgent,
    i18n: this.i18n
  };
  props.container = getPageReactClass(pageTitle);
  this.i18n.loadNamespaces(getPageNamespaces(pageTitle), function(err, t) {
    if (!err) {
      ReactDOM.render(React.createElement(baseHtml, props), renderParent);
      return;
    }
    console.error('Namespaces could not be loaded to render!', err);
  });
};

PageSwitcher.prototype.serverString = function serverString(pageTitle,
                                                            request) {
  // TODO move this to constants to share between server/app
  const props = {
    switcher: this,
    userAgent: request.headers['user-agent'],
    i18n: request.i18n
  };
  props.container = getPageReactClass(pageTitle);
  return ReactDOMServer.renderToString(React.createElement(baseHtml, props));
};

module.exports = PageSwitcher;
