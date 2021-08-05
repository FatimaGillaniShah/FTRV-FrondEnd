import { Box, Button } from '@material-ui/core';
import React, { memo } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import { Form, Formik } from 'formik';
import { string, object } from 'yup';
import ClearIcon from '@material-ui/icons/Clear';
import PropTypes from 'prop-types';
import { TextArea, MuiFileInput } from 'components';
import { useHistory } from 'react-router';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs';
import WrapInCard from '../../layout/wrapInCard';
import { H5 } from '../../typography';

const applicantSchema = object().shape({
  file: string().required('*Resume is Required'),
  note: string()
    .notRequired()
    .noWhitespace()
    .typeError('* This field cannot contain only blankspaces'),
});

export function CreateApplicant({ initialValues, onHandleSubmit }) {
  const history = useHistory();

  return (
    <WrapInBreadcrumbs>
      <WrapInCard mb={8}>
        <Box ml={3}>
          <Box my={7}>
            <H5> Apply For Job</H5>
          </Box>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={applicantSchema}
            onSubmit={onHandleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <Box display="flex" flexDirection="column" pb={10}>
                  <Box width={[1, 1, 1 / 2, 1 / 3]} my={5}>
                    <MuiFileInput
                      name="file"
                      buttonText="Resume"
                      values={values}
                      setFieldValue={setFieldValue}
                    />
                  </Box>
                  <Box width={(1, 1 / 3)} my={5}>
                    <TextArea
                      name="note"
                      variant="outlined"
                      rows="5"
                      OutlinedInputPlaceholder="Notes"
                    />
                  </Box>
                </Box>
                <Box display="flex">
                  <Box mb={5}>
                    <Button
                      type="submit"
                      color="secondary"
                      variant="contained"
                      startIcon={<SaveIcon />}
                    >
                      Apply
                    </Button>
                  </Box>
                  <Box ml={2}>
                    <Button
                      startIcon={<ClearIcon />}
                      onClick={() => history.goBack()}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </WrapInCard>
    </WrapInBreadcrumbs>
  );
}

CreateApplicant.propTypes = {
  initialValues: PropTypes.shape({
    resume: PropTypes.string,
    note: PropTypes.string,
  }),
};
CreateApplicant.defaultProps = {
  initialValues: {
    resume: '',
    note: '',
  },
};

export default memo(CreateApplicant);
