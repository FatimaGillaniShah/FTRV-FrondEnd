/**
 *
 * TableButtons
 *
 */

import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Button from '@material-ui/core/Button';
import { useStyles } from './styles';

export function TableButtons() {
  const classes = useStyles();
  return (
    <Box className={classes.flex} my={5}>
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
          startIcon={<CloudDownloadIcon />}
        >
          Import
        </Button>
      </Box>
      <Box mr={2}>
        <Button
          color="secondary"
          variant="contained"
          fullWidth={false}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
}

export default memo(TableButtons);
