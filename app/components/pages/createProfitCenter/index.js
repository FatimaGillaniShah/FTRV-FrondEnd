import React, { memo } from 'react';
import { Box } from '@material-ui/core';
import { Input, Button, AutoComplete } from 'components';
import ClearIcon from '@material-ui/icons/Clear';
import { Form, Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import CallOutlinedIcon from '@material-ui/icons/CallOutlined';
import NoteOutlinedIcon from '@material-ui/icons/NoteOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import DialpadOutlinedIcon from '@material-ui/icons/DialpadOutlined';
import PropTypes from 'prop-types';
import AccountBalanceOutlinedIcon from '@material-ui/icons/AccountBalanceOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import { TextMaskForContactNo } from './textMaskForContactNo';
import WrapInCard from '../../layout/wrapInCard';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs';
import { H4 } from '../../typography';
import { profitCenterSchema } from './profitCenterSchema';

function CreateProfitCenter({
  id,
  initialValues,
  loading,
  onHandleSearch,
  options,
  onHandleSubmit,
  usersLoading,
}) {
  const history = useHistory();

  return (
    <>
      <WrapInBreadcrumbs>
        <WrapInCard mb={8}>
          <Formik
            initialValues={initialValues}
            validationSchema={profitCenterSchema}
            onSubmit={onHandleSubmit}
          >
            {({ setFieldValue }) => (
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
                        <H4>{id ? 'Update' : 'Create New'} Profit Center</H4>
                      </Box>
                      <Box width={[1, 1 / 2]} mt={12} px={3}>
                        <Input
                          name="centerNo"
                          OutlinedInputPlaceholder="*Center Number"
                          appendIcon
                          Icon={DialpadOutlinedIcon}
                          IconClickable
                          variant="outlined"
                        />
                      </Box>
                      <Box width={[1, 1 / 2]} mt={12} px={3}>
                        <Input
                          name="name"
                          OutlinedInputPlaceholder="*Center Name"
                          appendIcon
                          Icon={AccountBalanceOutlinedIcon}
                          IconClickable
                          variant="outlined"
                        />
                      </Box>
                      <Box width={[1, 1 / 2]} mt={12} px={3}>
                        <Input
                          name="code"
                          OutlinedInputPlaceholder="*Center Code"
                          appendIcon
                          Icon={NoteOutlinedIcon}
                          IconClickable
                          variant="outlined"
                        />
                      </Box>
                      <Box width={[1, 1 / 2]} mt={12} px={3}>
                        <Input
                          name="address"
                          OutlinedInputPlaceholder="*Address"
                          appendIcon
                          Icon={LocationOnOutlinedIcon}
                          IconClickable
                          variant="outlined"
                        />
                      </Box>
                      <Box width={[1, 1 / 2]} mt={12} px={3}>
                        <Input
                          name="contactNo"
                          OutlinedInputPlaceholder="*Phone Number"
                          inputComponent={TextMaskForContactNo}
                          appendIcon
                          Icon={CallOutlinedIcon}
                          IconClickable
                          variant="outlined"
                        />
                      </Box>
                      <Box width={[1, 1 / 2]} mt={12} px={3}>
                        <Input
                          name="faxNo"
                          OutlinedInputPlaceholder="Dealership Fax Number"
                          appendIcon
                          inputComponent={TextMaskForContactNo}
                          Icon={PrintIcon}
                          IconClickable
                          variant="outlined"
                        />
                      </Box>
                      <Box width={[1, 1 / 2]} mt={14} px={3}>
                        <AutoComplete
                          id="managerId"
                          name="managerId"
                          multiple={false}
                          defaultValue={initialValues?.manager}
                          loading={usersLoading}
                          options={options || []}
                          getOptionLabel={(user) => `${user.fullName} ` || ' '}
                          onHandleChange={(e, value) => {
                            if (value) setFieldValue('managerId', value);
                          }}
                          onHandleSearch={(e) => {
                            if (e) onHandleSearch(e, setFieldValue);
                          }}
                          label="Manager Name"
                          placeholder="Type Manager Name"
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
    name: PropTypes.string,
    managerId: PropTypes.number,
    code: PropTypes.number,
    address: PropTypes.string,
    faxNo: PropTypes.string,
    contactNo: PropTypes.number,
    centerNo: PropTypes.number,
  }),
  id: PropTypes.number,
};
export default memo(CreateProfitCenter);
