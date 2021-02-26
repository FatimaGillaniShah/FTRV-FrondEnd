/**
 *
 * Directory
 *
 */

import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Directory } from '../../components/pages/directory/index';
import { fetchUsers } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { headCells } from './dummyData';

function DirectoryContainer() {
  const [query, setQuery] = useState();
  const [filters, setFilters] = useState();
  const { status, data } = useQuery(
    [keys.users, { query, filters }],
    fetchUsers
  );
  const [checked, setChecked] = useState(false);
  const handleSwitchChange = ({ target }) => {
    setChecked(target.checked);
  };
  const handleSearch = ({ target }) => {
    setQuery(target.value);
  };
  useEffect(() => {
    if (checked) {
      setQuery('');
    }
  }, [checked]);
  const handleFilterSearch = (values) => {
    setFilters(values);
  };
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
        onHandleSearch={handleSearch}
        query={query}
        setChecked={setChecked}
        checked={checked}
        onHandleSwitchChange={handleSwitchChange}
        onHandleFilterSearch={handleFilterSearch}
      />
    </>
  );
}

export default memo(DirectoryContainer);
