import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import SearchIcon from '@material-ui/icons/Search';
import { FormControlLabel, Grid, Typography } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import { Formik } from 'formik';
import { Input } from '../../index';

export function Search({
  onHandleSwitchChange,
  checked,
  onHandleSearch,
  query: { value },
}) {
  return (
    <>
      <Grid item xs={2} pl={0}>
        <Typography color="secondary" variant="h5" fontSize={30}>
          Directory
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Formik initialValues={{ query: '' }}>
          <Input
            name="query"
            variant="outlined"
            prependIcon
            Icon={SearchIcon}
            OutlinedInputPlaceholder="Type here to search"
            margin="dense"
            IconClickable={false}
            onChange={onHandleSearch}
            disabled={checked && true}
            value={value}
          />
        </Formik>
      </Grid>
      <Grid item xs={2}>
        <Box px={5}>
          <FormControlLabel
            label="Filter"
            control={
              <Switch
                checked={checked}
                onChange={onHandleSwitchChange}
                name="filter"
                color="primary"
              />
            }
          />
        </Box>
      </Grid>
    </>
  );
}

export default memo(Search);
