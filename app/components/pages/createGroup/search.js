import React, { memo } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { Input } from '../../index';

export function Search({ initialValues, onHandleSearch }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };
  return (
    <Grid container>
      <Grid item xs={12} sm={4} lg={4}>
        <Formik initialValues={initialValues}>
          {({ handleChange, setFieldValue }) => (
            <Form>
              <Input
                name="searchString"
                variant="outlined"
                prependIcon
                Icon={SearchIcon}
                OutlinedInputPlaceholder="Type here to search"
                margin="dense"
                IconClickable={false}
                onChange={(e) => {
                  onHandleSearch(e, setFieldValue);
                  handleChange(e);
                }}
                showInputLabel={false}
                onKeyPress={handleKeyPress}
              />
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
}

export default memo(Search);
