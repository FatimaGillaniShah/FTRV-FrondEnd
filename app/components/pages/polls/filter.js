import React from 'react';
import Box from '@material-ui/core/Box';
import { Form, Formik } from 'formik';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import { Input, Select } from '../../index';

function Filters({ initialValues, onHandleFilterSearch, onClear }) {
  const clearFilteringSearch = (resetForm) => {
    resetForm();
    onClear();
  };
  const options = ['active', 'inactive', 'pending', 'expired'];
  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onHandleFilterSearch}>
        {({ resetForm }) => (
          <Form>
            <Box
              display="flex"
              justifyContent="space-between"
              flexDirection={['column', 'column', 'row']}
            >
              <Box width={[1, 1, 1 / 2.3]} my={[2, 4]}>
                <Input name="name" placeholderText="Name" />
              </Box>
              <Box width={[1, 1, 1 / 2.3]} my={[2, 4]}>
                <Select
                  name="status"
                  label="Status"
                  options={options}
                  variant="standard"
                />
              </Box>
            </Box>
            <Box display="flex" my={8} flexDirection={['column', 'row']}>
              <Box mr={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<SearchIcon />}
                  type="submit"
                >
                  Search
                </Button>
              </Box>
              <Box mr={2} mt={[2, 0]}>
                <Button
                  variant="text"
                  onClick={() => clearFilteringSearch(resetForm)}
                  startIcon={<ClearIcon />}
                >
                  Clear Filter
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default Filters;
