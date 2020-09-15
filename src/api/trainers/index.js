import authRequestBuilder from 'api/helpers/AuthRequestBuilder';
import getLocalArcher from 'api/helpers/getLocalArcher';

import TrainerArchersEndpoint from 'api/trainers/TrainerArchers';
import TrainerSeasonsEndpoint from 'api/trainers/TrainerSeasons';

export { TrainerArchersEndpoint };
export { TrainerSeasonsEndpoint };

const requestURL = (process.env.clientRequestURL || "https://api.archery.app");
//console.log("Using Request URL:",requestURL)

export default {
  archers: new TrainerArchersEndpoint(),
  seasons: new TrainerSeasonsEndpoint(),
  getAllTrainers: function(callbacks) {
    const request = authRequestBuilder('GET', '/trainers', {
      200: function(response) {
        var trainers = JSON.parse(response.responseText.toString());
        callbacks.success.bind(callbacks.context)(trainers);
      },
      failure: callbacks.failure.bind(callbacks.context),
    });

    if(request !== null){
      request.send();
    }
  },
  postArcherToTrainer: function(pupilRequest, callbacks) {
    const request = authRequestBuilder('POST', `/trainers/${pupilRequest.trainerId}/archers`, {
      200: function(response) {
        callbacks.success.bind(callbacks.context)();
      },
      failure: callbacks.failure.bind(callbacks.context),
    });

    if(request !== null) {
      request.send(JSON.stringify(pupilRequest));
    }
  },
  getTrainerRequests: function(callbacks) {
    const request = authRequestBuilder('GET', `/trainers/${getLocalArcher().trainerId}/requests`, {
      200: function(response) {
        var requests = JSON.parse(response.responseText.toString());
        callbacks.success.bind(callbacks.context)(requests);
      },
      failure: callbacks.failure.bind(callbacks.context),
    });

    if(request !== null) {
      request.send();
    }
  },
  getTrainerArchers: function(callbacks) {
    const request = authRequestBuilder('GET', `/trainers/${getLocalArcher().trainerId}/archers`, {
      200: function(response) {
        var requests = JSON.parse(response.responseText.toString());
        callbacks.success.bind(callbacks.context)(requests);
      },
      failure: callbacks.failure.bind(callbacks.context),
    });

    if(request !== null) {
      request.send();
    }
  },
  putTrainerArcher: function(archer, callbacks) {
    const request = authRequestBuilder('PUT', `/trainers/${getLocalArcher().trainerId}/archers/${archer.archerId}`, {
      201: function(response) {
        callbacks.success.bind(callbacks.context)();
      },
      failure: callbacks.failure.bind(callbacks.context),
    });

    if(request !== null) {
      request.send(JSON.stringify(archer));
    }
  },
  putArcherToTrainer: function(pupilRequest, callbacks) {
    const request = authRequestBuilder('PUT', `/trainers/${pupilRequest.trainerId}/archers/${pupilRequest.archer.archerId}`, {
      201: function(response) {
        callbacks.success.bind(callbacks.context)();
      },
      failure: callbacks.failure.bind(callbacks.context),
    });

    if(request !== null) {
      request.send(JSON.stringify(pupilRequest.archer));
    }
  },
  deleteArcherToTrainer: function(pupilRequest, callbacks) {
    const request = authRequestBuilder('DELETE', `/trainers/${pupilRequest.trainerId}/archers/${pupilRequest.archer.archerId}`, {
      204: function(response) {
        callbacks.success.bind(callbacks.context)();
      },
      failure: callbacks.failure.bind(callbacks.context),
    });

    if(request !== null) {
      request.send(JSON.stringify());
    }
  },
};
