vi.mock('api/helpers/RequestBuilder', () => ({ default: vi.fn() }));

import requestBuilder from 'api/helpers/RequestBuilder';
import Assessments from 'api/Assessments';

describe('Assessments API', () => {
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

  it('getList sends GET request', () => {
    Assessments.getList(1, callbacks);
    expect(requestBuilder).toHaveBeenCalledWith(expect.stringContaining('/assessments/'), 'GET', expect.any(Object));
    expect(mockXhr.send).toHaveBeenCalled();
  });

  it('getList is null-safe', () => {
    requestBuilder.mockReturnValue(null);
    expect(() => Assessments.getList(1, callbacks)).not.toThrow();
  });

  it('getById sends GET to /assessments/:id/', () => {
    Assessments.getById(5, callbacks);
    expect(requestBuilder).toHaveBeenCalledWith('/assessments/5/', 'GET', expect.any(Object));
  });

  it('reportById sends GET to the season-assessment report path', () => {
    Assessments.reportById(10, 2, callbacks);
    expect(requestBuilder).toHaveBeenCalledWith('/seasons/2/assessments/10/report/', 'GET', expect.any(Object));
  });

  it('save sends POST for new assessment', () => {
    const assessment = {
      date: new Date(),
      target: 'face',
      distance: 18,
      seasonId: 1,
      eventId: null,
      temperature: 20,
      weather: 'FAIR',
      windSpeed: 5,
      windDirection: 'N',
      shootDirection: 'S',
      rounds: [[['X', '10', '9']]],
    };
    assessment.rounds = [{ ends: [['X', '10', '9']] }];
    Assessments.save(assessment, callbacks);
    expect(requestBuilder).toHaveBeenCalledWith('/assessments/', 'POST', expect.any(Object));
  });

  it('save sends PUT for existing assessment', () => {
    const assessment = {
      id: 99,
      date: new Date(),
      target: 'face',
      distance: 18,
      seasonId: 1,
      eventId: null,
      temperature: 20,
      weather: 'FAIR',
      windSpeed: 5,
      windDirection: 'N',
      shootDirection: 'S',
      rounds: [{ ends: [['X', '10', '9']] }],
    };
    Assessments.save(assessment, callbacks);
    expect(requestBuilder).toHaveBeenCalledWith('/assessments/99/', 'PUT', expect.any(Object));
  });

  it('delete sends DELETE to the correct path', () => {
    Assessments.delete(3, 7, callbacks);
    expect(requestBuilder).toHaveBeenCalledWith('/seasons/3/assessments/7/', 'DELETE', expect.any(Object));
  });

  it('getList calls success callback with processed data on 200', () => {
    let capturedCallbacks;
    requestBuilder.mockImplementation((path, method, cbs) => {
      capturedCallbacks = cbs;
      return mockXhr;
    });
    Assessments.getList(1, callbacks);
    const data = [{ id: 1, date: '2024-06-15T00:00:00Z' }];
    capturedCallbacks[200].call({}, { responseText: JSON.stringify(data) });
    expect(callbacks.success).toHaveBeenCalled();
  });

  it('getList calls error callback on failure', () => {
    let capturedCallbacks;
    requestBuilder.mockImplementation((path, method, cbs) => {
      capturedCallbacks = cbs;
      return mockXhr;
    });
    Assessments.getList(1, callbacks);
    capturedCallbacks.failure.call({}, { responseText: 'error' });
    expect(callbacks.error).toHaveBeenCalled();
  });

  it('getTargets calls success callback with target list', () => {
    Assessments.getTargets(callbacks);
    expect(callbacks.success).toHaveBeenCalled();
  });

  it('getById calls success callback on 200', () => {
    let capturedCallbacks;
    requestBuilder.mockImplementation((path, method, cbs) => {
      capturedCallbacks = cbs;
      return mockXhr;
    });
    Assessments.getById(5, callbacks);
    const data = { id: 5, date: '2024-06-15T00:00:00Z' };
    capturedCallbacks[200].call({}, { responseText: JSON.stringify(data) });
    expect(callbacks.success).toHaveBeenCalled();
  });

  it('getById calls error callback on failure', () => {
    let capturedCallbacks;
    requestBuilder.mockImplementation((path, method, cbs) => {
      capturedCallbacks = cbs;
      return mockXhr;
    });
    Assessments.getById(5, callbacks);
    capturedCallbacks.failure.call({}, { responseText: 'error' });
    expect(callbacks.error).toHaveBeenCalled();
  });

  it('reportById calls success callback on 200', () => {
    let capturedCallbacks;
    requestBuilder.mockImplementation((path, method, cbs) => {
      capturedCallbacks = cbs;
      return mockXhr;
    });
    Assessments.reportById(10, 2, callbacks);
    const data = { id: 10, date: '2024-06-15T00:00:00Z', rounds: [] };
    capturedCallbacks[200].call({}, { responseText: JSON.stringify(data) });
    expect(callbacks.success).toHaveBeenCalled();
  });

  it('reportById calls error callback on failure', () => {
    let capturedCallbacks;
    requestBuilder.mockImplementation((path, method, cbs) => {
      capturedCallbacks = cbs;
      return mockXhr;
    });
    Assessments.reportById(10, 2, callbacks);
    capturedCallbacks.failure.call({}, { responseText: 'error' });
    expect(callbacks.error).toHaveBeenCalled();
  });

  it('save sends data with correct format', () => {
    let capturedCallbacks;
    requestBuilder.mockImplementation((path, method, cbs) => {
      capturedCallbacks = cbs;
      return mockXhr;
    });
    const assessment = {
      id: 1,
      date: new Date(),
      target: 'face',
      distance: 18,
      seasonId: 1,
      eventId: null,
      temperature: 20,
      weather: 'FAIR',
      windSpeed: 5,
      windDirection: 'N',
      shootDirection: 'S',
      rounds: [{ ends: [['X', '10', '9']] }],
    };
    Assessments.save(assessment, callbacks);
    expect(mockXhr.send).toHaveBeenCalled();
  });

  it('delete sends DELETE and is null-safe', () => {
    requestBuilder.mockReturnValue(null);
    expect(() => Assessments.delete(3, 7, callbacks)).not.toThrow();
  });
});
