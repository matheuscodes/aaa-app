import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
// import './index.css';

// import i18n (needs to be bundled ;))
import './i18n';
import App from './Application';
import theme from './theme';

// loading component for suspense fallback
const Loader = () => (
  <div className="App">
    <div>Loading...</div>
  </div>
);


ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
  </ThemeProvider>, document.getElementById('root'));
