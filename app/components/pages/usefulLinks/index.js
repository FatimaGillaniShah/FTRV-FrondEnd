import { Box } from '@material-ui/core';
import React, { memo } from 'react';
import { Alert } from '../..';
import DataTable from '../../dataTable';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs/index';
import WrapInCard from '../../layout/wrapInCard';
import { TableButtons } from './tableButtons';
import Show from '../../show';

function UsefulLinksPage({
  selected,
  setSelected,
  onDelete,
  data,
  getHeadCells,
  isLoading,
  page,
  setPage,
  loading,
  isWriteAllowed,
}) {
  return (
    <WrapInBreadcrumbs>
      <WrapInCard mb={8}>
        <Show IF={isWriteAllowed}>
          <TableButtons
            numSelected={selected?.length}
            onDelete={onDelete}
            loading={loading}
          />
          <Show IF={selected?.length > 0}>
            <Box my={4}>
              <Alert severity="info">
                <strong>{selected?.length}</strong> Links(s) Selected
              </Alert>
            </Box>
          </Show>
        </Show>
        <Show IF={!isLoading}>
          <DataTable
            rows={data || []}
            columns={getHeadCells({ isWriteAllowed })}
            selected={selected}
            setSelected={setSelected}
            count={data?.length || 0}
            sortColumn="name"
            isWriteAllowed={isWriteAllowed}
            page={page}
            setPage={setPage}
          />
        </Show>
      </WrapInCard>
    </WrapInBreadcrumbs>
  );
}

export default memo(UsefulLinksPage);
