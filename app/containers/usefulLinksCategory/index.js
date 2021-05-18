import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Loading } from '../../components/loading';
import UsefulLinksCategoryPage from '../../components/pages/usefulLinkCategory';
import { fetchLinks } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';

function UsefulLinksCategory() {
  const { data, isLoading } = useQuery(keys.links, fetchLinks, {
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Helmet>
        <title>Useful Links Category</title>
      </Helmet>
      {isLoading && <Loading />}
      <UsefulLinksCategoryPage
        data={data?.data?.data?.rows}
        isLoading={isLoading}
      />
    </>
  );
}

export default memo(UsefulLinksCategory);
