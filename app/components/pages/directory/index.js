/**
 *
 * Directory
 *
 */

import React, { memo, useState } from 'react';
import Box from '@material-ui/core/Box';
import { Container } from '@material-ui/core';
import { useStyles } from './styles';
import Filters from './filters';
import Search from './search';
import TableButtons from './tableButtons';
import DataTable from '../../dataTable/index';

export function Directory({ data, headCells }) {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const handleSwitchChange = ({ target }) => {
    setChecked(target.checked);
  };
  return (
    <Container>
      <Box mt={10}>
        <Box className={classes.flex}>
          <Search onHandleSwitchChange={handleSwitchChange} checked={checked} />
        </Box>
        <Box mt={2}>{checked && <Filters />}</Box>
        <Box mt={4}>
          <TableButtons />
        </Box>
        <DataTable data={data} headCells={headCells} />
      </Box>
    </Container>
  );
}

export default memo(Directory);
