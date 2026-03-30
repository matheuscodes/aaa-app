vi.mock('api/helpers/RequestBuilder', () => ({ default: vi.fn() }));

import requestBuilder from 'api/helpers/RequestBuilder';
import Equipment from 'api/Equipment';

describe('Equipment API', () => {
  let mockXhr;

  beforeEach(() => {
    mockXhr = { send: vi.fn(), onreadystatechange: null, readyState: 4, status: 200, responseText: '{}' };
    requestBuilder.mockReturnValue(mockXhr);
  });

  describe('getList', () => {
    it('calls callback with empty array', () => {
      const callback = vi.fn();
      Equipment.getList({}, callback);
      expect(callback).toHaveBeenCalledWith([]);
    });
  });

  describe('getById', () => {
    it('builds a GET request for the equipment by id', () => {
      Equipment.getById(7, {}, vi.fn());
      expect(requestBuilder).toHaveBeenCalledWith('/equipment/7', 'GET');
    });
  });
});
