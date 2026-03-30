jest.mock('i18next-http-backend', () => ({
  __esModule: true,
  default: { type: 'backend', init: jest.fn(), read: jest.fn() },
}));

jest.mock('i18next-browser-languagedetector', () => ({
  __esModule: true,
  default: { type: 'languageDetector', detect: jest.fn(), init: jest.fn(), cacheUserLanguage: jest.fn() },
}));

describe('i18n', () => {
  it('initialises and exports the i18n instance', () => {
    const i18n = require('i18n').default;
    expect(i18n).toBeDefined();
  });

  it('i18n has the changeLanguage method', () => {
    const i18n = require('i18n').default;
    expect(typeof i18n.changeLanguage).toBe('function');
  });

  it('i18n has the t function', () => {
    const i18n = require('i18n').default;
    expect(typeof i18n.t).toBe('function');
  });
});
