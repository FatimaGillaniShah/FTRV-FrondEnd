import { Box } from '@material-ui/core';
import React, { memo } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import { Form, Formik } from 'formik';
import { object, number, array } from 'yup';
import ClearIcon from '@material-ui/icons/Clear';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';
import WrapInCard from '../../components/layout/wrapInCard';
import { AutoComplete, Button } from '../../components/index';
import { H5 } from '../../components/typography';
import DepartmentWithModal from '../../components/departmentWithModal';
import LocationWithModal from '../../components/locationWithModal';

const bulkEditSchema = object().shape(
  {
    groupId: array().when(['departmentId', 'locationId'], {
      is: (departmentId, locationId) => !departmentId && !locationId,
      then: array().required('*Groups Required'),
    }),
    departmentId: number().when(['groupId', 'locationId'], {
      is: (locationId, groupId) => !locationId && !groupId,
      then: number().required('*Department Required'),
    }),
    locationId: number().when(['departmentId', 'groupId'], {
      is: (departmentId, groupId) => !departmentId && !groupId,
      then: number().required('*Location Required'),
    }),
  },
  [
    ['groupId', 'departmentId'],
    ['groupId', 'locationId'],
    ['departmentId', 'locationId'],
  ]
);

export function BulkEdit({
  loading,
  groups,
  initialValues,
  onHandleSubmit,
  isGroupLoading,
}) {
  const history = useHistory();

  return (
    <WrapInBreadcrumbs>
      <WrapInCard mb={8}>
        <Box ml={3}>
          <Box my={7}>
            <H5> Bulk Edit </H5>
          </Box>
          <Formik
            initialValues={initialValues}
            validationSchema={bulkEditSchema}
            onSubmit={onHandleSubmit}
          >
            {({ setFieldValue }) => (
              <Form>
                <Box>
                  <Box display="flex" flexDirection="column" pb={10}>
                    <Box width={[1, 1 / 3]} mt={5}>
                      <AutoComplete
                        name="groupId"
                        options={groups || []}
                        setFieldValue={setFieldValue}
                        loading={!isGroupLoading}
                        label="Groups"
                        placeholder="Select Groups"
                      />
                    </Box>
                    <Box width={[1, 1 / 3]} mt={12}>
                      <DepartmentWithModal
                        name="departmentId"
                        label="Department*"
                      />
                    </Box>
                    <Box width={[1, 1 / 3]} mt={5}>
                      <LocationWithModal name="locationId" label="Location*" />
                    </Box>
                  </Box>
                  <Box display="flex">
                    <Box mb={5}>
                      <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                        disabled={loading}
                        startIcon={<SaveIcon />}
                      >
                        Update
                      </Button>
                    </Box>
                    <Box ml={2}>
                      <Button
                        variant="text"
                        startIcon={<ClearIcon />}
                        onClick={() => history.goBack()}
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

export default memo(BulkEdit);

BulkEdit.propTypes = {
  initialValues: PropTypes.object,
  groups: PropTypes.array,
  loading: PropTypes.bool,
};
