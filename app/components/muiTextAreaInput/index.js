import React, { memo } from 'react';
import FormControl from '@material-ui/core/FormControl';
import { FormHelperText, TextareaAutosize } from '@material-ui/core';
import { useField } from 'formik';

function InputField({ ...props }) {
  const [field, meta] = useField(props);
  return (
    <FormControl style={{ width: '50%' }} error={meta.touched && meta.error}>
      <TextareaAutosize rowsMin={8} {...field} {...props} />

      {meta.touched && meta.error ? (
        <FormHelperText error>{meta.error}</FormHelperText>
      ) : null}
    </FormControl>
  );
}

export default memo(InputField);
