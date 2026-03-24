import AuthRequestBuilder from 'api/helpers/AuthRequestBuilder';

jest.mock('api/helpers/getLocalArcher', () => jest.fn());

import getLocalArcher from 'api/helpers/getLocalArcher';

describe('AuthRequestBuilder', () => {
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

  it('builds request when archer is available', () => {
    getLocalArcher.mockReturnValue({ id: 10 });
    localStorage.loggedToken = 'token-value';
    const request = AuthRequestBuilder('GET', '/trainers', { failure: jest.fn(), context: {} });
    expect(request).toBe(mockXhr);
    expect(mockXhr.open).toHaveBeenCalledWith('GET', expect.stringContaining('/trainers'), true);
    expect(mockXhr.setRequestHeader).toHaveBeenCalledWith('X-AAA-Authorization', 'token-value');
  });

  it('returns null and calls failure when archer is missing', () => {
    getLocalArcher.mockReturnValue(undefined);
    const failureMock = jest.fn();
    const request = AuthRequestBuilder('GET', '/trainers', { failure: failureMock, context: {} });
    expect(request).toBeNull();
    expect(failureMock).toHaveBeenCalled();
  });

  it('calls status callback on readyState 4', () => {
    getLocalArcher.mockReturnValue({ id: 1 });
    localStorage.loggedToken = 'token-value';
    const successCallback = jest.fn();
    AuthRequestBuilder('GET', '/trainers', { 200: successCallback, failure: jest.fn(), context: {} });
    mockXhr.onreadystatechange && mockXhr.onreadystatechange();
    expect(successCallback).toHaveBeenCalledWith(mockXhr);
  });
});
