/* eslint-disable prettier/prettier */
/**
 *
 * Directory
 *
 */

import React from 'react';
import Box from '@material-ui/core/Box';
import { Divider } from '@material-ui/core';
import { Formik } from 'formik';
import InputField from '../../InputField/Index';
import CustomButton from '../../CustomButton/Index';
import { useStyles } from './styles';
import SelectInput from '../../SelectInput/Index';

function Filters() {
  const classes = useStyles();
  return (
    <>
      <Formik>
        <>
          <Box className={classes.flex}>
            <Box pr={4} width={1}>
              <InputField name="name" placeholderText="Name" />
            </Box>
            <Box px={4} width={1}>
              <SelectInput
                name="departments"
                label="Departments"
                options={['abc1', 'abfdsadfsafsdc']}
              />
            </Box>
            <Box px={4} width={1}>
              <SelectInput
                name="designation"
                label="Designation"
                options={['abc1', 'abfdsadfsafsdc']}
              />
            </Box>
            <Box pl={4} width={1}>
              <InputField name="extension" placeholderText="Extension" />
            </Box>
          </Box>
          <Box className={classes.flex} my={5}>
            <Box mr={2}>
              <CustomButton color="secondary" fullWidth={false}>
                Clear Filter
              </CustomButton>
            </Box>
            <Box mr={2}>
              <CustomButton fullWidth={false}>Search</CustomButton>
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
