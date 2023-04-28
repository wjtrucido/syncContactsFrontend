import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import CircularProgress from '@mui/material/CircularProgress'
import InfoDownloadContacts from './ContactsDownloadInfo'

const DownloadButton = styled.button`
display: flex;
justify-content: center;
min-width: 130px;
margin-left: 8px;
margin-top: 30px;
margin-bottom: 15px;
padding: 8px 16px;
background-color: #4D74CB;
border: none;
border-radius: 4px;
font-size: 16px;
color: white;
cursor: pointer;

:hover {
  background-color: #363FCF;
}`

const FileDownload = () => {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [url]);

  const handleDownloadClick = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5002/app-sync/download');
      if (response.status === 200) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setUrl(url);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'archivo.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setLoading(false);
        setMessage('Download completed.');
      } else {
        setMessage('An error occurred while trying to download.');
      }
    } catch (error) {
      setMessage('An unexpected error has occurred.');
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <DownloadButton onClick={handleDownloadClick} disabled={loading}>
        {loading ? <CircularProgress sx={{ color: 'white' }} size={20} /> : 'Download file'}
      </DownloadButton>
      <InfoDownloadContacts message={message} />
    </div>
  )
}
export default FileDownload;