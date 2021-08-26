import React, { memo } from 'react';
import { Formik, Form } from 'formik';
import Box from '@material-ui/core/Box';
import ClearIcon from '@material-ui/icons/Clear';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Input, WrapInCard, TextArea, MuiFileInput, Button } from '../../index';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs';
import { H5 } from '../../typography';
import DepartmentWithModel from '../../departmentWithModal';
import { validationSchema } from './validationSchema';
import { navigateTo } from '../../../utils/helper';

export function CreateDocumentPage({
  initialValues,
  id,
  onHandleSubmit,
  loading,
}) {
  const history = useHistory();

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
          {({ values, setFieldValue }) => (
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
                        <MuiFileInput
                          name="file"
                          buttonText="Document"
                          values={values}
                          setFieldValue={setFieldValue}
                          loading={loading}
                        />
                      </Box>
                      <Box width={[1, 1 / 2]} mt={16} px={3}>
                        <DepartmentWithModel
                          name="departmentId"
                          label="Department"
                          model
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
                          disabled={loading}
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
