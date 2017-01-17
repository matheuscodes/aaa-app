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

  if (typeof window !== 'undefined') {
    window.onpopstate = this.popSwitch.bind(this);
  }
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
      return ['common', 'home'];
    case 'loginPage':
      return ['common', 'login'];
    default:
      console.error(new ReferenceError("Page not found!"));
      return [];
  }
};

function getPageUrlPath(pageTitle) {
  switch (pageTitle) {
    case 'seasonsPage':
      return 'seasons';
    case 'reportsPage':
      return 'reports';
    case 'assessmentsPage':
      return 'assessments';
    case 'trainingsPage':
      return 'trainings';
    case 'homePage':
      return 'home';
    case 'loginPage':
      return 'login';
    default:
      console.error(new ReferenceError("Page not found!"));
      return [];
  }
}

PageSwitcher.prototype.getPageUrlPath = getPageUrlPath;

PageSwitcher.prototype.renderPage = function(pageTitle, callback) {
  // var renderParent = document.getElementById('aaa-baseLayout').parentNode;
  var renderParent = document.getElementsByTagName('html')[0].parentNode;
  // TODO move this to constants to share between server/app
  const props = {
    switcher: this,
    userAgent: false,
    i18n: this.i18n
  };

  props.container = getPageReactClass(pageTitle);
  this.i18n.loadNamespaces(getPageNamespaces(pageTitle), function(err, t) {
    if (!err) {
      ReactDOM.render(React.createElement(baseHtml, props), renderParent);
      callback();
      return;
    }
    console.error('Namespaces could not be loaded to switch!', err);
  });
};

PageSwitcher.prototype.switchTo = function switchTo(pageTitle) {
  this.renderPage(pageTitle, function() {
    window.history.pushState({pageTitle}, pageTitle, getPageUrlPath(pageTitle));
  });
};

PageSwitcher.prototype.popSwitch = function popSwitch(e) {
  if (e.state) {
    this.renderPage(e.state.pageTitle, function() {});
  }
};

PageSwitcher.prototype.loadClient = function loadClient(pageTitle) {
  this.renderPage(pageTitle, function() {
    window.history.pushState({pageTitle}, pageTitle, getPageUrlPath(pageTitle));
  });
};

PageSwitcher.prototype.serverString = function serverString(pageTitle,
                                                            request) {
  // TODO move this to constants to share between server/app
  const props = {
    switcher: this,
    userAgent: false,
    i18n: request.i18n
  };
  props.container = getPageReactClass(pageTitle);
  return ReactDOMServer.renderToString(React.createElement(baseHtml, props));
};

module.exports = PageSwitcher;
