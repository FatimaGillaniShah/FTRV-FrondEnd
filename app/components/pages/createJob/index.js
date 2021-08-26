import React, { memo } from 'react';
import { Box, FormHelperText } from '@material-ui/core';
import { Input, DatePicker, Button } from 'components';
import ClearIcon from '@material-ui/icons/Clear';
import { Form, Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import TitleOutlinedIcon from '@material-ui/icons/TitleOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PropTypes from 'prop-types';
import ClassicEditor from '../../ckeditor5/build/ckeditor';
import WrapInCard from '../../layout/wrapInCard';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs';
import { H4 } from '../../typography';
import { jobSchema } from './jobSchema';
import Show from '../../show';
import DepartmentWithModal from '../../departmentWithModal';
import LocationWithModal from '../../locationWithModal';
import { CKEDITOR_CUSTOM_CONFIG } from '../../../utils/constants';

function CreateJob({ id, initialValues, onHandleSubmit, loading }) {
  const history = useHistory();

  return (
    <>
      <WrapInBreadcrumbs>
        <WrapInCard mb={8}>
          <Formik
            initialValues={initialValues}
            validationSchema={jobSchema}
            onSubmit={onHandleSubmit}
          >
            {({ setFieldValue, errors, touched, values }) => (
              <Form>
                <Box
                  flexWrap="wrap"
                  flexDirection="row"
                  p={[0, 0, 0, 4]}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box width={[1, 1, 1, '63%']}>
                    <Box width={1} pt={7} flexWrap="wrap" display="flex" px={2}>
                      <Box width={1} textAlign="center">
                        <H4>{id ? 'Update' : 'Create'} New Job</H4>
                      </Box>

                      <Box width={[1, 1 / 2]} mt={12} px={3}>
                        <Input
                          name="title"
                          OutlinedInputPlaceholder="Title*"
                          appendIcon
                          Icon={TitleOutlinedIcon}
                          IconClickable
                          variant="outlined"
                        />
                      </Box>

                      <Box width={[1, 1 / 2]} mt={12} px={3}>
                        <DepartmentWithModal
                          name="departmentId"
                          label="Department*"
                        />
                      </Box>
                      <Box width={[1, 1 / 2]} mt={8} px={3}>
                        <LocationWithModal
                          name="locationId"
                          label="Location*"
                        />
                      </Box>
                      <Box width={[1, 1 / 2]} mt={8} px={3}>
                        <DatePicker
                          disablePast
                          id="expiryDate"
                          name="expiryDate"
                          label="Due Date*"
                          helperText={null}
                        />
                      </Box>
                      <Box mt={7} width={1} px={3}>
                        <CKEditor
                          editor={ClassicEditor}
                          data={values.description}
                          config={CKEDITOR_CUSTOM_CONFIG}
                          onReady={(editor) => {
                            editor.editing.view.change((writer) => {
                              writer.setStyle(
                                'min-height',
                                '30vh',
                                editor.editing.view.document.getRoot()
                              );
                            });
                            editor.editing.view.change((writer) => {
                              writer.setStyle(
                                'color',
                                'black',
                                editor.editing.view.document.getRoot()
                              );
                            });
                          }}
                          onChange={(event, editor) => {
                            setFieldValue('description', editor.getData());
                          }}
                        />
                        <Show IF={errors.description && touched.description}>
                          <FormHelperText error>
                            {errors.description}
                          </FormHelperText>
                        </Show>
                      </Box>
                      <Box
                        display="flex"
                        flexWrap="wrap"
                        justifyContent="center"
                        width={1}
                        mt={10}
                        mb={7}
                      >
                        <Button
                          type="submit"
                          disabled={loading}
                          color="secondary"
                          variant="contained"
                          startIcon={<SaveIcon />}
                        >
                          {id ? 'Update' : 'Create'}
                        </Button>
                        <Box ml={2}>
                          <Button
                            onClick={() => history.goBack()}
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
    </>
  );
}

CreateJob.propTypes = {
  initialValues: PropTypes.shape({
    title: PropTypes.string,
    departmentId: PropTypes.string,
    locationId: PropTypes.string,
    expiryDate: PropTypes.object,
    description: PropTypes.string,
  }),
  id: PropTypes.number,
};
CreateJob.defaultProps = {
  initialValues: PropTypes.shape({
    title: '',
    departmentId: '',
    locationId: '',
    expiryDate: '',
    description: '',
  }),
};

export default memo(CreateJob);
