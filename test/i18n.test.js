vi.mock('i18next-http-backend', () => ({
  __esModule: true,
  default: { type: 'backend', init: vi.fn(), read: vi.fn() },
}));

vi.mock('i18next-browser-languagedetector', () => ({
  __esModule: true,
  default: { type: 'languageDetector', detect: vi.fn(), init: vi.fn(), cacheUserLanguage: vi.fn() },
}));

import i18n from 'i18n';

describe('i18n', () => {
  it('initialises and exports the i18n instance', () => {
    expect(i18n).toBeDefined();
  });

  it('i18n has the changeLanguage method', () => {
    expect(typeof i18n.changeLanguage).toBe('function');
  });

  it('i18n has the t function', () => {
    expect(typeof i18n.t).toBe('function');
  });
});
