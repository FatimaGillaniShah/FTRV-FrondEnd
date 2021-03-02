import React from 'react';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Swal from 'sweetalert2';
import { useTheme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';
import {deleteUser, uploadEmployeeFile} from '../../state/queryFunctions';

const handleDeleteUser = (confirmBtnColor, cancelBtnColor, mutation) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: confirmBtnColor,
    cancelButtonColor: cancelBtnColor,
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      //mutation.mutate([1])
      //Swal.fire('Deleted!', 'User has been deleted.', 'success');
    }
  });
};
const ActionButtons = (data) => {
  const history = useHistory();
  const theme = useTheme();

  return (
    <>
      <IconButton>
        <EditIcon
          color="secondary"
          onClick={() => history.push(`directory/edit/${data.id}`)}
        />
      </IconButton>
      <IconButton
        onClick={() =>
          handleDeleteUser(
            theme.palette.modalColors.confirm,
            theme.palette.modalColors.cancel
          )
        }
      >
        <DeleteIcon color="error" />
      </IconButton>
    </>
  );
};

const headCells = [
  {
    id: 'fullName',
    numeric: false,
    disablePadding: true,
    label: 'Name',
    type: 'label',
  },
  {
    id: 'department',
    numeric: false,
    disablePadding: false,
    label: 'Department',
    type: 'label',
  },
  {
    id: 'title',
    numeric: false,
    disablePadding: false,
    label: 'Designation',
    type: 'label',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email ID',
    type: 'label',
  },
  {
    id: 'extension',
    numeric: true,
    disablePadding: false,
    label: 'Ext',
    type: 'label',
  },
  {
    id: 'contactNo',
    numeric: true,
    disablePadding: false,
    label: 'Cell Phone',
    type: 'label',
  },
  {
    id: 'actions',
    numeric: true,
    disablePadding: false,
    label: '',
    buttons: ActionButtons,
    type: 'action',
  },
];

export { headCells };
