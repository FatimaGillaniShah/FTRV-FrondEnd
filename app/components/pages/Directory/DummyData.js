import React from 'react';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Swal from 'sweetalert2';
import { useTheme } from '@material-ui/core/styles';

const handleDeleteUser = (confirmBtnColor, cancelBtnColor) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: confirmBtnColor,
    cancelButtonColor: cancelBtnColor,
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Deleted!', 'User has been deleted.', 'success');
    }
  });
};
const ActionButtons = () => {
  const theme = useTheme();
  return (
    <>
      <IconButton>
        <EditIcon color="primary" />
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

// @TODO REMOVE DATA
const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
    type: 'label'
  },
  {
    id: 'department',
    numeric: false,
    disablePadding: false,
    label: 'Department',
    type: 'label'
  },
  {
    id: 'designation',
    numeric: false,
    disablePadding: false,
    label: 'Designation',
    type: 'label'
  },
  {
    id: 'emailID',
    numeric: false,
    disablePadding: false,
    label: 'Email ID',
    type: 'label'
  },
  {
    id: 'ext',
    numeric: true,
    disablePadding: false,
    label: 'Ext',
    type: 'label'
  },
  {
    id: 'cellPhone',
    numeric: true,
    disablePadding: false,
    label: 'Cell Phone',
    type: 'label'
  },
  {
    id: 'actions',
    numeric: true,
    disablePadding: false,
    label: '',
    buttons: ActionButtons,
    type: 'action'
  }
];

const data = [
  {
    id: 1,
    name: 'aCupcake1',
    department: 'Information Technology',
    designation: 'Software Engineer',
    emailID: 'abc@m.com',
    ext: 4.3,
    cellPhone: 343223452
  },
  {
    id: 2,
    name: 'fCupcake2',
    department: 'nformation Technology',
    designation: 'oftware Engineer',
    emailID: 'cbc@m.com',
    ext: 4.3,
    cellPhone: 343223452
  },
  {
    id: 3,
    name: 'eCupcake3',
    department: 'formation Technology',
    designation: 'ftware Engineer',
    emailID: 'bbc@m.com',
    ext: 4.3,
    cellPhone: 343223452
  },
  {
    id: 4,
    name: 'Ctupcake4',
    department: 'ormation Technology',
    designation: 'tware Engineer',
    emailID: 'dabc@m.com',
    ext: 4.3,
    cellPhone: 343223452
  },
  {
    id: 5,
    name: 'hCupcake5',
    department: 'rmation Technology',
    designation: 'ware Engineer',
    emailID: 'eaebc@m.com',
    ext: 4.3,
    cellPhone: 343223452
  },
  {
    id: 6,
    name: 'wCupcake6',
    department: 'mation Technology',
    designation: 'are Engineer',
    emailID: 'uabc@m.com',
    ext: 4.3,
    cellPhone: 343223452
  }
];

export { data, headCells };
