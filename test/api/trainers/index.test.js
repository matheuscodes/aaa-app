vi.mock('api/helpers/AuthRequestBuilder', () => ({ default: vi.fn() }));
vi.mock('api/helpers/getLocalArcher', () => ({ default: vi.fn() }));
vi.mock('api/helpers/TrainerRequestBuilder', () => ({ default: vi.fn() }));

import authRequestBuilder from 'api/helpers/AuthRequestBuilder';
import getLocalArcher from 'api/helpers/getLocalArcher';
import trainers, { TrainerArchersEndpoint, TrainerSeasonsEndpoint } from 'api/trainers';

describe('Trainers API index', () => {
  let mockXhr;
  let callbacks;

  beforeEach(() => {
    mockXhr = { send: vi.fn() };
    authRequestBuilder.mockReturnValue(mockXhr);
    getLocalArcher.mockReturnValue({ id: 7, trainerId: 77 });
    callbacks = {
      success: vi.fn(),
      failure: vi.fn(),
      context: {},
    };
  });

  it('exports TrainerArchersEndpoint class', () => {
    expect(typeof TrainerArchersEndpoint).toBe('function');
    expect(new TrainerArchersEndpoint()).toBeInstanceOf(TrainerArchersEndpoint);
  });

  it('exports TrainerSeasonsEndpoint class', () => {
    expect(typeof TrainerSeasonsEndpoint).toBe('function');
    expect(new TrainerSeasonsEndpoint()).toBeInstanceOf(TrainerSeasonsEndpoint);
  });

  it('default export has archers and seasons', () => {
    expect(trainers.archers).toBeDefined();
    expect(trainers.seasons).toBeDefined();
  });

  it('getAllTrainers sends GET request', () => {
    trainers.getAllTrainers(callbacks);
    expect(authRequestBuilder).toHaveBeenCalledWith('GET', '/trainers', expect.any(Object));
    expect(mockXhr.send).toHaveBeenCalled();
  });

  it('getAllTrainers is null-safe', () => {
    authRequestBuilder.mockReturnValue(null);
    expect(() => trainers.getAllTrainers(callbacks)).not.toThrow();
  });

  it('postArcherToTrainer sends POST request', () => {
    trainers.postArcherToTrainer({ trainerId: 5 }, callbacks);
    expect(authRequestBuilder).toHaveBeenCalledWith('POST', `/trainers/5/archers`, expect.any(Object));
  });

  it('postArcherToTrainer is null-safe', () => {
    authRequestBuilder.mockReturnValue(null);
    expect(() => trainers.postArcherToTrainer({ trainerId: 5 }, callbacks)).not.toThrow();
  });

  it('getAllTrainers calls success callback on 200', () => {
    let capturedCallbacks;
    authRequestBuilder.mockImplementation((method, path, cbs) => {
      capturedCallbacks = cbs;
      return mockXhr;
    });
    trainers.getAllTrainers(callbacks);
    const data = [{ id: 1, name: 'Trainer 1' }];
    capturedCallbacks[200].call({}, { responseText: JSON.stringify(data) });
    expect(callbacks.success).toHaveBeenCalled();
  });

  it('postArcherToTrainer calls success callback on 200', () => {
    let capturedCallbacks;
    authRequestBuilder.mockImplementation((method, path, cbs) => {
      capturedCallbacks = cbs;
      return mockXhr;
    });
    trainers.postArcherToTrainer({ trainerId: 5 }, callbacks);
    capturedCallbacks[200].call({}, { responseText: '{}' });
    expect(callbacks.success).toHaveBeenCalled();
  });

  it('getTrainerRequests sends GET request', () => {
    trainers.getTrainerRequests(callbacks);
    expect(authRequestBuilder).toHaveBeenCalledWith('GET', `/trainers/77/requests`, expect.any(Object));
    expect(mockXhr.send).toHaveBeenCalled();
  });

  it('getTrainerRequests calls success callback on 200', () => {
    let capturedCallbacks;
    authRequestBuilder.mockImplementation((method, path, cbs) => {
      capturedCallbacks = cbs;
      return mockXhr;
    });
    trainers.getTrainerRequests(callbacks);
    const data = [{ id: 1, status: 'NEW' }];
    capturedCallbacks[200].call({}, { responseText: JSON.stringify(data) });
    expect(callbacks.success).toHaveBeenCalled();
  });

  it('getTrainerRequests is null-safe', () => {
    authRequestBuilder.mockReturnValue(null);
    expect(() => trainers.getTrainerRequests(callbacks)).not.toThrow();
  });

  it('getTrainerArchers sends GET request', () => {
    trainers.getTrainerArchers(callbacks);
    expect(authRequestBuilder).toHaveBeenCalledWith('GET', `/trainers/77/archers`, expect.any(Object));
  });

  it('getTrainerArchers calls success callback on 200', () => {
    let capturedCallbacks;
    authRequestBuilder.mockImplementation((method, path, cbs) => {
      capturedCallbacks = cbs;
      return mockXhr;
    });
    trainers.getTrainerArchers(callbacks);
    const data = [{ id: 1, name: 'Archer 1' }];
    capturedCallbacks[200].call({}, { responseText: JSON.stringify(data) });
    expect(callbacks.success).toHaveBeenCalled();
  });

  it('getTrainerArchers is null-safe', () => {
    authRequestBuilder.mockReturnValue(null);
    expect(() => trainers.getTrainerArchers(callbacks)).not.toThrow();
  });

  it('putTrainerArcher sends PUT request', () => {
    trainers.putTrainerArcher({ archerId: 3 }, callbacks);
    expect(authRequestBuilder).toHaveBeenCalledWith('PUT', `/trainers/77/archers/3`, expect.any(Object));
  });

  it('putTrainerArcher calls success callback on 201', () => {
    let capturedCallbacks;
    authRequestBuilder.mockImplementation((method, path, cbs) => {
      capturedCallbacks = cbs;
      return mockXhr;
    });
    trainers.putTrainerArcher({ archerId: 3 }, callbacks);
    capturedCallbacks[201].call({}, { responseText: '{}' });
    expect(callbacks.success).toHaveBeenCalled();
  });

  it('putTrainerArcher is null-safe', () => {
    authRequestBuilder.mockReturnValue(null);
    expect(() => trainers.putTrainerArcher({ archerId: 3 }, callbacks)).not.toThrow();
  });

  it('putArcherToTrainer sends PUT request', () => {
    trainers.putArcherToTrainer({ trainerId: 5, archer: { archerId: 3 } }, callbacks);
    expect(authRequestBuilder).toHaveBeenCalledWith('PUT', `/trainers/5/archers/3`, expect.any(Object));
  });

  it('putArcherToTrainer calls success callback on 201', () => {
    let capturedCallbacks;
    authRequestBuilder.mockImplementation((method, path, cbs) => {
      capturedCallbacks = cbs;
      return mockXhr;
    });
    trainers.putArcherToTrainer({ trainerId: 5, archer: { archerId: 3 } }, callbacks);
    capturedCallbacks[201].call({}, { responseText: '{}' });
    expect(callbacks.success).toHaveBeenCalled();
  });

  it('putArcherToTrainer is null-safe', () => {
    authRequestBuilder.mockReturnValue(null);
    expect(() => trainers.putArcherToTrainer({ trainerId: 5, archer: { archerId: 3 } }, callbacks)).not.toThrow();
  });

  it('deleteArcherToTrainer sends DELETE request', () => {
    trainers.deleteArcherToTrainer({ trainerId: 5, archer: { archerId: 3 } }, callbacks);
    expect(authRequestBuilder).toHaveBeenCalledWith('DELETE', `/trainers/5/archers/3`, expect.any(Object));
  });

  it('deleteArcherToTrainer calls success callback on 204', () => {
    let capturedCallbacks;
    authRequestBuilder.mockImplementation((method, path, cbs) => {
      capturedCallbacks = cbs;
      return mockXhr;
    });
    trainers.deleteArcherToTrainer({ trainerId: 5, archer: { archerId: 3 } }, callbacks);
    capturedCallbacks[204].call({}, { responseText: '' });
    expect(callbacks.success).toHaveBeenCalled();
  });

  it('deleteArcherToTrainer is null-safe', () => {
    authRequestBuilder.mockReturnValue(null);
    expect(() => trainers.deleteArcherToTrainer({ trainerId: 5, archer: { archerId: 3 } }, callbacks)).not.toThrow();
  });
});
