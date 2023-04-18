import { useState } from 'react';
import Dropzone from 'react-dropzone';
import { S3 } from 'aws-sdk';
import { useMutation } from '@apollo/client';
import { UPLOAD_PHOTO } from '../graphql/mutations/userMutations';
import Image from 'next/image';
import { useSelector } from 'react-redux';

const UploadForm = () => {
const [uploadProgress, setUploadProgress] = useState(0);
const [uploadedFile, setUploadedFile] = useState(null);
const [uploadPhoto] = useMutation(UPLOAD_PHOTO);
const defaultPicture="/assets/user.png"
const   { isAuthenticated,user } = useSelector(state => state.user);


const handlePhoto = async (photo) => {

const file = photo[0];
const fileName = `profile/4444.jpg`;
console.log("file file",file) 

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
    <>

<Dropzone onDrop={handlePhoto} className='p-5 h-screen bg-green-300 border'>

{({ getRootProps, getInputProps }) => (
<div {...getRootProps()} >          

{  (user.photo_url)? (
<Image src={user.photo_url} width="70" height="80" alt="" className='h-[7rem] w-[7rem] rounded-full'>
</Image>):

(<Image src={defaultPicture} width="70" height="80" alt="" className='h-[7rem] w-[7rem] rounded-md'>
</Image> 
)

 }
 <p>Change profile picture</p>
 

<input {...getInputProps()}  className='bg-green-500'/>
</div>
)}
</Dropzone>  
        
{uploadedFile && <p>Uploaded: {uploadedFile}</p>}
{uploadProgress > 0 && <progress value={uploadProgress} max="100" />}
</>  

  );
};

export default UploadForm;
