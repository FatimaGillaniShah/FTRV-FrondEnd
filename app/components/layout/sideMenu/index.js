import { Grid } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { menuItems } from './menuItems';
import SideMenu from './sideMenu';
import { usePermission } from '../../../hooks/permission';
import { nonFeatures, PERMISSIONS } from '../../../utils/constants';
import { useAuthContext } from '../../../context/authContext';

const useStyles = makeStyles((theme) => ({
  menu: {
    paddingTop: theme.spacing(20),
  },
}));
export const SETTINGS = 'settings';

function Index() {
  const classes = useStyles();
  const { READ, WRITE } = PERMISSIONS;

  const { user } = useAuthContext();
  const { data } = user;
  let childExist = [];
  let subChildExist = [];

  const nonfeatures = Object.values(nonFeatures);
  const SideMenuGrid = (menuItem) => {
    const { item } = menuItem;
    return (
      <Grid>
        <SideMenu item={item} />
      </Grid>
    );
  };
  const permit = usePermission;
  return (
    <>
      <Grid xs={12} className={classes.menu}>
        {menuItems &&
          menuItems.length > 0 &&
          menuItems.map((item) => {
            const isItemSetting = item.name === SETTINGS;
            const permission = isItemSetting ? WRITE : READ;
            if (data.isAdmin) {
              return <SideMenuGrid item={item} />;
            }
            if (item.children) {
              childExist = [];
              item.children.map((childItem) => {
                const can = permit(`${childItem.slug}-${permission}`);
                if (isItemSetting) {
                  subChildExist = [];
                  childItem?.children?.map(({ slug }) => {
                    const canChild = permit(`${slug}-${permission}`);
                    if (canChild) {
                      subChildExist.push(true);
                    }
                    return false;
                  });
                }
                if (
                  can ||
                  (nonfeatures.includes(childItem.name.toUpperCase()) &&
                    subChildExist.length > 0)
                ) {
                  childExist.push(true);
                }
                return false;
              });

              if (childExist.length > 0) {
                return <SideMenuGrid item={item} />;
              }
            }

            const can = permit(`${item.slug}-${permission}`);
            if (can) {
              return <SideMenuGrid item={item} />;
            }
            return false;
          })}
      </Grid>
    </>
  );
}

export default Index;
