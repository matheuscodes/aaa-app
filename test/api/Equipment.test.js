jest.mock('api/helpers/RequestBuilder', () => jest.fn());

import requestBuilder from 'api/helpers/RequestBuilder';
import Equipment from 'api/Equipment';

describe('Equipment API', () => {
  let mockXhr;

  beforeEach(() => {
    mockXhr = { send: jest.fn(), onreadystatechange: null, readyState: 4, status: 200, responseText: '{}' };
    requestBuilder.mockReturnValue(mockXhr);
  });

  describe('getList', () => {
    it('calls callback with empty array', () => {
      const callback = jest.fn();
      Equipment.getList({}, callback);
      expect(callback).toHaveBeenCalledWith([]);
    });
  });

  describe('getById', () => {
    it('builds a GET request for the equipment by id', () => {
      Equipment.getById(7, {}, jest.fn());
      expect(requestBuilder).toHaveBeenCalledWith('/equipment/7', 'GET');
    });
  });
});
