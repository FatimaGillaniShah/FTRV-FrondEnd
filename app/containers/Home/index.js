/**
 *
 * Home
 *
 */

import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Helmet } from 'react-helmet';

import Home from '../../components/pages/home/Loadable'
function HomeContainer() {

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Description of Home" />
      </Helmet>
      <Home/>
    </>
  );
}

export default memo(HomeContainer);
