import { Button, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { BodyTextSmall } from 'components';
import {
  bindHover,
  bindMenu,
  usePopupState,
} from 'material-ui-popup-state/hooks';
import Menu from 'material-ui-popup-state/HoverMenu';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthContext } from '../../../context/authContext';
import { usePermission } from '../../../hooks/permission';
import { PERMISSIONS, nonFeatures } from '../../../utils/constants';
import { navigateTo } from '../../../utils/helper';
import { SubMenuItems } from './subMenuItems';

const ParentPopupState = React.createContext(null);

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    borderRadius: 0,
    border: 0,
    color: theme.palette.text.main,
    height: '6rem',
    boxShadow: 'none',
    width: '100%',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  menuPaper: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.text.main,
    borderRadius: 0,
    minHeight: theme.defaultHeights.sideMenuItem,
    display: 'flex',
    alignItems: 'center',
  },
  menuItem: {
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
    fontSize: '0.8rem !important',
    minWidth: '7rem',
    display: 'flex',
    minHeight: '2rem',
    justifyContent: 'center',
  },
  label: {
    textTransform: 'capitalize',
    display: 'block',
    color: theme.palette.text.light,
  },
  iconStyle: { color: theme.palette.iconColor.default },
  linkStyle: { textDecoration: 'none', color: theme.palette.text.main },
}));

const SideMenu = ({ item }) => {
  const classes = useStyles();
  const history = useHistory();
  const { user } = useAuthContext();
  const { data } = user;
  const { READ, WRITE } = PERMISSIONS;
  const popupState = usePopupState({
    popupId: 'sideMenu',
    variant: 'popover',
  });
  const permit = usePermission;
  const nonFeatureSubChild = [];
  const nonfeatures = Object.values(nonFeatures);
  const SETTINGS = 'settings';
  const isItemSetting = item.name === SETTINGS;
  const permission = isItemSetting ? WRITE : READ;
  return (
    <>
      <Button
        classes={{ root: classes.root, label: classes.label }}
        variant="contained"
        {...bindHover(popupState)}
        onClick={() => {
          if (item?.externalLink) {
            window.open(item.link, '_blank');
          } else navigateTo(history, item.link);
        }}
      >
        <IconButton aria-label="delete" className={classes.iconStyle}>
          <item.icon />
        </IconButton>
        <BodyTextSmall classes={{ root: classes.label }}>
          {item.name}
        </BodyTextSmall>
      </Button>
      {item.children && item.children.length > 0 && (
        <ParentPopupState.Provider value={popupState}>
          <Menu
            {...bindMenu(popupState)}
            anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
            transformOrigin={{ vertical: 'center', horizontal: 'top' }}
            getContentAnchorEl={null}
            classes={{ paper: classes.menuPaper }}
          >
            {item.children.map((childItem) => {
              const can = permit(`${childItem.slug}-${permission}`);

              if (
                !!childItem.children &&
                nonfeatures.includes(childItem.name.toUpperCase())
              ) {
                childItem.children.map(({ slug }) => {
                  const subChildCan = permit(`${slug}-${permission}`);
                  if (subChildCan) {
                    return nonFeatureSubChild.push(subChildCan);
                  }
                  return nonFeatureSubChild;
                });
              }
              if (
                can ||
                (nonfeatures.includes(childItem.name.toUpperCase()) &&
                  nonFeatureSubChild.length > 0) ||
                data.isAdmin
              ) {
                return (
                  <SubMenuItems
                    popupState={popupState}
                    childItem={childItem}
                    classes={classes}
                    isAdmin={data.isAdmin}
                  />
                );
              }
              return false;
            })}
          </Menu>
        </ParentPopupState.Provider>
      )}
    </>
  );
};

export default SideMenu;
