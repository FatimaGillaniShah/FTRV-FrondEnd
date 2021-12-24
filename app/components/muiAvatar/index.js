import React, { memo } from 'react';
import { Avatar, Box, Tooltip } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../theme/colors';

const useStyles = makeStyles(() => ({
  cancelIcon: {
    top: 0,
    color: colors.blackGrey,
    right: '10px  ',
    cursor: 'pointer',
    fontSize: '2rem',
    '&:hover': {
      transform: 'scale(1.1) rotate(180deg)',
      transition: 'all .3s',
    },
  },
  container: {
    position: 'relative',
    width: 'max-content',
  },
  imageStyle: {
    width: '150px',
    height: '150px',
  },
  iconWrapper: {
    display: 'inline-block',
    position: 'absolute',
    borderRadius: '100%',
    right: '10px',
    backgroundColor: colors.light,
  },
}));

function MuiAvatar({ setFieldValue, setImgFile, imgFile }) {
  const classes = useStyles();
  const handleRemoveImage = () => {
    setFieldValue('file', '');
    setImgFile(null);
  };

  return (
    <Box
      width={[1 / 2, 1]}
      display="flex"
      justifyContent="center"
      className={classes.container}
    >
      <Avatar src={imgFile} className={classes.imageStyle} />
      {imgFile && (
        <Tooltip title="Remove image">
          <Box className={classes.iconWrapper}>
            <CancelIcon
              className={classes.cancelIcon}
              onClick={handleRemoveImage}
            />
          </Box>
        </Tooltip>
      )}
    </Box>
  );
}

export default memo(MuiAvatar);
