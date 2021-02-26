/**
 *
 * DirectoryUploader
 *
 */

import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation } from 'react-query';
import EmployeeFileUploader from '../../components/directoryImporter';
import { uploadEmployeeFile } from '../../state/queryFunctions';

function DirectoryUploader() {
  const mutation = useMutation((fileUpload) => uploadEmployeeFile(fileUpload));
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const inputEl = React.useRef(null);

  const handleCapture = ({ target }) => {
    if (target.files[0]) {
      if (target.files[0].size / 1024 / 1024 <= 0) {
        setError('Error: File is empty');
      } else if (target.files[0].size / 1024 / 1024 >= 10) {
        setError('Error: File size too large');
      } else {
        setSelectedFile(target.files[0]);
        setError(null);
      }
    }
  };
  const handleClick = () => {
    inputEl.current.click();
  };
  const handleSubmit = () => {
    const dataFile = new FormData();
    dataFile.append('file', selectedFile);
    mutation.mutate(dataFile);
  };

  const handleTemplateDownload = () => {
    const response = {
      file: 'https://srv-store5.gofile.io/download/Nd4GV2/TemplateFile.xlsx',
    };
    window.open(response.file, '_self');
  };
  useEffect(() => {
    if (mutation.isSuccess) {
      setSelectedFile(null);
    }
  }, [mutation.isSuccess]);

  return (
    <>
      <Helmet>
        <title>Directory Uploader</title>
        <meta
          name="ftrv directory uploader"
          content="ftrv - Upload directory file"
        />
      </Helmet>

      <EmployeeFileUploader
        handleCapture={handleCapture}
        handleClick={handleClick}
        handleSubmit={handleSubmit}
        handleTemplateDownload={handleTemplateDownload}
        mutation={mutation}
        error={error}
        selectedFile={selectedFile}
        inputEl={inputEl}
      />
    </>
  );
}

export default memo(DirectoryUploader);
