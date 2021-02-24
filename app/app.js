import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import '@babel/polyfill';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import App from 'containers/app';
import React from 'react';
import ReactDOM from 'react-dom';
import 'sanitize.css/sanitize.css';
import 'typeface-poppins';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import theme from './theme';
// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const MOUNT_NODE = document.getElementById('app');
const queryClient = new QueryClient();
(() => {
  ReactDOM.render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>,
    MOUNT_NODE
  );
})();
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
