var React = require('react');
var ReactDOM = require('react-dom');
var ReactDOMServer = require('react-dom/server');

var baseHtml = require('app/common/BaseHtml');
var homePage = require('app/homescreen/HomePage');
var loginPage = require('app/login/LoginPage');
var trainingsPage = require('app/trainings/TrainingsPage');
var assessmentsPage = require('app/assessments/AssessmentsPage');
var reportsPage = require('app/reports/ReportsPage');
var seasonsPage = require('app/seasons/SeasonsPage');
var termsPage = require('app/static/TermsPage');
var aboutPage = require('app/static/AboutPage');

var trainerReportsPage = require('app/trainer/reports/TrainerReportsPage');

import { StyleProvider } from 'global/StyleProvider';

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
    case 'aboutPage':
      return aboutPage;
    case 'termsPage':
      return termsPage;
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
    case 'trainerReportsPage':
      return trainerReportsPage;
    default:
      console.error(new ReferenceError("Page not found!"));
      return undefined;
  }
};

// TODO find a better way to do universal rendering without conflict.
const getPageNamespaces = function(pageTitle) {
  switch (pageTitle) {
    case 'aboutPage':
      return ['common', 'about'];
    case 'termsPage':
      return ['common', 'terms'];
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
    case 'trainerReportsPage':
      return ['common', 'report', 'trainer'];
    default:
      console.error(new ReferenceError("Page not found!"));
      return [];
  }
};

function getPageUrlPath(pageTitle) {
  switch (pageTitle) {
    case 'aboutPage':
      return 'about';
    case 'termsPage':
      return 'terms';
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
    case 'trainerReportsPage':
      return 'trainer-reports';
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
    userAgent: 'Mozilla/5.0 (Fixed) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.125 Safari/537.36',
    styleProvider: new StyleProvider(navigator.userAgent),
    i18n: this.i18n,
  };

  props.container = getPageReactClass(pageTitle);
  this.i18n.loadNamespaces(getPageNamespaces(pageTitle), function(err, t) {
    if (!err) {
      props.title = props.i18n.t(['common:pageTitle.', pageTitle].join(''));

      const created = React.createElement(baseHtml, props);
      ReactDOM.render(created, renderParent);

      props.styleProvider.loadScreenSizes();

      const sizes = {}
      window.addEventListener('TextFieldBlurred_null', (event) => {
        const width = parseInt(window.innerWidth);
        const height = parseInt(window.innerHeight);
        if(sizes.height < height * 0.95 ||
           sizes.height > height * 1.05 ||
           sizes.width < width * 0.95 ||
           sizes.width > width * 1.05){
          ReactDOM.render(React.cloneElement(created,{}), renderParent);
          sizes.width = width;
          sizes.height = height;
        }
      });
      window.addEventListener('TextFieldFocused_null', (event) => {
        sizes.width = parseInt(window.innerWidth);
        sizes.height = parseInt(window.innerHeight);
      });
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
    userAgent: 'Mozilla/5.0 (Fixed) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.125 Safari/537.36',
    styleProvider: new StyleProvider(request.headers['user-agent']),
    i18n: request.i18n,
    title: request.i18n.t(['common:pageTitle.', pageTitle].join(''))
  };
  props.container = getPageReactClass(pageTitle);
  return ReactDOMServer.renderToString(React.createElement(baseHtml, props));
};

module.exports = PageSwitcher;
