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

function UsefulLinkCategory({ title, noOfFiles, count }) {
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
    <Box height={1} width={1} display="flex" flexDirection="column">
      <Box ml={12}>
        {role === ROLES.ADMIN && (
          <Box mt={10}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AddIcon />}
              onClick={() => navigateTo('usefulLinks/add')}
            >
              New Category
            </Button>
          </Box>
        )}
      </Box>
      {count > 0 ? (
        <Category title={title} noOfFiles={noOfFiles} />
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
  title: PropTypes.string,
  noOfFiles: PropTypes.string,
  count: PropTypes.number,
};

UsefulLinkCategory.defaultProps = {
  title: '',
  noOfFiles: '',
  count: null,
};

export default memo(UsefulLinkCategory);
