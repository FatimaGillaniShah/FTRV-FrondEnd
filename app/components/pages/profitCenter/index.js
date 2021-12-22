import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import { Alert } from '@material-ui/lab';
import PropTypes from 'prop-types';
import WrapInCard from '../../layout/wrapInCard';
import { TableButtons } from './tableButtons';
import DataTable from '../../dataTable';
import { Search } from '../../search/search';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs';
import { getHeadCells } from './columns';
import Show from '../../show';

function ProfitCenter({
  data,
  selected,
  onHandleSearch,
  setSelected,
  onHandleDelete,
  setPage,
  page,
  query,
  loading,
  isWriteAllowed,
}) {
  return (
    <WrapInBreadcrumbs>
      <Box width={1}>
        <WrapInCard mb={8}>
          <Box display="flex">
            <Search
              name="Profit Center"
              onHandleSearch={onHandleSearch}
              initialValues={query}
              showFilter={false}
            />
          </Box>
        </WrapInCard>
        <WrapInCard>
          <Show IF={isWriteAllowed}>
            <Box mt={4}>
              <TableButtons
                loading={loading}
                numSelected={selected?.length}
                onHandleDelete={onHandleDelete}
              />
              <Show IF={selected?.length > 0}>
                <Box my={4}>
                  <Alert severity="info">
                    <strong>{selected?.length}</strong> Profit Center(s)
                    Selected
                  </Alert>
                </Box>
              </Show>
            </Box>
          </Show>

          <DataTable
            rows={data}
            columns={getHeadCells({ isWriteAllowed })}
            setSelected={setSelected}
            selected={selected}
            isWriteAllowed={isWriteAllowed}
            count={data?.length || 0}
            sortColumn="centerNo"
            disableSelectionOnClick
            page={page}
            setPage={setPage}
          />
        </WrapInCard>
      </Box>
    </WrapInBreadcrumbs>
  );
}

ProfitCenter.propTypes = {
  selected: PropTypes.array,
  data: PropTypes.array,
  setSelected: PropTypes.array,
  onHandleDelete: PropTypes.func,
};

export default memo(ProfitCenter);
