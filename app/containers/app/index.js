import React from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router } from 'react-router-dom';
// import { useMutation, useQueries, useQuery } from 'react-query';
// import axios from 'axios';
import Layout from '../../components/layout';
import Routes from '../../routes';
import ErrorBoundary from '../error/errorBoundry';
import { AuthProvider } from '../../context/authContext';

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
      <AuthProvider>
        <Router>
          <Layout>
            <ErrorBoundary>
              <Routes />
            </ErrorBoundary>
          </Layout>
        </Router>
      </AuthProvider>
    </>
  );
}
