import TrainerArchersEndpoint from 'api/trainers/TrainerArchers';
import TrainerSeasonsEndpoint from 'api/trainers/TrainerSeasons';

export { TrainerArchersEndpoint };
export { TrainerSeasonsEndpoint };

export default {
  archers: new TrainerArchersEndpoint(),
  seasons: new TrainerSeasonsEndpoint()
};
