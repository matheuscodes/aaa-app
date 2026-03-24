jest.mock('api/helpers/RequestBuilder', () => jest.fn());

import requestBuilder from 'api/helpers/RequestBuilder';
import Reports from 'api/Reports';

describe('Reports API', () => {
  let mockXhr;
  let callbacks;

  beforeEach(() => {
    mockXhr = { send: jest.fn() };
    requestBuilder.mockReturnValue(mockXhr);
    callbacks = {
      success: jest.fn(),
      error: jest.fn(),
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
});
