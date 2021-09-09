import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import MUIRadio from '@material-ui/core/Radio';
import { useTheme } from '@material-ui/styles';
import { Box, FormControlLabel, FormHelperText } from '@material-ui/core';
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
  value,
  voted,
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
        value={voted && value ? value?.toString() : field.value}
        className={classes?.radioButtons}
      >
        {options?.map((option, index) => (
          <>
            {poll ? (
              <Box
                mr={3}
                mt={5}
                className={classes?.radioBorder}
                border={1.7}
                borderRadius={7}
                borderColor={theme.palette[colorArray[index]]?.main}
              >
                <FormControlLabel
                  disabled={disabled}
                  control={
                    <MUIRadio
                      className={classes?.radioLabel}
                      value={option?.value.toString()}
                    />
                  }
                  label={option.label}
                />
              </Box>
            ) : (
              <FormControlLabel
                disabled={disabled}
                control={
                  <MUIRadio
                    className={classes?.radioLabel}
                    value={option.value.toString()}
                  />
                }
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
