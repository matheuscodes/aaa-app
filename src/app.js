'use strict'

console.log("Loading");

var React = require('react');
var ReactDOM = require('react-dom');


var homePage = require('app/homescreen/HomePage.jsx');
var loginPage = require('app/login/LoginPage.jsx');
var trainingsPage = require('app/trainings/TrainingsPage.jsx');

var bodies = document.getElementsByTagName('body');
if(bodies.length < 1 || bodies.length > 1){
  console.log("Bodies:",bodies);
  throw "Error with HTML rendered body";
}

var body = bodies[0];

//TODO move this to constants to share between server/app
var props = {
  languages: [{code:"de",name:"Deutsch"},{code:"en",name:"English"}]
}

var renderParent = document.getElementsByTagName('html')[0].parentNode;

switch(body.className){
  case 'aaa-baseLayout-trainingsPage':
    ReactDOM.render(React.createElement(trainingsPage,props),renderParent);
    break;
  case 'aaa-baseLayout-homePage':
    ReactDOM.render(React.createElement(homePage,props),renderParent);
    break;
  case 'aaa-baseLayout-loginPage':
    ReactDOM.render(React.createElement(loginPage,props),renderParent);
    break;
}

console.log("Loaded");
