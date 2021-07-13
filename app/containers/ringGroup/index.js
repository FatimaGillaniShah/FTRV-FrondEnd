import React, { memo, useState } from 'react';
import { Helmet } from 'react-helmet';
import Box from '@material-ui/core/Box';
import { Alert } from '@material-ui/lab';
import { useQuery } from 'react-query';
import { headCells } from './columns';
import WrapInCard from '../../components/layout/wrapInCard';
import DataTable from '../../components/dataTable';
import TableButtons from './tableButtons';
import { useAuthContext } from '../../context/authContext';
import { ROLES } from '../../utils/constants';
import { Loading } from '../../components/loading';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';
import Search from '../../components/pages/ringGroup/search';
import Filters from '../../components/pages/ringGroup/filters';
import { getLocations, getDepartments } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';

function RingGroupContainer() {
  const [selected, setSelected] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortColumn, setSortColumn] = useState('firstName');
  const [checked, setChecked] = useState(false);
  const isServerSide = true;
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();
  const data = [];
  const { data: locations, isLocationLoading } = useQuery(
    keys.locations,
    getLocations
  );
  const { data: deparments, isDepartmentLoading } = useQuery(
    keys.departments,
    getDepartments
  );

  const onChangeSort = (order, property) => {
    if (isServerSide) {
      if (property === 'fullName') {
        setSortColumn('firstName');
      } else {
        setSortColumn(property);
      }
      setSortOrder(order);
    }
  };

  const locationOptions = locations?.data.data.rows.map((val) => ({
    value: val.id,
    label: val.name,
  }));
  const departmentOptions = deparments?.data.data.rows.map((val) => ({
    value: val.id,
    label: val.name,
  }));

  const handleSwitchChange = ({ target }) => {
    setChecked(target.checked);
  };

  return (
    <>
      <Helmet>
        <title> Ring Group</title>
      </Helmet>
      {isLocationLoading || isDepartmentLoading ? (
        <Loading />
      ) : (
        <WrapInBreadcrumbs>
          <Box width={1}>
            <WrapInCard mb={8}>
              <Box display="flex">
                <Search
                  onHandleSwitchChange={handleSwitchChange}
                  checked={checked}
                />
              </Box>
              <Box mt={2}>
                {checked && (
                  <Filters
                    locationOptions={locationOptions}
                    departmentOptions={departmentOptions}
                  />
                )}
              </Box>
            </WrapInCard>
            <WrapInCard>
              {role === ROLES.ADMIN && (
                <Box mt={4}>
                  <TableButtons numSelected={selected.length} />
                  {selected.length > 0 && (
                    <Box my={4}>
                      <Alert severity="info">
                        <strong>{selected.length}</strong> Ring Group(s)
                        Selected
                      </Alert>
                    </Box>
                  )}
                </Box>
              )}
              <DataTable
                data={data}
                headCells={headCells}
                setSelected={setSelected}
                selected={selected}
                sortOrder={sortOrder}
                sortColumn={sortColumn}
                onChangeSort={onChangeSort}
                count={data?.length || 0}
              />
            </WrapInCard>
          </Box>
        </WrapInBreadcrumbs>
      )}
    </>
  );
}

export default memo(RingGroupContainer);
