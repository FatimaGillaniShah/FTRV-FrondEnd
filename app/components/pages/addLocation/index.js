import { Box, Button } from '@material-ui/core';
import React, { memo } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import { Form, Formik } from 'formik';
import ClearIcon from '@material-ui/icons/Clear';
import PropTypes from 'prop-types';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs/index';
import WrapInCard from '../../layout/wrapInCard';
import { Select } from '../../index';
import { H5 } from '../../typography';

export function AddLocationPage({ id, initialValues, options }) {
  return (
    <WrapInBreadcrumbs>
      <WrapInCard mb={8}>
        <Box ml={3}>
          <Box my={7}>
            <H5> {id ? 'Update' : 'Create'} Location </H5>
          </Box>
          <Formik enableReinitialize initialValues={initialValues}>
            {({ values }) => (
              <Form>
                <Box>
                  <Box display="flex" flexDirection="column" pb={10}>
                    <Box width={[1, 1 / 3]} mt={5}>
                      <Select
                        name="locationId"
                        label="Location"
                        selectedValue={values.locationId}
                        options={options}
                      />
                    </Box>
                  </Box>
                  <Box display="flex">
                    <Box mb={5}>
                      <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                        fullWidth={false}
                        startIcon={<SaveIcon />}
                      >
                        {id ? 'Update' : 'Create'}
                      </Button>
                    </Box>
                    <Box ml={2}>
                      <Button
                        variant="text"
                        fullWidth={false}
                        startIcon={<ClearIcon />}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </WrapInCard>
    </WrapInBreadcrumbs>
  );
}

export default memo(AddLocationPage);

AddLocationPage.propTypes = {
  initialValues: PropTypes.object,
};
AddLocationPage.defaultProps = {
  initialValues: { locationId: '' },
};
