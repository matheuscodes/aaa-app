import RequestBuilder from 'api/helpers/RequestBuilder';

jest.mock('api/helpers/getLocalArcher', () => jest.fn());

import getLocalArcher from 'api/helpers/getLocalArcher';

describe('RequestBuilder', () => {
  let mockXhr;

  beforeEach(() => {
    mockXhr = {
      open: jest.fn(),
      setRequestHeader: jest.fn(),
      send: jest.fn(),
      readyState: 4,
      status: 200,
      onreadystatechange: null,
    };
    global.XMLHttpRequest = jest.fn(() => mockXhr);
    localStorage.clear();
  });

  it('builds a login request without archer check', () => {
    const request = RequestBuilder('/login/', 'POST', { failure: jest.fn(), context: {} });
    expect(request).toBe(mockXhr);
    expect(mockXhr.open).toHaveBeenCalledWith('POST', expect.stringContaining('/login/'), true);
  });

  it('builds an authenticated request when archer is available', () => {
    getLocalArcher.mockReturnValue({ id: 42 });
    localStorage.loggedToken = 'mock-token';
    const request = RequestBuilder('/seasons/', 'GET', { failure: jest.fn(), context: {} });
    expect(request).toBe(mockXhr);
    expect(mockXhr.open).toHaveBeenCalledWith('GET', expect.stringContaining('/archers/42/seasons/'), true);
    expect(mockXhr.setRequestHeader).toHaveBeenCalledWith('X-AAA-Authorization', 'mock-token');
  });

  it('returns null and calls failure when archer is missing for non-login path', () => {
    getLocalArcher.mockReturnValue(undefined);
    const failureMock = jest.fn();
    const request = RequestBuilder('/seasons/', 'GET', { failure: failureMock, context: {} });
    expect(request).toBeNull();
    expect(failureMock).toHaveBeenCalled();
  });

  it('calls status callback on readyState 4', () => {
    getLocalArcher.mockReturnValue({ id: 1 });
    localStorage.loggedToken = 'mock-token';
    const successCallback = jest.fn();
    RequestBuilder('/seasons/', 'GET', { 200: successCallback, failure: jest.fn(), context: {} });
    mockXhr.onreadystatechange && mockXhr.onreadystatechange();
    expect(successCallback).toHaveBeenCalledWith(mockXhr);
  });

  it('calls failure callback for unexpected status', () => {
    getLocalArcher.mockReturnValue({ id: 1 });
    localStorage.loggedToken = 'mock-token';
    const failureCallback = jest.fn();
    mockXhr.status = 404;
    RequestBuilder('/seasons/', 'GET', { 200: jest.fn(), failure: failureCallback, context: {} });
    mockXhr.onreadystatechange && mockXhr.onreadystatechange();
    expect(failureCallback).toHaveBeenCalledWith(mockXhr);
  });
});
