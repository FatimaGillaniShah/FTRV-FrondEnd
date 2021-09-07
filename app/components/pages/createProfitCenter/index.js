import React, { memo } from 'react';
import { Box } from '@material-ui/core';
import { Input, Button } from 'components';
import ClearIcon from '@material-ui/icons/Clear';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import { Form, Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import SaveIcon from '@material-ui/icons/Save';
import DialpadOutlinedIcon from '@material-ui/icons/DialpadOutlined';
import PropTypes from 'prop-types';
import AccountBalanceOutlinedIcon from '@material-ui/icons/AccountBalanceOutlined';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import WrapInCard from '../../layout/wrapInCard';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs';
import { H4 } from '../../typography';
import { profitCenterSchema } from './profitCenterSchema';
import LocationWithModal from '../../locationWithModal';

function CreateProfitCenter({ id, initialValues, loading }) {
  const history = useHistory();

  return (
    <>
      <WrapInBreadcrumbs>
        <WrapInCard mb={8}>
          <Formik
            initialValues={initialValues}
            validationSchema={profitCenterSchema}
          >
            {() => (
              <Form>
                <Box
                  flexWrap="wrap"
                  flexDirection="row"
                  p={[0, 0, 0, 4]}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box width={[1, 1, 1, '63%']}>
                    <Box width={1} pt={7} flexWrap="wrap" display="flex" px={2}>
                      <Box width={1} textAlign="center">
                        <H4>{id ? 'Update' : 'Create'} New Profit Center</H4>
                      </Box>
                      <Box width={[1, 1 / 2]} mt={12} px={3}>
                        <Input
                          name="locationName"
                          OutlinedInputPlaceholder="Location Name*"
                          appendIcon
                          Icon={LocationOnOutlinedIcon}
                          IconClickable
                          variant="outlined"
                        />
                      </Box>
                      <Box width={[1, 1 / 2]} mt={12} px={3}>
                        <LocationWithModal
                          name="locationId"
                          label="Location*"
                        />
                      </Box>
                      <Box width={[1, 1 / 2]} mt={6} px={3}>
                        <Input
                          name="profitCenterNumber"
                          OutlinedInputPlaceholder="*Profit Center Number"
                          appendIcon
                          Icon={DialpadOutlinedIcon}
                          IconClickable
                          variant="outlined"
                        />
                      </Box>
                      <Box width={[1, 1 / 2]} mt={6} px={3}>
                        <Input
                          name="profitCenterName"
                          OutlinedInputPlaceholder="*Profit Center Name"
                          appendIcon
                          Icon={AccountBalanceOutlinedIcon}
                          IconClickable
                          variant="outlined"
                        />
                      </Box>

                      <Box width={[1, 1 / 2]} mt={14} px={3}>
                        <Input
                          name="faxNumber"
                          OutlinedInputPlaceholder="*Dealership Fax Number"
                          appendIcon
                          Icon={ContactPhoneIcon}
                          IconClickable
                          variant="outlined"
                        />
                      </Box>
                      <Box width={[1, 1 / 2]} mt={14} px={3}>
                        <Input
                          name="phoneNumber"
                          OutlinedInputPlaceholder="*Phone Number"
                          appendIcon
                          Icon={PhoneOutlinedIcon}
                          IconClickable
                          variant="outlined"
                        />
                      </Box>
                      <Box width={[1, 1 / 2]} mt={14} px={3}>
                        <Input
                          name="generalManagerName"
                          OutlinedInputPlaceholder="*General Manager Name"
                          appendIcon
                          Icon={PermIdentityOutlinedIcon}
                          IconClickable
                          variant="outlined"
                        />
                      </Box>
                      <Box
                        display="flex"
                        flexWrap="wrap"
                        justifyContent="center"
                        width={1}
                        mt={10}
                        mb={7}
                      >
                        <Button
                          type="submit"
                          disabled={loading}
                          color="secondary"
                          variant="contained"
                          startIcon={<SaveIcon />}
                        >
                          {id ? 'Update' : 'Create'}
                        </Button>
                        <Box ml={2}>
                          <Button
                            onClick={() => history.goBack()}
                            startIcon={<ClearIcon fontSize="small" />}
                          >
                            Cancel
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </WrapInCard>
      </WrapInBreadcrumbs>
    </>
  );
}

CreateProfitCenter.propTypes = {
  initialValues: PropTypes.shape({
    locationName: PropTypes.string,
    locationId: PropTypes.string,
    profitCenterNumber: PropTypes.number,
    profitCenterName: PropTypes.string,
    faxNumber: PropTypes.string,
    phoneNumber: PropTypes.number,
    generalManagerName: PropTypes.string,
  }),
  id: PropTypes.number,
};
CreateProfitCenter.defaultProps = {
  initialValues: PropTypes.shape({
    locationName: '',
    locationId: '',
    profitCenterNumber: null,
    profitCenterName: '',
    faxNumber: '',
    phoneNumber: null,
    generalManagerName: '',
  }),
};

export default memo(CreateProfitCenter);
