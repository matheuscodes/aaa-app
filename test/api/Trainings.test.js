jest.mock('api/helpers/RequestBuilder', () => jest.fn());

import requestBuilder from 'api/helpers/RequestBuilder';
import Trainings from 'api/Trainings';

describe('Trainings API', () => {
  let mockXhr;
  let callbacks;

  beforeEach(() => {
    mockXhr = { send: jest.fn() };
    requestBuilder.mockReturnValue(mockXhr);
    callbacks = {
      success: jest.fn(),
      error: jest.fn(),
      context: {},
    };
  });

  it('getList sends GET to /trainings/?page=N', () => {
    Trainings.getList(1, callbacks);
    expect(requestBuilder).toHaveBeenCalledWith('/trainings/?page=1', 'GET', expect.any(Object));
    expect(mockXhr.send).toHaveBeenCalled();
  });

  it('getList is null-safe', () => {
    requestBuilder.mockReturnValue(null);
    expect(() => Trainings.getList(1, callbacks)).not.toThrow();
  });

  it('save sends POST for new training', () => {
    const training = {
      date: new Date(),
      arrows: { '18': { TARGET: 36 } },
    };
    Trainings.save(training, callbacks);
    expect(requestBuilder).toHaveBeenCalledWith('/trainings/', 'POST', expect.any(Object));
  });

  it('save sends PUT for existing training', () => {
    const training = {
      id: 99,
      date: new Date(),
      arrows: { '18': { TARGET: 36 } },
    };
    Trainings.save(training, callbacks);
    expect(requestBuilder).toHaveBeenCalledWith('/trainings/99/', 'PUT', expect.any(Object));
  });

  it('delete sends DELETE to the correct path', () => {
    Trainings.delete(5, 10, callbacks);
    expect(requestBuilder).toHaveBeenCalledWith('/seasons/5/trainings/10/', 'DELETE', expect.any(Object));
  });
});
