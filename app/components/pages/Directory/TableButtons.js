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
import { useStyles } from './styles';
import CustomButton from '../../CustomButton/Index';

export function TableButtons() {
  const classes = useStyles();
  return (
    <Box className={classes.flex} my={5}>
      <Box mr={2}>
        <CustomButton
          color="secondary"
          fullWidth={false}
          startIcon={<AddIcon />}
        >
          New
        </CustomButton>
      </Box>
      <Box mr={2}>
        <CustomButton
          color="secondary"
          fullWidth={false}
          startIcon={<CloudDownloadIcon />}
        >
          Import
        </CustomButton>
      </Box>
      <Box mr={2}>
        <CustomButton
          color="secondary"
          fullWidth={false}
          startIcon={<DeleteIcon />}
        >
          Delete
        </CustomButton>
      </Box>
    </Box>
  );
}

export default memo(TableButtons);
