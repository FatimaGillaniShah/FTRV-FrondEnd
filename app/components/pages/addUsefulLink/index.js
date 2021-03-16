import { Box, Button } from '@material-ui/core';
import React, { memo } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import { Form, Formik } from 'formik';
import { string, object } from 'yup';
import LinkIcon from '@material-ui/icons/Link';
import PersonIcon from '@material-ui/icons/Person';
import ClearIcon from '@material-ui/icons/Clear';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs/index';
import WrapInCard from '../../layout/wrapInCard';
import { Input } from '../../index';

export function AddUsefulLinkPage({ onHandleSubmit, id, initialValues }) {
  return (
    <WrapInBreadcrumbs>
      <WrapInCard mb={8}>
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
          {({ resetForm }) => (
            <Form>
              <Box px={10}>
                <Box display="flex">
                  <Box width={[1, 1 / 2]} my={5} px={5}>
                    <Input
                      variant="outlined"
                      OutlinedInputPlaceholder="Name*"
                      name="name"
                      appendIcon
                      Icon={PersonIcon}
                      IconClickable={false}
                    />
                  </Box>
                  <Box width={[1, 1 / 2]} my={5} px={5}>
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
                <Box display="flex" pl={5}>
                  <Box mb={5}>
                    <Button
                      type="submit"
                      color="secondary"
                      variant="contained"
                      fullWidth={false}
                      endIcon={<SaveIcon />}
                    >
                      {id ? 'Update' : 'Save'}
                    </Button>
                  </Box>
                  <Box ml={2}>
                    <Button
                      variant="text"
                      fullWidth={false}
                      onClick={resetForm}
                      startIcon={<ClearIcon />}
                    >
                      Clear
                    </Button>
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

export default memo(AddUsefulLinkPage);
