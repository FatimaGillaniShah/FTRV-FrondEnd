import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import { Avatar, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ReactHtmlParser from 'html-react-parser';
import ImageRoundedIcon from '@material-ui/icons/ImageRounded';
import { H5, BodyTextLarge } from '../../typography';
import BlogCreatorInfo from './blogCreatorInfo';
import { navigateTo } from '../../../utils/helper';
import Show from '../../show';

const useStyles = makeStyles(() => ({
  imageView: {
    width: '90%',
    height: '180px',
    borderRadius: '6px',
  },
  cursorPointer: {
    cursor: 'pointer',
  },
  roundImage: {
    fontSize: '160px',
    borderRadius: '100%',
  },
}));

function Blog({
  id,
  title,
  thumbnail,
  shortText,
  user,
  createdAt,
  onHandleDeleteBlog,
  isWriteAllowed,
}) {
  const classes = useStyles();
  const history = useHistory();
  const truncate = (source, size) =>
    source.length > size ? `${source.slice(0, size - 1)} . . .` : source;

  return (
    <Box
      display="flex"
      flexDirection={['column', 'row', 'row', 'row']}
      mt={6}
      mb={8}
    >
      <Box
        width={[1, '55%', '30%', '22%']}
        mt={3}
        onClick={() => navigateTo(history, `/blogs/detail/${id}`)}
        className={classes.cursorPointer}
      >
        <Show IF={thumbnail}>
          <Avatar
            variant="square"
            src={thumbnail}
            className={classes.imageView}
          />
        </Show>
        <Show IF={!thumbnail}>
          <ImageRoundedIcon className={classes.roundImage} color="disabled" />
        </Show>
      </Box>
      <Box width={[1, '30', '60%', '75%']}>
        <Box display="flex" flexDirection="row" mt={0.5}>
          <Box width={[1, 1 / 2]} mt={2}>
            <H5
              className={classes.cursorPointer}
              onClick={() => navigateTo(history, `/blogs/detail/${id}`)}
            >
              {title}
            </H5>
          </Box>
          <Show IF={isWriteAllowed}>
            <Box width={[1, 1 / 2]} display="flex" justifyContent="flex-end">
              <IconButton
                onClick={() => navigateTo(history, `/blogs/edit/${id}`)}
              >
                <EditIcon color="secondary" />
              </IconButton>
              <IconButton onClick={() => onHandleDeleteBlog(id)}>
                <DeleteIcon color="error" />
              </IconButton>
            </Box>
          </Show>
        </Box>
        <Box>
          <BodyTextLarge
            color="grey"
            onClick={() => navigateTo(history, `/blogs/detail/${id}`)}
            className={classes.cursorPointer}
          >
            {truncate(ReactHtmlParser(shortText), 200)}
          </BodyTextLarge>
        </Box>
        <Box display="flex" flexDirection="column" mt={8}>
          <BlogCreatorInfo user={user} createdAt={createdAt} />
        </Box>
      </Box>
    </Box>
  );
}

Blog.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  shortText: PropTypes.string,
  user: PropTypes.object,
  createdAt: PropTypes.string,
};

Blog.defaultProps = {
  title: '',
  thumbnail: '',
  shortText: '',
  user: {},
  createdAt: '',
};

export default memo(Blog);
