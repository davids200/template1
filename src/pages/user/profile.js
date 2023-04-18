import { Fragment, React,useEffect} from 'react';
import PrivateLayout from '../../../components/layout/PrivateLayout'
import Dropzone from 'react-dropzone';
//import { useParams } from "react-router";
import { useSession,getSession } from "next-auth/react"
import { useState } from "react"; 
import { useRouter } from "next/router"; 
//import Image from 'next/image';
import { S3 } from 'aws-sdk'; 
import { useMutation } from '@apollo/client';
import { useSelector,useDispatch } from 'react-redux';
import { UPLOAD_PROFILE_PICTURE } from "../../../graphql/mutations/userMutations";
import {updateProfilePicture,setUser} from "../../../redux/slices/userSlice"
import UpdateUserInfo from './updateuser';
 

const Profile=({ session2 })=> {  

const defaultPicture="/assets/user.png"
const router= useRouter() 
const [uploadProgress, setUploadProgress] = useState(0);
const [uploadedFile, setUploadedFile] = useState(null);
const [picture,setPicture] = useState(null)
const [uploadPhoto] = useMutation(UPLOAD_PROFILE_PICTURE);
const dispatch = useDispatch()
const   { isAuthenticated,user } = useSelector(state => state.user);


if(!isAuthenticated || !session2){
  if (typeof window !== 'undefined') {
    router.push('/user/login')
  } 
}

const handlePhoto = async (photo) => { 
//confirm first
const confirmed = window.confirm('Are you sure you want to edit picture?');
if (!confirmed) {
  return
} else {
  
const file = photo[0];
const fileName = `profile/${user.id}.jpg`;
  
  
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
const { Location }= await uploader.promise();
setPicture(Location)
/////////////// UPDATE USER TABLE IN DATABASE ///////////////////////

const submitted = await uploadPhoto({
variables: {
user:user?.id,
photo_url: Location,
},
});
//after picture upload, update redux with photo
if(submitted) dispatch(updateProfilePicture(Location))
//router.push('/dashboard')
//router.reload()
} catch (error) {
console.log("upload error",error);
}
}
};



 



if(isAuthenticated){

  return (
    <Fragment>
    <PrivateLayout>
 
 

    <div className="container">  
    
       <div
        style={{
          marginBottom: "2rem",
          display: "flex ",
          justifyContent: "space-between",
        }}
      >
<div>
<Dropzone onDrop={handlePhoto} className='p-5  bg-green-300 border'>

{({ getRootProps, getInputProps }) => (
<div {...getRootProps()} > 

  {/* <Image 
  src={picture || user.photo_url} 
  width="70" height="80" 
  alt="" 
  className='h-[7rem] w-[7rem] rounded-full'
  priority={false}
  >
</Image>    */}


{(user.photo_url)? (
<picture >
<img src={user.photo_url} width={100} height={100} alt={user?.name}   
className='rounded-full'/>
</picture>

):

(<picture>
<img src={defaultPicture} width={100} height={100} alt={user?.name}/>
</picture>)
 }
 <p>Change profile picture</p>
<input {...getInputProps()}  className='bg-green-500'/>
</div>
)}
</Dropzone>  
        
{uploadedFile && <p>Uploaded: {uploadedFile}</p>}
{uploadProgress > 0 && <progress value={uploadProgress} max="100" />}  

<hr className="py-2 "></hr>
</div>
</div> 

<div className="flex  border mb-2">
<div className="flex border-b-2 p-1  mb-1 bg-gray-300">Email: </div>  
<div className="flex-1 border-bottom  mb-1 p-1 text-right bg-gray-300">
<b className='flex cursor-pointer'>{user?.email}</b></div>  
</div>

<div className="flex  border mb-2">
<div className="flex border-b-2 p-1  mb-1 bg-gray-100">Full Name: </div>  
<div className="flex-1 border-bottom  mb-1 p-1 text-right bg-gray-50">
<b className='flex cursor-pointer'><UpdateUserInfo buttonTitle={user?.name}/></b></div>  
</div>
 
 <div className="flex  border mb-2">
<div className="flex border-b-2 p-1  mb-1 bg-gray-100">Role: </div>  
<div className="flex-1 border-bottom  mb-1 p-1 text-right bg-gray-50">
<b className='flex cursor-pointer'><UpdateUserInfo buttonTitle={user?.role}/></b></div>  
</div>
 

 
   
 
 </div>




   

</PrivateLayout>

</Fragment>
  );
}
}
export default   Profile;



export async function getServerSideProps({req}) {
  const session2=await getSession({req})
  const f=req.cookie
 
  if(!session2){
   return{
     redirect:{
       destination:"/user/login",
       permanent:false
     }
   }
  
   }
   //authorised user return session
   return{
     props:{
      session2
    }
   }
 }






