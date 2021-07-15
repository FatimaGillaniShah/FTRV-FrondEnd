import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

export function TableButtons({ onDelete, numSelected }) {
  return (
    <Box display="flex" justifyContent="space-between" my={5}>
      <Box display="flex" flexWrap="wrap">
        <Box mr={2} mt={[2, 0, 0, 0]}>
          <Button color="secondary" variant="contained" startIcon={<AddIcon />}>
            New
          </Button>
        </Box>
        <Box mr={2} mt={[2, 0, 0, 0]}>
          <Button
            color="secondary"
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={onDelete}
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
