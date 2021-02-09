/**
 *
 * Home
 *
 */

import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectHome from './selectors';
import reducer from './reducer';
import saga from './saga';
import Home from 'components/Home/Loadable'
function HomeContainer() {
  // useInjectReducer({ key: 'home', reducer });
  const dispatch = useDispatch();
  // useInjectSaga({ key: 'home', saga });

  // useEffect(() => {

  // }, [])
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
