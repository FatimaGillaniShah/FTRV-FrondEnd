/**
 *
 * DirectoryUploader
 *
 */

import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';

function DirectoryUploader() {
  // useEffect(() => {

  // }, [])
  return (
    <>
      <Helmet>
        <title>DirectoryUploader</title>
        <meta name="description" content="Description of DirectoryUploader" />
      </Helmet>
    </>
  );
}

export default memo(DirectoryUploader);
