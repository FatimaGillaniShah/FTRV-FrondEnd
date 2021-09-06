import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import MUIRadio from '@material-ui/core/Radio';
import { useTheme } from '@material-ui/styles';
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
  colorArray,
  poll,
  ...props
}) => {
  const fieldName = name || field.name;
  const theme = useTheme();

  return (
    <>
      <RadioGroup
        row
        {...field}
        {...props}
        name={fieldName}
        className={classes?.radioButtons}
      >
        {options?.map((option, index) => (
          <>
            {poll ? (
              <Box mr={3} mt={5}>
                <Button
                  disabled={disabled}
                  variant="outlined"
                  style={{
                    borderColor: theme.palette[colorArray[index]]?.main,
                  }}
                >
                  <FormControlLabel
                    disabled={disabled}
                    control={<MUIRadio value={option.value.toString()} />}
                    label={option.label}
                  />
                </Button>
              </Box>
            ) : (
              <FormControlLabel
                disabled={disabled}
                control={<MUIRadio value={option.value.toString()} />}
                label={option.label}
              />
            )}
          </>
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
  poll: false,
};

export default FormikRadioGroup;
