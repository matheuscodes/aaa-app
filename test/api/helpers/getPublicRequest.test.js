import getPublicRequest from 'api/helpers/getPublicRequest';

describe('getPublicRequest', () => {
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
  });

  it('creates an XMLHttpRequest and opens it with GET', () => {
    getPublicRequest('/some/path', 'GET', {});
    expect(mockXhr.open).toHaveBeenCalledWith('GET', expect.stringContaining('/some/path'), true);
  });

  it('sets Content-type header', () => {
    getPublicRequest('/some/path', 'GET', {});
    expect(mockXhr.setRequestHeader).toHaveBeenCalledWith('Content-type', 'application/json');
  });

  it('calls the appropriate status callback on readyState 4', () => {
    const successCallback = jest.fn();
    const callbacks = { 200: successCallback, context: {} };
    getPublicRequest('/some/path', 'GET', callbacks);
    mockXhr.onreadystatechange && mockXhr.onreadystatechange();
    expect(successCallback).toHaveBeenCalledWith(mockXhr);
  });

  it('calls failure callback when status has no matching handler', () => {
    const failureCallback = jest.fn();
    mockXhr.status = 404;
    const callbacks = { 200: jest.fn(), failure: failureCallback, context: {} };
    getPublicRequest('/some/path', 'GET', callbacks);
    mockXhr.onreadystatechange && mockXhr.onreadystatechange();
    expect(failureCallback).toHaveBeenCalledWith(mockXhr);
  });

  it('works without callbacks argument', () => {
    expect(() => getPublicRequest('/some/path', 'GET')).not.toThrow();
  });
});
