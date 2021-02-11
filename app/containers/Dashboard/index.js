/**
 *
 * Dashboard
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import DashboardComponent from 'components/DashboardComponent/Loadable';
import InputField from '../../components/InputField/Index';
import EmailIcon from '@material-ui/icons/Email';
function Dashboard({ Children }) {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Description of Dashboard" />
      </Helmet>
      {/* <DashboardComponent Children={Children} /> */}
      <div style={{ margin: '100px 100px' }}>
        <InputField variant="outlined" prependIcon={true} Icon={EmailIcon} />
      </div>
    </>
  );
}

export default memo(Dashboard);
