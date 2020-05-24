import requestBuilder from 'api/helpers/RequestBuilder'

export default {
  get: function(callbacks) {
    var successCall = function(request) {
      const downloaded = JSON.parse(request.responseText.toString());
      callbacks.success.call(callbacks.context, downloaded);
    };

    var newCallbacks = {
      context: callbacks.context,
      200: successCall,
      failure: (callbacks.error || console.log)
    };

    var request = requestBuilder('/overview/', 'GET', newCallbacks);
    if(request !== null){
      request.send();
    }
  }
};
