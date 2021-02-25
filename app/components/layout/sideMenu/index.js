import { Grid } from '@material-ui/core';
import React from 'react';
import { menuItems } from './menuItems';
import SideMenu from './sideMenu';

function index() {
  return (
    <>
      <Grid xs={12}>
        {menuItems &&
          menuItems.length > 0 &&
          menuItems.map((item) => (
            <Grid>
              <SideMenu item={item} />
            </Grid>
          ))}
      </Grid>
    </>
  );
}

export default index;
