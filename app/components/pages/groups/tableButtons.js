import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import { navigateTo } from '../../../utils/helper';
import { Button } from '../../index';

export function TableButtons({ onHandleDelete, numSelected, loading }) {
  const history = useHistory();
  return (
    <Box display="flex" justifyContent="space-between" my={5}>
      <Box display="flex" flexWrap="wrap">
        <Box mr={2} mt={[2, 0, 0, 0]}>
          <Button
            color="secondary"
            variant="contained"
            startIcon={<AddIcon />}
            loading={false}
            onClick={() => navigateTo(history, '/groups/add')}
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
