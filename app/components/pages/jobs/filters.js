import React from 'react';
import Box from '@material-ui/core/Box';
import { Form, Formik } from 'formik';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import { Input } from '../../index';
import LocationWithModal from '../../locationWithModal';
import DepartmentWithModal from '../../departmentWithModal';

function Filters({ initialValues, onHandleFilterSearch, onClear }) {
  const clearFilteringSearch = (resetForm) => {
    resetForm();
    onClear();
  };
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
              <Box width={[1, 1, 1 / 4]} my={[2, 4]}>
                <Input name="title" placeholderText="Title" />
              </Box>
              <Box width={[1, 1, 1 / 4]} my={[2, 4]}>
                <DepartmentWithModal
                  name="departmentId"
                  label="Department"
                  variant="standard"
                  modal={false}
                />
              </Box>

              <Box width={[1, 1, 1 / 4]} my={[2, 4]}>
                <LocationWithModal
                  name="locationId"
                  label="Location"
                  variant="standard"
                  modal={false}
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
