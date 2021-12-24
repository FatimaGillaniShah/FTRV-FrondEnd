import React, { memo, useState } from 'react';
import { Box } from '@material-ui/core';
import { Input, Button, CKEditor, Avatar } from 'components';
import { Add } from '@material-ui/icons';
import ClearIcon from '@material-ui/icons/Clear';
import { MuiFile } from 'components/muiFile';
import { Form, Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { FILE_ACCEPT_TYPES } from 'utils/constants';
import TitleOutlinedIcon from '@material-ui/icons/TitleOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PropTypes from 'prop-types';
import ImageRoundedIcon from '@material-ui/icons/ImageRounded';
import { makeStyles } from '@material-ui/core/styles';
import WrapInCard from '../../layout/wrapInCard';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs';
import { H4 } from '../../typography';
import { blogSchema } from './blogSchema';
import { navigateTo } from '../../../utils/helper';
import Show from '../../show';

const useStyles = makeStyles(() => ({
  roundImage: {
    fontSize: '160px',
    borderRadius: '100%',
  },
}));

function CreateBlog({ onHandleSubmit, id, initialValues, loading }) {
  const imgURL = initialValues?.file;
  const [imgFile, setImgFile] = useState(imgURL);
  const history = useHistory();
  const classes = useStyles();

  return (
    <>
      <WrapInBreadcrumbs>
        <WrapInCard mb={8}>
          <Formik
            initialValues={initialValues}
            validationSchema={blogSchema}
            onSubmit={onHandleSubmit}
          >
            {({ setFieldValue }) => (
              <Form>
                <Box
                  flexWrap="wrap"
                  flexDirection="row"
                  p={[0, 0, 0, 4]}
                  pr={[0, 0, 0, 36]}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box
                    width={[1, 1, 1, '30%']}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box width={1} display="flex" justifyContent="center">
                      <Show IF={!imgFile}>
                        <ImageRoundedIcon
                          className={classes.roundImage}
                          color="disabled"
                        />
                      </Show>
                      <Show IF={imgFile}>
                        <Avatar
                          imgFile={imgFile}
                          setFieldValue={setFieldValue}
                          setImgFile={setImgFile}
                        />
                      </Show>
                    </Box>
                    <Box ml={1} pt={5} display="flex" justifyContent="center">
                      <MuiFile
                        name="file"
                        setImgFile={setImgFile}
                        setFieldValue={setFieldValue}
                        acceptTypes={FILE_ACCEPT_TYPES.imageFiles}
                        toolTipTitle="Select thumbnail"
                        loading={loading}
                        buttonText={
                          id ? 'Update thumbnail' : 'Upload thumbnail'
                        }
                        btnIcon={<Add />}
                      />
                    </Box>
                  </Box>
                  <Box width={[1, 1, 1, '70%']}>
                    <Box
                      width={1}
                      pt={10}
                      flexWrap="wrap"
                      display="flex"
                      px={2}
                    >
                      <Box width={1} textAlign="center">
                        <H4>{id ? 'Update' : 'Create'} Blog</H4>
                      </Box>

                      <Box width={1} mt={10} px={[0, 10, 30, 0]} mb={8}>
                        <Input
                          name="title"
                          OutlinedInputPlaceholder="Title*"
                          appendIcon
                          Icon={TitleOutlinedIcon}
                          variant="outlined"
                        />
                        <Box mt={10}>
                          <CKEditor name="content" />
                        </Box>
                      </Box>

                      <Box
                        display="flex"
                        flexWrap="wrap"
                        justifyContent="center"
                        width={1}
                        mt={10}
                        mb={7}
                      >
                        <Button
                          type="submit"
                          color="secondary"
                          variant="contained"
                          disabled={loading}
                          startIcon={<SaveIcon />}
                        >
                          {id ? 'Update' : 'Create'}
                        </Button>
                        <Box ml={2}>
                          <Button
                            onClick={() => {
                              navigateTo(history, '/blogs');
                            }}
                            startIcon={<ClearIcon fontSize="small" />}
                          >
                            Cancel
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </WrapInCard>
      </WrapInBreadcrumbs>
    </>
  );
}

CreateBlog.propTypes = {
  initialValues: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    file: PropTypes.string,
  }),
  id: PropTypes.number,
  onHandleSubmit: PropTypes.func,
};
CreateBlog.defaultProps = {
  initialValues: PropTypes.shape({
    title: '',
    content: '',
    file: '',
  }),
};

export default memo(CreateBlog);
