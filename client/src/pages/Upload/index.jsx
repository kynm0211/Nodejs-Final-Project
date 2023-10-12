import React, { useState } from 'react';
import './upload.css';

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false); // Track upload progress
  const [uploadError, setUploadError] = useState(null); // Store upload error message

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Start uploading and show loading indicator
      setUploading(true);
      setUploadError(null);

      fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json(); // Assuming the server sends JSON response
        })
        .then((data) => {
          // Handle the response from the server here
          console.log('File upload successful:', data);
          // Clear the selected file and loading indicator on success
          setSelectedFile(null);
          setUploading(false);
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
          // Display the error message to the user
          setUploadError('An error occurred while uploading the file.');
          setUploading(false);
        });
    } else {
      alert('Please select a file to upload.');
    }
  };

  return (
    <div className="file-upload-container">
      <h2>File Upload</h2>
      <input
        type="file"
        onChange={handleFileChange}
      />
      <button id='buttonUpload' onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {uploadError && <div className="error-message">{uploadError}</div>}
    </div>
  );
}

export default Upload;
