import requestBuilder from 'api/helpers/RequestBuilder'
import publicRequest from 'api/helpers/getPublicRequest'
import Event from 'model/Event'

var processResponseList = function(response) {
  const downloaded = JSON.parse(response.toString());
  const processed = [];

  downloaded.forEach((item, index) => processed[index] = new Event(item));

  return processed;
};

function updateRegistration(eventId, callbacks, unregister) {
  let method = 'POST';

  if(unregister){
    method = 'DELETE';
  }

  var newCallbacks = {
    context: callbacks.context,
    201: callbacks.success,
    204: callbacks.success,
    failure: callbacks.success,
  };

  var request = requestBuilder(['/events/', eventId, '/'].join(''),
                               method, newCallbacks);
  if(request !== null){
    request.send();
  }
}

export default {
  getList: function(callbacks, from, to) {
    var successCall = function(request) {
      var response = processResponseList(request.responseText);
      callbacks.success.call(callbacks.context, response);
    };

    var newCallbacks = {
      context: callbacks.context,
      200: successCall,
      failure: (callbacks.error || console.log)
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
      failure: (callbacks.error || console.log)
    };

    let url = '/events/';
    if (from || to) url += '?';
    url += from ? '&from=' + from.toISOString() : '';
    url += to ? '&to=' + to.toISOString() : '';
    const request = publicRequest(url, 'GET', newCallbacks);
    if(request !== null){
      request.send();
    }
  },
  register: function (eventId,callbacks){
    updateRegistration(eventId,callbacks);
  },
  unregister: function (eventId,callbacks){
    updateRegistration(eventId,callbacks,true);
  }
};
