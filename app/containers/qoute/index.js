import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import Box from '@material-ui/core/Box';
import Quote from '../../components/pages/quote';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';
import WrapInCard from '../../components/layout/wrapInCard';

function QuoteContainer() {
  return (
    <>
      <Helmet>
        <title>Quote</title>
      </Helmet>
      <WrapInBreadcrumbs>
        <Box width={1} my={5}>
          <WrapInCard mb={8}>
            <Quote />
          </WrapInCard>
        </Box>
      </WrapInBreadcrumbs>
    </>
  );
}

export default memo(QuoteContainer);
