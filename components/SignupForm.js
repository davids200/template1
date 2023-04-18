import { useState } from 'react';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

export default function MyForm() {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({});

  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
   region:process.env.AWS_REGION
  
  });

  
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const values = Object.fromEntries(data.entries());
    setFormData(values);

    const fileKey = `app-images1/${file.name}`;


    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileKey,
      Body: file,
    }; 
    try {
      const result = await s3.upload(uploadParams).promise();
      console.log(`File uploaded successfully. URL: ${result.Location}`);
    } catch (error) {
      console.error(`Error uploading file: ${error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" />
      </label>  <br></br>

      <label>
        Email:
        <input type="email" name="email" />
      </label><br></br>

      <label>
        File:
        <input type="file" name="file" onChange={handleFileChange} />
      </label><br></br><br></br>

      <button type="submit">Submit</button>
    </form>
  );
}
