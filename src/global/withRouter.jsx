import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    const history = {
      push: (path) => navigate(path),
      replace: (path) => navigate(path, { replace: true }),
      goBack: () => navigate(-1),
    };

    return <Component {...props} history={history} location={location} match={{ params }} />;
  }

  ComponentWithRouterProp.displayName = `withRouter(${Component.displayName || Component.name || 'Component'})`;

  return ComponentWithRouterProp;
}

export default withRouter;
