import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import MUIRadio from '@material-ui/core/Radio';
import { FormControlLabel, FormHelperText } from '@material-ui/core';
import Show from '../show';

const FormikRadioGroup = ({
  field,
  form: { touched, errors },
  name,
  fieldError,
  options,
  ...props
}) => {
  const fieldName = name || field.name;

  return (
    <>
      <RadioGroup row {...field} {...props} name={fieldName}>
        {options.map((option) => (
          <FormControlLabel
            control={<MUIRadio value={option.value} />}
            label={option.label}
          />
        ))}
      </RadioGroup>
      <Show IF={fieldError}>
        <FormHelperText error>
          {touched[fieldName] && errors[fieldName] && <>{errors[fieldName]}</>}
        </FormHelperText>
      </Show>
    </>
  );
};
FormikRadioGroup.defaultProps = {
  fieldError: true,
};

export default FormikRadioGroup;
