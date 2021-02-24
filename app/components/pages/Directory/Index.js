/**
 *
 * Directory
 *
 */

import React, { memo, useState } from 'react';
import Box from '@material-ui/core/Box';
import { Container } from '@material-ui/core';
import { useStyles } from './styles';
import Filters from './Filters';
import Search from './Search';
import TableButtons from './TableButtons';
import DataTable from '../../DataTable/Index';
import { data, headCells } from './DummyData';

export function Directory() {
  const [checked, setChecked] = useState(false);
  const handleSwitchChange = ({ target }) => {
    setChecked(target.checked);
  };
  const classes = useStyles();
  return (
    <>
      <Container>
        <Box className={classes.flex} mt={5}>
          <Search onHandleSwitchChange={handleSwitchChange} checked={checked} />
        </Box>
        <Box mt={2}>{checked && <Filters />}</Box>
        <Box mt={4}>
          <TableButtons />
        </Box>
        <DataTable data={data} headCells={headCells} />
      </Container>
    </>
  );
}

export default memo(Directory);
