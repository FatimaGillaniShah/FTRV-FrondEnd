import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

export function TableButtons({ numSelected }) {
  return (
    <Box display="flex" justifyContent="space-between" my={5}>
      <Box display="flex">
        <Box mr={2}>
          <Button
            color="secondary"
            variant="contained"
            fullWidth={false}
            startIcon={<AddIcon />}
          >
            New
          </Button>
        </Box>

        <Box mr={2}>
          <Button
            color="secondary"
            variant="contained"
            fullWidth={false}
            startIcon={<DeleteIcon />}
            disabled={numSelected <= 0}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
export default memo(TableButtons);
