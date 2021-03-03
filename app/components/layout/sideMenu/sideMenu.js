import React from 'react';
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ChevronRight from '@material-ui/icons/ChevronRight';
import {
  bindHover,
  bindMenu,
  usePopupState,
} from 'material-ui-popup-state/hooks';
import Menu from 'material-ui-popup-state/HoverMenu';
import { Link, useHistory } from 'react-router-dom';

const ParentPopupState = React.createContext(null);

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    borderRadius: 0,
    border: 0,
    color: theme.palette.textColor.main,
    height: '6rem',
    boxShadow: 'none',
    width: '100%',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  menuPaper: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.textColor.main,
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
    fontWeight: 300,
    color: theme.palette.textColor.light,
  },
  iconStyle: { color: theme.palette.iconColor.default },
  linkStyle: { textDecoration: 'none', color: theme.palette.textColor.main },
}));
const SideMenu = ({ item }) => {
  const classes = useStyles();
  const history = useHistory();
  const popupState = usePopupState({
    popupId: 'sideMenu',
    variant: 'popover',
  });
  return (
    <>
      <Button
        classes={{ root: classes.root, label: classes.label }}
        variant="contained"
        {...bindHover(popupState)}
        onClick={() => {
          history.push(item.link);
        }}
      >
        <IconButton aria-label="delete" className={classes.iconStyle}>
          <item.icon />
        </IconButton>
        <Typography variant="body2" classes={{ root: classes.label }}>
          {item.name}
        </Typography>
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
            {item.children.map((childItem) => (
              <Box>
                {!childItem.children && (
                  <Link to={childItem.link} className={classes.linkStyle}>
                    <MenuItem
                      onClick={popupState.close}
                      classes={{ root: classes.menuItem }}
                    >
                      <Typography variant="body2" className={classes.label}>
                        {childItem.name}
                      </Typography>
                    </MenuItem>
                  </Link>
                )}

                {childItem.children && childItem.children.length > 0 && (
                  <Submenu popupId={childItem.name} title={childItem.name}>
                    {childItem.children.map((nestedChild) => (
                      <Link to={nestedChild.link} className={classes.linkStyle}>
                        <MenuItem
                          onClick={popupState.close}
                          classes={{
                            root: classes.menuItem,
                          }}
                        >
                          <Typography variant="body2" className={classes.label}>
                            {nestedChild.name}
                          </Typography>
                        </MenuItem>
                      </Link>
                    ))}
                  </Submenu>
                )}
              </Box>
            ))}
          </Menu>
        </ParentPopupState.Provider>
      )}
    </>
  );
};

export default SideMenu;

const submenuStyles = (theme) => ({
  menu: {
    marginTop: theme.spacing(-1),
    color: theme.palette.textColor.main,
    backgroundColor: `${theme.palette.secondary.main} !important`,
    borderRadius: '50 !important',
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
    color: theme.palette.textColor.light,
    textTransform: 'capitalize',
  },
  moreArrow: {
    marginRight: theme.spacing(-1),
    color: theme.palette.iconColor.default,
  },
});

const Submenu = withStyles(submenuStyles)(
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
