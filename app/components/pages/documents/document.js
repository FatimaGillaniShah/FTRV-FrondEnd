import { Box, IconButton, Menu } from '@material-ui/core';
import React, { memo, useState } from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { useHistory } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { BodyTextLarge, BodyTextSmall } from '../../typography';
import { ListItemIcon, MenuItem } from '../..';
import { navigateTo } from '../../../utils/helper';
import { useStyles } from './style';
import { ROLES } from '../../../utils/constants';
import { useAuthContext } from '../../../context/authContext';

export function Document({
  document: { id, name, description, url },
  onHandleDelete,
}) {
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  const classes = useStyles();

  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDocumentDownload = (documentUrl) => {
    window.open(documentUrl, '_self');
  };
  return (
    <Box display="flex" justifyContent="space-between" pb={2}>
      <Box width="90%">
        <BodyTextLarge medium>{name}</BodyTextLarge>
        <BodyTextSmall>{description}</BodyTextSmall>
      </Box>

      <Box display="flex" flexDirection="column">
        {role === ROLES.ADMIN && (
          <Box>
            <IconButton
              onClick={handleClick}
              className={classes.documentAction}
            >
              <MoreVertIcon color="secondary" />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={anchorEl}
              onClose={handleClose}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <MenuItem
                onClick={() => navigateTo(history, `/documents/edit/${id}`)}
              >
                <ListItemIcon>
                  <EditIcon color="secondary" />
                </ListItemIcon>
                Edit
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  onHandleDelete(id);
                }}
              >
                <ListItemIcon>
                  <DeleteIcon color="error" />
                </ListItemIcon>
                Delete
              </MenuItem>
            </Menu>
          </Box>
        )}
        <IconButton
          onClick={() => {
            handleDocumentDownload(url);
          }}
        >
          <CloudDownloadIcon color="secondary" />
        </IconButton>
      </Box>
    </Box>
  );
}

export default memo(Document);
