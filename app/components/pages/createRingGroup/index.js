import { Box, Tooltip } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import React, { memo } from 'react';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import { string, object } from 'yup';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { H5 } from '../../typography';
import DepartmentWithModal from '../../departmentWithModal';
import LocationWithModal from '../../locationWithModal';
import { Input, WrapInCard, Button } from '../../index';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs';

const ringGroupSchema = object().shape({
  name: string()
    .required('*Name Required')
    .noWhitespace()
    .typeError('* This field cannot contain only blankspaces'),
  extension: string()
    .required('*Extension Required')
    .matches(/^[0-9]*$/, '* Only number are allowed')
    .max(10, 'Too Long!'),
  departmentId: string().required('*Department Required'),
  locationId: string().required('*Location Required'),
});
function CreateRingGroup({ id, initialValues, onHandleSubmit, loading }) {
  const history = useHistory();

  return (
    <WrapInBreadcrumbs>
      <WrapInCard>
        <Formik
          initialValues={initialValues}
          onSubmit={onHandleSubmit}
          validationSchema={ringGroupSchema}
        >
          {() => (
            <Form>
              <Box
                flexWrap="wrap"
                flexDirection="row"
                p={4}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Box width={[1, '70%']}>
                  <Box width={1} pt={5} flexWrap="wrap" display="flex" px={2}>
                    <Box width={[1, '94%']} mt={12} px={3}>
                      <Box width={1} textAlign="center">
                        <H5> {id ? 'Update' : 'Create'} Ring Group </H5>
                      </Box>
                    </Box>

                    <Box width={[1, 1 / 2]} mt={12} px={3}>
                      <Input
                        name="name"
                        variant="outlined"
                        OutlinedInputPlaceholder="*Name"
                        Icon={PersonOutlineIcon}
                        appendIcon
                      />
                    </Box>
                    <Box width={[1, 1 / 2]} mt={12} px={3}>
                      <DepartmentWithModal
                        name="departmentId"
                        label="Department"
                      />
                    </Box>
                    <Box width={[1, 1 / 2]} mt={12} px={3}>
                      <LocationWithModal name="locationId" label="Location" />
                    </Box>
                    <Box width={[1, 1 / 2]} mt={12} px={3}>
                      <Tooltip title="Input your phone extenstion">
                        <Input
                          name="extension"
                          variant="outlined"
                          OutlinedInputPlaceholder="Phone Extension"
                          Icon={ContactPhoneIcon}
                          appendIcon
                        />
                      </Tooltip>
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    flexWrap="wrap"
                    justifyContent="center"
                    width={1}
                    mt={10}
                  >
                    <Box mb={7}>
                      <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        disabled={loading}
                        startIcon={<NotificationImportantIcon />}
                      >
                        {id ? 'Update' : 'Create'}
                      </Button>
                    </Box>
                    <Box mx={1}>
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
              </Box>
            </Form>
          )}
        </Formik>
      </WrapInCard>
    </WrapInBreadcrumbs>
  );
}

export default memo(CreateRingGroup);

CreateRingGroup.propTypes = {
  id: PropTypes.number,
  initialValues: PropTypes.object,
};
