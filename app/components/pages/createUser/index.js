import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Hidden,
  Tooltip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import ClearIcon from '@material-ui/icons/Clear';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import PhoneIcon from '@material-ui/icons/Phone';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import WorkIcon from '@material-ui/icons/Work';
import AddIcon from '@material-ui/icons/Add';
import { Input, DatePicker } from 'components';
import { MuiFileInput } from 'components/muiFileInput';
import { Form, Formik } from 'formik';
import React, { memo, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FILE_ACCEPT_TYPES, ROLES } from 'utils/constants';
import BusinessOutlinedIcon from '@material-ui/icons/BusinessOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import { H4 } from '../../typography';
import { TextMaskForContactNo } from './textMaskForContactNo';
import { userProfileValidation } from './userProfileValidation';
import { yupUserFormValidaton } from './yupUserFormValidation';
import { parseDate } from '../../../utils/functions';
import Select from '../../muiSelect';

import MuiDialog from '../../muiDialog';

const useStyles = makeStyles((theme) => ({
  imageStyle: {
    width: '150px',
    height: '150px',
  },
  label: {
    color: theme.palette.text.info,
  },
  dateColor: {
    color: theme.palette.text.dark,
  },
  linkBox: {
    cursor: 'pointer',
    paddingTop: '3px',
  },
  modalOverflow: {
    overflowY: 'hidden',
  },
}));

function CreateUser({
  initialData,
  mutation,
  onUpdateUser,
  formType = 'add',
  editRole = 'user',
  isThisMyProfile = false,
  locationOptions,
  departmentOptions,
}) {
  const classes = useStyles();
  const [showPassword, setshowPassword] = useState(false);
  const [openLocDialog, setOpenLocDialog] = useState(false);
  const [openDepDialog, setOpenDepDialog] = useState(false);
  const [imgFile, setImgFile] = useState(
    (initialData && initialData.avatar) || null
  );
  const history = useHistory();
  const formikRef = useRef();

  const handleDialogState = (dialogType) => {
    if (dialogType === 'loc') {
      setOpenLocDialog(!openLocDialog);
    } else if (dialogType === 'dep') {
      setOpenDepDialog(!openDepDialog);
    }
  };

  const editProfileHeading = 'Edit Profile';
  const formHeadings = { add: 'Create New User', edit: 'Update User Data' };
  const isUserEditingHisProfile = isThisMyProfile && editRole === ROLES.USER;
  const yupValidation = isUserEditingHisProfile
    ? userProfileValidation
    : yupUserFormValidaton;
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
        initialValues={initialData}
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
              dataFile.append('joiningDate', parseDate(data.joiningDate));
            }
            if (data.dob) {
              dataFile.append('dob', parseDate(data.dob));
            }
            if (data.role) {
              dataFile.append('role', data.role);
            }
            await onUpdateUser(dataFile);
          } catch (err) {
            // ...
          }
        }}
        validationSchema={yupValidation}
      >
        {({ setFieldValue, values, handleChange }) => (
          <Form>
            <MuiDialog
              open={openLocDialog}
              onClose={() => handleDialogState('loc')}
              title="Create New Location"
            >
              <Box
                width={[1, 1, 1 / 2]}
                py={5}
                className={classes.modalOverflow}
              >
                <Input
                  name="Location"
                  variant="outlined"
                  OutlinedInputPlaceholder="*Enter Location"
                  Icon={LocationOnOutlinedIcon}
                  appendIcon
                  IconClickable={
                    !(mutation.isLoading || isUserEditingHisProfile)
                  }
                  isDisabled={mutation.isLoading || isUserEditingHisProfile}
                />
              </Box>
            </MuiDialog>

            <MuiDialog
              open={openDepDialog}
              onClose={() => handleDialogState('dep')}
              title="Create New Department"
            >
              <Box
                width={[1, 1, 1 / 2]}
                py={5}
                className={classes.modalOverflow}
              >
                <Input
                  name="new-department"
                  variant="outlined"
                  OutlinedInputPlaceholder="*Department"
                  Icon={BusinessOutlinedIcon}
                  appendIcon
                  IconClickable={
                    !(mutation.isLoading || isUserEditingHisProfile)
                  }
                  InputLabelProps={{ shrink: true }}
                  isDisabled={mutation.isLoading || isUserEditingHisProfile}
                />
              </Box>
            </MuiDialog>
            <Box
              flexWrap="wrap"
              flexDirection="row"
              p={4}
              pr={[0, 36]}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                width={[1, 1, 1, '30%']}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Box width={1} display="flex" justifyContent="center">
                  <Box
                    width={[1 / 2, 1]}
                    display="flex"
                    justifyContent="center"
                  >
                    <Avatar src={imgFile} className={classes.imageStyle} />
                  </Box>
                </Box>
                <Box
                  ml={1}
                  pt={5}
                  display="flex"
                  justifyContent="center"
                  style={{
                    minWidth: '118px',
                  }}
                >
                  <Input
                    name="file"
                    inputID="file"
                    inputType="file"
                    disableUnderline
                    inputComponent={(props) => (
                      <MuiFileInput
                        name="file"
                        mutation={mutation}
                        setImgFile={setImgFile}
                        setFieldValue={setFieldValue}
                        acceptTypes={FILE_ACCEPT_TYPES.imageFiles}
                        toolTipTitle="Select profile image"
                        buttonText="Upload Image"
                        BtnIcon={Add}
                        {...props}
                      />
                    )}
                  />
                </Box>
              </Box>
              <Box width={[1, 1, 1, '70%']}>
                <Box width={1} pt={10} flexWrap="wrap" display="flex" px={2}>
                  <Box width={1} textAlign="center">
                    <H4>{`${
                      isThisMyProfile
                        ? editProfileHeading
                        : formHeadings[formType]
                    }`}</H4>
                  </Box>
                  <Box width={[1, 1, 1 / 2]} mt={10} px={3}>
                    <Input
                      name="firstName"
                      variant="outlined"
                      OutlinedInputPlaceholder="*First Name"
                      Icon={PersonOutlineIcon}
                      appendIcon
                      IconClickable={
                        !(mutation.isLoading || isUserEditingHisProfile)
                      }
                      isDisabled={mutation.isLoading || isUserEditingHisProfile}
                    />
                  </Box>
                  <Box width={[1, 1, 1 / 2]} mt={10} px={3}>
                    <Input
                      name="lastName"
                      variant="outlined"
                      Icon={PersonOutlineIcon}
                      appendIcon
                      IconClickable={
                        !(mutation.isLoading || isUserEditingHisProfile)
                      }
                      OutlinedInputPlaceholder="*Last Name"
                      isDisabled={mutation.isLoading || isUserEditingHisProfile}
                    />
                  </Box>
                  <Box width={[1, 1, 1 / 2]} mt={10} px={3}>
                    <Input
                      name="email"
                      variant="outlined"
                      OutlinedInputPlaceholder="*Email"
                      isDisabled={
                        mutation.isLoading ||
                        formType === 'edit' ||
                        isThisMyProfile
                      }
                      Icon={AlternateEmailIcon}
                      appendIcon
                      IconClickable={
                        !(mutation.isLoading || isUserEditingHisProfile)
                      }
                    />
                  </Box>
                  <Box width={[1, 1, 1 / 2]} mt={10} px={3}>
                    <Tooltip title="Choose strong password">
                      <Input
                        inputProps={{
                          autocomplete: 'off',
                          form: {
                            autocomplete: 'off',
                          },
                        }}
                        OutlinedInputPlaceholder={`${
                          formType === 'add' ? '*Password' : 'Password'
                        }`}
                        variant="outlined"
                        inputType={`${showPassword ? 'text' : 'password'}`}
                        id="password"
                        name="password"
                        onIconClick={() => {
                          setshowPassword(!showPassword);
                        }}
                        Icon={showPassword ? VisibilityOffIcon : VisibilityIcon}
                        appendIcon
                        IconClickable
                      />
                    </Tooltip>
                  </Box>
                  <Box width={[1, 1, 1 / 2]} mt={10} px={3}>
                    <Tooltip title="Choose strong password">
                      <Input
                        OutlinedInputPlaceholder={`${
                          formType === 'add'
                            ? '*Confirm Password'
                            : 'Confirm Password'
                        }`}
                        inputProps={{
                          autocomplete: 'off',
                          placeholder: `${
                            formType === 'add'
                              ? '*Confirm Password'
                              : 'Confirm Password'
                          }`,
                          form: {
                            autocomplete: 'off',
                          },
                        }}
                        variant="outlined"
                        inputType={`${showPassword ? 'text' : 'password'}`}
                        id="confirmPassword"
                        name="confirmPassword"
                        onIconClick={() => {
                          setshowPassword(!showPassword);
                        }}
                        Icon={showPassword ? VisibilityOffIcon : VisibilityIcon}
                        appendIcon
                        IconClickable
                      />
                    </Tooltip>
                  </Box>
                  <Box width={[1, 1, 1 / 2]} mt={10} px={3}>
                    <Tooltip title="Input your Contact Number">
                      <Input
                        name="contactNo"
                        variant="outlined"
                        OutlinedInputPlaceholder="Enter Phone Number"
                        inputComponent={TextMaskForContactNo}
                        Icon={PhoneIcon}
                        appendIcon
                        IconClickable={
                          !(mutation.isLoading || isUserEditingHisProfile)
                        }
                        isDisabled={
                          mutation.isLoading || isUserEditingHisProfile
                        }
                      />
                    </Tooltip>
                  </Box>
                  <Box width={[1, 1, 1 / 2]} mt={10} px={3}>
                    <Tooltip title="Input your phone extenstion">
                      <Input
                        name="extension"
                        variant="outlined"
                        OutlinedInputPlaceholder="Phone Extension"
                        Icon={ContactPhoneIcon}
                        appendIcon
                        IconClickable={
                          !(mutation.isLoading || isUserEditingHisProfile)
                        }
                        isDisabled={
                          mutation.isLoading || isUserEditingHisProfile
                        }
                      />
                    </Tooltip>
                  </Box>
                  <Box width={[1, 1, 1 / 2]} mt={10} px={3}>
                    <Select
                      name="locationId"
                      label="Location"
                      selectedValue={values.locationId}
                      options={locationOptions}
                    />
                    <Box
                      className={classes.linkBox}
                      onClick={() => handleDialogState('loc')}
                    >
                      <AddIcon fontSize="small" /> Create new location
                    </Box>
                  </Box>
                  <Box width={[1, 1, 1 / 2]} mt={10} px={3}>
                    <Select
                      name="departmentId"
                      label="Department"
                      selectedValue={values.departmentId}
                      options={departmentOptions}
                    />
                    <Box
                      className={classes.linkBox}
                      onClick={() => handleDialogState('dep')}
                    >
                      <AddIcon fontSize="small" /> Create new department
                    </Box>
                  </Box>
                  <Box width={[1, 1, 1 / 2]} mt={10} px={3}>
                    <Tooltip title="Input your Designation">
                      <Input
                        name="title"
                        variant="outlined"
                        OutlinedInputPlaceholder="*Designation"
                        Icon={WorkIcon}
                        appendIcon
                        IconClickable={
                          !(mutation.isLoading || isUserEditingHisProfile)
                        }
                        isDisabled={
                          mutation.isLoading || isUserEditingHisProfile
                        }
                      />
                    </Tooltip>
                  </Box>
                  <Box width={[1, 1, 1 / 2]} mt={6} px={3}>
                    <Tooltip title="Choose Joining Date">
                      <DatePicker
                        disableFuture
                        id="joiningDate"
                        name="joiningDate"
                        label="Joining Date"
                        inputVariant="outlined"
                        margin="normal"
                        disabled={mutation.isLoading || isUserEditingHisProfile}
                      />
                    </Tooltip>
                  </Box>
                  <Box width={[1, 1, 1 / 2]} mt={6} px={3}>
                    <Tooltip title="Choose Birthday">
                      <DatePicker
                        disableFuture
                        id="dob"
                        name="dob"
                        label="Birth Date"
                        margin="normal"
                        disabled={mutation.isLoading || editRole === ROLES.USER}
                      />
                    </Tooltip>
                  </Box>
                  <Box width={[1, 1, 1 / 2]} mt={6} px={3}>
                    <Select
                      disabled={mutation.isLoading || isThisMyProfile}
                      name="role"
                      selectId="role"
                      labelId="role"
                      selectName="role"
                      formControlProps={{ variant: 'outlined' }}
                      label="Select User Type"
                      selectedValue={values.role}
                      options={Object.keys(ROLES).map((val) => ROLES[val])}
                      onHandleChange={handleChange('role')}
                    />
                  </Box>
                  <Hidden smDown>
                    <Box width={[1, 1, 1 / 2]} mt={10} px={3}></Box>
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
                            <GroupAddIcon fontSize="small" />
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
                          history.push('/directory');
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

export default memo(CreateUser);
