import requestBuilder from 'api/helpers/RequestBuilder'

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

function processRequest(original) {
  const training = JSON.parse(JSON.stringify(original)); //FIXME find optimal way of cloning.
  training.date = new Date(training.date);

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

export default {
  getList: function(page, callbacks) {
    function successCall(request) {
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

    var url = ['/trainings/?page=',page].join('');
    var request = requestBuilder(url, 'GET', newCallbacks);
    if(request !== null){
      request.send();
    }
  },
  save: function(training, callbacks) {
    function errorCall(request){
      let error = new Error(request.responseText.toString());
      (callbacks.error || console.log).call(callbacks.context, error);
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

    if(request !== null){
      request.send(processRequest(training));
    }
  },
  delete: function(seasonId, trainingId, callbacks) {
    function errorCall(request){
      let error = new Error(request.responseText.toString());
      (callbacks.error || console.log).call(callbacks.context, error);
    }

    var newCallbacks = {
      context: callbacks.context,
      204: callbacks.success,
      200: callbacks.success,
      failure: errorCall
    };

    var request = requestBuilder(['/seasons/',seasonId ,'/trainings/', trainingId, '/'].join(''),
                                 'DELETE', newCallbacks);
    if(request !== null){
      request.send();
    }
  }
};
