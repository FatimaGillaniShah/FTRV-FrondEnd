import { Box, Button } from '@material-ui/core';
import React, { memo } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import { Form, Formik } from 'formik';
import { string, object } from 'yup';
import LinkIcon from '@material-ui/icons/Link';
import PersonIcon from '@material-ui/icons/Person';
import ClearIcon from '@material-ui/icons/Clear';
import PropTypes from 'prop-types';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs/index';
import WrapInCard from '../../layout/wrapInCard';
import { Input } from '../../index';
import { H5 } from '../../typography';

export function AddUsefulLinkPage({
  onHandleSubmit,
  id,
  initialValues,
  history,
}) {
  return (
    <WrapInBreadcrumbs>
      <WrapInCard mb={8}>
        <Box ml={3}>
          <Box my={7}>
            <H5> {id ? 'Update' : 'Create'} Useful Link </H5>
          </Box>
          <Formik
            key="addusefullink"
            enableReinitialize
            initialValues={initialValues}
            validationSchema={object().shape({
              name: string().required('*Name Required'),
              url: string().url().required('*URL Required'),
            })}
            onSubmit={(values) => {
              onHandleSubmit(values);
            }}
          >
            <Form>
              <Box>
                <Box display="flex" flexDirection="column" pb={10}>
                  <Box width={[1, 1 / 3]} my={5}>
                    <Input
                      variant="outlined"
                      OutlinedInputPlaceholder="Name*"
                      name="name"
                      appendIcon
                      Icon={PersonIcon}
                      IconClickable={false}
                    />
                  </Box>
                  <Box width={[1, 1 / 3]}>
                    <Input
                      OutlinedInputPlaceholder="Url*"
                      name="url"
                      variant="outlined"
                      appendIcon
                      Icon={LinkIcon}
                      IconClickable={false}
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
                      onClick={() => {
                        history.push('/useful-links');
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Form>
          </Formik>
        </Box>
      </WrapInCard>
    </WrapInBreadcrumbs>
  );
}

export default memo(AddUsefulLinkPage);

AddUsefulLinkPage.propTypes = {
  initialValues: PropTypes.object,
};
AddUsefulLinkPage.defaultProps = {
  initialValues: { name: '', url: '' },
};
