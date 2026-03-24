import TrainerRequestBuilder from 'api/helpers/TrainerRequestBuilder';

jest.mock('api/helpers/getLocalArcher', () => jest.fn());

import getLocalArcher from 'api/helpers/getLocalArcher';

describe('TrainerRequestBuilder', () => {
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

  it('builds a request with trainer archer path when archer is available', () => {
    getLocalArcher.mockReturnValue({ id: 5 });
    localStorage.loggedToken = 'trainer-token';
    const request = TrainerRequestBuilder('/archers', 'GET', { failure: jest.fn(), context: {} });
    expect(request).toBe(mockXhr);
    expect(mockXhr.open).toHaveBeenCalledWith('GET', expect.stringContaining('/trainers/5/archers'), true);
    expect(mockXhr.setRequestHeader).toHaveBeenCalledWith('X-AAA-Authorization', 'trainer-token');
  });

  it('returns null and calls failure when archer is missing', () => {
    getLocalArcher.mockReturnValue(undefined);
    const failureMock = jest.fn();
    const request = TrainerRequestBuilder('/archers', 'GET', { failure: failureMock, context: {} });
    expect(request).toBeNull();
    expect(failureMock).toHaveBeenCalled();
  });

  it('calls status callback on readyState 4', () => {
    getLocalArcher.mockReturnValue({ id: 1 });
    localStorage.loggedToken = 'trainer-token';
    const successCallback = jest.fn();
    TrainerRequestBuilder('/archers', 'GET', { 200: successCallback, failure: jest.fn(), context: {} });
    mockXhr.onreadystatechange && mockXhr.onreadystatechange();
    expect(successCallback).toHaveBeenCalledWith(mockXhr);
  });
});
