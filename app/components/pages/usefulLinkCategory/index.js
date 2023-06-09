import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined';
import { Category } from '../../category';
import { navigateTo } from '../../../utils/helper';
import Show from '../../show';

function UsefulLinkCategory({
  categories,
  handleDeleteCategory,
  isWriteAllowed,
}) {
  const history = useHistory();

  return (
    <Box
      width={1}
      display="flex"
      flexDirection="column"
      justify-content="space-between"
    >
      <Box>
        <Show IF={isWriteAllowed}>
          <Box ml={11} mt={7}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AddIcon />}
              onClick={() => navigateTo(history, '/link-categories/add')}
            >
              New Category
            </Button>
          </Box>
        </Show>
      </Box>
      <Show
        IF={categories.length > 0}
        Icon={CategoryOutlinedIcon}
        description=" No Category To Show"
      >
        <Box display="flex" flexDirection="row" flexWrap="wrap">
          {categories.map(({ id, name, linksCount }) => (
            <Box width={[1, 1 / 2, 1 / 3, '20%']} m="38px">
              <Category
                id={id}
                name={name}
                linksCount={linksCount}
                handleDeleteCategory={handleDeleteCategory}
                isWriteAllowed={isWriteAllowed}
              />
            </Box>
          ))}
        </Box>
      </Show>
    </Box>
  );
}
UsefulLinkCategory.propTypes = {
  categories: PropTypes.array,
};

export default memo(UsefulLinkCategory);
