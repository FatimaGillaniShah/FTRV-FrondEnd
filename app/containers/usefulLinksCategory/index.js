import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Loading } from '../../components/loading';
import UsefulLinksCategoryPage from '../../components/pages/usefulLinkCategory';
import { getLinkCategory } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';

function UsefulLinksCategory() {
  const { data, isLoading } = useQuery(keys.linkCategory, getLinkCategory, {
    refetchOnWindowFocus: false,
  });
  const categories = data?.data?.data;
  return (
    <>
      <Helmet>
        <title>Useful Links Category</title>
      </Helmet>
      <WrapInBreadcrumbs>
        {isLoading ? (
          <Loading />
        ) : (
          <UsefulLinksCategoryPage categories={categories} />
        )}
      </WrapInBreadcrumbs>
    </>
  );
}

export default memo(UsefulLinksCategory);
