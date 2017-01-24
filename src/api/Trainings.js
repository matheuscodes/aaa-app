const requestBuilder = require('api/helpers/RequestBuilder');

function processResponse(data) {
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

function processResponseList(response) {
  var data = JSON.parse(response.toString());
  var results = [];
  data.forEach(function(value) {
    results.push(processResponse(value));
  });
  return results;
};

function processRequest(training) {
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
    function successCall(request) {
      var response = processResponseList(request.responseText);
      callbacks.success.call(callbacks.context, response);
    };

    function errorCall(request){
      let error = new Error(request.responseText.toString());
      callbacks.error.call(callbacks.context, error);
    }

    var newCallbacks = {
      context: callbacks.context,
      200: successCall,
      failure: errorCall
    };

    var url = ['/trainings/?page=',page].join('');
    var request = requestBuilder(url, 'GET', newCallbacks);
    request.send();
  },
  save: function(training, callbacks) {
    function errorCall(request){
      let error = new Error(request.responseText.toString());
      callbacks.error.call(callbacks.context, error);
    }

    const newCallbacks = {
      context: callbacks.context,
      201: callbacks.success,
      200: callbacks.success,
      failure: errorCall
    };

    var request;
    if (typeof training.id === 'undefined') {
      request = requestBuilder('/trainings/', 'POST', newCallbacks);
    } else {
      request = requestBuilder(['/trainings/', training.id, '/'].join(''),
                               'PUT', newCallbacks);
    }

    request.send(processRequest(training));
  },
  delete: function(trainingId, callbacks) {
    function errorCall(request){
      let error = new Error(request.responseText.toString());
      callbacks.error.call(callbacks.context, error);
    }

    var newCallbacks = {
      context: callbacks.context,
      204: callbacks.success,
      failure: errorCall
    };

    var request = requestBuilder(['/trainings/', trainingId, '/'].join(''),
                                 'DELETE', newCallbacks);

    request.send();
  }
};
