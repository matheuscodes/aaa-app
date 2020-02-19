var requestBuilder = require('api/helpers/RequestBuilder');
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
  getList: function(page,callbacks) {
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

    var url = ['/assessments/?page=',page].join('');
    var request = requestBuilder(url, 'GET', newCallbacks);
    if(request !== null){
      request.send();
    }
  },
  getTargets: function(callbacks) {
    callbacks.success.call(callbacks.context, [
{
  "id": 1,
  "name": "WA 40cm"
},
{
  "id": 2,
  "name": "WA 60cm"
},
{
  "id": 3,
  "name": "WA 80cm"
},
{
  "id": 4,
  "name": "WA 80cm Centre"
},
{
  "id": 5,
  "name": "WA 80cm 6-Ring"
},
{
  "id": 6,
  "name": "WA 122cm"
},
{
  "id": 7,
  "name": "WA 3x20cm Vertical"
},
{
  "id": 8,
  "name": "WA 3x20cm Las Vegas"
},
{
  "id": 9,
  "name": "Field 3x20cm"
},
{
  "id": 10,
  "name": "Field 40cm"
},
{
  "id": 11,
  "name": "Field 60cm"
},
{
  "id": 12,
  "name": "Field 80cm"
},
{
  "id": 13,
  "name": "Free"
}
]);
  },
  getById: function(assessmentId, callbacks) {
    var successCall = function(request) {
      var response = processResponse(request.responseText);
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

    var request = requestBuilder(['/assessments/', assessmentId, '/'].join(''),
                                 'GET', newCallbacks);
    if(request !== null){
      request.send();
    }
  },
  reportById: function(assessmentId, seasonId, callbacks) {
    var successCall = function(request) {
      var response = processResponse(request.responseText);
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

    var request = requestBuilder(['/seasons/', seasonId,
                                  '/assessments/', assessmentId,
                                  '/report/'].join(''), 'GET', newCallbacks);

    if(request !== null){
      request.send();
    }
  },
  save: function(assessment, callbacks) {
    var newCallbacks = {
      context: callbacks.context,
      201: callbacks.success,
      200: callbacks.success,
      failure: (callbacks.error || console.log)
    };

    var request;
    if (typeof assessment.id === 'undefined') {
      request = requestBuilder('/assessments/', 'POST', newCallbacks);
    } else {
      request = requestBuilder(['/assessments/', assessment.id, '/'].join(''),
                                'PUT', newCallbacks);
    }

    var data = processRequest(assessment);

    if(request !== null){
      request.send(data);
    }
  },
  delete: function(seasonId, assessmentId, callbacks) {
    var newCallbacks = {
      context: callbacks.context,
      204: callbacks.success,
      200: callbacks.success,
      failure: (callbacks.error || console.log)
    };

    var request = requestBuilder(['/seasons/',seasonId ,'/assessments/', assessmentId, '/'].join(''),
                                  'DELETE', newCallbacks);

    if(request !== null){
      request.send();
    }
  }

};
