import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import { Alert } from '@material-ui/lab';
import { useAuthContext } from '../../../context/authContext';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs';
import WrapInCard from '../../layout/wrapInCard';
import { ROLES } from '../../../utils/constants';
import { TableButtons } from './tableButtons';
import DataTable from '../../dataTable';
import { headCells } from './columns';

function RingGroup({ selected, data, setSelected }) {
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();
  return (
    <WrapInBreadcrumbs>
      <Box width={1}>
        <WrapInCard>
          {role === ROLES.ADMIN && (
            <Box mt={4}>
              <TableButtons numSelected={selected.length} />
              {selected.length > 0 && (
                <Box my={4}>
                  <Alert severity="info">
                    <strong>{selected.length}</strong> Ring Group(s) Selected
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
            count={data?.length || 0}
            sortColumn="name"
          />
        </WrapInCard>
      </Box>
    </WrapInBreadcrumbs>
  );
}

export default memo(RingGroup);
