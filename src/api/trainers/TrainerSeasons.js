import trainerRequestBuilder from 'api/helpers/TrainerRequestBuilder';

import Season from 'model/Season';

//FIXME DUPLICATE FROM Seasons.js
var processReport = function(response) {
  var report = JSON.parse(response.toString());
  report.firstDay = new Date(report.firstDay);
  report.lastDay = new Date(report.lastDay);
  report.month = report.month - 1;
  return report;
};

export default class TrainerSeasonsEndpoint {
  list(pupilId, callbacks){
    function successCall(request) {
      const response = JSON.parse(request.responseText);
      const seasons = []
      if(Array.isArray(response)){
        response.forEach( item => seasons.push(new Season(item)));
        callbacks.success.call(callbacks.context, seasons);
      } else {
        callbacks.error.call(callbacks.context, new Error('Response not an array'));
      }
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
    const path = ['/archers', pupilId, 'seasons'].join('/')
    var request = trainerRequestBuilder(path, 'GET', newCallbacks);
    if(request !== null){
      request.send();
    }
  }

  getMonthReport(pupilId, id, year, month, callbacks) {
    var successCall = function(request) {
      var response = processReport(request.responseText);
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
    const path = [
      '/archers',  pupilId,
      'seasons', id,
      'report', year, month
    ].join('/');
    var request = trainerRequestBuilder(path, 'GET', newCallbacks);
    if(request !== null){
      request.send();
    }
  }
}
