import React from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from '../../components/layout';
import Routes from '../../routes';
import ErrorBoundary from '../Error/errorBoundry';

export default function App() {
  return (
    <>
      <Helmet titleTemplate="FunTown Intranet" defaultTitle="FunTown Intranet">
        <meta
          name="description"
          content="
        Intranet for FuntownRVs"
        />
      </Helmet>
      <Router>
        <Layout>
          <ErrorBoundary>
            <Routes />
          </ErrorBoundary>
        </Layout>
      </Router>
    </>
  );
}
