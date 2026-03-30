import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
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

const root = createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Suspense fallback={<Loader />}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <App />
      </LocalizationProvider>
    </Suspense>
  </ThemeProvider>
);
