import { Box, Button } from '@material-ui/core';
import React, { memo, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Input } from 'components';
import { Form, Formik } from 'formik';
import BusinessIcon from '@material-ui/icons/Business';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import Select from '../muiSelect';
import MuiDialog from '../muiDialog';
import { useCreateDepartment } from '../../hooks/departmentMutation';
import { keys } from '../../state/queryKeys';
import { getDepartments } from '../../state/queryFunctions';
import { useStyles } from './style';
import { validationSchema } from './schema';
import Show from '../show';
import { usePermission } from '../../hooks/permission';
import { features, PERMISSIONS } from '../../utils/constants';

function DepartmentWithModal({
  variant,
  options,
  modal,
  selectedValue,
  initialValues,
  ...props
}) {
  const isReadAllowed = usePermission(
    `${features.LOCATION}-${PERMISSIONS.READ}`
  );
  const isWriteAllowed = usePermission(
    `${features.DEPARTMENT}-${PERMISSIONS.WRITE}`
  );
  const { mutate } = useCreateDepartment();
  const { data: deparments, isLoading } = useQuery(
    keys.department,
    getDepartments,
    {
      enabled: isReadAllowed,
    }
  );

  const [open, setOpen] = useState(false);
  const handleDialogue = () => {
    setOpen(!open);
  };
  const handleSubmit = (values, { resetForm }) => {
    mutate(values);
    resetForm();
    setOpen(!open);
  };
  const departmentOptions = deparments?.data.data.rows.map((val) => ({
    value: val.id,
    label: val.name,
  }));

  const classes = useStyles();
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ submitForm }) => (
          <Form>
            <MuiDialog
              open={open}
              onClose={() => handleDialogue()}
              title="Create New Department"
              onSubmit={submitForm}
            >
              <Box
                width={[1, 1, 1 / 2]}
                py={5}
                className={classes.modalOverflow}
              >
                <Input
                  name="name"
                  variant="outlined"
                  OutlinedInputPlaceholder="*Department"
                  Icon={BusinessIcon}
                  appendIcon
                />
              </Box>
            </MuiDialog>
          </Form>
        )}
      </Formik>
      <Box>
        <Select
          variant={variant}
          selectedValue={selectedValue}
          label="Department"
          {...(options && { emptyItem: !(options.length > 0) })}
          options={departmentOptions || options || []}
          loading={isLoading}
          {...props}
        />
        <Show IF={modal && isWriteAllowed}>
          <Button size="small" startIcon={<AddIcon />} onClick={handleDialogue}>
            Create new department
          </Button>
        </Show>
      </Box>
    </>
  );
}

DepartmentWithModal.propTypes = {
  initialValues: PropTypes.object,
  selectedValue: PropTypes.string,
  modal: PropTypes.bool,
  variant: PropTypes.string,
};
DepartmentWithModal.defaultProps = {
  initialValues: { name: '' },
  variant: 'outlined',
  modal: true,
};

export default memo(DepartmentWithModal);
