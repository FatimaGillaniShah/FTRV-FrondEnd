import { Box, Button } from '@material-ui/core';
import React, { memo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { Input } from 'components';
import { Form, Formik } from 'formik';
import { string, object } from 'yup';
import BusinessIcon from '@material-ui/icons/Business';
import PropTypes from 'prop-types';
import Select from '../muiSelect';
import MuiDialog from '../muiDialog';

const useStyles = makeStyles((theme) => ({
  modelLink: {
    cursor: 'pointer',
    paddingTop: theme.spacing(1),
  },
}));

function DepartmentWithModel({
  selectedValue,
  options,
  initialDialogData,
  variant,
}) {
  const departmentSchema = object().shape({
    department: string()
      .required('*Department Required')
      .noWhitespace()
      .typeError('* This field cannot contain only blankspaces'),
  });

  const [openDepDialog, setOpenDepDialog] = useState(false);
  const handleDialogState = () => {
    setOpenDepDialog(!openDepDialog);
  };

  const classes = useStyles();
  return (
    <>
      <Formik
        initialValues={initialDialogData}
        validationSchema={departmentSchema}
      >
        <Form>
          <MuiDialog
            open={openDepDialog}
            onClose={() => handleDialogState()}
            title="Create New Department"
          >
            <Box width={[1, 1, 1 / 2]} py={5}>
              <Input
                name="department"
                variant={variant}
                OutlinedInputPlaceholder="*Department"
                Icon={BusinessIcon}
                appendIcon
              />
            </Box>
          </MuiDialog>
        </Form>
      </Formik>
      <Box mt={6}>
        <Select
          name="locationId"
          selectedValue={selectedValue}
          label="Department"
          options={options}
        />
        <Box className={classes.modelLink}>
          <Button startIcon={<AddIcon />} onClick={handleDialogState}>
            Create new department
          </Button>
        </Box>
      </Box>
    </>
  );
}

DepartmentWithModel.propTypes = {
  options: PropTypes.array,
  initialDialogData: PropTypes.object,
  selectedValue: PropTypes.string,
  variant: PropTypes.string,
};
DepartmentWithModel.defaultProps = {
  variant: 'outlined',
};

export default memo(DepartmentWithModel);
