import TrainerArchersEndpoint from 'api/trainers/TrainerArchers';
import TrainerSeasonsEndpoint from 'api/trainers/TrainerSeasons';

exports.TrainerArchersEndpoint = TrainerArchersEndpoint;
exports.TrainerSeasonsEndpoint = TrainerArchersEndpoint;

exports.default = {
  archers: new TrainerArchersEndpoint(),
  seasons: new TrainerSeasonsEndpoint()
};
