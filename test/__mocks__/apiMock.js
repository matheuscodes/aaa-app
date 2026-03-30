/**
 * Shared API mock for page-level component tests.
 * Import this mock at the top of test files using vi.mock.
 */
const createApiMock = () => ({
  login: vi.fn(),
  reset: vi.fn(),
  confirm: vi.fn(),
  newLogin: vi.fn(),
  replaceLogin: vi.fn(),
  isAuthError: vi.fn(() => false),
  overview: { get: vi.fn() },
  seasons: {
    getList: vi.fn(),
    getById: vi.fn(),
    getActive: vi.fn(),
    getMonthReport: vi.fn(),
    save: vi.fn(),
    delete: vi.fn(),
    permit: vi.fn(),
    deny: vi.fn(),
  },
  assessments: {
    getList: vi.fn(),
    getById: vi.fn(),
    reportById: vi.fn(),
    save: vi.fn(),
    delete: vi.fn(),
    getTargets: vi.fn(),
  },
  trainings: {
    getList: vi.fn(),
    save: vi.fn(),
    delete: vi.fn(),
  },
  reports: {
    getYearOverview: vi.fn(),
    getLastWeeksOverview: vi.fn(),
    getRingsOverview: vi.fn(),
    getAssessmentsOverview: vi.fn(),
  },
  events: {
    getList: vi.fn(),
    getPublicEvents: vi.fn(),
    register: vi.fn(),
    unregister: vi.fn(),
  },
  equipment: {
    getList: vi.fn(),
    getById: vi.fn(),
  },
  trainers: {
    getAllTrainers: vi.fn(),
    postArcherToTrainer: vi.fn(),
    putArcherToTrainer: vi.fn(),
    deleteArcherToTrainer: vi.fn(),
    archers: { list: vi.fn() },
    seasons: { list: vi.fn(), getMonthReport: vi.fn() },
  },
});

module.exports = createApiMock();
