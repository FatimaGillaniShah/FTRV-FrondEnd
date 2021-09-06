import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import MUIRadio from '@material-ui/core/Radio';
import {
  Box,
  Button,
  FormControlLabel,
  FormHelperText,
} from '@material-ui/core';
import Show from '../show';

const FormikRadioGroup = ({
  field,
  form: { touched, errors },
  name,
  fieldError,
  options,
  disabled,
  classes,
  ...props
}) => {
  const fieldName = name || field.name;

  return (
    <>
      <RadioGroup row {...field} {...props} name={fieldName}>
        {options?.map((option) => (
          <Box
            mr={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              classesName={classes.button}
              variant="outlined"
              color="primary"
            >
              <FormControlLabel
                disabled={disabled}
                control={<MUIRadio value={option.value.toString()} />}
                label={option.label}
              />
            </Button>
          </Box>
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
  disabled: false,
};

export default FormikRadioGroup;
