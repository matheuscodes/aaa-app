vi.mock('api/helpers/RequestBuilder', () => ({ default: vi.fn() }));

import requestBuilder from 'api/helpers/RequestBuilder';
import Reports from 'api/Reports';

describe('Reports API', () => {
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

  it('getYearOverview sends GET to monthly overview path', () => {
    Reports.getYearOverview(callbacks);
    expect(requestBuilder).toHaveBeenCalledWith(
      expect.stringContaining('/reports/overview/monthly'),
      'GET',
      expect.any(Object)
    );
    expect(mockXhr.send).toHaveBeenCalled();
  });

  it('getYearOverview is null-safe', () => {
    requestBuilder.mockReturnValue(null);
    expect(() => Reports.getYearOverview(callbacks)).not.toThrow();
  });

  it('getLastWeeksOverview sends GET to daily overview path', () => {
    Reports.getLastWeeksOverview(callbacks);
    expect(requestBuilder).toHaveBeenCalledWith(
      expect.stringContaining('/reports/overview/daily'),
      'GET',
      expect.any(Object)
    );
  });

  it('getRingsOverview sends GET to rings path', () => {
    Reports.getRingsOverview(callbacks);
    expect(requestBuilder).toHaveBeenCalledWith('/reports/overview/rings', 'GET', expect.any(Object));
  });

  it('getAssessmentsOverview sends GET to assessments path', () => {
    Reports.getAssessmentsOverview(callbacks);
    expect(requestBuilder).toHaveBeenCalledWith('/reports/overview/assessments', 'GET', expect.any(Object));
  });

  it('getYearOverview calls success with processed data on 200', () => {
    let capturedCallbacks;
    requestBuilder.mockImplementation((path, method, cbs) => {
      capturedCallbacks = cbs;
      return mockXhr;
    });
    Reports.getYearOverview(callbacks);
    const response = [{ year: 2023, month: 1, count: 5 }];
    capturedCallbacks[200].call({}, { responseText: JSON.stringify(response) });
    expect(callbacks.success).toHaveBeenCalled();
  });

  it('getYearOverview calls error callback on failure', () => {
    let capturedCallbacks;
    requestBuilder.mockImplementation((path, method, cbs) => {
      capturedCallbacks = cbs;
      return mockXhr;
    });
    Reports.getYearOverview(callbacks);
    capturedCallbacks.failure.call({}, { responseText: 'error' });
    expect(callbacks.error).toHaveBeenCalled();
  });

  it('getLastWeeksOverview calls success callback with processed data on 200', () => {
    let capturedCallbacks;
    requestBuilder.mockImplementation((path, method, cbs) => {
      capturedCallbacks = cbs;
      return mockXhr;
    });
    Reports.getLastWeeksOverview(callbacks);
    const response = [{ date: '2024-06-15', totalCount: 10 }];
    capturedCallbacks[200].call({}, { responseText: JSON.stringify(response) });
    expect(callbacks.success).toHaveBeenCalled();
  });

  it('getLastWeeksOverview calls error callback on failure', () => {
    let capturedCallbacks;
    requestBuilder.mockImplementation((path, method, cbs) => {
      capturedCallbacks = cbs;
      return mockXhr;
    });
    Reports.getLastWeeksOverview(callbacks);
    capturedCallbacks.failure.call({}, { responseText: 'error' });
    expect(callbacks.error).toHaveBeenCalled();
  });

  it('getRingsOverview calls success callback with processed data on 200', () => {
    let capturedCallbacks;
    requestBuilder.mockImplementation((path, method, cbs) => {
      capturedCallbacks = cbs;
      return mockXhr;
    });
    Reports.getRingsOverview(callbacks);
    const response = [{ month: 10, quarter: 30, half: 50 }];
    capturedCallbacks[200].call({}, { responseText: JSON.stringify(response) });
    expect(callbacks.success).toHaveBeenCalled();
  });

  it('getRingsOverview calls error callback on failure', () => {
    let capturedCallbacks;
    requestBuilder.mockImplementation((path, method, cbs) => {
      capturedCallbacks = cbs;
      return mockXhr;
    });
    Reports.getRingsOverview(callbacks);
    capturedCallbacks.failure.call({}, { responseText: 'error' });
    expect(callbacks.error).toHaveBeenCalled();
  });

  it('getAssessmentsOverview calls success callback on 200', () => {
    let capturedCallbacks;
    requestBuilder.mockImplementation((path, method, cbs) => {
      capturedCallbacks = cbs;
      return mockXhr;
    });
    Reports.getAssessmentsOverview(callbacks);
    const response = [{ id: 1, count: 5 }];
    capturedCallbacks[200].call({}, { responseText: JSON.stringify(response) });
    expect(callbacks.success).toHaveBeenCalled();
  });

  it('getAssessmentsOverview calls error callback on failure', () => {
    let capturedCallbacks;
    requestBuilder.mockImplementation((path, method, cbs) => {
      capturedCallbacks = cbs;
      return mockXhr;
    });
    Reports.getAssessmentsOverview(callbacks);
    capturedCallbacks.failure.call({}, { responseText: 'error' });
    expect(callbacks.error).toHaveBeenCalled();
  });

  it('getLastWeeksOverview is null-safe', () => {
    requestBuilder.mockReturnValue(null);
    expect(() => Reports.getLastWeeksOverview(callbacks)).not.toThrow();
  });

  it('getRingsOverview is null-safe', () => {
    requestBuilder.mockReturnValue(null);
    expect(() => Reports.getRingsOverview(callbacks)).not.toThrow();
  });

  it('getAssessmentsOverview is null-safe', () => {
    requestBuilder.mockReturnValue(null);
    expect(() => Reports.getAssessmentsOverview(callbacks)).not.toThrow();
  });
});
