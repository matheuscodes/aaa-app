jest.mock('api/helpers/RequestBuilder', () => jest.fn());

import requestBuilder from 'api/helpers/RequestBuilder';
import Overview from 'api/Overview';

describe('Overview API', () => {
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

  it('builds a GET request to /overview/', () => {
    Overview.get(callbacks);
    expect(requestBuilder).toHaveBeenCalledWith('/overview/', 'GET', expect.any(Object));
    expect(mockXhr.send).toHaveBeenCalled();
  });

  it('returns null-safe (no crash when requestBuilder returns null)', () => {
    requestBuilder.mockReturnValue(null);
    expect(() => Overview.get(callbacks)).not.toThrow();
  });

  it('calls success callback with parsed response on 200', () => {
    let capturedCallbacks;
    requestBuilder.mockImplementation((path, method, cbs) => {
      capturedCallbacks = cbs;
      return mockXhr;
    });
    Overview.get(callbacks);
    capturedCallbacks[200].call({}, { responseText: '{"data":1}' });
    expect(callbacks.success).toHaveBeenCalledWith({ data: 1 });
  });
});
