import React, { memo } from 'react';
import { headCells } from '../../../containers/usefulLinks/columns';
import DataTable from '../../dataTable';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs/index';
import WrapInCard from '../../layout/wrapInCard';
import { TableButtons } from './tableButtons';

function UsefulLinksPage({ selected, setSelected, onDelete }) {
  return (
    <WrapInBreadcrumbs>
      <WrapInCard mb={8}>
        <TableButtons numSelected={selected.length} onDelete={onDelete} />
        <DataTable
          headCells={headCells}
          selected={selected}
          setSelected={setSelected}
        />
      </WrapInCard>
    </WrapInBreadcrumbs>
  );
}

export default memo(UsefulLinksPage);