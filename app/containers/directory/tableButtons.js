import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useHistory } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import { navigateTo } from '../../utils/helper';
import { Button } from '../../components';

export function TableButtons({ onDelete, numSelected, loading, selected }) {
  const history = useHistory();

  return (
    <Box display="flex" justifyContent="space-between" my={5}>
      <Box display="flex" flexWrap="wrap">
        <Box mr={2} mt={[2, 0, 0, 0]}>
          <Button
            color="secondary"
            variant="contained"
            fullWidth={false}
            loading={false}
            startIcon={<AddIcon />}
            onClick={() => navigateTo(history, '/directory/add')}
          >
            New
          </Button>
        </Box>
        <Box mr={2} mt={[2, 0, 0, 0]}>
          <Button
            color="secondary"
            variant="contained"
            fullWidth={false}
            loading={false}
            startIcon={<CloudUploadIcon />}
            onClick={() => navigateTo(history, '/directory/upload')}
          >
            Import
          </Button>
        </Box>
        <Box mr={2} mt={[2, 0, 0, 0]}>
          <Button
            color="secondary"
            variant="contained"
            disabled={numSelected <= 0 || loading}
            startIcon={<EditIcon />}
            onClick={() =>
              navigateTo(history, `/directory/bulk-edit/${selected}`)
            }
            loading={false}
          >
            Bulk Edit
          </Button>
        </Box>
        <Box mr={2} mt={[2, 0, 0, 0]}>
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
