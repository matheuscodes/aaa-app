const React = require('react');

const withTranslation = () => (WrappedComponent) => {
  const WithTranslation = (props) => {
    const t = (key) => key;
    const i18n = { changeLanguage: jest.fn(), language: 'en' };
    return React.createElement(WrappedComponent, { ...props, t, i18n });
  };
  WithTranslation.displayName = `withTranslation(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return WithTranslation;
};

const useTranslation = () => ({
  t: (key) => key,
  i18n: { changeLanguage: jest.fn(), language: 'en' },
});

const Trans = ({ children }) => children || null;

const initReactI18next = {
  type: '3rdParty',
  init: jest.fn(),
};

module.exports = { withTranslation, useTranslation, Trans, initReactI18next };
