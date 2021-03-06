/**
 *
 * Initial Settings
 *
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


/**
 *
 * Material UI
 *
 */

// Font.
import 'fontsource-roboto';

// Theme.
import { unstable_createMuiStrictModeTheme, ThemeProvider } from '@material-ui/core/styles';

// Apply theme.
const theme = unstable_createMuiStrictModeTheme ({
  palette: {
    simpleDark: {
      light: '#a6b0cf',
      main: '#2A3042',
      dark: '#222736',
    },
  }
});

ReactDOM.render (
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById ('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals ();
