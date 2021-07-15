import React, { memo, useRef } from 'react';
import { Formik, Form } from 'formik';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PropTypes from 'prop-types';
import { FormHelperText, Tooltip } from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import { Input, WrapInCard, TextArea } from '../../index';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs';
import { BodyTextLarge, H5, ButtonText } from '../../typography';
import DepartmentWithModel from '../../departmentWithModal';
import { useStyles } from './style';
import { validationSchema } from './validationSchema';
import { colors } from '../../../theme/colors';
import { navigateTo } from '../../../utils/helper';

export function CreateDocumentPage({ initialValues, id, onHandleSubmit }) {
  const history = useHistory();
  const documentFile = useRef(null);
  const classes = useStyles();
  const handleUploadDocument = () => {
    documentFile.current.click();
  };
  const handleCaptureDocument = (files = [], setFieldValue) => {
    if (files.length) {
      setFieldValue('file', files[0]);
    }
  };
  const getName = (url) => {
    const urlArray = url?.split('/');
    return url ? urlArray[urlArray?.length - 1] : '';
  };
  const documentToolTip = ({ file, url }) => {
    const toolTipTitle = file?.name || getName(url) || '`Select Document';
    return toolTipTitle;
  };
  const handleFileName = ({ url, file }) =>
    file?.name || getName(url) || 'No file chosen';
  const handleCancel = () => {
    navigateTo(history, '/documents');
  };
  return (
    <WrapInBreadcrumbs>
      <WrapInCard>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onHandleSubmit}
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form>
              <Box
                flexWrap="wrap"
                flexDirection="row"
                p={4}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Box width={[1, '70%']}>
                  <Box width={1} pt={5} flexWrap="wrap" display="flex" px={2}>
                    <Box width={1} pt={5} flexWrap="wrap" display="flex" px={2}>
                      <Box width={[1, '94%']} mt={10} px={3}>
                        <Box width={1} textAlign="center">
                          <H5>{id ? 'Update' : 'Create New'} Document</H5>
                        </Box>
                      </Box>

                      <Box width={[1, 1 / 2]} mt={16} px={3}>
                        <Input
                          OutlinedInputPlaceholder="File Name"
                          name="name"
                          variant="outlined"
                          Icon={AttachFileOutlinedIcon}
                          appendIcon
                        />
                      </Box>
                      <Box width={[1, 1 / 2]} mt={16} px={3}>
                        <input
                          type="file"
                          ref={documentFile}
                          onChange={({ target }) =>
                            handleCaptureDocument(target.files, setFieldValue)
                          }
                          hidden
                        />
                        <Tooltip title={documentToolTip(values)}>
                          <Box
                            display="flex"
                            alignItems="center"
                            flexDirection={['column', 'row']}
                            className={classes.documentUpload}
                            onClick={handleUploadDocument}
                            border={`1px solid ${
                              errors.file && touched.file
                                ? colors.red
                                : colors.silver
                            }`}
                            px={3}
                            py={2.2}
                          >
                            <Button
                              color="secondary"
                              variant="contained"
                              startIcon={<Add fontSize="small" />}
                            >
                              <ButtonText>Upload Document</ButtonText>
                            </Button>

                            <Box mx={4} width={[1, '30%', '45%']}>
                              <BodyTextLarge
                                fontWeight="fontWeightMedium"
                                color="grey"
                                className={classes.fileName}
                              >
                                {handleFileName(values)}
                              </BodyTextLarge>
                            </Box>
                          </Box>
                        </Tooltip>
                        {errors.file && touched.file ? (
                          <FormHelperText error>{errors.file}</FormHelperText>
                        ) : null}
                      </Box>
                      <Box width={[1, 1 / 2]} mt={16} px={3}>
                        <DepartmentWithModel
                          name="departmentId"
                          label="Department"
                        />
                      </Box>

                      <Box width={[1, 1 / 2]} mt={16} px={3}>
                        <TextArea name="description" />
                      </Box>
                    </Box>
                    <Box
                      display="flex"
                      flexWrap="wrap"
                      justifyContent="center"
                      width={1}
                      mt={10}
                    >
                      <Box mb={7}>
                        <Button
                          type="submit"
                          color="secondary"
                          variant="contained"
                          startIcon={<SaveIcon />}
                        >
                          {id ? 'Update' : 'Create'}
                        </Button>
                      </Box>
                      <Box mx={1}>
                        <Button
                          variant="text"
                          startIcon={<ClearIcon />}
                          onClick={handleCancel}
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
CreateDocumentPage.propTypes = {
  initialValues: PropTypes.object,
  id: PropTypes.number,
};

export default memo(CreateDocumentPage);
