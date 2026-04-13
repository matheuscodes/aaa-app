import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
      },
    },
    MuiFormControl: {
      defaultProps: {
        variant: 'standard',
      },
    },
    MuiSelect: {
      defaultProps: {
        variant: 'standard',
      },
    },
    // Optional: if you use raw InputBase/OutlinedInput elsewhere
    // MuiInputBase: { defaultProps: { ... } },
  },
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;
