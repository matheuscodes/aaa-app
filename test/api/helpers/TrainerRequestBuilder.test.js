import TrainerRequestBuilder from 'api/helpers/TrainerRequestBuilder';

vi.mock('api/helpers/getLocalArcher', () => ({ default: vi.fn() }));

import getLocalArcher from 'api/helpers/getLocalArcher';

describe('TrainerRequestBuilder', () => {
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

  it('builds a request with trainer archer path when archer is available', () => {
    getLocalArcher.mockReturnValue({ id: 5 });
    localStorage.loggedToken = 'trainer-token';
    const request = TrainerRequestBuilder('/archers', 'GET', { failure: vi.fn(), context: {} });
    expect(request).toBe(mockXhr);
    expect(mockXhr.open).toHaveBeenCalledWith('GET', expect.stringContaining('/trainers/5/archers'), true);
    expect(mockXhr.setRequestHeader).toHaveBeenCalledWith('X-AAA-Authorization', 'trainer-token');
  });

  it('returns null and calls failure when archer is missing', () => {
    getLocalArcher.mockReturnValue(undefined);
    const failureMock = vi.fn();
    const request = TrainerRequestBuilder('/archers', 'GET', { failure: failureMock, context: {} });
    expect(request).toBeNull();
    expect(failureMock).toHaveBeenCalled();
  });

  it('calls status callback on readyState 4', () => {
    getLocalArcher.mockReturnValue({ id: 1 });
    localStorage.loggedToken = 'trainer-token';
    const successCallback = vi.fn();
    TrainerRequestBuilder('/archers', 'GET', { 200: successCallback, failure: vi.fn(), context: {} });
    mockXhr.onreadystatechange && mockXhr.onreadystatechange();
    expect(successCallback).toHaveBeenCalledWith(mockXhr);
  });
});
