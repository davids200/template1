import { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Image from 'next/image';
import { useSelector } from 'react-redux';

const UPLOAD_FILE = gql`
  mutation UploadPhoto($user: String!, $photo_url: String!) {
    uploadPhoto(user: $user, photo_url: $photo_url) {
      id
      photo_url
      name
      email
    }
  }
`;

const UploadProfilePhoto = () => {
  const   { isAuthenticated,user } = useSelector(state => state.user);

const [name, setName] = useState(user.name);
const [email, setEmail] = useState(user.email);  
const [file, setFile] = useState();

const defaultPhoto="/assets/user.png"
 function resetFile(){
  setFile("/assets/user.png");
 }

  const [uploadFile] = useMutation(UPLOAD_FILE);

  const handleFileChange = (event) => {
    const file = event.target.files;    
    const filePath = URL.createObjectURL(file);
    setFile(filePath)
    // console.log(filePath);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('file', file);

    // console.log("form name: ",name);
    // console.log("form email: ",email);
     console.log("photo_url: file ",file);
    const { data } = await uploadFile({
      variables: {
        user:name,
        photo_url: file,
      },
    });

    console.log("form details: ",data);
  };




  return (
   <>
<div className='container mx-auto px-4 sm:px-6 lg:px-8 shadow  bg-blue-100 flex items-center justify-center h-screen'>
    
<form onSubmit={handleSubmit} className='px-4 py-4 shadow-md bg-gray-100 rounded'>
<h1 className=' text-blue-900 text-lg  bg-gray-100 flex justify-center items-center'>Upload Profile Picture</h1>
<hr></hr>

<div className='flex justify-right justify-items-center items-center block px-5 mb-4 max-h-60 min-h-60'>
<Image src={file || defaultPhoto} alt="" 
width={100}
height={120}  
className="rounded mb-5 max-h-110 max-w-2xl"/>     
<div className="block px-5 mb-4">
<div className='text-red-900'>
    <a href='#' className='rounded my-2 py-1 px-1 bg-red-900 text-white'  onClick={()=>resetFile()}>Reset</a>
    </div>  <br></br>

<label>
File:
<input type="file" onChange={handleFileChange} accept="image/*"/>
</label> 
</div>

    </div>
   
    

<div className="block px-5 mb-4">
  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name: </label>
  <input 
  type="text" value={name} 
  placeholder="Name"
  
  onChange={(event) => setName(event.target.value)} 
  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
  required />
  </div>

  <div className="block px-5 mb-4">
  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email: </label>
  <input 
  type="email" value={email} 
  placeholder="Email address"
  onChange={(event) => setEmail(event.target.value)} 
  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
  required />
  </div>


<div className="block px-5 mb-4 py-3"> 
      <button type="submit" className='btn bg-gray-900 px-5 py-2 text-white rounded'>Submit</button>
</div>

    </form>
    </div>
   </>
  );
};

export default UploadProfilePhoto;