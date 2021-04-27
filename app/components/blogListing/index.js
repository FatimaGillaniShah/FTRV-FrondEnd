import { Box, Divider, Button, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Pagination from '@material-ui/lab/Pagination';
import Blog from '../pages/blog';
import { H5 } from '../typography';
import { PAGE_SIZE } from '../../utils/constants';

const useStyles = makeStyles((theme) => ({
  paginator: {
    justifyContent: 'center',
    marginTop: theme.spacing(5),
  },
}));

export function BlogListing({
  currentPage,
  blogs,
  handleChange,
  count,
  onHandleDeleteBlog,
}) {
  const classes = useStyles();
  const defaultPage = 1;
  const noOfPages = Math.ceil(count / PAGE_SIZE);
  return (
    <>
      <Box m={4}>
        <Box>
          <H5>Blogs</H5>
        </Box>
        <Box mt={10}>
          <Link href="/blogs/add" underline="none">
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AddIcon />}
            >
              New Blog
            </Button>
          </Link>
        </Box>
        {blogs && blogs?.length >= 1 && (
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
                  />
                  {blogs[blogs.length - 1].id !== id && <Divider />}
                </Box>
              )
            )}
          </Box>
        )}
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
    </>
  );
}

export default BlogListing;
