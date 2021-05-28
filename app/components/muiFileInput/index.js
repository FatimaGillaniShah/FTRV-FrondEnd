import { Box, Button, IconButton, Tooltip } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import {
  MIN_UPLOADABLE_FILE_SIZE_IN_MBS,
  MAX_UPLOADABLE_FILE_SIZE_IN_MBS,
} from '../../utils/constants';
import { Toast } from '../../utils/helper';

export function MuiFileInput({
  setImgFile,
  mutation,
  setFieldValue,
  name,
  acceptTypes,
  toolTipTitle = 'Select File',
  buttonText = 'Upload',
  btnIcon,
  variant = 'contained',
  iconColor = 'secondary',
  fullWidth,
  size,
  isIcon = false,
}) {
  const inputEl = useRef(null);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (error) {
      Toast({
        icon: 'error',
        title: error,
      });
    }
  }, [error]);

  const handleCapture = ({ target }) => {
    const file = target?.files[0];
    const fileSizeInMB = file?.size / 1024 / 1024;
    if (file) {
      if (fileSizeInMB <= MIN_UPLOADABLE_FILE_SIZE_IN_MBS) {
        setError('Error: File is empty');
      } else if (fileSizeInMB >= MAX_UPLOADABLE_FILE_SIZE_IN_MBS) {
        setError('Error: File size too large');
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
          let fileObj = file;

          const image = new Image();
          image.src = window.URL.createObjectURL(file);
          image.onload = () => {
            fileObj = {
              height: image.height,
              width: image.width,
              file,
            };
            setFieldValue(name, fileObj);
          };
          setImgFile(reader.result);
        };
        setError(null);
      }
    }
  };
  const handleClick = () => {
    inputEl.current.click();
  };

  return (
    <>
      <Box>
        <input
          id={name}
          type="file"
          onChange={handleCapture}
          hidden
          ref={inputEl}
          accept={acceptTypes}
        />
        <Tooltip title={toolTipTitle}>
          <label htmlFor={name}>
            {isIcon ? (
              <IconButton onClick={handleClick} disabled={mutation?.isLoading}>
                {btnIcon && btnIcon}
              </IconButton>
            ) : (
              <Button
                size={size}
                fullWidth={fullWidth}
                color={iconColor}
                onClick={handleClick}
                variant={variant}
                startIcon={btnIcon && btnIcon}
                disabled={mutation?.isLoading}
              >
                {buttonText}
              </Button>
            )}
          </label>
        </Tooltip>
      </Box>
    </>
  );
}
