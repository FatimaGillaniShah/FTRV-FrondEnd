import React, { memo, useState } from 'react';
import { Helmet } from 'react-helmet';
import Box from '@material-ui/core/Box';
import { useQuery } from 'react-query';
import { Alert } from '@material-ui/lab';
import { getDepartments } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { headCells } from './columns';
import DataTable from '../../components/dataTable';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';
import WrapInCard from '../../components/layout/wrapInCard';
import TableButtons from './tableButtons';
import { useAuthContext } from '../../context/authContext';
import { Loading } from '../../components/loading';
import { ROLES } from '../../utils/constants';

function Departments() {
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();

  const [selected, setSelected] = useState([]);
  const { data, isLoading } = useQuery(keys.departments, getDepartments);
  const departments = data?.data?.data?.rows;

  return (
    <>
      <Helmet>
        <title>Departments</title>
      </Helmet>

      <WrapInBreadcrumbs>
        {isLoading && <Loading />}
        <WrapInCard mb={8}>
          {role === ROLES.ADMIN && (
            <Box mt={4}>
              <TableButtons numSelected={selected.length} />
              {selected?.length > 0 && (
                <Box my={4}>
                  <Alert severity="info">
                    <strong>{selected?.length}</strong> Department(s) Selected
                  </Alert>
                </Box>
              )}
            </Box>
          )}
          {!isLoading && (
            <DataTable
              data={departments}
              headCells={headCells}
              selected={selected}
              setSelected={setSelected}
              count={departments?.length || 0}
              sortColumn="name"
            />
          )}
        </WrapInCard>
      </WrapInBreadcrumbs>
    </>
  );
}

export default memo(Departments);
