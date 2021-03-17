import { Box, Button, CircularProgress, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import TitleIcon from '@material-ui/icons/Title';
import NotificationIcon from '@material-ui/icons/NotificationImportant';
import DescriptionIcon from '@material-ui/icons/Description';
import { Input } from 'components';
import MuiRadioButtons from 'components/muiRadioButtons';
import MuiDatePickerInput from 'components/muiDatePickerInput';
import { Form, Formik } from 'formik';
import React, { memo, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { H4 } from '../../typography';
import { yupUserFormValidaton } from './yupFormValidation';

const useStyles = makeStyles(() => ({
  imageStyle: {
    width: '150px',
    height: '150px',
  },
}));

function CreateAnnouncement({
  mutation,
  onUpdateUser,
  formType = 'add',
  isThisMyProfile = false,
}) {
  const classes = useStyles();
  const history = useHistory();
  const formikRef = useRef();
  const editProfileHeading = 'Edit Profile';
  const formHeadings = {
    add: 'Create New Announcement',
    edit: 'Update Announcement Data',
  };

  const yupValidation = yupUserFormValidaton;
  useEffect(() => {
    if (mutation.isSuccess && formType === 'add') {
      if (formikRef.current) {
        formikRef.current.resetForm();
      }
    }
  }, [mutation.isSuccess]);

  return (
    <>
      <Formik
        initialValues={{
          title: '',
          description: '',
          expiryDate: '',
          startDate: '',
          endDate: '',
        }}
        innerRef={formikRef}
        onSubmit={async (values) => {
          try {
            const data = values;

            if (data.contactNo)
              data.contactNo = data.contactNo.replace(/[{()}]| |-|_/g, '');

            const dataFile = new FormData();

            if (data.firstName) dataFile.append('firstName', data.firstName);
            if (data.lastName) dataFile.append('lastName', data.lastName);
            if (data.contactNo) dataFile.append('contactNo', data.contactNo);
            if (data.extension) dataFile.append('extension', data.extension);
            if (data.title) dataFile.append('title', data.title);
            if (data.location) dataFile.append('location', data.location);
            if (data.department) dataFile.append('department', data.department);
            if (data.file && data.file.size) {
              dataFile.append('file', data.file);
            }
            if (formType === 'add') dataFile.append('email', data.email);
            if (data.password) {
              dataFile.append('password', data.password);
            }
            if (data.joiningDate) {
              dataFile.append('joiningDate', data.joiningDate);
            }
            await onUpdateUser(dataFile);
          } catch (err) {
            // ...
          }
        }}
        validationSchema={yupValidation}
      >
        {({ setFieldValue, values }) => (
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
                    <H4>{`${
                      isThisMyProfile
                        ? editProfileHeading
                        : formHeadings[formType]
                    }`}</H4>
                  </Box>
                  <Box width={[1, 1 / 2]} mt={10} px={3}>
                    <Input
                      name="title"
                      variant="outlined"
                      OutlinedInputPlaceholder="*Title"
                      Icon={TitleIcon}
                      appendIcon
                    />
                  </Box>
                  <Box width={[1, 1 / 2]} mt={10} px={3}>
                    <Input
                      name="description"
                      variant="outlined"
                      OutlinedInputPlaceholder="*Description"
                      Icon={DescriptionIcon}
                      appendIcon
                    />
                  </Box>
                  <Box width={[1, 1 / 2]} mt={10} px={3}>
                    <MuiDatePickerInput
                      name="startDate"
                      variant="outlined"
                      label="Start Date"
                    />
                  </Box>
                  <Box width={[1, 1 / 2]} mt={10} px={3}>
                    <MuiDatePickerInput
                      name="endDate"
                      variant="outlined"
                      label="End Date"
                    />
                  </Box>

                  <Box width={[1, 1 / 2]} mt={10} px={3}>
                    <MuiDatePickerInput
                      name="expiryDate"
                      variant="outlined"
                      label="Expiry Date"
                    />
                  </Box>
                  <Box width={[1, 1 / 2]} mt={10} px={3}>
                    <MuiRadioButtons />
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
                    <Box mx={1} mb={7}>
                      <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        startIcon={
                          !mutation.isLoading && (
                            <NotificationIcon fontSize="small" />
                          )
                        }
                      >
                        {mutation.isLoading && (
                          <CircularProgress
                            size={15}
                            className={classes.circularProgress}
                          />
                        )}
                        {`${formType === 'add' ? 'Create' : 'Update'}`}
                      </Button>
                    </Box>
                    <Box mx={1}>
                      <Button
                        onClick={() => {
                          history.push('/announcement');
                        }}
                        startIcon={<ClearIcon fontSize="small" />}
                      >
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

export default memo(CreateAnnouncement);
