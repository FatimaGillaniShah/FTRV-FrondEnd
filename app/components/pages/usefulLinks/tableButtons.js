import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

export function TableButtons({ onDelete }) {
  const history = useHistory();
  const navigateTo = (url) => {
    history.push(url);
  };
  return (
    <Box display="flex" my={5}>
      <Box mr={2}>
        <Button
          color="secondary"
          variant="contained"
          fullWidth={false}
          startIcon={<AddIcon />}
          onClick={() => navigateTo('/useful-links/add')}
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
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
}

export default memo(TableButtons);
