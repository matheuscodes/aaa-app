import trainerRequestBuilder from 'api/helpers/TrainerRequestBuilder';

export default class TrainerArchersEndpoint {
  list(callbacks){
    function successCall(request) {
      var response = JSON.parse(request.responseText);
      callbacks.success.call(callbacks.context, response);
    };

    function errorCall(request){
      let error = new Error(request.responseText.toString());
      callbacks.error.call(callbacks.context, error);
    };

    var newCallbacks = {
      context: callbacks.context,
      200: successCall,
      failure: errorCall
    };

    var request = trainerRequestBuilder('/archers', 'GET', newCallbacks);
    if(request !== null){
      request.send();
    }
  }
}
