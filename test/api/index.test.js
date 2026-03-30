vi.mock('api/helpers/RequestBuilder', () => ({ default: vi.fn() }));
vi.mock('api/helpers/AuthRequestBuilder', () => ({ default: vi.fn() }));
vi.mock('api/helpers/getLocalArcher', () => ({ default: vi.fn() }));
vi.mock('api/helpers/TrainerRequestBuilder', () => ({ default: vi.fn() }));

import Api from 'api/index';

describe('API index', () => {
  it('exports reports', () => {
    expect(Api.reports).toBeDefined();
  });

  it('exports seasons', () => {
    expect(Api.seasons).toBeDefined();
  });

  it('exports assessments', () => {
    expect(Api.assessments).toBeDefined();
  });

  it('exports trainings', () => {
    expect(Api.trainings).toBeDefined();
  });

  it('exports events', () => {
    expect(Api.events).toBeDefined();
  });

  it('exports equipment', () => {
    expect(Api.equipment).toBeDefined();
  });

  it('exports login function', () => {
    expect(typeof Api.login).toBe('function');
  });

  it('exports reset function', () => {
    expect(typeof Api.reset).toBe('function');
  });

  it('exports confirm function', () => {
    expect(typeof Api.confirm).toBe('function');
  });

  it('exports newLogin function', () => {
    expect(typeof Api.newLogin).toBe('function');
  });

  it('exports replaceLogin function', () => {
    expect(typeof Api.replaceLogin).toBe('function');
  });

  it('exports isAuthError function', () => {
    expect(typeof Api.isAuthError).toBe('function');
  });

  it('exports trainers', () => {
    expect(Api.trainers).toBeDefined();
  });

  it('exports overview', () => {
    expect(Api.overview).toBeDefined();
  });
});
