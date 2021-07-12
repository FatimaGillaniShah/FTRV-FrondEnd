import { Box, Button, Hidden, Tooltip } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import { string, object } from 'yup';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { H4 } from '../../typography';
import DepartmentWithModel from '../../departmentWithModel';
import LocationWithModel from '../../locationWithModel';
import { Input } from '../../index';

const ringGroupSchema = object().shape({
  name: string()
    .required('*Name Required')
    .noWhitespace()
    .typeError('* This field cannot contain only blankspaces'),
  extension: string()
    .required('*Extension Required')
    .matches(/^[0-9]*$/, '* Only number are allowed')
    .max(10, 'Too Long!')
    .nullable(),
  departmentId: string().required('*Department Required'),
  locationId: string().required('*Location Required'),
});
function CreateRingGroup({
  initialValues,
  initialDialogData,
  formType = 'add',
  options,
}) {
  const formHeadings = {
    add: 'Create New Ring Group',
    edit: 'Update Ring Group',
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={{}}
        validationSchema={ringGroupSchema}
      >
        {({ values }) => (
          <Form>
            <Box
              flexWrap="wrap"
              flexDirection="row"
              p={4}
              pr={[0, 36]}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box width={[1, '70%']}>
                <Box width={1} pt={10} flexWrap="wrap" display="flex" px={2}>
                  <Box width={1} textAlign="center">
                    <H4>{formHeadings[formType]}</H4>
                  </Box>
                  <Box width={[1, 1 / 2]} mt={10} px={3}>
                    <Input
                      name="name"
                      variant="outlined"
                      OutlinedInputPlaceholder="*Name"
                      Icon={PersonOutlineIcon}
                      appendIcon
                    />
                  </Box>

                  <Box width={[1, 1, 1 / 2]} mt={4} px={3}>
                    <DepartmentWithModel
                      name="department"
                      label="Department"
                      selectedValue={values.departmentId}
                      options={options}
                      initialDialogData={initialDialogData}
                    />
                  </Box>
                  <Box width={[1, 1, 1 / 2]} px={3}>
                    <LocationWithModel
                      name="location"
                      label="Location"
                      selectedValue={values.locationId}
                      options={options}
                      initialDialogData={initialDialogData}
                    />
                  </Box>
                  <Box width={[1, 1, 1 / 2]} mt={6} px={3}>
                    <Tooltip title="Input your phone extenstion">
                      <Input
                        name="extension"
                        variant="outlined"
                        OutlinedInputPlaceholder="Phone Extension"
                        Icon={ContactPhoneIcon}
                        appendIcon
                      />
                    </Tooltip>
                  </Box>

                  <Hidden smDown>
                    <Box width={[1, 1 / 2]} mt={10} px={3}></Box>
                  </Hidden>
                  <Box
                    display="flex"
                    flexWrap="wrap"
                    justifyContent="center"
                    width={1}
                    mt={10}
                  >
                    <Box mb={7}>
                      <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        startIcon={<NotificationImportantIcon />}
                      >
                        {`${formType === 'add' ? 'Create' : 'Update'}`}
                      </Button>
                    </Box>
                    <Box mx={1}>
                      <Button startIcon={<ClearIcon fontSize="small" />}>
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
}

CreateRingGroup.propTypes = {
  initialValues: PropTypes.object,
  options: PropTypes.array,
  initialDialogData: PropTypes.object,
};
CreateRingGroup.defaultProps = {
  initialValues: {
    name: '',
    extension: '',
    endTime: '',
    locationId: '',
    departmentId: '',
  },
  initialDialogData: {
    location: '',
    department: '',
  },
};

export default memo(CreateRingGroup);
