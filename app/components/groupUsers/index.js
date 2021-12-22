import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Box, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import DataTable from '../dataTable';
import { getHeadCells } from './columns';

function Users({ data, userPage, setUserPage }) {
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down('lg'));

  const rows = data.map((value) => ({
    ...value,
    department: value.department.name,
    location: value.location.name,
  }));
  return (
    <Box mt={8}>
      <DataTable
        rows={rows}
        columns={getHeadCells({ match })}
        count={data?.length || 0}
        sortColumn="fullName"
        disableSelectionOnClick
        page={userPage}
        setPage={setUserPage}
        checkboxSelection={false}
      />
    </Box>
  );
}

Users.propTypes = {
  data: PropTypes.array,
};

export default memo(Users);
