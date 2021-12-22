import React from 'react';
import { Box } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { Helmet } from 'react-helmet';
import { WrapInCard } from 'components';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';
import NotExist from '../../components/notExist';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <WrapInBreadcrumbs>
        <WrapInCard>
          <Box m={12}>
            <NotExist
              Icon={ErrorOutlineIcon}
              title="404"
              text="Page Not Found"
              description="The page you are looking for does not exist!"
            />
          </Box>
        </WrapInCard>
      </WrapInBreadcrumbs>
    </>
  );
}
