vi.mock('api/helpers/RequestBuilder', () => ({ default: vi.fn() }));

import requestBuilder from 'api/helpers/RequestBuilder';
import Seasons from 'api/Seasons';

describe('Seasons API', () => {
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

  const nullSafe = () => {
    requestBuilder.mockReturnValue(null);
  };

  it('getList sends GET to /seasons/', () => {
    Seasons.getList(callbacks);
    expect(requestBuilder).toHaveBeenCalledWith('/seasons/', 'GET', expect.any(Object));
    expect(mockXhr.send).toHaveBeenCalled();
  });

  it('getList is null-safe', () => {
    nullSafe();
    expect(() => Seasons.getList(callbacks)).not.toThrow();
  });

  it('getActive sends GET to /seasons/active', () => {
    Seasons.getActive(callbacks);
    expect(requestBuilder).toHaveBeenCalledWith('/seasons/active', 'GET', expect.any(Object));
  });

  it('getById sends GET to /seasons/:id', () => {
    Seasons.getById(42, callbacks);
    expect(requestBuilder).toHaveBeenCalledWith('/seasons/42', 'GET', expect.any(Object));
  });

  it('getMonthReport sends GET to correct path', () => {
    Seasons.getMonthReport(1, 2023, 6, callbacks);
    expect(requestBuilder).toHaveBeenCalledWith('/seasons/1/report/2023/6', 'GET', expect.any(Object));
  });

  it('save sends POST for new season', () => {
    const season = { name: 'S1', start: '2023-01-01', end: '2023-12-31', goals: [] };
    Seasons.save(season, callbacks);
    expect(requestBuilder).toHaveBeenCalledWith('/seasons/', 'POST', expect.any(Object));
  });

  it('save sends PUT for existing season', () => {
    const season = { id: 5, name: 'S1', start: '2023-01-01', end: '2023-12-31', goals: [] };
    Seasons.save(season, callbacks);
    expect(requestBuilder).toHaveBeenCalledWith('/seasons/5', 'PUT', expect.any(Object));
  });

  it('delete sends DELETE to /seasons/:id', () => {
    Seasons.delete(3, callbacks);
    expect(requestBuilder).toHaveBeenCalledWith('/seasons/3', 'DELETE', expect.any(Object));
  });

  it('permit sends PUT to permission path', () => {
    Seasons.permit(1, 'trainer1', callbacks);
    expect(requestBuilder).toHaveBeenCalledWith('/seasons/1/permissions/trainer1', 'PUT', expect.any(Object));
  });

  it('deny sends DELETE to permission path', () => {
    Seasons.deny(1, 'trainer1', callbacks);
    expect(requestBuilder).toHaveBeenCalledWith('/seasons/1/permissions/trainer1', 'DELETE', expect.any(Object));
  });
});
