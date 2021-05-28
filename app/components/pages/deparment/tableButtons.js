import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { ROLES } from '../../../utils/constants';
import { useAuthContext } from '../../../context/authContext';

export function TableButtons({ numSelected }) {
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();
  return (
    <>
      {role === ROLES.ADMIN && (
        <Box display="flex" my={5}>
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
      )}
    </>
  );
}

export default memo(TableButtons);
