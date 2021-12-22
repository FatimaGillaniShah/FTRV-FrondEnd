import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import { Alert } from '@material-ui/lab';
import PropTypes from 'prop-types';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import { TableButtons } from './tableButtons';
import DataTable from '../../dataTable';
import Search from '../../search/search';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs';
import WrapInCard from '../../layout/wrapInCard';
import { headCells } from './columns';
import Show from '../../show';

function Groups({
  data,
  selected,
  setSelected,
  page,
  loading,
  setPage,
  filters,
  onHandleSearch,
  isWriteAllowed,
  onHandleDelete,
}) {
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down('lg'));
  return (
    <>
      <WrapInBreadcrumbs>
        <WrapInCard mb={8}>
          <Box display="flex">
            <Search
              name="Groups"
              initialValues={filters}
              showFilter={false}
              onHandleSearch={onHandleSearch}
            />
          </Box>
        </WrapInCard>
        <WrapInCard mb={8}>
          <Show IF={isWriteAllowed}>
            <Box mt={4}>
              <TableButtons
                loading={loading}
                numSelected={selected?.length}
                onHandleDelete={onHandleDelete}
              />
            </Box>
          </Show>
          <Show IF={selected?.length > 0}>
            <Box my={4}>
              <Alert severity="info">
                <strong>{selected?.length}</strong> Group(s) Selected
              </Alert>
            </Box>
          </Show>
          <DataTable
            rows={data || []}
            columns={headCells({ match, isWriteAllowed })}
            setSelected={setSelected}
            selected={selected}
            isWriteAllowed={isWriteAllowed}
            count={data?.length || 0}
            sortColumn="name"
            disableSelectionOnClick
            page={page}
            setPage={setPage}
          />
        </WrapInCard>
      </WrapInBreadcrumbs>
    </>
  );
}

Groups.propTypes = {
  selected: PropTypes.array,
  data: PropTypes.array,
  setSelected: PropTypes.array,
};

export default memo(Groups);
