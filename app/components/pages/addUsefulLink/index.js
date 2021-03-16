import { Box, Button } from '@material-ui/core';
import React, { memo } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import { Form, Formik } from 'formik';
import { string, object } from 'yup';
import LinkIcon from '@material-ui/icons/Link';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs/index';
import WrapInCard from '../../layout/wrapInCard';
import { Input } from '../../index';

export function AddUsefulLinkPage({ onHandleSubmit }) {
  return (
    <WrapInBreadcrumbs>
      <WrapInCard mb={8}>
        <Formik
          initialValues={{
            name: '',
            url: '',
          }}
          validationSchema={object().shape({
            name: string().required('*Name Required'),
            url: string().url().required('*URL Required'),
          })}
          onSubmit={(values) => {
            onHandleSubmit(values);
          }}
        >
          <Form>
            <Box px={10}>
              <Box display="flex">
                <Box width={[1, 1 / 2]} my={5} px={5}>
                  <Input
                    variant="outlined"
                    OutlinedInputPlaceholder="Name*"
                    name="name"
                    appendIcon
                    Icon={LinkIcon}
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
              <Box px={5} mb={5}>
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  fullWidth={false}
                  endIcon={<SaveIcon />}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </Form>
        </Formik>
      </WrapInCard>
    </WrapInBreadcrumbs>
  );
}

export default memo(AddUsefulLinkPage);
