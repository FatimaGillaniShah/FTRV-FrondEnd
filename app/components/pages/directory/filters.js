/**
 *
 * directory
 *
 */

import React from 'react';
import Box from '@material-ui/core/Box';
import { Divider } from '@material-ui/core';
import { Form, Formik } from 'formik';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import { useStyles } from './styles';
import { Input } from '../../index';

function Filters({ onHandleFilterSearch }) {
  const classes = useStyles();
  return (
    <>
      <Formik
        initialValues={{
          name: '',
          departments: '',
          designation: '',
          extension: '',
        }}
        onSubmit={(values) => {
          onHandleFilterSearch(values);
        }}
      >
        {({ resetForm }) => (
          <Form>
            <Box className={classes.flex}>
              <Box pr={4} width={1}>
                <Input name="name" placeholderText="Name" />
              </Box>
              <Box px={4} width={1}>
                <Input name="departments" placeholderText="Departments" />
              </Box>
              <Box px={4} width={1}>
                <Input name="designation" placeholderText="Designation" />
              </Box>
              <Box pl={4} width={1}>
                <Input name="extension" placeholderText="Extension" />
              </Box>
            </Box>
            <Box className={classes.flex} my={5}>
              <Box mr={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth={false}
                  startIcon={<SearchIcon />}
                  type="submit"
                >
                  Search
                </Button>
              </Box>
              <Box mr={2}>
                <Button
                  variant="text"
                  fullWidth={false}
                  onClick={resetForm}
                  startIcon={<ClearIcon />}
                >
                  Clear Filter
                </Button>
              </Box>
            </Box>
            <Box mt={5} width={1} p={0} mx={0}>
              <Divider variant="middle" />
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default Filters;
