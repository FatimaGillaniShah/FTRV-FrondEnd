import { WrapInCard } from 'components';
import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import CeoMessageInfo from '../../components/pages/ceoMessage';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';
import { getCeoMessage } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { Loading } from '../../components/loading';
import { usePermission } from '../../hooks/permission';
import { features, PERMISSIONS } from '../../utils/constants';

function CeoMessage() {
  const { data, isLoading } = useQuery(keys.ceoMessage, getCeoMessage);
  const isWriteAllowed = usePermission(
    `${features.MESSAGE_FROM_CEO}-${PERMISSIONS.WRITE}`
  );

  return (
    <>
      <Helmet>
        <title>Ceo Message</title>
        <meta name="ftrv ceo message" content="ftrv ceo message screen" />
      </Helmet>

      <WrapInBreadcrumbs>
        <WrapInCard>
          {isLoading ? (
            <Loading />
          ) : (
            <CeoMessageInfo
              ceoMessageData={data?.data?.data}
              isWriteAllowed={isWriteAllowed}
            />
          )}
        </WrapInCard>
      </WrapInBreadcrumbs>
    </>
  );
}

export default memo(CeoMessage);
