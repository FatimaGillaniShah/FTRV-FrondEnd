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

const ActionButtons = ({ data, disabled, setSelected }) => {
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
      setSelected([]);
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
        mutation.mutate([data.id]);
      }
    });
  };

  return (
    <>
      {role === ROLES.ADMIN && (
        <>
          <IconButton disabled={disabled}>
            <EditIcon
              color="secondary"
              onClick={() => history.push(`announcement/edit/${data.id}`)}
            />
          </IconButton>
          <IconButton onClick={() => handleDeleteUser()} disabled={disabled}>
            <DeleteIcon color="error" />
          </IconButton>
        </>
      )}
    </>
  );
};

export const headCells = [
  {
    id: 'title',
    numeric: false,
    disablePadding: true,
    label: 'Title',
    type: 'label',
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Description',
    type: 'label',
  },
  {
    id: 'expiry',
    numeric: false,
    disablePadding: false,
    label: 'Expiry Date',
    type: 'label',
  },
  {
    id: 'start',
    numeric: false,
    disablePadding: false,
    label: 'Start Date',
    type: 'label',
  },
  {
    id: 'end',
    numeric: false,
    disablePadding: false,
    label: 'End Date',
    type: 'label',
  },
  {
    id: 'priority',
    numeric: false,
    disablePadding: false,
    label: 'Priority',
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
