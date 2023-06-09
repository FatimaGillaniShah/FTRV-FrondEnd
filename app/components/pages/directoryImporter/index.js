import { Box, Grid, Tooltip } from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import React, { useEffect } from 'react';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import { Toast } from '../../../utils/helper';
import { BodyTextSmall, ButtonText, H5 } from '../../typography';
import { useStyles } from './styles';
import Show from '../../show';
import { Button } from '../../index';

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
  useEffect(() => {
    if (error) {
      Toast({
        icon: 'error',
        title: error || 'Some error occured',
      });
    }
  }, [error]);

  return (
    <>
      <Grid container xs={12} direction="column" className={classes.root}>
        <Grid xs={12} className={classes.contentGrid} direction="column">
          <Grid xs={12} className={classes.headingGrid}>
            <H5>Import Directory</H5>
          </Grid>
          <Grid xs={12} className={classes.templateDownloadGrid}>
            <Box mt={3} mb={3} py={1}>
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
                  <BodyTextSmall color="default">
                    Download Template File
                  </BodyTextSmall>
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
                    loading={false}
                  >
                    <ButtonText>Upload</ButtonText>
                  </Button>
                </label>
              </Tooltip>
              <Show IF={selectedFile}>
                <Box mx={6} className={classes.fileLabelBox}>
                  <label>
                    {selectedFile ? selectedFile.name : 'Select File'}
                  </label>
                  . . .
                </Box>
              </Show>
            </Box>

            <Box mx={8} className={classes.submitBtn}>
              <Button
                onClick={() => handleSubmit()}
                color="secondary"
                disabled={!selectedFile || mutation.isLoading}
                loading={mutation.isLoading}
                variant="contained"
                startIcon={
                  <Show IF={!mutation.isLoading}>
                    <SaveOutlinedIcon fontSize="small" />
                  </Show>
                }
              >
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
