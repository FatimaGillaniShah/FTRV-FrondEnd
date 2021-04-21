import { Box } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Blog from '../pages/blog';
import { H5 } from '../typography';

const useStyles = makeStyles(() => ({
  blog: {
    borderBottom: '2px solid #eee',
  },
}));

export function BlogListing(items) {
  const classes = useStyles();
  return (
    <>
      <Box m={4}>
        <H5>Blogs</H5>
        {items && items.blogs && items?.blogs?.length >= 1 && (
          <Box mt={5}>
            {items &&
              items.blogs &&
              items.blogs.map((item) => (
                <Box className={classes.blog}>
                  <Blog item={item} />
                </Box>
              ))}
          </Box>
        )}
      </Box>
    </>
  );
}

export default BlogListing;
