var requestBuilder = require('api/helpers/requestBuilder');
var moment = require('moment');

var processSeason = function(response) {
  var season = JSON.parse(response.toString());
  season.start = new Date(season.start);
  season.end = new Date(season.end);
  return season;
};

var processResponseList = function(response) {
  var data = JSON.parse(response.toString());
  for (var i = 0; i < data.length; i++) {
    data[i].start = new Date(data[i].start);
    data[i].end = new Date(data[i].end);
  }
  return data;
};

module.exports = {
  getList: function(callbacks) {
    var successCall = function(request) {
      var response = processResponseList(request.responseText);
      callbacks.success.call(callbacks.context, response);
    };

    var newCallbacks = {
      context: callbacks.context,
      200: successCall,
      failure: callbacks.error
    };

    var request = requestBuilder('/seasons/', 'GET', newCallbacks);
    request.send();
  },
  getActive: function(callbacks) {
    var successCall = function(request) {
      var response = processResponseList(request.responseText);
      callbacks.success.call(callbacks.context, response);
    };

    var newCallbacks = {
      context: callbacks.context,
      200: successCall,
      failure: callbacks.error
    };

    var request = requestBuilder('/seasons/active', 'GET', newCallbacks);
    request.send();
  },
  getById: function(id, callbacks) {
    var successCall = function(request) {
      var response = processSeason(request.responseText);
      callbacks.success.call(callbacks.context, response);
    };

    var newCallbacks = {
      context: callbacks.context,
      200: successCall,
      failure: callbacks.error
    };

    var request = requestBuilder('/seasons/' + id, 'GET', newCallbacks);
    request.send();
  },
  save: function(season, callbacks) {
    var newCallbacks = {
      context: callbacks.context,
      200: callbacks.success,
      201: callbacks.success,
      failure: callbacks.error
    };

    var request = requestBuilder('/seasons/', 'POST', newCallbacks);
    if (typeof season.id !== 'undefined') {
      request = requestBuilder('/seasons/' + season.id, 'PUT', newCallbacks);
    }

    season.start = moment(season.start).format('YYYY-MM-DD');
    season.end = moment(season.end).format('YYYY-MM-DD');

    //i18next doing some bullshit to objects.
    season.goals.forEach(function (goal){
      delete goal.lng;
      delete goal.ns;
    });

    var data = JSON.stringify(season);

    request.setRequestHeader("Content-type", "application/json");

    request.send(data);
  },
  delete: function(seasonId, callbacks) {
    var newCallbacks = {
      context: callbacks.context,
      204: callbacks.success,
      failure: callbacks.error
    };

    var request;
    request = requestBuilder('/seasons/' + seasonId, 'DELETE', newCallbacks);
    request.send();
  }
};
