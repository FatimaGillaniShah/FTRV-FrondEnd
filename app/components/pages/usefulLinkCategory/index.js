import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import FolderOpenOutlinedIcon from '@material-ui/icons/FolderOpenOutlined';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import {
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined';
import { BodyTextSmall, BodyTextLarge } from '../../typography';
import { colors } from '../../../theme/colors';
import { useAuthContext } from '../../../context/authContext';
import { ROLES } from '../../../utils/constants';
import NotExist from '../notExist';

const useStyles = makeStyles(() => ({
  categoryBox: {
    borderRadius: '16px',
    backgroundColor: colors.light,
    margin: '2% 1%',
    boxShadow: `1px 1px 1px 1px ${colors.light}`,
    cursor: 'pointer',
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
function UsefulLinkCategory({ title, noOfFiles, count }) {
  const classes = useStyles();
  const history = useHistory();
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigateTo = (url) => {
    history.push(url);
  };
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
      elevation={0}
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
    <Box height={1} width={1} display="flex" flexDirection="column">
      <Box ml={12}>
        {role === ROLES.ADMIN && (
          <Box mt={10}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AddIcon />}
              onClick={() => navigateTo('usefulLinks/add')}
            >
              New Category
            </Button>
          </Box>
        )}
      </Box>
      {count > 0 ? (
        <Box
          display="flex"
          flexDirection={['column', 'column', 'row', 'row']}
          ml={8}
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
      ) : (
        <NotExist
          Icon={CategoryOutlinedIcon}
          description=" No Category To Show"
        />
      )}
    </Box>
  );
}
UsefulLinkCategory.propTypes = {
  title: PropTypes.string,
  noOfFiles: PropTypes.string,
  count: PropTypes.number,
};

UsefulLinkCategory.defaultProps = {
  title: '',
  noOfFiles: '',
  count: null,
};

export default memo(UsefulLinkCategory);
