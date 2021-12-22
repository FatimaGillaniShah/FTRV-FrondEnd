import { Box, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Pagination from '@material-ui/lab/Pagination';
import SpeakerNotesOutlinedIcon from '@material-ui/icons/SpeakerNotesOutlined';
import { useHistory } from 'react-router-dom';
import Blog from '../pages/blog';
import { H5 } from '../typography';
import { TABLE_PAGE_SIZE } from '../../utils/constants';
import { navigateTo } from '../../utils/helper';
import Show from '../show';
import { Button } from '../index';

const useStyles = makeStyles((theme) => ({
  paginator: {
    justifyContent: 'center',
    marginTop: theme.spacing(5),
  },
  iconImage: {
    width: '10%',
    height: '10%',
  },
}));

export function BlogListing({
  currentPage,
  blogs,
  handleChange,
  count,
  onHandleDeleteBlog,
  isWriteAllowed,
}) {
  const classes = useStyles();
  const history = useHistory();
  const defaultPage = 1;
  const noOfPages = Math.ceil(count / TABLE_PAGE_SIZE);

  return (
    <>
      <Box m={4}>
        <Box>
          <H5>Blogs</H5>
        </Box>
        <Show IF={isWriteAllowed}>
          <Box mt={10}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AddIcon />}
              onClick={() => navigateTo(history, '/blogs/add')}
            >
              New Blog
            </Button>
          </Box>
        </Show>
        <Show
          IF={count > 0}
          Icon={SpeakerNotesOutlinedIcon}
          description=" No Blogs To Show"
        >
          <Box>
            <Show IF={blogs && blogs?.length >= 1}>
              <Box mt={5}>
                {blogs.map(
                  ({ id, title, thumbnail, shortText, user, createdAt }) => (
                    <Box>
                      <Blog
                        id={id}
                        title={title}
                        thumbnail={thumbnail}
                        shortText={shortText}
                        user={user}
                        createdAt={createdAt}
                        onHandleDeleteBlog={onHandleDeleteBlog}
                        isWriteAllowed={isWriteAllowed}
                      />
                      {blogs[blogs.length - 1].id !== id && <Divider />}
                    </Box>
                  )
                )}
              </Box>
            </Show>
            <Box component="span">
              <Pagination
                count={noOfPages}
                page={currentPage}
                onChange={handleChange}
                defaultPage={defaultPage}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
                classes={{ ul: classes.paginator }}
              />
            </Box>
          </Box>
        </Show>
      </Box>
    </>
  );
}

export default BlogListing;
