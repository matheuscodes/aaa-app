'use strict'
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
var injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

var React = require('react');
var ReactDOM = require('react-dom');

var PageSwitcher = require('app/common/PageSwitcher');

console.log("Loading");

var container = document.getElementById('aaa-baseLayout');
var pageTitle = container.className;

var pageSwitcher = new PageSwitcher();
pageSwitcher.loadClient(pageTitle);

console.log("Loaded");
