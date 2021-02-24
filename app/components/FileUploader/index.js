import {
  Box,
  Button,
  Grid,
  Paper,
  Tooltip,
  Typography,
  useTheme,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Add from '@material-ui/icons/Add';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import { BodyText, H6 } from 'components/typography';
import React, { useState } from 'react';

export default function MyUploader() {
  const theme = useTheme();
  // specify upload params and url for your files
  const [loading, setloading] = useState(false);
  // called every time a file's `status` changes

  // receives array of files that are done uploading when submit button is clicked
  // const handleSubmit = (files, allFiles) => {
  //   allFiles.forEach((f) => f.remove());
  // };
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleCapture = ({ target }) => {
    setSelectedFile(target.files[0]);
    setloading(true);
  };
  const handleClick = () => {
    inputEl.current.click();
  };
  const handleSubmit = () => {};

  const inputEl = React.useRef(null);

  return (
    <>
      <Grid
        Container
        xs={12}
        style={{
          flexDirection: 'column',
          display: 'flex',
          flex: 1,
          backgroundColor: 'white',
          padding: '2rem',
        }}
      >
        <Paper style={{ flex: 0.3 }}>
          <Box m={4}>
            <Grid xs={3}>
              <H6>Import Directory</H6>
            </Grid>
            <Grid xs={4}>
              <Box mt={3} mb={3}>
                <Button
                  onClick={() => {
                    const response = {
                      file:
                        'https://srv-store5.gofile.io/download/Nd4GV2/TemplateFile.xlsx',
                    };
                    // server sent the url to the file!
                    // now, let's download:
                    window.open(response.file, '_self');
                  }}
                  style={{
                    paddingLeft: 0,
                    display: 'flex',
                    alignItems: 'flex-end',
                  }}
                >
                  {/* <a
                  href=""
                  download="Template"
                > */}
                  <Box mr={1}>
                    <DescriptionOutlinedIcon
                      fontSize="small"
                      style={{ color: `${theme.palette.iconColor.secondary}` }}
                    />
                  </Box>
                  <Box>
                    <BodyText textTransform="initial" color="default">
                      Download Template File
                    </BodyText>
                  </Box>
                  {/* </a> */}
                </Button>
              </Box>
            </Grid>
            <Grid
              xs={12}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}
            >
              <Box style={{ display: 'flex' }}>
                <input
                  id="faceImage"
                  type="file"
                  onChange={handleCapture}
                  hidden
                  ref={inputEl}
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                />
                <Tooltip title="Select xlsx File">
                  <label htmlFor="faceImage">
                    <Button
                      color="secondary"
                      onClick={handleClick}
                      variant="contained"
                      startIcon={<Add fontSize="small" />}
                    >
                      <Typography variant="button">Upload</Typography>
                    </Button>
                  </label>
                </Tooltip>
                {selectedFile && (
                  <Box mx={6} style={{ alignItems: 'center', display: 'flex' }}>
                    <label>
                      {selectedFile ? selectedFile.name : 'Select Image'}
                    </label>
                    . . .{' '}
                  </Box>
                )}
              </Box>
              {/* {selectedFile && */}
              {selectedFile && (
                <Box
                  marginX={8}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  {loading && <CircularProgress size={20} />}
                  <Button
                    onClick={() => handleSubmit()}
                    color="primary"
                    disabled={loading}
                  >
                    Save
                  </Button>
                </Box>
              )}
            </Grid>
          </Box>
        </Paper>
        {/* <Dropzone
          getUploadParams={getUploadParams}
          onChangeStatus={handleChangeStatus}
          onSubmit={handleSubmit}
          accept=".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          styles={{ dropzone: { minHeight: 200, maxHeight: 250 } }}
        /> */}
      </Grid>
    </>
  );
}
