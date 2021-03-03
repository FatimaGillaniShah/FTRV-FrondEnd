import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import Box from '@material-ui/core/Box';
import { debounce } from 'lodash';
import { fetchUsers } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { headCells } from './columns';
import WrapInCard from '../../components/layout/wrapInCard';
import Search from '../../components/pages/directory/search';
import Filters from '../../components/pages/directory/filters';
import DataTable from '../../components/dataTable';
import TableButtons from './tableButtons';
import { Loading } from '../../components/loading';
import { useAuthContext } from '../../context/authContext';
import { ROLES } from '../../utils/constants';

function DirectoryContainer() {
  const [query, setQuery] = useState({});
  const [filters, setFilters] = useState();
  const [checked, setChecked] = useState(false);

  const {
    user: {
      data: { role },
    },
  } = useAuthContext();

  useEffect(() => {
    if (checked) {
      setQuery('');
    }
  }, [checked]);
  const { data, isLoading } = useQuery(
    keys.getUsers({ query, filters }),
    fetchUsers,
    { refetchOnWindowFocus: false }
  );

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
          {role === ROLES.ADMIN && (
            <Box mt={4}>
              <TableButtons />
            </Box>
          )}
          {!isLoading && (
            <DataTable
              data={data && data.data.data.rows}
              headCells={headCells}
            />
          )}
        </WrapInCard>
      </Box>
    </>
  );
}

export default memo(DirectoryContainer);
