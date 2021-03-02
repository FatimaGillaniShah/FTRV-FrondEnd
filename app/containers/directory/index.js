import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import Box from '@material-ui/core/Box';
import { debounce } from 'lodash';
import { fetchUsers } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { headCells } from './dummyData';
import WrapInCard from '../../components/layout/wrapInCard';
import Search from '../../components/pages/directory/search';
import Filters from '../../components/pages/directory/filters';
import DataTable from '../../components/dataTable';
import TableButtons from './tableButtons';
import { Loading } from '../../components/loading';

function DirectoryContainer() {
  const [query, setQuery] = useState({ searchString: '' });
  const [filters, setFilters] = useState();

  useEffect(() => {
    if (checked) {
      setQuery('');
    }
  }, [checked]);
  const { data, isLoading } = useQuery(
    keys.getUsers({ query, filters }),
    fetchUsers
  );

  const [checked, setChecked] = useState(false);
  const handleSwitchChange = ({ target }) => {
    setChecked(target.checked);
  };

  const handleSearch = debounce(({ target: { value } }) => {
    setQuery({ searchString: value });
  }, 500);

  const handleFilterSearch = (values) => {
    setFilters(values);
  };
  return (
    <>
      <Helmet>
        <title>Directory Listing</title>
      </Helmet>

      {isLoading && <Loading />}
      <Box width={1}>
        <WrapInCard mb={8}>
          <Box display="flex">
            <Search
              onHandleSwitchChange={handleSwitchChange}
              checked={checked}
              onHandleSearch={handleSearch}
              query={query}
            />
          </Box>
          <Box mt={8}>
            {checked && <Filters onHandleFilterSearch={handleFilterSearch} />}
          </Box>
        </WrapInCard>
        <WrapInCard>
          <Box mt={4}>
            <TableButtons />
          </Box>
          <DataTable data={data && data.data.data.rows} headCells={headCells} />
        </WrapInCard>
      </Box>
    </>
  );
}

export default memo(DirectoryContainer);
