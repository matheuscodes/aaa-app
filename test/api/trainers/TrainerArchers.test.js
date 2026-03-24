jest.mock('api/helpers/AuthRequestBuilder', () => jest.fn());
jest.mock('api/helpers/getLocalArcher', () => jest.fn());
jest.mock('api/helpers/TrainerRequestBuilder', () => jest.fn());

import authRequestBuilder from 'api/helpers/AuthRequestBuilder';
import getLocalArcher from 'api/helpers/getLocalArcher';
import TrainerArchers from 'api/trainers/TrainerArchers';

describe('TrainerArchers API', () => {
  let mockXhr;
  let endpoint;
  let callbacks;

  beforeEach(() => {
    mockXhr = { send: jest.fn() };
    const trainerRequestBuilder = require('api/helpers/TrainerRequestBuilder');
    trainerRequestBuilder.mockReturnValue(mockXhr);
    endpoint = new TrainerArchers();
    callbacks = {
      success: jest.fn(),
      error: jest.fn(),
      context: {},
    };
  });

  it('list sends a GET request', () => {
    const trainerRequestBuilder = require('api/helpers/TrainerRequestBuilder');
    endpoint.list(callbacks);
    expect(trainerRequestBuilder).toHaveBeenCalledWith('/archers', 'GET', expect.any(Object));
    expect(mockXhr.send).toHaveBeenCalled();
  });

  it('list is null-safe', () => {
    const trainerRequestBuilder = require('api/helpers/TrainerRequestBuilder');
    trainerRequestBuilder.mockReturnValue(null);
    expect(() => endpoint.list(callbacks)).not.toThrow();
  });
});
