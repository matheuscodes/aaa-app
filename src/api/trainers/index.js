import authRequestBuilder from 'api/helpers/AuthRequestBuilder';

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
  }
};
