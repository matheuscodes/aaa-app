const React = require('react');

const MemoryRouter = ({ children }) => React.createElement('div', { 'data-testid': 'router' }, children);
const Route = ({ children, render, component: Component, element }) => {
  if (element) return element;
  if (Component) return React.createElement(Component, {});
  if (render) return render({ location: { pathname: '/', search: '', hash: '' }, match: { params: {}, isExact: true, path: '/', url: '/' }, history: { push: vi.fn(), replace: vi.fn(), goBack: vi.fn() } });
  return children || null;
};
const Routes = ({ children }) => React.createElement('div', null, children);
const Switch = ({ children }) => React.createElement('div', null, children);
const Redirect = () => null;
const Navigate = () => null;
const Link = ({ children, to }) => React.createElement('a', { href: to }, children);
const NavLink = ({ children, to }) => React.createElement('a', { href: to }, children);

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

const BrowserRouter = MemoryRouter;
const HashRouter = MemoryRouter;

module.exports = {
  BrowserRouter,
  HashRouter,
  MemoryRouter,
  Route,
  Routes,
  Switch,
  Redirect,
  Navigate,
  Link,
  NavLink,
  withRouter,
  useNavigate,
  useHistory,
  useLocation,
  useParams,
};
