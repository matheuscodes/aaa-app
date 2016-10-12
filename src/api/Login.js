var requestBuilder = require('api/helpers/requestBuilder');

module.exports = function login(credentials, callbacks) {
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
