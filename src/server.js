import express from 'express'
import http from 'http'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin();

import PageSwitcher from 'app/common/PageSwitcher'

import { i18next } from 'global/i18nextReact'
import { i18nextMiddleware } from 'global/i18nextReact'

//console.dir(i18next, {depth:null})
const app = express();
const pageSwitcher = new PageSwitcher(i18next);

app.use(i18nextMiddleware.handle(i18next));
app.post('/languages/missing/:lng/:ns.json',
         i18nextMiddleware.missingKeyHandler(i18next));
app.get('/languages/resources.json',
        i18nextMiddleware.getResourcesHandler(i18next));

app.use('/app.js',express.static('build/aaa-app.js'));
app.use(express.static('content'));

app.get("/*", function(req, res, next) {
  console.log('\n',req.path,new Date());
  console.log(['user-agent',req.headers['user-agent']].join(': '));
  Object.keys(req.headers).forEach(function(header){
    if(header.match('[xX]-.*')){
      console.log([header,req.headers[header]].join(': '));
    }
  });
  next();
});

app.use('/languages',express.static('node_modules/aaa-languages/src'));

app.get(['/',['/',pageSwitcher.getPageUrlPath('loginPage')].join('')],
        function(req, res) {
  res.send(pageSwitcher.serverString('loginPage', req));
});

app.get(['/',pageSwitcher.getPageUrlPath('homePage')].join(''),
        function(req, res) {
  res.send(pageSwitcher.serverString('homePage', req));
});

app.get(['/',pageSwitcher.getPageUrlPath('trainingsPage')].join(''),
        function(req, res) {
  res.send(pageSwitcher.serverString('trainingsPage', req));
});

app.get(['/',pageSwitcher.getPageUrlPath('assessmentsPage')].join(''),
        function(req, res) {
  res.send(pageSwitcher.serverString('assessmentsPage', req));
});

app.get(['/',pageSwitcher.getPageUrlPath('reportsPage')].join(''),
        function(req, res) {
  res.send(pageSwitcher.serverString('reportsPage', req));
});

app.get(['/',pageSwitcher.getPageUrlPath('seasonsPage')].join(''),
        function(req, res) {
  res.send(pageSwitcher.serverString('seasonsPage', req));
});

app.get(['/',pageSwitcher.getPageUrlPath('termsPage')].join(''),
        function(req, res) {
  res.send(pageSwitcher.serverString('termsPage', req));
});

app.get(['/',pageSwitcher.getPageUrlPath('aboutPage')].join(''),
        function(req, res) {
  res.send(pageSwitcher.serverString('aboutPage', req));
});

app.get(['/',pageSwitcher.getPageUrlPath('trainerReportsPage')].join(''),
        function(req, res) {
  res.send(pageSwitcher.serverString('trainerReportsPage', req));
});

app.get('/printable', function(req, res) {
  //TODO move this to a file.
  res.send('<html style="font-family: Roboto, sans-serif;"><head><link href="https://fonts.googleapis.com/css?family=Roboto:400,300,500" rel="stylesheet" type="text/css" data-reactid="3" /></head><body></body></html>');
});

import MobileDetect from 'mobile-detect'

app.get('/test', function(req,res){
  const detect = new MobileDetect(req.headers['user-agent']);
  const response = []
  response.push(`mobile ${detect.mobile()}`);
  response.push(`phone ${detect.phone()}`);
  response.push(`tablet ${detect.tablet()}`);
  response.push(`os ${detect.os()}`);
  res.send(response.join('<br/>'));
});

//import serverlessExpress from 'aws-serverless-express'
//const server = serverlessExpress.createServer(app);
//exports.main = (event, context) => serverlessExpress.proxy(server, event, context)
var server = http.createServer(app);
server.listen(9090);
console.log("Listening to 9090");
