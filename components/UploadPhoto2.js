import { useState } from 'react';
import Dropzone from 'react-dropzone';
import { S3 } from 'aws-sdk';
import { useMutation } from '@apollo/client';
import { UPLOAD_PHOTO } from '../graphql/mutations/userMutations';

const UploadForm = () => {
const [uploadProgress, setUploadProgress] = useState(0);
const [uploadedFile, setUploadedFile] = useState(null);

const [uploadPhoto] = useMutation(UPLOAD_PHOTO);

const handleDrop = async (acceptedFiles) => {


const file = acceptedFiles[0];
const fileName = `profile/4444.jpg`;
console.log("file file",file)
//return
/////////////////////////////////////////////////
const { data } = await uploadPhoto({
  variables: {
    userId:"my name",
    photo_url: {file},
  },
});



console.log("form details: ",data);
/////////////////////////////////////////////
return
const s3 = new S3({
accessKeyId: process.env.AWS_ACCESS_KEY_ID,
secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
region: process.env.AWS_REGION,
});



    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      Body: file,
      ContentType: file.type,
    };

    const options = {
      partSize: 10 * 1024 * 1024, // 10 MB
      queueSize: 1,
    };

    /////////SERVER SIDE////////////////////////
    const uploader = s3.upload(params, options);
    /////////SERVER SIDE////////////////////////

    uploader.on('httpUploadProgress', (progress) => {
      setUploadProgress(Math.round((progress.loaded / progress.total) * 100));
    });

    try {
     const res= await uploader.promise();
     console.log("uploading file: ",res.Location)
      setUploadedFile(fileName);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className='bg-gray-300 box-border h-22 w-60 p-4 border-4'>
      <Dropzone onDrop={handleDrop} >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag and drop a file here, or Click to select a file</p>
          </div>
        )}
      </Dropzone>

      </div>
      {uploadedFile && <p>Uploaded: {uploadedFile}</p>}
      {uploadProgress > 0 && <progress value={uploadProgress} max="100" />}
    </div>
  );
};

export default UploadForm;
