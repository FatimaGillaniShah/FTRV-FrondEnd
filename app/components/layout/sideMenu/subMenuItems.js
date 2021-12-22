import { Box, MenuItem } from '@material-ui/core';
import { BodyTextSmall } from 'components';
import React from 'react';
import { Link } from 'react-router-dom';
import { usePermission } from '../../../hooks/permission';
import Show from '../../show';
import { SubMenu } from './subMenu';
import { PERMISSIONS } from '../../../utils/constants';

const { READ, WRITE } = PERMISSIONS;
const permit = usePermission;
export const SubMenuItems = ({ childItem, popupState, classes, isAdmin }) => {
  const SETTINGS = 'configuration';
  const isItemSetting = childItem.name === SETTINGS;
  const permission = isItemSetting ? WRITE : READ;
  return (
    <Box>
      <Show IF={!childItem?.children}>
        <Link to={childItem?.link} className={classes.linkStyle}>
          <MenuItem
            onClick={popupState.close}
            classes={{ root: classes.menuItem }}
          >
            <BodyTextSmall classes={{ root: classes.label }}>
              {childItem?.name}
            </BodyTextSmall>
          </MenuItem>
        </Link>
      </Show>
      {childItem?.children && childItem?.children.length > 0 && (
        <SubMenu popupId={childItem?.name} title={childItem?.name}>
          {childItem?.children.map((nestedChild) => {
            if (childItem?.children) {
              const can = permit(`${nestedChild.slug}-${permission}`);
              if (can || isAdmin) {
                return (
                  <Link to={nestedChild.link} className={classes.linkStyle}>
                    <MenuItem
                      onClick={popupState.close}
                      classes={{
                        root: classes.menuItem,
                      }}
                    >
                      <BodyTextSmall className={classes.label}>
                        {nestedChild.name}
                      </BodyTextSmall>
                    </MenuItem>
                  </Link>
                );
              }
            }
            return false;
          })}
        </SubMenu>
      )}
    </Box>
  );
};
