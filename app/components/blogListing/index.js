import { Box, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import Blog from '../pages/blog';
import { H5 } from '../typography';

const useStyles = makeStyles((theme) => ({
  paginator: {
    justifyContent: 'center',
    marginTop: theme.spacing(7),
  },
}));

export function BlogListing(items) {
  const classes = useStyles();
  const itemsPerPage = 5;
  const [page, setPage] = React.useState(1);
  const [noOfPages] = React.useState(
    Math.ceil(items.blogs.length / itemsPerPage)
  );

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <Box m={4}>
        <H5>Blogs</H5>
        {items && items.blogs && items?.blogs?.length >= 1 && (
          <Box mt={5}>
            {items.blogs
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((item) => (
                <Box>
                  <Blog item={item} />
                  <Divider />
                </Box>
              ))}
          </Box>
        )}
        <Box component="span">
          <Pagination
            count={noOfPages}
            page={page}
            onChange={handleChange}
            defaultPage={1}
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
