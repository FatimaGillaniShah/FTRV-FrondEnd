import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined';
import { Category } from '../../category';
import { useAuthContext } from '../../../context/authContext';
import { ROLES } from '../../../utils/constants';
import NotExist from '../notExist';

function UsefulLinkCategory({ categories, handleDeleteCategory }) {
  const history = useHistory();
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();

  const navigateTo = (url) => {
    history.push(url);
  };
  return (
    <Box
      width={1}
      display="flex"
      flexDirection="column"
      justify-content="space-between"
    >
      <Box>
        {role === ROLES.ADMIN && (
          <Box ml={4} mt={6} mb={4}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AddIcon />}
              onClick={() => navigateTo('link-categories/add')}
            >
              New Category
            </Button>
          </Box>
        )}
      </Box>
      {categories.length > 0 ? (
        <Box display="flex" flexDirection="row" flexWrap="wrap">
          {categories.map(({ id, name, linksCount }) => (
            <Box width={[1, 1 / 3, 1 / 4, '12%']} m={4}>
              <Category
                id={id}
                name={name}
                linksCount={linksCount}
                handleDeleteCategory={handleDeleteCategory}
              />
            </Box>
          ))}
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
  categories: PropTypes.array,
};

export default memo(UsefulLinkCategory);
