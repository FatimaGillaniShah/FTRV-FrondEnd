import { Box, Divider } from '@material-ui/core';
import React from 'react';
import Blog from '../pages/blog';
import { H5 } from '../typography';

export function BlogListing(items) {
  return (
    <>
      <Box m={4}>
        <H5>Blogs</H5>
        {items && items.blogs && items?.blogs?.length >= 1 && (
          <Box mt={5}>
            {items &&
              items.blogs &&
              items.blogs.map((item) => (
                <Box>
                  <Blog item={item} />
                  <Divider />
                </Box>
              ))}
          </Box>
        )}
      </Box>
    </>
  );
}

export default BlogListing;
