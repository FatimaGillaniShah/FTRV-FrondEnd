import React, { memo } from 'react';
import { Formik, Form } from 'formik';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { string, object } from 'yup';
import ClearIcon from '@material-ui/icons/Clear';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PropTypes from 'prop-types';
import { Tooltip } from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import { Input, WrapInCard, TextArea } from '../../index';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs';
import { BodyTextLarge, H4, ButtonText } from '../../typography';
import DepartmentWithModel from '../../departmentWithModel';

const fileStorageSchema = object().shape({
  departmentId: string().required('*Required'),
  file: string().required('*Required'),
  fileName: string()
    .required('*Required')
    .noWhitespace()
    .typeError('* This field cannot contain only blankspaces'),
  description: string()
    .noWhitespace()
    .typeError('* This field cannot contain only blankspaces'),
});

export function CreateDocumentPage({
  initialValues,
  id,
  options,
  initialDialogData,
}) {
  return (
    <WrapInBreadcrumbs>
      <WrapInCard>
        <Formik
          initialValues={initialValues}
          validationSchema={fileStorageSchema}
        >
          {({ values }) => (
            <Form>
              <Box display="flex" ml={5}>
                <Box pt={15} width={[1, 1, '65%']}>
                  <Box display="flex">
                    <H4>{id ? 'Update' : 'Submit'} New Document</H4>
                  </Box>

                  <Box width={(1, 1 / 2)} mt={10}>
                    <DepartmentWithModel
                      name="departmentId"
                      label="Department"
                      //  selectedValue={values.departmentId}
                      options={options}
                      initialDialogData={initialDialogData}
                    />
                  </Box>
                  <Box
                    width={[1, 1 / 2]}
                    mt={10}
                    display="flex"
                    flexDirection="row"
                  >
                    <input type="file" hidden />
                    <Input
                      name="file"
                      variant="outlined"
                      prependIcon
                      Icon={() => (
                        <>
                          <Tooltip title="Select Document">
                            <Button
                              color="secondary"
                              variant="contained"
                              startIcon={<Add fontSize="small" />}
                            >
                              <ButtonText>Upload Document</ButtonText>
                            </Button>
                          </Tooltip>
                          <Box mx={4} display="flex" alignItems="center">
                            <BodyTextLarge
                              fontWeight="fontWeightMedium"
                              color="grey"
                            >
                              No file chosen
                            </BodyTextLarge>
                          </Box>
                        </>
                      )}
                    />
                  </Box>
                  <Box width={[1, 1 / 2]} mt={10}>
                    <Input
                      OutlinedInputPlaceholder="File Name"
                      name="fileName"
                      variant="outlined"
                      Icon={AttachFileOutlinedIcon}
                      appendIcon
                    />
                  </Box>
                  <Box width={[1, 1 / 2]} mt={10}>
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
                      <Button startIcon={<ClearIcon />}>Cancel</Button>
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
  options: PropTypes.array,
  initialDialogData: PropTypes.object,
};

export default memo(CreateDocumentPage);
