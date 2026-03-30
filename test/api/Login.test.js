vi.mock('api/helpers/RequestBuilder', () => ({ default: vi.fn() }));

import requestBuilder from 'api/helpers/RequestBuilder';
import { login, reset, confirm, newLogin, replaceLogin } from 'api/Login';

describe('Login API', () => {
  let mockXhr;
  let callbacks;

  beforeEach(() => {
    mockXhr = {
      send: vi.fn(),
      readyState: 4,
      status: 200,
      responseText: 'mock-token',
    };
    requestBuilder.mockReturnValue(mockXhr);
    callbacks = {
      success: vi.fn(),
      error: vi.fn(),
      context: {},
    };
    localStorage.clear();
  });

  describe('login', () => {
    it('sends a POST request to /login/', () => {
      login({ email: 'a@b.com', password: 'pass' }, callbacks);
      expect(requestBuilder).toHaveBeenCalledWith('/login/', 'POST', expect.any(Object));
      expect(mockXhr.send).toHaveBeenCalled();
    });

    it('stores token in localStorage on 200 success', () => {
      let capturedCallbacks;
      requestBuilder.mockImplementation((path, method, cbs) => {
        capturedCallbacks = cbs;
        return mockXhr;
      });
      login({ email: 'a@b.com', password: 'pass' }, callbacks);
      capturedCallbacks[200].call({}, { responseText: 'my-jwt' });
      expect(localStorage.loggedToken).toBe('my-jwt');
      expect(callbacks.success).toHaveBeenCalled();
    });

    it('removes token from localStorage on failure', () => {
      localStorage.loggedToken = 'old-token';
      let capturedCallbacks;
      requestBuilder.mockImplementation((path, method, cbs) => {
        capturedCallbacks = cbs;
        return mockXhr;
      });
      login({ email: 'a@b.com', password: 'pass' }, callbacks);
      capturedCallbacks.failure.call({}, {});
      expect(localStorage.getItem('loggedToken')).toBeNull();
      expect(callbacks.error).toHaveBeenCalled();
    });
  });

  describe('reset', () => {
    it('sends a DELETE request to /login/', () => {
      reset({ email: 'a@b.com' }, callbacks);
      expect(requestBuilder).toHaveBeenCalledWith('/login/', 'DELETE', expect.any(Object));
      expect(mockXhr.send).toHaveBeenCalled();
    });
  });

  describe('confirm', () => {
    it('sends a GET request with query string', () => {
      confirm('?token=abc', callbacks);
      expect(requestBuilder).toHaveBeenCalledWith('/login?token=abc', 'GET', expect.any(Object));
    });
  });

  describe('newLogin', () => {
    it('sends a PUT request to /login/', () => {
      newLogin({ password: 'newpass' }, callbacks);
      expect(requestBuilder).toHaveBeenCalledWith('/login/', 'PUT', expect.any(Object));
    });
  });

  describe('replaceLogin', () => {
    it('sends a PATCH request to /login/', () => {
      replaceLogin({ password: 'newpass' }, callbacks);
      expect(requestBuilder).toHaveBeenCalledWith('/login/', 'PATCH', expect.any(Object));
    });
  });
});
