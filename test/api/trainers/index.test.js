vi.mock('api/helpers/AuthRequestBuilder', () => ({ default: vi.fn() }));
vi.mock('api/helpers/getLocalArcher', () => ({ default: vi.fn() }));
vi.mock('api/helpers/TrainerRequestBuilder', () => ({ default: vi.fn() }));

import authRequestBuilder from 'api/helpers/AuthRequestBuilder';
import getLocalArcher from 'api/helpers/getLocalArcher';
import trainers, { TrainerArchersEndpoint, TrainerSeasonsEndpoint } from 'api/trainers';

describe('Trainers API index', () => {
  let mockXhr;
  let callbacks;

  beforeEach(() => {
    mockXhr = { send: vi.fn() };
    authRequestBuilder.mockReturnValue(mockXhr);
    getLocalArcher.mockReturnValue({ id: 7, trainerId: 77 });
    callbacks = {
      success: vi.fn(),
      failure: vi.fn(),
      context: {},
    };
  });

  it('exports TrainerArchersEndpoint class', () => {
    expect(typeof TrainerArchersEndpoint).toBe('function');
    expect(new TrainerArchersEndpoint()).toBeInstanceOf(TrainerArchersEndpoint);
  });

  it('exports TrainerSeasonsEndpoint class', () => {
    expect(typeof TrainerSeasonsEndpoint).toBe('function');
    expect(new TrainerSeasonsEndpoint()).toBeInstanceOf(TrainerSeasonsEndpoint);
  });

  it('default export has archers and seasons', () => {
    expect(trainers.archers).toBeDefined();
    expect(trainers.seasons).toBeDefined();
  });

  it('getAllTrainers sends GET request', () => {
    trainers.getAllTrainers(callbacks);
    expect(authRequestBuilder).toHaveBeenCalledWith('GET', '/trainers', expect.any(Object));
    expect(mockXhr.send).toHaveBeenCalled();
  });

  it('getAllTrainers is null-safe', () => {
    authRequestBuilder.mockReturnValue(null);
    expect(() => trainers.getAllTrainers(callbacks)).not.toThrow();
  });

  it('postArcherToTrainer sends POST request', () => {
    trainers.postArcherToTrainer({ trainerId: 5 }, callbacks);
    expect(authRequestBuilder).toHaveBeenCalledWith('POST', `/trainers/5/archers`, expect.any(Object));
  });
});
