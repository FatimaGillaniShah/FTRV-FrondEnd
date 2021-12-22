import { MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Menu from 'material-ui-popup-state/HoverMenu';
import React from 'react';
import {
  bindHover,
  bindMenu,
  usePopupState,
} from 'material-ui-popup-state/hooks';

const ParentPopupState = React.createContext(null);
const submenuStyles = (theme) => ({
  menu: {
    marginTop: theme.spacing(-1),
    color: theme.palette.text.main,
    backgroundColor: `${theme.palette.secondary.main} `,
    borderRadius: '0 ',
  },
  menuItemRoot: {
    fontSize: '0.8rem !important',
    '&$menuItemSelected, &$menuItemSelected:focus, &$menuItemSelected:hover': {
      backgroundColor: theme.palette.primary.main,
    },
    minWidth: '7rem',
    minHeight: '1rem !important',
    display: 'flex',
    justifyContent: 'center',
  },
  menuItemSelected: {},
  title: {
    color: theme.palette.text.light,
    textTransform: 'capitalize',
  },
  moreArrow: {
    marginRight: theme.spacing(-1),
    color: theme.palette.iconColor.default,
  },
});

export const SubMenu = withStyles(submenuStyles)(
  // Unfortunately, MUI <Menu> injects refs into its children, which causes a
  // warning in some cases unless we use forwardRef here.
  React.forwardRef(({ classes, title, popupId, children, ...props }, ref) => {
    const parentPopupState = React.useContext(ParentPopupState);
    const popupState = usePopupState({
      popupId,
      variant: 'popover',
      parentPopupState,
    });
    return (
      <ParentPopupState.Provider value={popupState}>
        <MenuItem
          {...bindHover(popupState)}
          selected={popupState.isOpen}
          ref={ref}
          classes={{ root: classes.menuItemRoot }}
        >
          <span className={classes.title}>{title}</span>
          <ChevronRight className={classes.moreArrow} />
        </MenuItem>
        <Menu
          {...bindMenu(popupState)}
          classes={{ paper: classes.menu }}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          getContentAnchorEl={null}
          {...props}
        >
          {children}
        </Menu>
      </ParentPopupState.Provider>
    );
  })
);
