import DownloadFile from 'api/helpers/DownloadFile';

describe('DownloadFile', () => {
  let mockXhr;

  beforeEach(() => {
    mockXhr = {
      open: vi.fn(),
      send: vi.fn(),
      readyState: 4,
      status: 200,
      onreadystatechange: null,
    };
    global.XMLHttpRequest = vi.fn(function() { return mockXhr; });
  });

  it('opens a GET request to the given URL', () => {
    DownloadFile('http://example.com/file', {});
    expect(mockXhr.open).toHaveBeenCalledWith('GET', 'http://example.com/file', true);
  });

  it('sends the request', () => {
    DownloadFile('http://example.com/file', {});
    expect(mockXhr.send).toHaveBeenCalled();
  });

  it('calls status-specific callback when readyState is 4', () => {
    const callback200 = vi.fn();
    const callbacks = { 200: callback200, context: {} };
    DownloadFile('http://example.com/file', callbacks);
    mockXhr.onreadystatechange && mockXhr.onreadystatechange();
    expect(callback200).toHaveBeenCalledWith(mockXhr);
  });

  it('calls failure callback for unexpected status', () => {
    const failureCallback = vi.fn();
    mockXhr.status = 500;
    const callbacks = { 200: vi.fn(), failure: failureCallback, context: {} };
    DownloadFile('http://example.com/file', callbacks);
    mockXhr.onreadystatechange && mockXhr.onreadystatechange();
    expect(failureCallback).toHaveBeenCalledWith(mockXhr);
  });

  it('works without callbacks argument', () => {
    expect(() => DownloadFile('http://example.com/file')).not.toThrow();
  });
});
