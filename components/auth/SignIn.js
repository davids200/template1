import React, { useState,useEffect } from 'react' 
//import { loginUser } from '../../redux/slices/userSlice'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image'
import { setUser,signOut } from '../../redux/slices/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { toastError,toastSuccess } from '../../redux/slices/toastSlice';
import styles from './../../src/styles/Form.module.css';
import { useSession,getSession } from "next-auth/react"
import { 
  HiAtSymbol, 
  HiFingerPrint,
  HiArrowNarrowRight,
  HiUser
} from "react-icons/hi";  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const SigninPage = () => {
  const { data: session, status,loading } =  useSession() 
const dispatch = useDispatch()
const [show, setShow] = useState(false) 
const [loading2, setLoading2] = useState(false) 
const router = useRouter()



  
  const formik = useFormik({
    initialValues: { 
      email: 'ict@gmail.com',
      password: 'password',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email address is required!'),
      password: Yup.string().min(8, 'Must be 8 characters or more').required('Password is required'),
    }),
  })  

const handleSubmit = async (e) => {
  setLoading2(true) 
e.preventDefault()   

 
let response=await signIn('credentials', {
redirect: false,
email: e.target.email.value,
password: e.target.password.value,
callbackUrl: "/user/profile"
})
 
 
if(response.ok){    
 

setLoading2(false) 

if((session && session.token && session.token.user && session.token.user.loginUser)){
 
dispatch(setUser(session?.token?.user?.loginUser)) 
router.push('/user/profile')
//router.push(response.url)
} 
}

if(response.status===401){ 
dispatch(toastError("Invalid username or password!"))
setLoading2(false)
}



 
    

}
//Google Handler function
async function handleGoogleSignin(){
setLoading2(false)
const googleResponse= await signIn('google', { callbackUrl : process.env.BASE_URL,authorizationParams:['email']},  )
console.log("googleResponse",googleResponse)
}



  return (<>
   <div className=' bg-gray-400 p-5 lg:w-1/3 sm:w-100 md:w-3/4 mx-auto h-screen'>
    {/* <div className="bg-white p-8 rounded-lg shadow-md"> */}
      <h2 className="text-2xl font-bold mb-6 text-white">Login</h2>

    <form className='flex flex-col gap-5 w-100 bg-white p-6 rounded-lg border'  onSubmit={handleSubmit}>
 
<div className={`mb-0 ${styles.input_group} ${formik.errors.email && formik.touched.email ? 'border-rose-600' : ''}`}>
 
<input type="email" id="email" name="email" placeholder='Email address'
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.email}
className={styles.input_text}
required/>
<span className='icon flex items-center px-4'>
<HiAtSymbol size={20} />
</span>
</div>
<div className=' text-red-600 mb-0'>{formik.touched.email && formik.errors.email ? (
        <div>s{formik.errors.email}</div>
      ) : null} </div>
 



<div className={`mb-0 ${styles.input_group} ${formik.errors.password && formik.touched.password ? 'border-rose-600' : ''}`}>
 <input 
 type={`${show ? "text" : "password"}`}
 placeholder='Password'
id="password" 
name="password" 
className={styles.input_text}
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.password}
required/>
<span className='icon flex items-center px-4' onClick={() => setShow(!show)}>
<HiFingerPrint size={20} />
</span>
</div>
<div className=' text-red-600 mb-0'>{formik.touched.password && formik.errors.password ? (
<div>{formik.errors.password}</div>
) : null} 
</div>

{(loading2)? (
<button type="submit"  
className="flex w-full bg-blue-500 justify-center text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
>
<span className="mr-2">
<FontAwesomeIcon icon={faSpinner} className="animate-spin" />
</span>
Login...
</button>):(

<button type="submit"  disabled={!formik.isValid}
className="flex w-full bg-blue-500 justify-center text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
>
<span className="mr-2">
<HiArrowNarrowRight size={20} />
</span>
Sign In
</button>  
)
}
 
<hr></hr>

<div className="input-button">
<button type='button' onClick={handleGoogleSignin} className={styles.button_custom}>
Sign In with Google <Image alt='Google Login' src={'/assets/google.svg'} width="20" height={20} ></Image>
</button>
</div>

<hr></hr>

<div className='flex justify-between mt-5 '>
       <Link href='/resetpassword' className=' text-blue-900 text-lg ' > Forgot Password  </Link>         
        <Link  href='/register' className='text-green-600 text-lg ' > Register here  </Link>
       </div>


    </form>
    </div>
    {/* </div> */}
    </>
  )
}

export default SigninPage

