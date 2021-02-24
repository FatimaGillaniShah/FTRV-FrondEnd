/**
 *
 * Home
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet';

import Home from '../../components/pages/home/loadable';

function HomeContainer() {
  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Description of Home" />
      </Helmet>
      <Home />
    </>
  );
}

export default memo(HomeContainer);