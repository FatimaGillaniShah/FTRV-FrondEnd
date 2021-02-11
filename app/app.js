/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Load the favicon and the .htaccess file
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import '@babel/polyfill';
import {
  createMuiTheme,


  CssBaseline, responsiveFontSizes, ThemeProvider
} from '@material-ui/core';
// Import root app
import App from 'containers/App';
import 'file-loader?name=.htaccess!./.htaccess'; // eslint-disable-line import/extensions
import FontFaceObserver from 'fontfaceobserver';
// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import 'sanitize.css/sanitize.css';
import 'typeface-poppins';








// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});

const MOUNT_NODE = document.getElementById('app');

const render = () => {
  let theme = createMuiTheme({
    overrides: {
      MuiCssBaseline: {
        '@global': {
          html: {
            WebkitFontSmoothing: 'auto'
          }
        }
      }
    },
    palette: {
      primary: {
        main: '#153D73'
      },
      secondary: {
        main: '#1A75BC'
      },
      bgColor: {
        main: '#EAEAEA',
        secondary: 'white'
      },
      textColor: {
        main: 'white',
        secondary: '#153D73',
        black: 'black'
      },
      iconColor: {
        main: 'white'
      }
    },
    typography: {
      fontFamily: ['Poppins', 'sans-serif'].join(',')
    }
  });
  theme = responsiveFontSizes(theme);
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>,
    MOUNT_NODE
  );
};
render();
// if (module.hot) {
//   // Hot reloadable React components and translation json files
//   // modules.hot.accept does not accept dynamic dependencies,
//   // have to be constants at compile-time
//   module.hot.accept(['./i18n', 'containers/App'], () => {
//     ReactDOM.unmountComponentAtNode(MOUNT_NODE);
//     render(translationMessages);
//   });
// }

// // Chunked polyfill for browsers without Intl support
// if (!window.Intl) {
//   new Promise((resolve) => {
//     resolve(import('intl'));
//   })
//     .then(() =>
//       Promise.all([
//         import('intl/locale-data/jsonp/en.js'),
//         import('intl/locale-data/jsonp/de.js')
//       ])
//     ) // eslint-disable-line prettier/prettier
//     .then(() => render(translationMessages))
//     .catch((err) => {
//       throw err;
//     });
// } else {
//   render(translationMessages);
// }

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
// if (process.env.NODE_ENV === 'production') {
//   require('offline-plugin/runtime').install(); // eslint-disable-line global-require
// }
