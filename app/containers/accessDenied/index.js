import React from 'react';
import { Box } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { WrapInCard } from 'components';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';
import NotExist from '../../components/notExist';

export default function AccessDenied() {
  return (
    <>
      <Helmet>
        <title>Forbidden</title>
      </Helmet>
      <WrapInBreadcrumbs>
        <WrapInCard>
          <Box m={12}>
            <NotExist
              Icon={HighlightOffIcon}
              title="403"
              text="Forbidden"
              description="You don't have access to the page you requested!"
            />
          </Box>
        </WrapInCard>
      </WrapInBreadcrumbs>
    </>
  );
}
