vi.mock('api/helpers/AuthRequestBuilder', () => ({ default: vi.fn() }));
vi.mock('api/helpers/getLocalArcher', () => ({ default: vi.fn() }));
vi.mock('api/helpers/TrainerRequestBuilder', () => ({ default: vi.fn() }));

import authRequestBuilder from 'api/helpers/AuthRequestBuilder';
import getLocalArcher from 'api/helpers/getLocalArcher';
import trainerRequestBuilder from 'api/helpers/TrainerRequestBuilder';
import TrainerArchers from 'api/trainers/TrainerArchers';

describe('TrainerArchers API', () => {
  let mockXhr;
  let endpoint;
  let callbacks;

  beforeEach(() => {
    mockXhr = { send: vi.fn() };
    trainerRequestBuilder.mockReturnValue(mockXhr);
    endpoint = new TrainerArchers();
    callbacks = {
      success: vi.fn(),
      error: vi.fn(),
      context: {},
    };
  });

  it('list sends a GET request', () => {
    endpoint.list(callbacks);
    expect(trainerRequestBuilder).toHaveBeenCalledWith('/archers', 'GET', expect.any(Object));
    expect(mockXhr.send).toHaveBeenCalled();
  });

  it('list is null-safe', () => {
    trainerRequestBuilder.mockReturnValue(null);
    expect(() => endpoint.list(callbacks)).not.toThrow();
  });
});
