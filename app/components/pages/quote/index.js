import { Box, Button } from '@material-ui/core';
import { TextField } from 'components';
import { Form, Formik } from 'formik';
import React, { memo } from 'react';
import { quoteSchema } from '../../../containers/qoute/schema';
import { H5 } from '../../typography';

const initialValues = {
  quote: '',
};

function Quote() {
  return (
    <>
      <H5>Quote</H5>

      <Formik
        initialValues={initialValues}
        onSubmit={() => {}}
        validationSchema={quoteSchema}
      >
        <Form>
          <Box mt={4}>
            <TextField name="quote" variant="outlined" />
          </Box>
          <Box mt={4} width={1 / 2} display="flex" justifyContent="flex-end">
            <Button color="secondary" variant="contained" type="submit">
              Publish
            </Button>
          </Box>
        </Form>
      </Formik>
    </>
  );
}

export default memo(Quote);
