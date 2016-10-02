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

function PageSwitcher(){}

function getPageReactClass(pageTitle){
  switch(pageTitle){
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
  }
  console.error(new ReferenceError("Page not found!"));
  return undefined;
}

PageSwitcher.prototype.switchTo = function switchTo(pageTitle) {
  var renderParent = document.getElementById('aaa-baseLayout').parentNode;
  //TODO move this to constants to share between server/app
  const props = {
    languages: [{code:"de",name:"Deutsch"},{code:"en",name:"English"}],
    switcher: this,
    userAgent: navigator.userAgent
  }
  ReactDOM.render(React.createElement(getPageReactClass(pageTitle),props),renderParent);
}

PageSwitcher.prototype.loadClient = function load(pageTitle) {
  var renderParent = document.getElementsByTagName('html')[0].parentNode;
  //TODO move this to constants to share between server/app
  const props = {
    languages: [{code:"de",name:"Deutsch"},{code:"en",name:"English"}],
    switcher: this,
    userAgent: navigator.userAgent
  }
  props.container = getPageReactClass(pageTitle);
  ReactDOM.render(React.createElement(baseHtml,props),renderParent);
}

PageSwitcher.prototype.serverString = function serverString(pageTitle,request) {
  //TODO move this to constants to share between server/app
  const props = {
    languages: [{code:"de",name:"Deutsch"},{code:"en",name:"English"}],
    switcher: this,
    userAgent: request.headers['user-agent']
  }
  props.container = getPageReactClass(pageTitle);
  return ReactDOMServer.renderToString(React.createElement(baseHtml,props));
}

module.exports = PageSwitcher;
