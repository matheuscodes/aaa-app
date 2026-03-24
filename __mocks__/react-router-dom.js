const React = require('react');

const MemoryRouter = ({ children }) => React.createElement('div', { 'data-testid': 'router' }, children);
const Route = ({ children, render, component: Component }) => {
  if (Component) return React.createElement(Component, {});
  if (render) return render({ location: { pathname: '/', search: '', hash: '' }, match: { params: {}, isExact: true, path: '/', url: '/' }, history: { push: jest.fn(), replace: jest.fn(), goBack: jest.fn() } });
  return children || null;
};
const Switch = ({ children }) => React.createElement('div', null, children);
const Redirect = () => null;
const Link = ({ children, to }) => React.createElement('a', { href: to }, children);
const NavLink = ({ children, to }) => React.createElement('a', { href: to }, children);

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

const useHistory = () => ({ push: jest.fn(), replace: jest.fn(), goBack: jest.fn() });
const useLocation = () => ({ pathname: '/', search: '', hash: '' });
const useParams = () => ({});

const BrowserRouter = MemoryRouter;
const HashRouter = MemoryRouter;

module.exports = {
  BrowserRouter,
  HashRouter,
  MemoryRouter,
  Route,
  Switch,
  Redirect,
  Link,
  NavLink,
  withRouter,
  useHistory,
  useLocation,
  useParams,
};
