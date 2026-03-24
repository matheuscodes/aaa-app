import RoutePaths from 'global/RoutePaths';

describe('RoutePaths', () => {
  it('has login path', () => {
    expect(RoutePaths.login).toBe('/login');
  });

  it('has about path', () => {
    expect(RoutePaths.about).toBe('/about');
  });

  it('has terms path', () => {
    expect(RoutePaths.terms).toBe('/terms');
  });

  it('has home path', () => {
    expect(RoutePaths.home).toBe('/home');
  });

  it('has seasons path', () => {
    expect(RoutePaths.seasons).toBe('/seasons');
  });

  it('has trainings path', () => {
    expect(RoutePaths.trainings).toBe('/trainings');
  });

  it('has assessments path', () => {
    expect(RoutePaths.assessments).toBe('/assessments');
  });

  it('has reports path', () => {
    expect(RoutePaths.reports).toBe('/reports');
  });

  it('has forgotten path', () => {
    expect(RoutePaths.forgotten).toBe('/forgotten');
  });

  it('has newLogin path', () => {
    expect(RoutePaths.newLogin).toBe('/new');
  });

  it('has confirmLogin path', () => {
    expect(RoutePaths.confirmLogin).toBe('/confirm');
  });

  it('has settings path', () => {
    expect(RoutePaths.settings).toBe('/settings');
  });

  it('has trainer sub-paths', () => {
    expect(RoutePaths.trainer.requests).toBe('/trainer/requests');
    expect(RoutePaths.trainer.archers).toBe('/trainer/archers');
    expect(RoutePaths.trainer.reports).toBe('/trainer/reports');
  });
});
