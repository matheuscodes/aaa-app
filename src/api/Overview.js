import requestBuilder from 'api/helpers/RequestBuilder'

export default {
  get: function(callbacks) {
    function successCall(request) {
      const downloaded = JSON.parse(request.responseText.toString());
      callbacks.success.call(callbacks.context, downloaded);
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

    var request = requestBuilder('/overview/', 'GET', newCallbacks);
    if(request !== null){
      request.send();
    }
  }
};
