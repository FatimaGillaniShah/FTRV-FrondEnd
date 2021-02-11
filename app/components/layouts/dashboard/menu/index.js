import { Box, Menu, MenuItem,Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import LayersIcon from '@material-ui/icons/Layers';
import LinkIcon from '@material-ui/icons/Link';
import PeopleIcon from '@material-ui/icons/People';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import StorageIcon from '@material-ui/icons/Storage';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import NestedMenuItem from './nestedItem';

const drawerWidth = 120;
const MyMenuItem = withStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: theme.palette.menuColor.secondary,
      color: theme.palette.textColor.main
    }
  }
}))(MenuItem);

const MySubMenuItem = withStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: theme.palette.menuColor.primary
    }
  }
}))(MenuItem);
const useStyles = makeStyles((theme) => ({
  menuGrid: {
    width: '8%',
    height: '100%',
    backgroundColor: theme.palette.menuColor.primary
  },
  menuWidth: {
    '& >div': {
      width: '8% !important',
      left: '0 !important',
      minHeight: '400px',
      maxHeight: '700px',
      backgroundColor: theme.palette.menuColor.primary,
      color: theme.palette.textColor.primary,
      boxShadow: 'none',
      minWidth: '76px'
    },
    '& div:nth-child(3)': {
      top: '0px !important',
      borderRadius: 0,
      width: '100% !important',
      maxWidth: '100%',
      left: '-1px !important'
      // height: '100%'
    },
    margin: 0,
    left: '0 !important',
    marginTop: '5rem',
    minWidth: '76px',
    width: '8% !important'
  },
  menuItem: {
    padding: 0,
    margin: 0
  },
  menuItemDiv: {
    flexDirection: 'column',
    width: '100%'
  },
  menuItemIcon: {
    color: theme.palette.iconColor.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    marginTop: '0.7rem',
    marginBottom: '0.4rem'
  },
  menuItemText: {
    color: theme.palette.textColor.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    marginBottom: '0.8rem',
    fontSize: '0.75rem'
  },
  subMenuItem: {
    fontSize: '0.8rem',
    display: 'flex',
    alignItems: 'center'
  }
}));
function index() {
  const classes = useStyles();
  const [menuPosition, setMenuPosition] = React.useState(null);

  const handleMenuClick = (x = 0, y = 0) => {
    if (menuPosition) {
      return;
    }

    setMenuPosition({
      top: 0,
      left: 0
    });
  };

  const handleItemClick = (event) => {
    // setMenuPosition(null);
    // console.log(event.target.getAttribute('name'));
  };
  function offset(el) {
    var rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }

  useEffect(() => {
    var _div = document.getElementById('newmenu');
    if (_div) {
      var rect = offset(_div);
      handleMenuClick(rect.left, rect.top);
    }
  }, []);
  return (
    <>
      <Grid item id="newmenu" className={classes.menuGrid}>
        <Menu
          className={clsx(classes.menuWidth)}
          open={true}
          anchorReference="anchorPosition"
          anchorPosition={menuPosition}
        >
          <MyMenuItem
            className={classes.menuItem}
            onClick={(e) => {
              handleItemClick(e);
            }}
            name="Members"
          >
            <div className={classes.menuItemDiv}>
              <Box className={classes.menuItemIcon}>
                <PeopleIcon />
              </Box>
              <Box className={classes.menuItemText}>Members</Box>
            </div>
          </MyMenuItem>
          <MyMenuItem className={classes.menuItem} onClick={handleItemClick}>
            <div className={classes.menuItemDiv}>
              <Box className={classes.menuItemIcon}>
                <BorderColorIcon />
              </Box>
              <Box className={classes.menuItemText}>Blog</Box>
            </div>
          </MyMenuItem>

          <NestedMenuItem
            label="Education"
            parentMenuOpen={!!menuPosition}
            onClick={handleItemClick}
            style_menuItem={classes.menuItem}
            style_menuItemDiv={classes.menuItemDiv}
            style_menuItemIcon={classes.menuItemIcon}
            style_menuItemText={classes.menuItemText}
            _icon={<LayersIcon />}
            shouldAppendLeftMargin={true}
            marginLeftValue={16}
          >
            <MySubMenuItem
              className={classes.subMenuItem}
              onClick={handleItemClick}
            >
              Sub-Button 1
            </MySubMenuItem>
            <MySubMenuItem
              className={classes.subMenuItem}
              onClick={handleItemClick}
            >
              Sub-Button 2
            </MySubMenuItem>
            <NestedMenuItem
              label="Sub-Button 3"
              className={classes.subMenuItem}
              parentMenuOpen={!!menuPosition}
              onClick={handleItemClick}
            >
              <MySubMenuItem
                className={classes.subMenuItem}
                onClick={handleItemClick}
              >
                Sub-Sub-Button 1
              </MySubMenuItem>
              <MySubMenuItem
                className={classes.subMenuItem}
                onClick={handleItemClick}
              >
                Sub-Sub-Button 2
              </MySubMenuItem>
            </NestedMenuItem>
          </NestedMenuItem>
          <MyMenuItem
            className={classes.menuItem}
            onClick={(e) => {
              handleItemClick(e);
            }}
            name="Members"
          >
            <div className={classes.menuItemDiv}>
              <Box className={classes.menuItemIcon}>
                <EmojiEventsIcon />
              </Box>
              <Box className={classes.menuItemText}>Career</Box>
            </div>
          </MyMenuItem>
          <MyMenuItem
            className={classes.menuItem}
            onClick={(e) => {
              handleItemClick(e);
            }}
            name="Members"
          >
            <div className={classes.menuItemDiv}>
              <Box className={classes.menuItemIcon}>
                <QuestionAnswerIcon />
              </Box>
              <Box className={classes.menuItemText}>Community</Box>
            </div>
          </MyMenuItem>
          <MyMenuItem
            className={classes.menuItem}
            onClick={(e) => {
              handleItemClick(e);
            }}
            name="Members"
          >
            <div className={classes.menuItemDiv}>
              <Box className={classes.menuItemIcon}>
                <StorageIcon />
              </Box>
              <Box className={classes.menuItemText}>File Storage</Box>
            </div>
          </MyMenuItem>
          <MyMenuItem
            className={classes.menuItem}
            onClick={(e) => {
              handleItemClick(e);
            }}
            name="Members"
          >
            <div className={classes.menuItemDiv}>
              <Box className={classes.menuItemIcon}>
                <LinkIcon />
              </Box>
              <Box className={classes.menuItemText}>Links</Box>
            </div>
          </MyMenuItem>
        </Menu>
      </Grid>
    </>
  );
}

export default index;
