/**
 *
 * Dashboard
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import DashboardComponent from 'components/DashboardComponent/Loadable';

function Dashboard({ Children }) {
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
