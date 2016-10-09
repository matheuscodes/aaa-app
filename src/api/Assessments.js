var requestBuilder = require('api/helpers/requestBuilder');
var valueConverter = require('global/ValueConverter');

var processResponse = function(response) {
  var data = JSON.parse(response.toString());
  data.date = new Date(data.date);
  return data;
};

var processResponseList = function(response) {
  var data = JSON.parse(response.toString());
  for (var i = 0; i < data.length; i++) {
    data[i].date = new Date(data[i].date);
  }
  return data;
};

var processRequest = function(assessment) {
  // FIXME separate assessment from state, this is all unnecessary.
  var data = {
    date: assessment.date.toISOString(),
    target: assessment.target,
    distance: assessment.distance,
    seasonId: assessment.seasonId,
    eventId: assessment.eventId,
    temperature: assessment.temperature,
    weather: assessment.weather,
    windSpeed: assessment.windSpeed,
    windDirection: assessment.windDirection,
    shootDirection: assessment.shootDirection,
    arrows: []
  };
  assessment.rounds.forEach(function(round, roundIndex) {
    round.ends.forEach(function(end, endIndex) {
      end.forEach(function(value) {
        var arrow = {};
        arrow.value = valueConverter.integer[value];
        arrow.x = (value === 'X');
        arrow.round = roundIndex + 1;
        arrow.end = endIndex + 1;
        data.arrows.push(arrow);
      });
    });
  });

  return JSON.stringify(data);
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

    var request = requestBuilder('/assessments/', 'GET', newCallbacks);
    request.send();
  },
  getTargets: function(callbacks) {
    var successCall = function(request) {
      var response = JSON.parse(request.responseText.toString());
      callbacks.success.call(callbacks.context, response);
    };

    var newCallbacks = {
      context: callbacks.context,
      200: successCall,
      failure: callbacks.error
    };

    var request = requestBuilder('/assessments/targets/', 'GET', newCallbacks);
    request.send();
  },
  getById: function(assessmentId, callbacks) {
    var successCall = function(request) {
      var response = processResponse(request.responseText);
      callbacks.success.call(callbacks.context, response);
    };

    var newCallbacks = {
      context: callbacks.context,
      200: successCall,
      failure: callbacks.error
    };

    var request = requestBuilder(['/assessments/', assessmentId, '/'].join(''),
                                 'GET', newCallbacks);
    request.send();
  },
  reportById: function(assessmentId, callbacks) {
    var successCall = function(request) {
      var response = processResponse(request.responseText);
      callbacks.success.call(callbacks.context, response);
    };

    var newCallbacks = {
      context: callbacks.context,
      200: successCall,
      failure: callbacks.error
    };

    var request = requestBuilder(['/assessments/', assessmentId,
                                  '/report/'].join(''), 'GET', newCallbacks);
    request.send();
  },
  save: function(assessment, callbacks) {
    var newCallbacks = {
      context: callbacks.context,
      201: callbacks.success,
      200: callbacks.success,
      failure: callbacks.error
    };

    var request;
    if (typeof assessment.id === 'undefined') {
      request = requestBuilder('/assessments/', 'POST', newCallbacks);
    } else {
      request = requestBuilder(['/assessments/', assessment.id, '/'].join(''),
                                'PUT', newCallbacks);
    }

    var data = processRequest(assessment);

    request.send(data);
  },
  delete: function(assessmentId, callbacks) {
    var newCallbacks = {
      context: callbacks.context,
      204: callbacks.success,
      failure: callbacks.error
    };

    var request = requestBuilder(['/assessments/', assessmentId, '/'].join(''),
                                  'DELETE', newCallbacks);

    request.send();
  }

};
