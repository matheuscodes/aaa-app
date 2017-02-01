var requestBuilder = require('api/helpers/RequestBuilder');

var processResponseList = function(response) {
  var data = JSON.parse(response.toString());
  for (var i = 0; i < data.length; i++) {
    data[i].date = new Date(data[i].date);
  }
  return data;
};
module.exports = {
  getList: function(callbacks, from, to) {
    var successCall = function(request) {
      var response = processResponseList(request.responseText);
      callbacks.success.call(callbacks.context, response);
    };

    var newCallbacks = {
      context: callbacks.context,
      200: successCall,
      failure: callbacks.error
    };

    var url = '/events/';
    if (from || to) url += '?';
    url += from ? '&from=' + from.toISOString() : '';
    url += to ? '&to=' + to.toISOString() : '';
    var request = requestBuilder(url, 'GET', newCallbacks);
    if(request !== null){
      request.send();      
    }
  }
};
