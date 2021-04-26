import { Box, Divider, Button, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import Pagination from '@material-ui/lab/Pagination';
import Blog from '../pages/blog';
import { H5 } from '../typography';

const useStyles = makeStyles((theme) => ({
  paginator: {
    justifyContent: 'center',
    marginTop: theme.spacing(7),
  },
}));

export function BlogListing({ items, onHandleDeleteBlog }) {
  const classes = useStyles();
  const itemsPerPage = 5;
  const [page, setPage] = useState(1);
  const [noOfPages] = useState(Math.ceil(items.length / itemsPerPage));

  const handleChange = (event, value) => {
    setPage(value);
  };

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
        {items && items?.length >= 1 && (
          <Box mt={5}>
            {items
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map(({ id, title, thumbnail, shortText, user, createdAt }) => (
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
                  {items[items.length - 1].id !== id && <Divider />}
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
