'use strict';

var requestBuilder = require('api/helpers/RequestBuilder');

var processResponse = function(data) {
  data.date = new Date(data.date);
  var newArrows = {};
  data.arrows.forEach(function(value) {
    if (typeof newArrows[value.distance] === 'undefined') {
      newArrows[value.distance] = {};
    }
    newArrows[value.distance][value.type] = value.arrows;
  });
  data.arrows = newArrows;
  return data;
};

var processResponseList = function(response) {
  var data = JSON.parse(response.toString());
  var results = [];
  data.forEach(function(value) {
    results.push(processResponse(value));
  });
  return results;
};

var processRequest = function(training) {
  training.date = training.date.toISOString();

  var arrows = [];
  Object.keys(training.arrows).forEach(function distances(distance) {
    Object.keys(training.arrows[distance]).forEach(function types(type) {
      var arrow = {};
      arrow.distance = distance;
      arrow.type = type;
      arrow.arrows = training.arrows[distance][type];
      arrows.push(arrow);
    });
  });

  training.arrows = arrows;

  return JSON.stringify(training);
};

module.exports = {
  getList: function(page, callbacks) {
    var successCall = function(request) {
      var response = processResponseList(request.responseText);
      callbacks.success.call(callbacks.context, response);
    };

    var newCallbacks = {
      context: callbacks.context,
      200: successCall,
      failure: callbacks.error
    };
    var url = ['/trainings/?page=',page].join('');
    var request = requestBuilder(url, 'GET', newCallbacks);
    request.send();
  },
  save: function(training, callbacks) {
    var newCallbacks = {
      context: callbacks.context,
      201: callbacks.success,
      200: callbacks.success,
      failure: callbacks.error
    };

    var request;
    if (typeof training.id === 'undefined') {
      request = requestBuilder('/trainings/', 'POST', newCallbacks);
    } else {
      request = requestBuilder(['/trainings/', training.id, '/'].join(''),
                               'PUT', newCallbacks);
    }

    var data = processRequest(training);

    request.send(data);
  },
  delete: function(trainingId, callbacks) {
    var newCallbacks = {
      context: callbacks.context,
      204: callbacks.success,
      failure: callbacks.error
    };

    var request = requestBuilder(['/trainings/', trainingId, '/'].join(''),
                                 'DELETE', newCallbacks);

    request.send();
  }
};
