import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import { navigateTo } from '../../utils/helper';
import { Button } from '../../components';

export function TableButtons({ onDelete, numSelected, loading }) {
  const history = useHistory();
  return (
    <Box display="flex" justifyContent="space-between" my={5}>
      <Box display="flex">
        <Box mr={2}>
          <Button
            color="secondary"
            variant="contained"
            fullWidth={false}
            loading={false}
            startIcon={<AddIcon />}
            onClick={() => navigateTo(history, '/announcement/add')}
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
            onClick={onDelete}
            loading={false}
            disabled={numSelected <= 0 || loading}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default memo(TableButtons);
