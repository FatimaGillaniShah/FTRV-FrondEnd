import React, { memo, useState } from 'react';
import { FormControl, Radio } from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

const Priority = () => {
  const [value, setValue] = useState('high');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <FormControl>
      <FormLabel component="legend">Priority</FormLabel>
      <RadioGroup row value={value} onChange={handleChange}>
        <FormControlLabel value="high" control={<Radio />} label="High" />
        <FormControlLabel value="medium" control={<Radio />} label="Medium" />
        <FormControlLabel value="low" control={<Radio />} label="Low" />
      </RadioGroup>
    </FormControl>
  );
};

export default memo(Priority);
