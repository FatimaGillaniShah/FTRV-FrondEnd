import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { navigateTo } from '../../utils/helper';

export function TableButtons({ numSelected, handleDelete, loading }) {
  const history = useHistory();
  return (
    <>
      <Box display="flex" my={5}>
        <Box mr={2}>
          <Button
            color="secondary"
            variant="contained"
            fullWidth={false}
            loading={false}
            startIcon={<AddIcon />}
            onClick={() => navigateTo(history, '/locations/add')}
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
            onClick={handleDelete}
            loading={false}
            disabled={numSelected <= 0 || loading}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default memo(TableButtons);
