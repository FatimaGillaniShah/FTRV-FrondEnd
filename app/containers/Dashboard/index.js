/**
 *
 * Dashboard
 *
 */

import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Helmet } from 'react-helmet';

import DashboardComponent from 'components/dashboard/loadable';
function Dashboard({ Children }) {
  // useEffect(() => {

  // }, [])
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Description of Dashboard" />
      </Helmet>
      <DashboardComponent Children={Children} />
    </>
  );
}

export default memo(Dashboard);
