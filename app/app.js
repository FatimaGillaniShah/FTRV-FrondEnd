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
// import 'file-loader?name=.htaccess!./.htaccess'; // eslint-disable-line import/extensions
import FontFaceObserver from 'fontfaceobserver';
// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import 'sanitize.css/sanitize.css';
import 'typeface-poppins';
import MUI_Theme from './theme';

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});

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
