import { Box } from '@material-ui/core';
import React, { memo, useState } from 'react';
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
  headCells,
  isLoading,
}) {
  const [page, setPage] = useState(0);
  return (
    <WrapInBreadcrumbs>
      <WrapInCard mb={8}>
        <TableButtons numSelected={selected?.length} onDelete={onDelete} />
        <Show IF={selected?.length > 0}>
          <Box my={4}>
            <Alert severity="info">
              <strong>{selected?.length}</strong> Links(s) Selected
            </Alert>
          </Box>
        </Show>
        <Show IF={!isLoading}>
          <DataTable
            data={data}
            headCells={headCells}
            selected={selected}
            setSelected={setSelected}
            count={data?.length || 0}
            sortColumn="name"
            page={page}
            setPage={setPage}
          />
        </Show>
      </WrapInCard>
    </WrapInBreadcrumbs>
  );
}

export default memo(UsefulLinksPage);
