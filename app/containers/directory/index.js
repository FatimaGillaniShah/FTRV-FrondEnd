/**
 *
 * directory
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { Directory } from '../../components/pages/directory';

function DirectoryContainer() {
  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Description of Home" />
      </Helmet>
      <Directory />
    </>
  );
}

export default memo(DirectoryContainer);
