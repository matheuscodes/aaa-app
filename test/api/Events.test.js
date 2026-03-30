vi.mock('api/helpers/RequestBuilder', () => ({ default: vi.fn() }));

import requestBuilder from 'api/helpers/RequestBuilder';
import Events from 'api/Events';

describe('Events API', () => {
  let mockXhr;
  let callbacks;

  beforeEach(() => {
    mockXhr = { send: vi.fn() };
    requestBuilder.mockReturnValue(mockXhr);
    callbacks = {
      success: vi.fn(),
      error: vi.fn(),
      context: {},
    };
  });

  describe('getList', () => {
    it('calls success with empty array (events disabled)', () => {
      Events.getList(callbacks);
      expect(callbacks.success).toHaveBeenCalledWith([]);
    });
  });

  describe('getPublicEvents', () => {
    it('calls success with empty array (events disabled)', () => {
      Events.getPublicEvents(callbacks);
      expect(callbacks.success).toHaveBeenCalledWith([]);
    });
  });

  describe('register', () => {
    it('builds a POST request for the event', () => {
      Events.register('event123', callbacks);
      expect(requestBuilder).toHaveBeenCalledWith(
        '/events/event123/',
        'POST',
        expect.any(Object)
      );
    });
  });

  describe('unregister', () => {
    it('builds a DELETE request for the event', () => {
      Events.unregister('event456', callbacks);
      expect(requestBuilder).toHaveBeenCalledWith(
        '/events/event456/',
        'DELETE',
        expect.any(Object)
      );
    });
  });
});
