/**
 *
 * Dashboard
 *
 */

import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectDashboard from './selectors';
import reducer from './reducer';
import saga from './saga';
import DashboardComponent from 'components/DashboardComponent/Loadable';
function Dashboard({Children}) {
  useInjectReducer({ key: 'dashboard', reducer });
  const dispatch = useDispatch();
  useInjectSaga({ key: 'dashboard', saga });

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
