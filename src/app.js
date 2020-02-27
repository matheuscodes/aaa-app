//'use strict';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin();

import { i18next } from 'global/i18nextReact'

import PageSwitcher from 'app/common/PageSwitcher'

//process.env.NODE_ENV = 'production';

console.log("Loading");

var container = document.getElementById('aaa-baseLayout');
var pageTitle = container.className;

var pageSwitcher = new PageSwitcher(i18next);
pageSwitcher.loadClient(pageTitle);

console.log("Loaded");
