import React, { memo } from 'react';
import {
  Box,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FolderOpenOutlinedIcon from '@material-ui/icons/FolderOpenOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import { BodyTextSmall, BodyTextLarge } from '../typography';
import { colors } from '../../theme/colors';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    marginBottom: theme.spacing(1),
    borderRadius: '20px',
  },
  folderIcon: {
    fontSize: '55px',
    cursor: 'pointer',
    color: colors.grey,
  },
  menuCursor: {
    cursor: 'pointer',
  },
}));
export function Category({ id, name, linksCount }) {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const StyledMenu = withStyles({
    paper: {
      border: `1px solid ${colors.grey}`,
    },
  })((props) => (
    <Menu
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));
  const navigateTo = (url) => {
    history.push(url);
  };

  return (
    <Box width={1}>
      <Paper elevation={3} className={classes.paper}>
        <Box
          mt={2}
          display="flex"
          justifyContent="flex-end"
          className={classes.menuCursor}
        >
          <MoreVertOutlinedIcon onClick={handleClick} />
        </Box>
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>
            <ListItemIcon>
              <EditOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Edit" />
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <DeleteForeverOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </MenuItem>
        </StyledMenu>
        <Box onClick={() => navigateTo(`link-categories/useful-links/${id}`)}>
          <FolderOpenOutlinedIcon className={classes.folderIcon} />
        </Box>
        <Box mt={2}>
          <BodyTextLarge color="secondary" fontWeight="fontWeightMedium">
            {name}
          </BodyTextLarge>
        </Box>
        <Box mb={5} mt={1}>
          <BodyTextSmall color="secondary">
            {`${linksCount} links`}
          </BodyTextSmall>
        </Box>
      </Paper>
    </Box>
  );
}
Category.propTypes = {
  name: PropTypes.string,
  linksCount: PropTypes.string,
};

export default memo(Category);
