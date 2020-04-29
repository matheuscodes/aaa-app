import requestBuilder from 'api/helpers/RequestBuilder'

export function login(credentials, callbacks) {
  var successCall = function(request) {
    if (typeof localStorage !== 'undefined') {
      localStorage.loggedToken = request.responseText;
    }
    callbacks.success.call(callbacks.context);
  };

  var failureCall = function(request) {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem("loggedToken");
    }
    callbacks.error.call(callbacks.context);
  };

  var newCallbacks = {
    context: callbacks.context,
    200: successCall,
    failure: failureCall
  };

  var request = requestBuilder('/login/', 'POST', newCallbacks);

  var data = JSON.stringify(credentials);

  request.send(data);
};


export function reset(credentials, callbacks) {
  var successCall = function(request) {
    callbacks.success.call(callbacks.context);
  };

  var failureCall = function(request) {
    callbacks.error.call(callbacks.context);
  };

  var newCallbacks = {
    context: callbacks.context,
    204: successCall,
    failure: failureCall
  };

  var request = requestBuilder('/login/', 'DELETE', newCallbacks);

  var data = JSON.stringify(credentials);

  request.send(data);
};

export function newLogin(data, callbacks) {
  var successCall = function(request) {
    callbacks.success.call(callbacks.context);
  };

  var failureCall = function(request) {
    callbacks.error.call(callbacks.context);
  };

  var newCallbacks = {
    context: callbacks.context,
    200: successCall,
    failure: failureCall
  };

  var request = requestBuilder('/login/', 'PUT', newCallbacks);

  var stringData = JSON.stringify(data);

  request.send(stringData);
};

export function replaceLogin(data, callbacks) {
  var successCall = function(request) {
    callbacks.success.call(callbacks.context);
  };

  var failureCall = function(request) {
    callbacks.error.call(callbacks.context);
  };

  var newCallbacks = {
    context: callbacks.context,
    204: successCall,
    failure: failureCall
  };

  var request = requestBuilder('/login/', 'PATCH', newCallbacks);

  var stringData = JSON.stringify(data);

  request.send(stringData);
};
