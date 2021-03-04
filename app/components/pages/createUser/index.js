import {
  Box,
  Button,
  CircularProgress,
  Hidden,
  useMediaQuery,
  Tooltip,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';
import ClearIcon from '@material-ui/icons/Clear';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { Input } from 'components';
import { MuiFileInput } from 'components/muiFileInput';
import { Form, Formik } from 'formik';
import React, { memo, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FILE_ACCEPT_TYPES } from 'utils/constants';
import { H4 } from '../../typography';
import { TextMaskForContactNo } from './textMaskForContactNo';
import { yupUserFormValidaton } from './yupUserFormValidation';

const useStyles = makeStyles(() => ({
  imageStyle: {
    borderRadius: '50%',
    width: '150px',
    height: '150px',
  },
}));

function CreateUser({
  initialFiles,
  mutation,
  onUpdateUser,
  formType = 'add',
}) {
  const classes = useStyles();
  const [imgFile, setImgFile] = useState(
    (initialFiles && initialFiles.avatar) || null
  );
  const theme = useTheme();
  const history = useHistory();
  const isResSmallerThanSm = useMediaQuery(theme.breakpoints.down('sm'));
  const formikRef = useRef();
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
        initialValues={initialFiles}
        innerRef={formikRef}
        onSubmit={async (values) => {
          try {
            const data = values;
            // if (values.file && values.file.size) {
            //   const dataFile = new FormData();
            //   dataFile.append('file', values.file);

            //   data.file = dataFile;
            // }
            data.contactNo = data.contactNo.replace(/[{()}]| |-|_/g, '');

            const dataFile = new FormData();
            dataFile.append('firstName', data.firstName);
            dataFile.append('lastName', data.lastName);
            dataFile.append('contactNo', data.contactNo);
            dataFile.append('extension', data.extension);
            dataFile.append('title', data.title);
            dataFile.append('location', data.location);
            dataFile.append('department', data.department);
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
            // eslint-disable-next-line no-console
            console.log(err, 'error in submitting data');
          }
          // resetForm();
          // setImgFile(null);
        }}
        validationSchema={yupUserFormValidaton}
      >
        {({ setFieldValue }) => (
          <Form>
            <Box
              flexWrap="wrap"
              flexDirection="row"
              p={4}
              pr={isResSmallerThanSm ? 0 : 36}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                width={[1, '30%']}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                // flex="30%"
              >
                <Box width={1} display="flex" justifyContent="center">
                  <Box
                    width={[1 / 2, 1]}
                    display="flex"
                    justifyContent="center"
                  >
                    <img
                      className={classes.imageStyle}
                      src={imgFile || 'http://www.gravatar.com/avatar/?d=mp'}
                      alt="person"
                    ></img>
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
              <Box width={[1, '70%']}>
                <Box width={1} pt={10} flexWrap="wrap" display="flex" px={2}>
                  <Box width={1} textAlign="center">
                    <H4>{`${
                      formType === 'add'
                        ? 'Create New User'
                        : 'Update User Data'
                    }`}</H4>
                  </Box>
                  <Box width={[1, 1 / 2]} mt={10} px={3}>
                    <Input
                      name="firstName"
                      variant="outlined"
                      OutlinedInputPlaceholder="*First Name"
                      isDisabled={mutation.isLoading}
                    />
                  </Box>
                  <Box width={[1, 1 / 2]} mt={10} px={3}>
                    <Input
                      name="lastName"
                      variant="outlined"
                      OutlinedInputPlaceholder="*Last Name"
                      isDisabled={mutation.isLoading}
                    />
                  </Box>
                  <Box width={[1, 1 / 2]} mt={10} px={3}>
                    <Input
                      name="email"
                      variant="outlined"
                      OutlinedInputPlaceholder="*Email"
                      isDisabled={mutation.isLoading || formType === 'edit'}
                    />
                  </Box>
                  <Box width={[1, 1 / 2]} mt={10} px={3}>
                    <Tooltip title="Choose strong password">
                      <Input
                        inputProps={{
                          autocomplete: 'off',
                          placeHolder: `${
                            formType === 'add' ? '*Password' : 'Password'
                          }`,
                          form: {
                            autocomplete: 'off',
                          },
                        }}
                        variant="outlined"
                        type="password"
                        id="password"
                        name="password"
                      />
                    </Tooltip>
                  </Box>
                  <Box width={[1, 1 / 2]} mt={10} px={3}>
                    <Tooltip title="Input your Department">
                      <Input
                        name="contactNo"
                        variant="outlined"
                        OutlinedInputPlaceholder="*Enter Phone Number"
                        inputComponent={TextMaskForContactNo}
                        isDisabled={mutation.isLoading}
                      />
                    </Tooltip>
                  </Box>
                  <Box width={[1, 1 / 2]} mt={10} px={3}>
                    <Tooltip title="Input your phone extenstion">
                      <Input
                        name="extension"
                        variant="outlined"
                        OutlinedInputPlaceholder="*Phone Extension"
                        isDisabled={mutation.isLoading}
                      />
                    </Tooltip>
                  </Box>
                  <Box width={[1, 1 / 2]} mt={10} px={3}>
                    <Tooltip title="Input your Location">
                      <Input
                        name="location"
                        variant="outlined"
                        OutlinedInputPlaceholder="*Location"
                        isDisabled={mutation.isLoading}
                      />
                    </Tooltip>
                  </Box>
                  <Box width={[1, 1 / 2]} mt={10} px={3}>
                    <Tooltip title="Input your Department">
                      <Input
                        name="department"
                        variant="outlined"
                        OutlinedInputPlaceholder="*Department"
                        isDisabled={mutation.isLoading}
                      />
                    </Tooltip>
                  </Box>
                  <Box width={[1, 1 / 2]} mt={10} px={3}>
                    <Tooltip title="Input your Designation">
                      <Input
                        name="title"
                        variant="outlined"
                        OutlinedInputPlaceholder="*Designation"
                        isDisabled={mutation.isLoading}
                      />
                    </Tooltip>
                  </Box>
                  <Box width={[1, 1 / 2]} mt={10} px={3}>
                    <Tooltip title="Choose Joining Date">
                      <Input
                        name="joiningDate"
                        variant="outlined"
                        inputType="date"
                        placeholderText="Date"
                        hintText="Choose Date"
                        isDisabled={mutation.isLoading}
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
                    <Box mx={1} mb={7}>
                      <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        // onClick={() => {
                        //   if (values.file && values.file.size) {
                        //     setFieldValue('isProfilePicAttached', true);
                        //   }
                        //   handleSubmit();
                        // }}
                        startIcon={
                          !mutation.isLoading && (
                            <GroupAddIcon fontSize="small" />
                          )
                        }
                        // disabled={
                        //   mutation.isLoading || Object.keys(errors).length > 0
                        // }
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
