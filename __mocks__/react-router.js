const React = require('react');

const withRouter = (WrappedComponent) => {
  const WithRouter = (props) => {
    const routerProps = {
      history: { push: jest.fn(), replace: jest.fn(), goBack: jest.fn(), listen: jest.fn() },
      location: { pathname: '/', search: '', hash: '', state: {} },
      match: { params: {}, isExact: true, path: '/', url: '/' },
    };
    return React.createElement(WrappedComponent, { ...props, ...routerProps });
  };
  WithRouter.displayName = `withRouter(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return WithRouter;
};

const useNavigate = () => jest.fn();
const useHistory = () => ({ push: jest.fn(), replace: jest.fn(), goBack: jest.fn() });
const useLocation = () => ({ pathname: '/', search: '', hash: '' });
const useParams = () => ({});

module.exports = { withRouter, useNavigate, useHistory, useLocation, useParams };
