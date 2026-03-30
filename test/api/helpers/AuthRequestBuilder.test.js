import AuthRequestBuilder from 'api/helpers/AuthRequestBuilder';

vi.mock('api/helpers/getLocalArcher', () => ({ default: vi.fn() }));

import getLocalArcher from 'api/helpers/getLocalArcher';

describe('AuthRequestBuilder', () => {
  let mockXhr;

  beforeEach(() => {
    mockXhr = {
      open: vi.fn(),
      setRequestHeader: vi.fn(),
      send: vi.fn(),
      readyState: 4,
      status: 200,
      onreadystatechange: null,
    };
    global.XMLHttpRequest = vi.fn(function() { return mockXhr; });
    localStorage.clear();
  });

  it('builds request when archer is available', () => {
    getLocalArcher.mockReturnValue({ id: 10 });
    localStorage.loggedToken = 'token-value';
    const request = AuthRequestBuilder('GET', '/trainers', { failure: vi.fn(), context: {} });
    expect(request).toBe(mockXhr);
    expect(mockXhr.open).toHaveBeenCalledWith('GET', expect.stringContaining('/trainers'), true);
    expect(mockXhr.setRequestHeader).toHaveBeenCalledWith('X-AAA-Authorization', 'token-value');
  });

  it('returns null and calls failure when archer is missing', () => {
    getLocalArcher.mockReturnValue(undefined);
    const failureMock = vi.fn();
    const request = AuthRequestBuilder('GET', '/trainers', { failure: failureMock, context: {} });
    expect(request).toBeNull();
    expect(failureMock).toHaveBeenCalled();
  });

  it('calls status callback on readyState 4', () => {
    getLocalArcher.mockReturnValue({ id: 1 });
    localStorage.loggedToken = 'token-value';
    const successCallback = vi.fn();
    AuthRequestBuilder('GET', '/trainers', { 200: successCallback, failure: vi.fn(), context: {} });
    mockXhr.onreadystatechange && mockXhr.onreadystatechange();
    expect(successCallback).toHaveBeenCalledWith(mockXhr);
  });
});
