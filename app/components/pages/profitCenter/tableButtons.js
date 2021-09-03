import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { navigateTo } from '../../../utils/helper';

export function TableButtons({ onHandleDelete, numSelected, loading }) {
  const history = useHistory();
  return (
    <Box display="flex" justifyContent="space-between" my={5}>
      <Box display="flex" flexWrap="wrap">
        <Box mr={2} mt={[2, 0, 0, 0]}>
          <Button
            color="secondary"
            variant="contained"
            loading={false}
            startIcon={<AddIcon />}
            onClick={() => navigateTo(history, '/ring-group/add')}
          >
            New
          </Button>
        </Box>
        <Box mr={2} mt={[2, 0, 0, 0]}>
          <Button
            color="secondary"
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={onHandleDelete}
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
