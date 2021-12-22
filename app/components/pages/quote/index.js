import { Box } from '@material-ui/core';
import { TextArea, Button } from 'components';
import { Form, Formik } from 'formik';
import React, { memo } from 'react';
import { string, object } from 'yup';
import Show from '../../show';
import { H5, BodyTextLarge } from '../../typography';

function Quote({ value, handleSubmit, loading, isWriteAllowed }) {
  const initialValues = {
    quote: value,
  };
  const quoteSchema = object().shape({
    quote: string()
      .required()
      .noWhitespace()
      .typeError('* This field cannot contain only blankspaces'),
  });

  return (
    <>
      <H5>Quote</H5>
      <Formik
        initialValues={initialValues}
        validationSchema={quoteSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        <Form>
          <Box mt={4} width={[1, 1 / 1.3, 1 / 2]}>
            <Show IF={isWriteAllowed}>
              <TextArea name="quote" variant="outlined" />
            </Show>
            <Show IF={!isWriteAllowed}>
              <BodyTextLarge fontWeight="fontWeightLight" color="grey">
                {initialValues.quote}
              </BodyTextLarge>
            </Show>
          </Box>
          <Show IF={isWriteAllowed}>
            <Box
              mt={4}
              width={[1, 1 / 1.3, 1 / 2]}
              display="flex"
              justifyContent="flex-end"
            >
              <Button
                color="secondary"
                variant="contained"
                disabled={loading}
                type="submit"
              >
                Publish
              </Button>
            </Box>
          </Show>
        </Form>
      </Formik>
    </>
  );
}

export default memo(Quote);
