import { FormHelperText, Button, Box, Tooltip } from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import React, { memo, useEffect, useRef, useState } from 'react';
import { useField } from 'formik';
import { ButtonText, BodyTextLarge } from '../typography';
import { colors } from '../../theme/colors';
import {
  MAX_UPLOADABLE_IMAGE_SIZE_IN_MBS,
  MIN_UPLOADABLE_FILE_SIZE_IN_MBS,
} from '../../utils/constants';
import { Toast } from '../../utils/helper';

const useStyles = makeStyles(() => ({
  upload: {
    cursor: 'pointer',
    borderRadius: '4px',
  },
  fileName: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
}));

function MuiFileInput({ buttonText, setFieldValue, values, ...props }) {
  const [field, meta] = useField(props);
  const classes = useStyles();
  const selectedFile = useRef(null);
  const handleUploadFile = () => {
    selectedFile.current.click();
  };
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (error) {
      Toast({
        icon: 'error',
        title: error || 'Some error occured',
      });
    }
  }, [error]);

  const handleCaptureFile = (files = []) => {
    if (files.length) {
      const file = files[0];
      const fileSizeInMB = file?.size / 1024 / 1024;
      if (fileSizeInMB <= MIN_UPLOADABLE_FILE_SIZE_IN_MBS) {
        setError('Error: File is empty');
      } else if (fileSizeInMB >= MAX_UPLOADABLE_IMAGE_SIZE_IN_MBS) {
        setError('Error: File size too large');
      } else if (['application/x-msdownload'].includes(file?.type)) {
        setError('Error: Executable files are not allowed!');
      } else {
        setFieldValue(props.name, file);
      }
    }
  };
  const getName = (url) => {
    const urlArray = url?.split('/');
    return url ? urlArray[urlArray?.length - 1] : '';
  };
  const documentToolTip = ({ file, url }) => {
    const toolTipTitle = file?.name || getName(url) || `Select ${buttonText} `;
    return toolTipTitle;
  };
  const handleFileName = (file) =>
    file?.name || getName(file) || 'No file chosen';
  return (
    <Box>
      <input
        type="file"
        ref={selectedFile}
        onChange={({ target }) =>
          handleCaptureFile(target.files, setFieldValue)
        }
        hidden
      />
      <Tooltip title={documentToolTip(values)}>
        <Box
          display="flex"
          alignItems="center"
          flexDirection={['column', 'row']}
          className={classes.upload}
          onClick={handleUploadFile}
          border={`1px solid ${
            meta.error && meta.touched ? colors.red : colors.silver
          }`}
          px={3}
          py={2.2}
          {...field}
        >
          <Button
            color="secondary"
            variant="contained"
            startIcon={<Add fontSize="small" />}
          >
            <ButtonText>{buttonText}</ButtonText>
          </Button>
          <Box mx={4} width={[1, '30%', '45%']}>
            <BodyTextLarge
              fontWeight="fontWeightMedium"
              color="grey"
              className={classes.fileName}
            >
              {handleFileName(field?.value)}
            </BodyTextLarge>
          </Box>
        </Box>
      </Tooltip>
      {meta.touched && meta.error ? (
        <FormHelperText error>{meta.error}</FormHelperText>
      ) : null}
    </Box>
  );
}

MuiFileInput.propTypes = {
  buttonText: PropTypes.string,
  setFieldValue: PropTypes.func,
  values: PropTypes.object,
};

export default memo(MuiFileInput);
