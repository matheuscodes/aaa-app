'use strict';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
var injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

var i18next = require('global/i18nextReact').i18next;

var PageSwitcher = require('app/common/PageSwitcher');

//process.env.NODE_ENV = 'production';

console.log("Loading");

var container = document.getElementById('aaa-baseLayout');
var pageTitle = container.className;

var pageSwitcher = new PageSwitcher(i18next);
pageSwitcher.loadClient(pageTitle);

console.log("Loaded");
