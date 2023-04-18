import React, { useState } from "react";
import axios from 'axios';

const FileUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // const formData = new FormData();
    // formData.append("file", selectedFile);
   

    try {
      //  const file = e.target.files[0]
        const formData = new FormData()
        formData.append("file", selectedFile);
        //formData.append('file', file)
     const response= await  axios.post('/api/uploads/upload1', formData)
     console.log("response",response)
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FileUploadForm;
