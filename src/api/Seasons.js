import requestBuilder from 'api/helpers/RequestBuilder'
import moment from 'moment'
import Season from 'model/Season';

var processSeason = function(response) {
  var season = JSON.parse(response.toString());
  return new Season(season);
};

var processReport = function(response) {
  var report = JSON.parse(response.toString());
  report.firstDay = new Date(report.firstDay);
  report.lastDay = new Date(report.lastDay);
  report.month = report.month - 1;
  return report;
};

var processResponseList = function(response) {
  var data = JSON.parse(response.toString());
  for (var i = 0; i < data.length; i++) {
    data[i].start = new Date(data[i].start);
    data[i].end = new Date(data[i].end);
  }
  return data;
};

export default {
  getList: function(callbacks) {
    var successCall = function(request) {
      var response = processResponseList(request.responseText);
      callbacks.success.call(callbacks.context, response);
    };

    function errorCall(request){
      let error = new Error(request.responseText.toString());
      (callbacks.error || console.log).call(callbacks.context, error);
    }

    var newCallbacks = {
      context: callbacks.context,
      200: successCall,
      failure: errorCall
    };

    var request = requestBuilder('/seasons/', 'GET', newCallbacks);
    if(request !== null){
      request.send();
    }
  },
  getActive: function(callbacks) {
    var successCall = function(request) {
      var response = processResponseList(request.responseText);
      callbacks.success.call(callbacks.context, response);
    };

    function errorCall(request){
      let error = new Error(request.responseText.toString());
      (callbacks.error || console.log).call(callbacks.context, error);
    }

    var newCallbacks = {
      context: callbacks.context,
      200: successCall,
      failure: errorCall
    };

    var request = requestBuilder('/seasons/active', 'GET', newCallbacks);
    if(request !== null){
      request.send();
    }
  },
  getById: function(id, callbacks) {
    var successCall = function(request) {
      var response = processSeason(request.responseText);
      callbacks.success.call(callbacks.context, response);
    };

    function errorCall(request){
      let error = new Error(request.responseText.toString());
      (callbacks.error || console.log).call(callbacks.context, error);
    }

    var newCallbacks = {
      context: callbacks.context,
      200: successCall,
      failure: errorCall
    };

    var request = requestBuilder('/seasons/' + id, 'GET', newCallbacks);
    if(request !== null){
      request.send();
    }
  },
  getMonthReport: function(id, year, month, callbacks) {
    var successCall = function(request) {
      var response = processReport(request.responseText);
      callbacks.success.call(callbacks.context, response);
    };

    function errorCall(request){
      let error = new Error(request.responseText.toString());
      (callbacks.error || console.log).call(callbacks.context, error);
    }

    var newCallbacks = {
      context: callbacks.context,
      200: successCall,
      failure: errorCall
    };

    var request = requestBuilder('/seasons/' + id + '/report/' + year + '/' + month,
                                 'GET', newCallbacks);
    if(request !== null){
      request.send();
    }
  },
  save: function(newSeason, callbacks) {
    //FIXME quick fix for regression.

    let season = JSON.parse(JSON.stringify(newSeason));
    var newCallbacks = {
      context: callbacks.context,
      200: callbacks.success,
      201: callbacks.success,
      failure: (callbacks.error || console.log)
    };

    var request = requestBuilder('/seasons/', 'POST', newCallbacks);
    if (typeof season.id !== 'undefined') {
      request = requestBuilder('/seasons/' + season.id, 'PUT', newCallbacks);
    }

    delete season.events;
    delete season.permissions;
    delete season.permitted;
    season.start = moment(season.start).format('YYYY-MM-DD');
    season.end = moment(season.end).format('YYYY-MM-DD');

    // i18next doing some bullshit to objects.
    season.goals.forEach(function(goal) {
      delete goal.lng;
      delete goal.ns;
    });

    var data = JSON.stringify(season);

    request.send(data);
  },
  delete: function(seasonId, callbacks) {
    var newCallbacks = {
      context: callbacks.context,
      204: callbacks.success,
      200: callbacks.success,
      failure: (callbacks.error || console.log)
    };

    var request;
    request = requestBuilder('/seasons/' + seasonId, 'DELETE', newCallbacks);
    request.send();
  },
  permit: function(seasonId,trainerId, callbacks) {
    var newCallbacks = {
      context: callbacks.context,
      204: callbacks.success,
      failure: (callbacks.error || console.log)
    };

    const path = [
      '/seasons',
      seasonId,
      'permissions',
      trainerId
    ].join('/')
    const request = requestBuilder(path, 'POST', newCallbacks);
    request.send();
  },
  deny: function(seasonId,trainerId, callbacks) {
    var newCallbacks = {
      context: callbacks.context,
      204: callbacks.success,
      failure: (callbacks.error || console.log)
    };

    const path = [
      '/seasons',
      seasonId,
      'permissions',
      trainerId
    ].join('/')
    const request = requestBuilder(path, 'DELETE', newCallbacks);
    request.send();
  }
};
