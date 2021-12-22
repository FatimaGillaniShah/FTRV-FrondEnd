import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import WrapInCard from '../../layout/wrapInCard';
import DataTable from '../../dataTable';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs';
import { getHeadCells } from './columns';

function Users({ data, selected, setSelected, page, setPage }) {
  return (
    <WrapInBreadcrumbs>
      <Box width={1}>
        <WrapInCard>
          <DataTable
            rows={data}
            columns={getHeadCells}
            setSelected={setSelected}
            selected={selected}
            count={data?.length || 0}
            sortColumn="user"
            disableSelectionOnClick
            page={page}
            setPage={setPage}
            checkboxSelection={false}
          />
        </WrapInCard>
      </Box>
    </WrapInBreadcrumbs>
  );
}

Users.propTypes = {
  selected: PropTypes.array,
  data: PropTypes.array,
  setSelected: PropTypes.array,
};

export default memo(Users);
