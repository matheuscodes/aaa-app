import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns as AdapterDateFnsV2 } from '@mui/x-date-pickers/AdapterDateFnsV2';
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
      <LocalizationProvider dateAdapter={AdapterDateFnsV2}>
        <App />
      </LocalizationProvider>
    </Suspense>
  </ThemeProvider>, document.getElementById('root'));
