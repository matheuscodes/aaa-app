import trainerRequestBuilder from 'api/helpers/TrainerRequestBuilder';
import authRequestBuilder from 'api/helpers/AuthRequestBuilder';
import getLocalArcher from 'api/helpers/getLocalArcher';

import Season from 'model/Season';

//FIXME DUPLICATE FROM Seasons.js
var processReport = function(response) {
  var report = JSON.parse(response.toString());
  report.firstDay = new Date(report.firstDay);
  report.lastDay = new Date(report.lastDay);
  report.month = report.month - 1;
  return report;
};

var processResponseList = function(response) {
  var data = JSON.parse(response.toString());
  for (var i = 0; i < data.length; i++) {
    data[i].start = new Date(data[i].start);
    data[i].end = new Date(data[i].end);
  }
  return data;
};

export default class TrainerSeasonsEndpoint {
  list(pupilId, callbacks){
    const request = authRequestBuilder('GET', `/trainers/${getLocalArcher().trainerId}/archers/${pupilId}/seasons`, {
      200: function(response) {
        var seasons = processResponseList(response.responseText);
        callbacks.success.bind(callbacks.context)(seasons);
      },
      failure: callbacks.failure.bind(callbacks.context),
    });

    if(request !== null) {
      request.send();
    }
  }

  getMonthReport(pupilId, id, year, month, callbacks) {
    const path = [
      'archers',  pupilId,
      'seasons', id,
      'report', year, month
    ].join('/');
    const request = authRequestBuilder('GET', `/trainers/${getLocalArcher().trainerId}/${path}`, {
      200: function(response) {
        var report = processReport(response.responseText);
        callbacks.success.bind(callbacks.context)(report);
      },
      failure: callbacks.failure.bind(callbacks.context),
    });

    if(request !== null) {
      request.send();
    }
  }
}
