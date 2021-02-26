import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Tooltip,
  Typography,
  Card,
} from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import { BodyText, H6 } from 'components/typography';
import React from 'react';
import Toast from '../alert';
import { useStyles } from './styles';

export default function FileUploader({
  handleCapture,
  handleClick,
  handleSubmit,
  handleTemplateDownload,
  mutation,
  error,
  selectedFile,
  inputEl,
}) {
  const classes = useStyles();

  const { data: { data: { data: { message } = {} } = {} } = {} } = mutation;

  return (
    <>
      {error && <Toast variant="error"> {error} </Toast>}

      {mutation.isError && (
        <Toast variant="error">
          {mutation.error && mutation.error.message}{' '}
        </Toast>
      )}

      {mutation.isSuccess && (
        <Toast variant="success">{message && message}</Toast>
      )}

      <Grid container xs={12} direction="column" className={classes.root}>
        <Card>
          <Grid xs={12} className={classes.contentGrid} direction="column">
            <Grid xs={12} className={classes.headingGrid}>
              <H6>Import Directory</H6>
            </Grid>
            <Grid xs={12} className={classes.templateDownloadGrid}>
              <Box mt={3} mb={3}>
                <Button
                  onClick={handleTemplateDownload}
                  className={classes.templateDownloadBtn}
                >
                  <Box mr={1}>
                    <DescriptionOutlinedIcon
                      fontSize="small"
                      className={classes.templateBtnIcon}
                    />
                  </Box>
                  <Box>
                    <BodyText textTransform="initial" color="default">
                      Download Template File
                    </BodyText>
                  </Box>
                </Button>
              </Box>
            </Grid>
            <Grid
              xs={12}
              className={classes.uploadFileGrid}
              justify="space-between"
            >
              <Box className={classes.uploadBtnBox}>
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
                      disabled={mutation.isLoading}
                    >
                      <Typography variant="button">Upload</Typography>
                    </Button>
                  </label>
                </Tooltip>
                {selectedFile && (
                  <Box mx={6} className={classes.fileLabelBox}>
                    <label>
                      {selectedFile ? selectedFile.name : 'Select File'}
                    </label>
                    . . .{' '}
                  </Box>
                )}
              </Box>

              <Box marginX={8} className={classes.submitBtn}>
                <Button
                  onClick={() => handleSubmit()}
                  color="secondary"
                  disabled={!selectedFile}
                  variant="contained"
                >
                  {mutation.isLoading && (
                    <CircularProgress
                      size={15}
                      className={classes.circularProgress}
                    />
                  )}
                  Submit
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </>
  );
}
