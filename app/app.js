/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Load the favicon and the .htaccess file
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import '@babel/polyfill';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
// Import root app
import App from 'containers/App';
// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import 'sanitize.css/sanitize.css';
import 'typeface-poppins';
import MUI_Theme from './theme';

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const MOUNT_NODE = document.getElementById('app');

(function render() {
  ReactDOM.render(
    <ThemeProvider theme={MUI_Theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>,
    MOUNT_NODE
  );
})();
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}