/**
 *
 * CreateUser
 *
 */

import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';

function CreateUser() {
  // useEffect(() => {

  // }, [])
  return (
    <>
      <Helmet>
        <title>CreateUser</title>
        <meta name="description" content="Description of CreateUser" />
      </Helmet>
    </>
  );
}

export default memo(CreateUser);
