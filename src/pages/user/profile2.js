import { React,useEffect} from 'react';
 import { Formik,Field,Form } from 'formik';
import PrivateLayout from '../../../components/layout/PrivateLayout'
import { getSession } from "next-auth/react"
import { useRouter } from 'next/router';
import ProfileUpdate from '../../../components/profile/profile-update-modal';
import {getToken,decode} from 'next-auth/jwt'

const handler = async(req, res)=> {
  const secret = process.env.SECRET
  const token = await getToken({ req, secret });
  const accessToken = token.accessToken;
  console.log(accessToken)
}

const Profile = ({session}) => {
  const defaultImage="/assets/user.png"
 
  return (
    <PrivateLayout>
    <ProfileUpdate/>
    <div className="flex flex-col place-content-start  grid-flow-col mt-10 px-10 md:px-2">
    <h1 className='text-left text-4xl text-blue-900 px-10'>Profile page</h1>
     
    
    <Formik
      initialValues={{
        firstName:'',
        lastName: '',
        email: '',
      }}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >

<div className='text-left'>

<Form className='px-1 py-5 min-w-full min-h-max bg-gray-200 w-auto'>
<h1 className='px-10 md:px-7 text-green-600 bottom-1 '>BIO Info</h1>

<div className='grid className=rounded rounded ml-7'>
 <picture> <img src={session.user.image || defaultImage} alt={session?.user?.data?.login.name} width={120} height={120}    /> 
 </picture> </div>

<div className=' p-2 mx-5 py-5 text-left '>
<label htmlFor="firstName">First Name: &nbsp; </label><br/>
<Field id="firstName" name="firstName" placeholder="Jane" size="40" className="pl-2"
  value={session?.user?.data?.login?.name}
/>
</div>

<div className=' p-2 mx-5 py-5 text-left '>
<label htmlFor="lastName">Last Name:&nbsp;</label><br/>
<Field id="lastName" name="lastName" placeholder="Doe" size="40" className="pl-2"
  value={session?.user?.data?.login?.name}
/>
</div>
       
<div className='p-2 mx-5 py-5 text-left w-200'>
<label htmlFor="email">Email</label><br/>
<Field 
id="email" name="email" value={session?.user?.data?.login?.email} type="email" size="40" className="pl-2" /> 
</div>

<div className='p-2 mx-5 py-5 text-left '>
<button type="submit" className='button bg-gray-800 p-2 shadow-sm shadow rounded text-white'>Update Profile</button>
</div>
      </Form>
      </div>
    </Formik>
  </div>
  
    </PrivateLayout>
  );
}

export default Profile;



export async function getServerSideProps({req}) {
  const session=await getSession({req})
  const f=req.cookie
 
  if(!session){
   return{
     redirect:{
       destination:"/login",
       permanent:false
     }
   }
  
   }
   //authorised user return session
   return{
     props:{
      session
    }
   }
 }