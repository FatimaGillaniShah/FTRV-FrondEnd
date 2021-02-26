/**
 *
 * Directory
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Directory } from '../../components/pages/directory/index';
import { fetchUsers } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { headCells } from './dummyData';

function DirectoryContainer() {
  const { status, data } = useQuery(keys.users, fetchUsers);
  // console.log(data && data.data.data.rows);
  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Description of Home" />
      </Helmet>

      <Directory
        data={data && data.data.data.rows}
        status={status}
        headCells={headCells}
      />
    </>
  );
}

export default memo(DirectoryContainer);
