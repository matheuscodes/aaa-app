//require('app-module-path').addPath(__dirname + '/src/app');
require('app-module-path').addPath(__dirname);

var express = require('express');
var http = require('http');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var jsx = require('node-jsx');

jsx.install();

var loginPage = require('./app/login/LoginPage.jsx');
var homePage = require('./app/homescreen/HomePage.jsx');

var app = express();

app.use(express.static('src'));
app.use(express.static('build'));
app.use(express.static('content'));

app.get("/",function(req,res){
  var props = {
    languages: [{code:"de",name:"Deutsch"},{code:"en",name:"English"}]
  }
  res.send(ReactDOMServer.renderToString(React.createElement(loginPage,props)));
});

app.get("/home",function(req,res){
  var props = {
    languages: [{code:"de",name:"Deutsch"},{code:"en",name:"English"}]
  }
  res.send(ReactDOMServer.renderToString(React.createElement(homePage,props)));
});

var server = http.createServer(app)
server.listen(9090);
