const requestBuilder = require('api/helpers/RequestBuilder');
const publicRequest = require('api/helpers/getPublicRequest');
import Event from 'model/Event'

var processResponseList = function(response) {
  const downloaded = JSON.parse(response.toString());
  const processed = [];

  downloaded.forEach((item, index) => processed[index] = new Event(item));

  return processed;
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
  },
  getPublicEvents: function(callbacks, from, to) {
    const successCall = function(request) {
      var response = processResponseList(request.responseText);
      callbacks.success.call(callbacks.context, response);
    };

    const newCallbacks = {
      context: callbacks.context,
      200: successCall,
      failure: callbacks.error
    };

    let url = '/events/';
    if (from || to) url += '?';
    url += from ? '&from=' + from.toISOString() : '';
    url += to ? '&to=' + to.toISOString() : '';
    const request = publicRequest(url, 'GET', newCallbacks);
    if(request !== null){
      request.send();
    }
  }
};
