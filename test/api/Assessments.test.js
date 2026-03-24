jest.mock('api/helpers/RequestBuilder', () => jest.fn());

import requestBuilder from 'api/helpers/RequestBuilder';
import Assessments from 'api/Assessments';

describe('Assessments API', () => {
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

  it('getList sends GET request', () => {
    Assessments.getList(1, callbacks);
    expect(requestBuilder).toHaveBeenCalledWith(expect.stringContaining('/assessments/'), 'GET', expect.any(Object));
    expect(mockXhr.send).toHaveBeenCalled();
  });

  it('getList is null-safe', () => {
    requestBuilder.mockReturnValue(null);
    expect(() => Assessments.getList(1, callbacks)).not.toThrow();
  });

  it('getById sends GET to /assessments/:id/', () => {
    Assessments.getById(5, callbacks);
    expect(requestBuilder).toHaveBeenCalledWith('/assessments/5/', 'GET', expect.any(Object));
  });

  it('reportById sends GET to the season-assessment report path', () => {
    Assessments.reportById(10, 2, callbacks);
    expect(requestBuilder).toHaveBeenCalledWith('/seasons/2/assessments/10/report/', 'GET', expect.any(Object));
  });

  it('save sends POST for new assessment', () => {
    const assessment = {
      date: new Date(),
      target: 'face',
      distance: 18,
      seasonId: 1,
      eventId: null,
      temperature: 20,
      weather: 'FAIR',
      windSpeed: 5,
      windDirection: 'N',
      shootDirection: 'S',
      rounds: [[['X', '10', '9']]],
    };
    assessment.rounds = [{ ends: [['X', '10', '9']] }];
    Assessments.save(assessment, callbacks);
    expect(requestBuilder).toHaveBeenCalledWith('/assessments/', 'POST', expect.any(Object));
  });

  it('save sends PUT for existing assessment', () => {
    const assessment = {
      id: 99,
      date: new Date(),
      target: 'face',
      distance: 18,
      seasonId: 1,
      eventId: null,
      temperature: 20,
      weather: 'FAIR',
      windSpeed: 5,
      windDirection: 'N',
      shootDirection: 'S',
      rounds: [{ ends: [['X', '10', '9']] }],
    };
    Assessments.save(assessment, callbacks);
    expect(requestBuilder).toHaveBeenCalledWith('/assessments/99/', 'PUT', expect.any(Object));
  });

  it('delete sends DELETE to the correct path', () => {
    Assessments.delete(3, 7, callbacks);
    expect(requestBuilder).toHaveBeenCalledWith('/seasons/3/assessments/7/', 'DELETE', expect.any(Object));
  });
});
