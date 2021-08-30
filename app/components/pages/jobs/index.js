import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import { Alert } from '@material-ui/lab';
import PropTypes from 'prop-types';
import { useAuthContext } from '../../../context/authContext';
import WrapInCard from '../../layout/wrapInCard';
import { ROLES } from '../../../utils/constants';
import { TableButtons } from './tableButtons';
import DataTable from '../../dataTable';
import { Search } from '../../search/search';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs';
import Filters from './filters';
import { headCells } from './columns';
import Show from '../../show';

function Jobs({
  data,
  selected,
  onHandleSearch,
  setSelected,
  onHandleSwitchChange,
  onHandleDelete,
  page,
  query,
  loading,
  setPage,
  filterToggle,
  onClearFilter,
  initialFilterValues,
  onHandleFilterSearch,
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
              name="Jobs"
              showToggle={false}
              onHandleSearch={onHandleSearch}
              onHandleSwitchChange={onHandleSwitchChange}
              initialValues={query}
              checked={filterToggle}
            />
          </Box>
          <Box mt={2}>
            <Show IF={filterToggle}>
              <Filters
                onHandleFilterSearch={onHandleFilterSearch}
                onClear={onClearFilter}
                initialValues={initialFilterValues}
              />
            </Show>
          </Box>
        </WrapInCard>
        <WrapInCard>
          <Show IF={role === ROLES.ADMIN}>
            <Box mt={4}>
              <TableButtons
                loading={loading}
                numSelected={selected?.length}
                onHandleDelete={onHandleDelete}
              />
              <Show IF={selected?.length > 0}>
                <Box my={4}>
                  <Alert severity="info">
                    <strong>{selected?.length}</strong> Job(s) Selected
                  </Alert>
                </Box>
              </Show>
            </Box>
          </Show>
          <DataTable
            rows={data}
            columns={headCells}
            setSelected={setSelected}
            selected={selected}
            count={data?.length || 0}
            sortColumn="title"
            disableSelectionOnClick
            page={page}
            setPage={setPage}
          />
        </WrapInCard>
      </Box>
    </WrapInBreadcrumbs>
  );
}

Jobs.propTypes = {
  selected: PropTypes.array,
  data: PropTypes.array,
  setSelected: PropTypes.array,
  onHandleDelete: PropTypes.func,
};

export default memo(Jobs);
