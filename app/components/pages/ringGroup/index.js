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
import { Search } from '../../search/search';
import Filters from './filters';
import Show from '../../show';

function RingGroup({
  selected,
  data,
  setSelected,
  onHandleDelete,
  initialFilterValues,
  onHandleSearch,
  pageNumber,
  checked,
  query,
  onHandleFilterSearch,
  onClearFilter,
  onHandleSwitchChange,
  page,
  setPage,
}) {
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();

  return (
    <WrapInBreadcrumbs>
      <Box width={1}>
        <WrapInCard mb={8}>
          <Box display="flex">
            <Search
              name="Ring Group"
              onHandleSwitchChange={onHandleSwitchChange}
              checked={checked}
              onHandleSearch={onHandleSearch}
              initialValues={query}
            />
          </Box>
          <Box mt={2}>
            <Show IF={checked}>
              <Filters
                onHandleFilterSearch={onHandleFilterSearch}
                initialValues={initialFilterValues}
                onClear={onClearFilter}
              />
            </Show>
          </Box>
        </WrapInCard>
        <WrapInCard>
          <Show IF={role === ROLES.ADMIN}>
            <Box mt={4}>
              <TableButtons
                numSelected={selected.length}
                onHandleDelete={onHandleDelete}
              />
              {selected.length > 0 && (
                <Show IF={selected.length > 0}>
                  <Box my={4}>
                    <Alert severity="info">
                      <strong>{selected.length}</strong> Ring Group(s) Selected
                    </Alert>
                  </Box>
                </Show>
              )}
            </Box>
          </Show>
          <DataTable
            data={data}
            headCells={headCells}
            setSelected={setSelected}
            selected={selected}
            count={data?.length || 0}
            pageNumber={pageNumber}
            sortColumn="name"
            setPage={setPage}
            page={page}
          />
        </WrapInCard>
      </Box>
    </WrapInBreadcrumbs>
  );
}

export default memo(RingGroup);
