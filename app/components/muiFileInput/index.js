import { Box, Button, Tooltip } from '@material-ui/core';
import { Toast } from 'components';
import React, { useRef, useState } from 'react';

export function MuiFileInput({
  setImgFile,
  mutation,
  setFieldValue,
  name,
  acceptTypes,
  toolTipTitle = 'Select File',
  buttonText = 'Upload',
  BtnIcon,
}) {
  const inputEl = useRef(null);
  const [error, setError] = useState(undefined);

  const handleCapture = ({ target }) => {
    if (target.files[0]) {
      if (target.files[0].size / 1024 / 1024 <= 0) {
        setError('Error: File is empty');
      } else if (target.files[0].size / 1024 / 1024 >= 1) {
        setError('Error: File size too large');
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(target.files[0]);
        reader.onloadend = () => {
          setImgFile(reader.result);
        };
        setFieldValue(name, target.files[0]);
        setError(null);
      }
    }
  };
  const handleClick = () => {
    inputEl.current.click();
  };

  return (
    <>
      {error && <Toast variant="error">{error}</Toast>}
      <Box mb={2}>
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
            <Button
              color="secondary"
              onClick={handleClick}
              variant="contained"
              startIcon={BtnIcon && <BtnIcon fontSize="small" />}
              disabled={mutation.isLoading}
            >
              {buttonText}
            </Button>
          </label>
        </Tooltip>
      </Box>
    </>
  );
}
