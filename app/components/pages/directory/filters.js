/**
 *
 * directory
 *
 */

import React from 'react';
import Box from '@material-ui/core/Box';
import { Divider } from '@material-ui/core';
import { Formik } from 'formik';
import Button from '@material-ui/core/Button';
import { useStyles } from './styles';
import { Input, Select } from '../../index';

function Filters() {
  const classes = useStyles();
  return (
    <>
      <Formik>
        <>
          <Box className={classes.flex}>
            <Box pr={4} width={1}>
              <Input name="name" placeholderText="Name" />
            </Box>
            <Box px={4} width={1}>
              <Select
                name="departments"
                label="Departments"
                options={['abc1', 'abfdsadfsafsdc']}
              />
            </Box>
            <Box px={4} width={1}>
              <Select
                name="designation"
                label="Designation"
                options={['abc1', 'abfdsadfsafsdc']}
              />
            </Box>
            <Box pl={4} width={1}>
              <Input name="extension" placeholderText="Extension" />
            </Box>
          </Box>
          <Box className={classes.flex} my={5}>
            <Box mr={2}>
              <Button variant="contained" color="secondary" fullWidth={false}>
                Clear Filter
              </Button>
            </Box>
            <Box mr={2}>
              <Button variant="contained" color="secondary" fullWidth={false}>
                Search
              </Button>
            </Box>
          </Box>
          <Box mt={5} width={1} p={0} mx={0}>
            <Divider variant="middle" />
          </Box>
        </>
      </Formik>
    </>
  );
}

export default Filters;
