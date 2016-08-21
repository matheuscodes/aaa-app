//require('app-module-path').addPath(__dirname + '/src/app');
//process.env.NODE_ENV = 'production'

require('app-module-path').addPath(__dirname);
var express = require('express');
var http = require('http');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var jsx = require('node-jsx');

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
var injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

jsx.install();

var loginPage = require('./app/login/LoginPage.jsx');
var homePage = require('./app/homescreen/HomePage.jsx');
var trainingsPage = require('./app/trainings/TrainingsPage.jsx');
var assessmentsPage = require('./app/assessments/AssessmentsPage.jsx');
var reportsPage = require('app/reports/ReportsPage.jsx');
var seasonsPage = require('app/seasons/SeasonsPage.jsx');

var app = express();

app.use(express.static('build'));
app.use(express.static('src'));
app.use(express.static('content'));
app.use(express.static('node_modules/react-mdl/extra'));

app.get("/",function(req,res){
  var props = {
    languages: [{code:"de",name:"Deutsch"},{code:"en",name:"English"}],
    userAgent: req.headers['user-agent']
  }
  res.send(ReactDOMServer.renderToString(React.createElement(loginPage,props)));
});

app.get("/home",function(req,res){
  var props = {
    languages: [{code:"de",name:"Deutsch"},{code:"en",name:"English"}],
    userAgent: req.headers['user-agent']
  }
  res.send(ReactDOMServer.renderToString(React.createElement(homePage,props)));
});

app.get("/trainings",function(req,res){
  var props = {
    languages: [{code:"de",name:"Deutsch"},{code:"en",name:"English"}],
    userAgent: req.headers['user-agent']
  }
  res.send(ReactDOMServer.renderToString(React.createElement(trainingsPage,props)));
});

app.get("/assessments",function(req,res){
  var props = {
    languages: [{code:"de",name:"Deutsch"},{code:"en",name:"English"}],
    userAgent: req.headers['user-agent']
  }
  res.send(ReactDOMServer.renderToString(React.createElement(assessmentsPage,props)));
});

app.get("/reports",function(req,res){
  var props = {
    languages: [{code:"de",name:"Deutsch"},{code:"en",name:"English"}],
    userAgent: req.headers['user-agent']
  }
  res.send(ReactDOMServer.renderToString(React.createElement(reportsPage,props)));
});

app.get("/seasons",function(req,res){
  var props = {
    languages: [{code:"de",name:"Deutsch"},{code:"en",name:"English"}],
    userAgent: req.headers['user-agent']
  }
  res.send(ReactDOMServer.renderToString(React.createElement(seasonsPage,props)));
});

var server = http.createServer(app)
server.listen(9090);
console.log("Listening to 9090");
