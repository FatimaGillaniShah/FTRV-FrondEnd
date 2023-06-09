import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import { Alert } from '@material-ui/lab';
import PropTypes from 'prop-types';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs';
import WrapInCard from '../../layout/wrapInCard';
import { TableButtons } from './tableButtons';
import DataTable from '../../dataTable';
import { getHeadCells } from './columns';
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
  filterToggle,
  query,
  onHandleFilterSearch,
  onClearFilter,
  onHandleSwitchChange,
  page,
  setPage,
  toggleValues,
  alignment,
  onHandleToggleChange,
  loading,
  isWriteAllowed,
}) {
  return (
    <WrapInBreadcrumbs>
      <Box width={1}>
        <WrapInCard mb={8}>
          <Box display="flex">
            <Search
              name="Ring Group"
              onHandleSearch={onHandleSearch}
              onHandleSwitchChange={onHandleSwitchChange}
              initialValues={query}
              showToggle
              checked={filterToggle}
              toggleValues={toggleValues}
              alignment={alignment}
              onHandleToggleChange={onHandleToggleChange}
            />
          </Box>
          <Box mt={2}>
            <Show IF={filterToggle}>
              <Filters
                onHandleFilterSearch={onHandleFilterSearch}
                initialValues={initialFilterValues}
                onClear={onClearFilter}
              />
            </Show>
          </Box>
        </WrapInCard>
        <WrapInCard>
          <Show IF={isWriteAllowed}>
            <Box mt={4}>
              <TableButtons
                numSelected={selected.length}
                onHandleDelete={onHandleDelete}
                loading={loading}
              />
              <Show IF={selected.length > 0}>
                <Box my={4}>
                  <Alert severity="info">
                    <strong>{selected.length}</strong> Ring Group(s) Selected
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
            count={data?.length || 0}
            isWriteAllowed={isWriteAllowed}
            sortColumn="name"
            page={page}
            setPage={setPage}
          />
        </WrapInCard>
      </Box>
    </WrapInBreadcrumbs>
  );
}

RingGroup.propTypes = {
  selected: PropTypes.array,
  data: PropTypes.array,
  setSelected: PropTypes.array,
  onHandleDelete: PropTypes.func,
  toggleValues: PropTypes.array,
  alignment: PropTypes.string,
  onHandleToggleChange: PropTypes.func,
  initialFilterValues: PropTypes.object,
};

export default memo(RingGroup);
