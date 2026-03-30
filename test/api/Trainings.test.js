vi.mock('api/helpers/RequestBuilder', () => ({ default: vi.fn() }));

import requestBuilder from 'api/helpers/RequestBuilder';
import Trainings from 'api/Trainings';

describe('Trainings API', () => {
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

  it('getList calls success callback on 200', () => {
    let capturedCallbacks;
    requestBuilder.mockImplementation((path, method, cbs) => {
      capturedCallbacks = cbs;
      return mockXhr;
    });
    Trainings.getList(1, callbacks);
    const data = [{ id: 1, date: '2024-06-15', arrows: [{ distance: 18, type: 'TARGET', arrows: 36 }] }];
    capturedCallbacks[200].call({}, { responseText: JSON.stringify(data) });
    expect(callbacks.success).toHaveBeenCalled();
  });

  it('getList calls error callback on failure', () => {
    let capturedCallbacks;
    requestBuilder.mockImplementation((path, method, cbs) => {
      capturedCallbacks = cbs;
      return mockXhr;
    });
    Trainings.getList(1, callbacks);
    capturedCallbacks.failure.call({}, { responseText: 'error' });
    expect(callbacks.error).toHaveBeenCalled();
  });

  it('save calls error callback on failure', () => {
    let capturedCallbacks;
    requestBuilder.mockImplementation((path, method, cbs) => {
      capturedCallbacks = cbs;
      return mockXhr;
    });
    const training = { date: new Date(), arrows: { '18': { TARGET: 36 } } };
    Trainings.save(training, callbacks);
    capturedCallbacks.failure.call({}, { responseText: 'error' });
    expect(callbacks.error).toHaveBeenCalled();
  });

  it('delete calls error callback on failure', () => {
    let capturedCallbacks;
    requestBuilder.mockImplementation((path, method, cbs) => {
      capturedCallbacks = cbs;
      return mockXhr;
    });
    Trainings.delete(5, 10, callbacks);
    capturedCallbacks.failure.call({}, { responseText: 'error' });
    expect(callbacks.error).toHaveBeenCalled();
  });

  it('delete is null-safe', () => {
    requestBuilder.mockReturnValue(null);
    expect(() => Trainings.delete(5, 10, callbacks)).not.toThrow();
  });
});
