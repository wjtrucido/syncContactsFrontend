import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';
import FileSelectInfo from './FileSelectionInfo';
import InfoUploadContacts from './ContactsUploadInfo';

const FileUploadContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const FileInput = styled.input`
  display: none;
`;
const FileInputLabel = styled.label`
  margin-bottom: 16px;
  margin-left: 8px;
  padding: 8px 16px;
  background-color: #94939B;
  border-radius: 3px;
  text-size:10px;
  cursor: pointer;

  :hover {
    background-color: #868585;
  }`;
const UploadButton = styled.button`
  min-width: 110px;
  margin-bottom: 16px;
  margin-left: 8px;
  padding: 8px 16px;
  background-color: #4CAF50;
  border: none;
  border-radius: 3px;
  color: white;
  cursor: pointer;
  font-size: 16px;
:hover {
    background-color: #299E0F;
  }
`;

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    } else {
      alert('Only CSV files are accepted.');
    }
  };
  const handleUploadClick = () => {
    if (!file) {
      alert('You must select a file.');
      return;
    } else {
      setLoading(true);
    }
  }
  useEffect(() => {
    const uploadFile = async () => {
      const formData = new FormData();
      formData.append('csvFile', file);
      try {
        const response = await fetch('http://localhost:5002/app-sync/upload', {
          method: 'POST',
          body: formData,
        });
        if (response.status === 201) {
          const data = await response.json();
          setMessage(data.ok)
        } else {
          setMessage('An error occurred while trying to upload contacts.')
        }
      } catch (error) {
        setMessage('An unexpected error has occurred.');
      } finally {
        setLoading(false);
      }
    };
    if (file && loading) {
      uploadFile();
    }
  }, [file, loading]);

  return (
    <>
      <FileUploadContainer>
        <FileInputLabel>
          <div>Select a csv file</div>
          <FileInput type="file" onChange={handleFileChange} accept=".csv" />
        </FileInputLabel>
        <UploadButton onClick={handleUploadClick} disabled={loading} > {loading ? <CircularProgress sx={{ color: 'white' }} size={15} /> : 'Upload file'}</UploadButton>
      </FileUploadContainer>
      <FileSelectInfo fileName={fileName} />
      <InfoUploadContacts message={message} />
    </>
  );
};
export default FileUpload;