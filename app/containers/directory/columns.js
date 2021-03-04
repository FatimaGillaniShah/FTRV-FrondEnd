import React from 'react';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Swal from 'sweetalert2';
import { useTheme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { deleteUser } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { useAuthContext } from '../../context/authContext';
import { ROLES } from '../../utils/constants';

const ActionButtons = (data) => {
  const history = useHistory();
  const theme = useTheme();
  const queryClient = useQueryClient();
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();

  const mutation = useMutation(deleteUser, {
    onSuccess: ({
      data: {
        data: { count },
      },
    }) => {
      Swal.fire('Deleted!', `${count} user deleted.`, 'success');
      queryClient.invalidateQueries(keys.getUsers({}));
    },
  });

  if (mutation.isError) {
    Swal.fire(
      '',
      'Some error occured in deleting the user. Please  try again',
      'error'
    );
  }
  const handleDeleteUser = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: theme.palette.modalColors.confirm,
      cancelButtonColor: theme.palette.modalColors.cancel,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate([data.data.id]);
      }
    });
  };

  return (
    <>
      {role === ROLES.ADMIN && (
        <>
          <IconButton>
            <EditIcon
              color="secondary"
              onClick={() => history.push(`directory/edit/${data.data.id}`)}
            />
          </IconButton>
          <IconButton onClick={() => handleDeleteUser()}>
            <DeleteIcon color="error" />
          </IconButton>
        </>
      )}
    </>
  );
};

export const headCells = [
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
