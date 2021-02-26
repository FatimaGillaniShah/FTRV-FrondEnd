/**
 *
 * Directory
 *
 */

import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import { Container } from '@material-ui/core';
import { useStyles } from './styles';
import Filters from './filters';
import Search from './search';
import TableButtons from './tableButtons';
import DataTable from '../../dataTable/index';

export function Directory({
  data,
  headCells,
  onHandleSearch,
  query,
  onHandleSwitchChange,
  checked,
  onHandleFilterSearch,
}) {
  const classes = useStyles();

  return (
    <Container>
      <Box mt={10}>
        <Box className={classes.flex}>
          <Search
            onHandleSwitchChange={onHandleSwitchChange}
            checked={checked}
            onHandleSearch={onHandleSearch}
            query={query}
          />
        </Box>
        <Box mt={2}>
          {checked && <Filters onHandleFilterSearch={onHandleFilterSearch} />}
        </Box>
        <Box mt={4}>
          <TableButtons />
        </Box>
        <DataTable data={data} headCells={headCells} />
      </Box>
    </Container>
  );
}

export default memo(Directory);
