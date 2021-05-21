import React from 'react';
import Box from '@material-ui/core/Box';
import { Form, Formik } from 'formik';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import { Input } from '../../index';

function Filters({ onHandleFilterSearch, onClear }) {
  const clearFilteringSearch = (resetForm) => {
    resetForm();
    onClear();
  };
  return (
    <>
      <Formik
        initialValues={{
          name: '',
          department: '',
          title: '',
          extension: '',
          location: '',
        }}
        onSubmit={(values) => {
          onHandleFilterSearch(values);
        }}
      >
        {({ resetForm }) => (
          <Form>
            <Box
              display="flex"
              justifyContent="space-between"
              flexDirection={['column', 'column', 'row']}
            >
              <Box width={[1, 1, 1 / 6]} mb={5} mt={[1, 2, 5]}>
                <Input
                  name="name"
                  OutlinedInputPlaceholder="Name"
                  variant="outlined"
                />
              </Box>
              <Box width={[1, 1, 1 / 6]} my={5}>
                <Input
                  name="department"
                  OutlinedInputPlaceholder="Department"
                  variant="outlined"
                />
              </Box>
              <Box width={[1, 1, 1 / 6]} my={5}>
                <Input
                  name="title"
                  OutlinedInputPlaceholder="Designation"
                  variant="outlined"
                />
              </Box>
              <Box width={[1, 1, 1 / 6]} my={5}>
                <Input
                  name="location"
                  OutlinedInputPlaceholder="Location"
                  variant="outlined"
                />
              </Box>
              <Box width={[1, 1, 1 / 6]} my={5}>
                <Input
                  name="extension"
                  OutlinedInputPlaceholder="Extension"
                  variant="outlined"
                />
              </Box>
            </Box>
            <Box display="flex" my={12} flexDirection={['column', 'row']}>
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
              <Box mr={2} mt={[2, 0]}>
                <Button
                  variant="text"
                  fullWidth={false}
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
