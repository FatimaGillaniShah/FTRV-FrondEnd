/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import FunTownApp from 'containers/Dashboard/Loadable';
import Routing from './Routing';



export default function App() {
  return (
    // <AppWrapper>
    <>
      <Helmet titleTemplate="FunTown Intranet" defaultTitle="FunTown Intranet">
        <meta
          name="description"
          content="
        Intranet for FuntownRVs"
        />
      </Helmet>
      <FunTownApp Children={Routing} />
    </>
  );
}
