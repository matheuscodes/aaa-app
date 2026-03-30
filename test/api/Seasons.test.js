vi.mock('api/helpers/RequestBuilder', () => ({ default: vi.fn() }));

import requestBuilder from 'api/helpers/RequestBuilder';
import Seasons from 'api/Seasons';

describe('Seasons API', () => {
  let mockXhr;
  let callbacks;

  beforeEach(() => {
    mockXhr = { send: vi.fn() };
    requestBuilder.mockReturnValue(mockXhr);
    callbacks = {
      success: vi.fn(),
      error: vi.fn(),
      context: {},
    };
  });

  const nullSafe = () => {
    requestBuilder.mockReturnValue(null);
  };

  it('getList sends GET to /seasons/', () => {
    Seasons.getList(callbacks);
    expect(requestBuilder).toHaveBeenCalledWith('/seasons/', 'GET', expect.any(Object));
    expect(mockXhr.send).toHaveBeenCalled();
  });

  it('getList is null-safe', () => {
    nullSafe();
    expect(() => Seasons.getList(callbacks)).not.toThrow();
  });

  it('getActive sends GET to /seasons/active', () => {
    Seasons.getActive(callbacks);
    expect(requestBuilder).toHaveBeenCalledWith('/seasons/active', 'GET', expect.any(Object));
  });

  it('getById sends GET to /seasons/:id', () => {
    Seasons.getById(42, callbacks);
    expect(requestBuilder).toHaveBeenCalledWith('/seasons/42', 'GET', expect.any(Object));
  });

  it('getMonthReport sends GET to correct path', () => {
    Seasons.getMonthReport(1, 2023, 6, callbacks);
    expect(requestBuilder).toHaveBeenCalledWith('/seasons/1/report/2023/6', 'GET', expect.any(Object));
  });

  it('save sends POST for new season', () => {
    const season = { name: 'S1', start: '2023-01-01', end: '2023-12-31', goals: [] };
    Seasons.save(season, callbacks);
    expect(requestBuilder).toHaveBeenCalledWith('/seasons/', 'POST', expect.any(Object));
  });

  it('save sends PUT for existing season', () => {
    const season = { id: 5, name: 'S1', start: '2023-01-01', end: '2023-12-31', goals: [] };
    Seasons.save(season, callbacks);
    expect(requestBuilder).toHaveBeenCalledWith('/seasons/5', 'PUT', expect.any(Object));
  });

  it('delete sends DELETE to /seasons/:id', () => {
    Seasons.delete(3, callbacks);
    expect(requestBuilder).toHaveBeenCalledWith('/seasons/3', 'DELETE', expect.any(Object));
  });

  it('permit sends PUT to permission path', () => {
    Seasons.permit(1, 'trainer1', callbacks);
    expect(requestBuilder).toHaveBeenCalledWith('/seasons/1/permissions/trainer1', 'PUT', expect.any(Object));
  });

  it('deny sends DELETE to permission path', () => {
    Seasons.deny(1, 'trainer1', callbacks);
    expect(requestBuilder).toHaveBeenCalledWith('/seasons/1/permissions/trainer1', 'DELETE', expect.any(Object));
  });

  it('getList calls success callback on 200', () => {
    let capturedCallbacks;
    requestBuilder.mockImplementation((path, method, cbs) => {
      capturedCallbacks = cbs;
      return mockXhr;
    });
    Seasons.getList(callbacks);
    const data = [{ id: 1, start: '2024-01-01', end: '2024-12-31', goals: [] }];
    capturedCallbacks[200].call({}, { responseText: JSON.stringify(data) });
    expect(callbacks.success).toHaveBeenCalled();
  });

  it('getList calls error callback on failure', () => {
    let capturedCallbacks;
    requestBuilder.mockImplementation((path, method, cbs) => {
      capturedCallbacks = cbs;
      return mockXhr;
    });
    Seasons.getList(callbacks);
    capturedCallbacks.failure.call({}, { responseText: 'error' });
    expect(callbacks.error).toHaveBeenCalled();
  });

  it('getActive calls success callback on 200', () => {
    let capturedCallbacks;
    requestBuilder.mockImplementation((path, method, cbs) => {
      capturedCallbacks = cbs;
      return mockXhr;
    });
    Seasons.getActive(callbacks);
    const data = [{ id: 1, start: '2024-01-01', end: '2024-12-31', goals: [] }];
    capturedCallbacks[200].call({}, { responseText: JSON.stringify(data) });
    expect(callbacks.success).toHaveBeenCalled();
  });

  it('getById calls success callback on 200', () => {
    let capturedCallbacks;
    requestBuilder.mockImplementation((path, method, cbs) => {
      capturedCallbacks = cbs;
      return mockXhr;
    });
    Seasons.getById(42, callbacks);
    const data = { id: 42, start: '2024-01-01', end: '2024-12-31', goals: [] };
    capturedCallbacks[200].call({}, { responseText: JSON.stringify(data) });
    expect(callbacks.success).toHaveBeenCalled();
  });

  it('getMonthReport calls success callback on 200', () => {
    let capturedCallbacks;
    requestBuilder.mockImplementation((path, method, cbs) => {
      capturedCallbacks = cbs;
      return mockXhr;
    });
    Seasons.getMonthReport(1, 2024, 6, callbacks);
    const data = { firstDay: '2024-06-01', lastDay: '2024-06-30', month: 6, season: { goals: [] }, totalCounts: {}, techniqueCounts: {}, totalScores: {} };
    capturedCallbacks[200].call({}, { responseText: JSON.stringify(data) });
    expect(callbacks.success).toHaveBeenCalled();
  });

  it('getMonthReport calls error callback on failure', () => {
    let capturedCallbacks;
    requestBuilder.mockImplementation((path, method, cbs) => {
      capturedCallbacks = cbs;
      return mockXhr;
    });
    Seasons.getMonthReport(1, 2024, 6, callbacks);
    capturedCallbacks.failure.call({}, { responseText: 'error' });
    expect(callbacks.error).toHaveBeenCalled();
  });

  it('save handles goals with i18n properties', () => {
    const season = {
      id: 5,
      name: 'S1',
      start: new Date('2024-01-01'),
      end: new Date('2024-12-31'),
      goals: [{ arrowCount: 100, targetShare: 50, lng: 'en', ns: 'season' }],
      events: [],
      permissions: {},
      permitted: [],
    };
    Seasons.save(season, callbacks);
    expect(requestBuilder).toHaveBeenCalled();
  });
});
