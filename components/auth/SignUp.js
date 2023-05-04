import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createUser } from '../../redux/slices/userSlice'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './../../src/styles/Form.module.css';
import { 
  HiAtSymbol, 
  HiFingerPrint,
  HiArrowNarrowRight,
  HiUser
} from "react-icons/hi";  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const SignupPage = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false) 
  const [show2, setShow2] = useState(false) 
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('');
  const [data,setData]=useState()
 
  const formik = useFormik({
    initialValues: { 
      name:'David',
      email: 'ict@gmail.com',
      password: 'password',
      comfirmPassword: 'password',
    },
    validationSchema: Yup.object({
      name: Yup.string().min(3, 'Must be 3 characters or more').required('Name is required!'),
      email: Yup.string().email('Invalid email address').required('Email address is required!'),
      password: Yup.string().min(8, 'Must be 8 characters or more').required('Password is required'),
      confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match!').required('Confirm password is required'),
    }),
  })  

  const handleSubmit = async (e) => {
   
    const input={
      id:'abc',
      name:e.target.name.value,
      email:e.target.email.value, 
      password:e.target.password.value,
      photo_url:''
    }

   setLoading(true)
    e.preventDefault()
   // dispatch(createUser(input))
   setLoading(false) 
  } 

  return (<>
  <div className=' bg-gray-400 p-5 lg:w-1/3 sm:w-100 md:w-3/4 mx-auto h-screen'>
    {/* <div className="bg-white p-8 rounded-lg shadow-md"> */}
      <h2 className="text-2xl font-bold mb-6 text-white ">Sign Up</h2>

    <form className='flex flex-col gap-2 shadow w-100 bg-white p-6 rounded-lg border'  onSubmit={handleSubmit}>
 
    <div className={`mb-0 ${styles.input_group} ${formik.errors.name && formik.touched.name ? 'border-rose-600' : ''}`}>
 
 <input 
 size="30"
 type="text" 
 id="name" 
 name="name" 
 placeholder='Full Name'
 onChange={formik.handleChange}
 onBlur={formik.handleBlur}
 value={formik.values.name}
 className={styles.input_text}
 required/>
 <span className='icon flex items-center px-4'>
 <HiUser size={20} />
 </span>
 </div>
 <div className=' text-red-600 mb-0'>{formik.touched.name && formik.errors.name ? (
         <div>{formik.errors.name}</div>
       ) : null} </div>


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


<div className={`mb-0 ${styles.input_group} ${formik.errors.password && formik.touched.password ? 'border-rose-600' : ''}`}>
<input 
type={`${show2 ? "text" : "password"}`} 
id="confirmPassword" 
name="confirmPassword" 
placeholder='Confirm Password'
className={styles.input_text}
onChange={formik.handleChange} 
onBlur={formik.handleBlur} 
value={formik.values.confirmPassword} />
<span className='icon flex items-center px-4' onClick={() => setShow2(!show2)}>
<HiFingerPrint size={20} />
</span>
</div>
<div className=' text-red-600 mb-0'>{formik.touched.confirmPassword && formik.errors.confirmPassword ? (
<div>{formik.errors.confirmPassword}</div>
) : null} 
</div>


{(loading)? (
<button type="submit" className="flex w-full bg-blue-500 justify-center text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
 >
<span className="mr-2">
<FontAwesomeIcon icon={faSpinner} className="animate-spin" />
</span>
Login...
</button>):(

<button type="submit" disabled={!formik.isValid}
className="flex w-full bg-blue-500 justify-center text-white py-2 rounded-lg hover:bg-blue-600 
transition duration-300">
<span className="mr-2">
<HiArrowNarrowRight size={20} />
</span>
Sign Upp
</button>  
)
}
 
<hr></hr>
<div className='flex justify-between mt-5 '>
       <Link href='/login' className=' text-blue-900 text-lg ' > Login here  </Link>         
        <Link  href='/resetpassword' className='text-green-600 text-lg ' > Forgot Password  </Link>
       </div>

    </form>
    </div>
    
    </>
  )
}

export default SignupPage
