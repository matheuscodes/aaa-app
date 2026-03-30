const React = require('react');

const withRouter = (WrappedComponent) => {
  const WithRouter = (props) => {
    const routerProps = {
      history: { push: vi.fn(), replace: vi.fn(), goBack: vi.fn(), listen: vi.fn() },
      location: { pathname: '/', search: '', hash: '', state: {} },
      match: { params: {}, isExact: true, path: '/', url: '/' },
    };
    return React.createElement(WrappedComponent, { ...props, ...routerProps });
  };
  WithRouter.displayName = `withRouter(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return WithRouter;
};

const useNavigate = () => vi.fn();
const useHistory = () => ({ push: vi.fn(), replace: vi.fn(), goBack: vi.fn() });
const useLocation = () => ({ pathname: '/', search: '', hash: '' });
const useParams = () => ({});

module.exports = { withRouter, useNavigate, useHistory, useLocation, useParams };
