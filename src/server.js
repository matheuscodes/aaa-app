var express = require('express');
var http = require('http');

var app = express();

app.use(express.static('src'));
app.use(express.static('build'));
app.use(express.static('content'));

var server = http.createServer(app)
server.listen(9090);
