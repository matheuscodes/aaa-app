vi.mock('api/helpers/AuthRequestBuilder', () => ({ default: vi.fn() }));
vi.mock('api/helpers/getLocalArcher', () => ({ default: vi.fn() }));
vi.mock('api/helpers/TrainerRequestBuilder', () => ({ default: vi.fn() }));

import authRequestBuilder from 'api/helpers/AuthRequestBuilder';
import getLocalArcher from 'api/helpers/getLocalArcher';
import TrainerSeasons from 'api/trainers/TrainerSeasons';

describe('TrainerSeasons API', () => {
  let mockXhr;
  let endpoint;
  let callbacks;

  beforeEach(() => {
    mockXhr = { send: vi.fn() };
    authRequestBuilder.mockReturnValue(mockXhr);
    getLocalArcher.mockReturnValue({ id: 1, trainerId: 100 });
    endpoint = new TrainerSeasons();
    callbacks = {
      success: vi.fn(),
      failure: vi.fn(),
      context: {},
    };
  });

  it('list sends GET request to trainer archers seasons path', () => {
    endpoint.list('pupil1', callbacks);
    expect(authRequestBuilder).toHaveBeenCalledWith(
      'GET',
      expect.stringContaining('/archers/pupil1/seasons'),
      expect.any(Object)
    );
    expect(mockXhr.send).toHaveBeenCalled();
  });

  it('list is null-safe', () => {
    authRequestBuilder.mockReturnValue(null);
    expect(() => endpoint.list('pupil1', callbacks)).not.toThrow();
  });

  it('getMonthReport sends GET request to report path', () => {
    endpoint.getMonthReport('pupil1', 5, 2023, 6, callbacks);
    expect(authRequestBuilder).toHaveBeenCalledWith(
      'GET',
      expect.stringContaining('/archers/pupil1/seasons/5/report/2023/6'),
      expect.any(Object)
    );
  });
});
