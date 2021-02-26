/**
 *
 * Search
 *
 */

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
  query,
}) {
  return (
    <>
      <Grid item xs={3} pl={0}>
        <Typography align="left" color="primary" variant="h5" fontWeight={800}>
          Directory
        </Typography>
      </Grid>
      <Grid item xs={6}>
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
            value={query}
          />
        </Formik>
      </Grid>
      <Grid item xs={3}>
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
