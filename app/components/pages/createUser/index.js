import React, { useState, useEffect, useRef, memo } from 'react';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Hidden,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';
import ClearIcon from '@material-ui/icons/Clear';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { Input, Toast } from 'components';
import { MuiFileInput } from 'components/muiFileInput';
import { Form, Formik } from 'formik';
import { FILE_ACCEPT_TYPES } from 'utils/constants';
import { useHistory } from 'react-router-dom';
import { TextMaskForContactNo } from './textMaskForContactNo';
import { yupUserFormValidaton } from './yupUserFormValidation';
import { H4 } from '../../typography';

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
  const errorMessage = mutation?.error?.response?.data?.message;
  const isResSmallerThanSm = useMediaQuery(theme.breakpoints.down('sm'));
  const formikRef = useRef();
  useEffect(() => {
    if (mutation.isSuccess) {
      setTimeout(() => {
        history.push('/directory');
      }, 700);

      if (formikRef.current) {
        formikRef.current.resetForm();
      }
    }
  }, [mutation.isSuccess]);
  return (
    <>
      {mutation.isError && <Toast variant="error">{errorMessage}</Toast>}

      {mutation.isSuccess && (
        <Toast variant="success">
          {`User ${formType === 'add' ? 'Created' : 'Updated'} Successfully`}
        </Toast>
      )}
      <Card style={{ display: 'flex', flex: 1 }}>
        <Formik
          initialValues={initialFiles}
          innerRef={formikRef}
          onSubmit={async (values) => {
            try {
              const data = values;
              if (values.file && values.file.size) {
                const dataFile = new FormData();
                dataFile.append('file', values.file);

                data.file = dataFile;
              }
              data.password = 'Qwerty123';
              data.contactNo = data.contactNo.replace(/[{()}]| |-|_/g, '');

              await onUpdateUser(data);
            } catch (err) {
              // eslint-disable-next-line no-console
              console.log(err, 'error in submitting data');
            }
            // resetForm();
            setImgFile(null);
          }}
          validationSchema={yupUserFormValidaton}
        >
          {({ values, setFieldValue, handleSubmit }) => (
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
                        isDisabled={mutation.isLoading}
                      />
                    </Box>
                    <Box width={[1, 1 / 2]} mt={10} px={3}>
                      <Input
                        name="contactNo"
                        variant="outlined"
                        OutlinedInputPlaceholder="*Enter Phone Number"
                        inputComponent={TextMaskForContactNo}
                        isDisabled={mutation.isLoading}
                      />
                    </Box>
                    <Box width={[1, 1 / 2]} mt={10} px={3}>
                      <Input
                        name="extension"
                        variant="outlined"
                        OutlinedInputPlaceholder="*Phone Extension"
                        isDisabled={mutation.isLoading}
                      />
                    </Box>
                    <Box width={[1, 1 / 2]} mt={10} px={3}>
                      <Input
                        name="location"
                        variant="outlined"
                        OutlinedInputPlaceholder="*Location"
                        isDisabled={mutation.isLoading}
                      />
                    </Box>
                    <Box width={[1, 1 / 2]} mt={10} px={3}>
                      <Input
                        name="department"
                        variant="outlined"
                        OutlinedInputPlaceholder="*Department"
                        isDisabled={mutation.isLoading}
                      />
                    </Box>
                    <Box width={[1, 1 / 2]} mt={10} px={3}>
                      <Input
                        name="title"
                        variant="outlined"
                        OutlinedInputPlaceholder="*Designation"
                        isDisabled={mutation.isLoading}
                      />
                    </Box>
                    <Box width={[1, 1 / 2]} mt={10} px={3}>
                      <Input
                        name="joiningDate"
                        variant="outlined"
                        inputType="date"
                        isDisabled={mutation.isLoading}
                      />
                    </Box>{' '}
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
                          onClick={() => {
                            if (values.file && values.file.size) {
                              setFieldValue('isProfilePicAttached', true);
                            }
                            handleSubmit();
                          }}
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
                            // resetForm();
                            setImgFile(null);
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
      </Card>
    </>
  );
}

export default memo(CreateUser);
