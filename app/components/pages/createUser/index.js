import { Box, Tooltip } from '@material-ui/core';
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
import { Input, DatePicker, Button, Avatar, AutoComplete } from 'components';
import { MuiFile } from 'components/muiFile';
import { Form, Formik } from 'formik';
import React, { memo, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { debounce } from 'lodash';
import { navigateTo } from '../../../utils/helper';
import { H4 } from '../../typography';
import { TextMaskForContactNo } from './textMaskForContactNo';
import { userProfileValidation } from './userProfileValidation';
import { yupUserFormValidaton } from './yupUserFormValidation';
import { parseDate } from '../../../utils/functions';
import Show from '../../show';
import { useListGroup } from '../../../hooks/group';
import LocationWithModal from '../../locationWithModal';
import DepartmentWithModal from '../../departmentWithModal';
import { FILE_ACCEPT_TYPES } from '../../../utils/constants';

function CreateUser({
  initialData,
  mutation,
  onHandleSubmit,
  formType = 'add',
  edit,
  isReadAllowed,
  defaultDepartment,
  defaultLocation,
  feature,
  isThisMyProfile = false,
  isWriteAllowed,
}) {
  const [filters, setFilter] = useState({ name: '' });
  const initialValues = {
    ...initialData,
    groupIds: initialData?.groups || [],
  };
  delete initialValues.groups;
  const handleSearch = debounce(({ target }) => {
    setFilter({ name: target.value });
  }, 500);

  const { data: groups, isLoading: isGroupLoading } = useListGroup({
    enabled: feature.GROUP,
    filters,
  });
  const [showPassword, setshowPassword] = useState(false);

  const [imgFile, setImgFile] = useState(
    (initialValues && initialValues.avatar) || null
  );

  const history = useHistory();
  const formikRef = useRef();
  const editProfileHeading = 'Edit Profile';
  const formHeadings = { add: 'Create New User', edit: 'Update User Data' };
  const isUserEditingHisProfile = (isThisMyProfile && !edit) || isWriteAllowed;
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

  const handleSubmitUser = async (values) => {
    const data = values;

    if (data.contactNo)
      data.contactNo = data.contactNo.replace(
        /(\d{3})(\d{3})(\d{4})/,
        '$1-$2-$3'
      );

    const dataFile = new FormData();

    if (data.firstName) dataFile.append('firstName', data.firstName);
    if (data.lastName) dataFile.append('lastName', data.lastName);
    dataFile.append('contactNo', data.contactNo ? data.contactNo : '');
    dataFile.append('extension', data.extension ? data.extension : '');
    if (data.title) dataFile.append('title', data.title);
    if (data?.file?.file || data?.file === '') {
      if (data.file === '') dataFile.append('file', '');
      else dataFile.append('file', data.file.file);
    }
    if (formType === 'add') dataFile.append('email', data.email);
    if (data.password) {
      dataFile.append('password', data.password);
    }
    dataFile.append(
      'joiningDate',
      data.joiningDate ? parseDate(data.joiningDate) : ''
    );
    dataFile.append('dob', data?.dob ? parseDate(data.dob) : '');
    if (data.locationId) dataFile.append('locationId', data.locationId);
    if (data.departmentId) dataFile.append('departmentId', data.departmentId);
    data?.groupIds?.map(({ id }) => dataFile.append('groupIds[]', id));

    await onHandleSubmit(dataFile);
  };
  const can = (isDirectoryReadAllowed) => {
    if (isDirectoryReadAllowed) {
      navigateTo(history, '/directory');
    } else {
      navigateTo(history, '/home');
    }
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        innerRef={formikRef}
        onSubmit={handleSubmitUser}
        validationSchema={yupValidation}
      >
        {({ setFieldValue }) => (
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
              <Box
                width={[1, 1, 1, '30%']}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Box width={1} display="flex" justifyContent="center">
                  <Avatar
                    imgFile={imgFile}
                    setFieldValue={setFieldValue}
                    setImgFile={setImgFile}
                  />
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
                  <MuiFile
                    name="file"
                    loading={mutation.isLoading}
                    setImgFile={setImgFile}
                    setFieldValue={setFieldValue}
                    acceptTypes={FILE_ACCEPT_TYPES.imageFiles}
                    toolTipTitle="Select profile image"
                    buttonText="Upload Image"
                    btnIcon={<Add />}
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
                      isDisabled={mutation.isLoading || isUserEditingHisProfile}
                    />
                  </Box>
                  <Box width={[1, 1, 1 / 2]} mt={10} px={3}>
                    <Input
                      name="lastName"
                      variant="outlined"
                      Icon={PersonOutlineIcon}
                      appendIcon
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
                        isIconClickable
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
                        isDisabled={
                          mutation.isLoading || isUserEditingHisProfile
                        }
                      />
                    </Tooltip>
                  </Box>
                  <Box width={[1, 1, 1 / 2]} mt={10} px={3}>
                    <LocationWithModal
                      name="locationId"
                      label="Location*"
                      options={defaultLocation}
                    />
                  </Box>
                  <Box width={[1, 1, 1 / 2]} mt={10} px={3}>
                    <DepartmentWithModal
                      name="departmentId"
                      label="Department*"
                      options={defaultDepartment}
                    />
                  </Box>
                  <Box width={[1, 1, 1 / 2]} mt={8} px={3}>
                    <Tooltip title="Input your phone extenstion">
                      <Input
                        name="extension"
                        variant="outlined"
                        OutlinedInputPlaceholder="Phone Extension"
                        Icon={ContactPhoneIcon}
                        appendIcon
                        isDisabled={
                          mutation.isLoading || isUserEditingHisProfile
                        }
                      />
                    </Tooltip>
                  </Box>

                  <Box width={[1, 1, 1 / 2]} mt={8} px={3}>
                    <Tooltip title="Input your Title">
                      <Input
                        name="title"
                        variant="outlined"
                        OutlinedInputPlaceholder="*Title"
                        Icon={WorkIcon}
                        appendIcon
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
                        disabled={mutation.isLoading || isUserEditingHisProfile}
                      />
                    </Tooltip>
                  </Box>
                  <Show IF={!initialValues?.isAdmin}>
                    <Box width={[1, 1, 1 / 2]} mt={6} px={3}>
                      <AutoComplete
                        name="groupIds"
                        options={groups?.data?.data || []}
                        setFieldValue={setFieldValue}
                        defaultOptions={initialValues?.groupIds}
                        label="Groups"
                        placeholder="Select Groups"
                        loading={isGroupLoading}
                        checkBox
                        handleSearch={handleSearch}
                        onHandleSearch={(e) => {
                          if (e) handleSearch(e, setFieldValue);
                        }}
                        disabled={
                          !feature.GROUP ||
                          mutation.isLoading ||
                          isUserEditingHisProfile
                        }
                      />
                    </Box>
                  </Show>

                  <Box
                    display="flex"
                    flexWrap="wrap"
                    justifyContent="center"
                    width={1}
                    mt={10}
                  >
                    <Box mx={1} mb={7}>
                      <Button
                        disabled={mutation.isLoading}
                        variant="contained"
                        color="secondary"
                        type="submit"
                        startIcon={
                          <Show IF={!mutation.isLoading}>
                            <GroupAddIcon fontSize="small" />
                          </Show>
                        }
                      >
                        {`${formType === 'add' ? 'Create' : 'Update'}`}
                      </Button>
                    </Box>
                    <Box mx={1}>
                      <Button
                        onClick={() => {
                          can(isReadAllowed);
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
