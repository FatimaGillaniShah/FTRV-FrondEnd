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
import { BodyTextLarge, H4, ButtonText } from '../../typography';
import DepartmentWithModel from '../../departmentWithModal';
import { useStyles } from './style';
import { validationSchema } from './validationSchema';
import { colors } from '../../../theme/colors';
import { navigateTo } from '../../../utils/helper';

export function CreateDocumentPage({ initialValues, id, onHandleSubmit }) {
  const documentFile = useRef(null);
  const classes = useStyles();
  const history = useHistory();
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
              <Box display="flex" ml={5}>
                <Box pt={15} width={[1, '65%', '50%', '33.9%']}>
                  <Box display="flex">
                    <H4>{id ? 'Update' : 'Create New'} Document</H4>
                  </Box>
                  <Box mt={10}>
                    <DepartmentWithModel
                      name="departmentId"
                      label="Department"
                    />
                  </Box>
                  <Box mt={8}>
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
                        px={4}
                        py={3}
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
                  <Box mt={10}>
                    <Input
                      OutlinedInputPlaceholder="File Name"
                      name="name"
                      variant="outlined"
                      Icon={AttachFileOutlinedIcon}
                      appendIcon
                    />
                  </Box>
                  <Box mt={10}>
                    <TextArea name="description" />
                  </Box>
                  <Box my={15} display="flex" flexWrap="wrap">
                    <Box my={[2, 0]}>
                      <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        startIcon={<SaveIcon />}
                      >
                        {id ? 'Update' : 'Submit'}
                      </Button>
                    </Box>
                    <Box
                      ml={2}
                      my={[2, 0]}
                      display="flex"
                      justifyContent={['center', 'center', 'left']}
                    >
                      <Button onClick={handleCancel} startIcon={<ClearIcon />}>
                        Cancel
                      </Button>
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
