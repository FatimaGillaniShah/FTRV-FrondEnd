import { Box } from '@material-ui/core';
import { Button, CKEditor, Avatar } from 'components';
import { Add } from '@material-ui/icons';
import ClearIcon from '@material-ui/icons/Clear';
import { MuiFile } from 'components/muiFile';
import { Form, Formik } from 'formik';
import React, { memo, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FILE_ACCEPT_TYPES } from 'utils/constants';
import SaveIcon from '@material-ui/icons/Save';
import WrapInCard from '../../layout/wrapInCard';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs/index';
import { H4 } from '../../typography';
import { formValidaton } from './formValidation';
import { navigateTo } from '../../../utils/helper';

function AddCeoMessage({ onHandleSubmit, value, loading }) {
  const [imgFile, setImgFile] = useState((value && value.avatar) || null);
  const history = useHistory();

  useEffect(() => {
    if (value) {
      setImgFile(imgFile);
    }
  }, []);

  return (
    <WrapInBreadcrumbs>
      <WrapInCard mb={8}>
        <Formik
          initialValues={value}
          validationSchema={formValidaton}
          onSubmit={(values) => {
            onHandleSubmit(values);
          }}
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
                      setFieldValue={setFieldValue}
                      setImgFile={setImgFile}
                      imgFile={imgFile}
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
                      loading={loading}
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
                      <H4>Update Ceo Message</H4>
                    </Box>

                    <Box width={1} mt={10} px={3} mb={8}>
                      <CKEditor name="content" height="42vh" />
                    </Box>

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
                          disabled={loading}
                          startIcon={<SaveIcon />}
                        >
                          Update
                        </Button>
                      </Box>
                      <Box mx={1}>
                        <Button
                          onClick={() => {
                            navigateTo(history, '/ceo-message');
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
      </WrapInCard>
    </WrapInBreadcrumbs>
  );
}

export default memo(AddCeoMessage);
