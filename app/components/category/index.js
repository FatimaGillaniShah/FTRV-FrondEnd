import React, { memo } from 'react';
import {
  Box,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FolderOpenOutlinedIcon from '@material-ui/icons/FolderOpenOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import { BodyTextSmall, BodyTextLarge } from '../typography';
import { colors } from '../../theme/colors';

const useStyles = makeStyles(() => ({
  categoryBox: {
    cursor: 'pointer',
    borderRadius: '16px',
    backgroundColor: colors.light,
    margin: '2% 1%',
    boxShadow: `1px 1px 1px 1px ${colors.light}`,
  },
  folderIcon: {
    width: '80px',
    height: '70px',
    color: colors.grey,
  },
  menuIcon: {
    cursor: 'pointer',
  },
}));
export function Category({ title, noOfFiles }) {
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

  return (
    <>
      <Box
        width={1}
        display="flex"
        flexDirection={['column', 'column', 'row', 'row']}
        ml={4}
        mt={1}
      >
        <Box
          width={['60%', '30%', '20%', '11%']}
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          className={classes.categoryBox}
        >
          <Box width="90%" mt={2} display="flex" justifyContent="flex-end">
            <MoreVertOutlinedIcon
              className={classes.menuIcon}
              onClick={handleClick}
            />
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
          <Box>
            <FolderOpenOutlinedIcon className={classes.folderIcon} />
          </Box>
          <Box mt={2}>
            <BodyTextLarge color="secondary" fontWeightMedium>
              {title}
            </BodyTextLarge>
          </Box>
          <Box mb={5} mt={1}>
            <BodyTextSmall color="secondary" fontWeightMedium>
              {noOfFiles}
            </BodyTextSmall>
          </Box>
        </Box>
      </Box>
    </>
  );
}
Category.propTypes = {
  title: PropTypes.string,
  noOfFiles: PropTypes.string,
};

export default memo(Category);
