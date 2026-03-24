/**
 * Shared API mock for page-level component tests.
 * Import this mock at the top of test files using jest.mock.
 */
const createApiMock = () => ({
  login: jest.fn(),
  reset: jest.fn(),
  confirm: jest.fn(),
  newLogin: jest.fn(),
  replaceLogin: jest.fn(),
  isAuthError: jest.fn(() => false),
  overview: { get: jest.fn() },
  seasons: {
    getList: jest.fn(),
    getById: jest.fn(),
    getActive: jest.fn(),
    getMonthReport: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    permit: jest.fn(),
    deny: jest.fn(),
  },
  assessments: {
    getList: jest.fn(),
    getById: jest.fn(),
    reportById: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    getTargets: jest.fn(),
  },
  trainings: {
    getList: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  },
  reports: {
    getYearOverview: jest.fn(),
    getLastWeeksOverview: jest.fn(),
    getRingsOverview: jest.fn(),
    getAssessmentsOverview: jest.fn(),
  },
  events: {
    getList: jest.fn(),
    getPublicEvents: jest.fn(),
    register: jest.fn(),
    unregister: jest.fn(),
  },
  equipment: {
    getList: jest.fn(),
    getById: jest.fn(),
  },
  trainers: {
    getAllTrainers: jest.fn(),
    postArcherToTrainer: jest.fn(),
    putArcherToTrainer: jest.fn(),
    deleteArcherToTrainer: jest.fn(),
    archers: { list: jest.fn() },
    seasons: { list: jest.fn(), getMonthReport: jest.fn() },
  },
});

module.exports = createApiMock();
