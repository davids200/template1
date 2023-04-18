import Head from 'next/head'
import Layout from '../../../components/layout/AuthLayout'
import Link from 'next/link'
import styles from '../styles/Form.module.css';
import Image from 'next/image'
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { useState,useEffect, use } from 'react';
import { useFormik } from 'formik';
import { registerValidate } from '../../../lib/validate'
//import Users from '../model/Schema'
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { toastError,toastSuccess } from '../../redux/reducers/toastReducer';
 
import { signUp } from '../api/auth/auth'

export default function Register(){      
const URL=process.env.BASE_URL 
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [cpassword, setCpassword] = useState('')


const router=useRouter()
const dispatch = useDispatch()

const [show, setShow] = useState({ password: false, cpassword: false })

async function onSubmit(e) {
  e.preventDefault()
 const response=await signUp({ email, password,cpassword }).then(response=>{
  console.log("response in register",response)
 })

}



return (
<Layout>
<Head>
<title>Register</title>
</Head>

<section className='w-3/4 mx-auto flex flex-col gap-10'>
<div className="title">
<h1 className='text-gray-800 text-4xl font-bold py-4'>Register</h1>
<p className='w-3/4 mx-auto text-gray-400'>Create an account</p>
</div>

{/* form */}
<form className='flex flex-col gap-5' onSubmit={onSubmit}>

<div className={`${styles.input_group} `}>
<input 
type="email"
name='email'
placeholder='Email'
className={styles.input_text}
onChange={(e) => setEmail(e.target.value)} 
/>
<span className='icon flex items-center px-4'>
<HiAtSymbol size={25} />
</span>
</div>
{/* {formik.errors.email && formik.touched.email ? <span className='text-rose-500'>{formik.errors.email}</span> : <></>} */}
 
<div className={`${styles.input_group} `}>
    <input 
    type={`${show.password ? "text" : "password"}`}
    name='password'
    placeholder='password'
    className={styles.input_text}
    onChange={(e) => setPassword(e.target.value)} 
    />
        <span className='icon flex items-center px-4' onClick={() => setShow({ ...show, password: !show.password})}>
        <HiFingerPrint size={25} />
    </span>
 </div>

 <div className={`${styles.input_group} `}>
                      <input 
                    type={`${show.cpassword ? "text" : "password"}`}
                    name='cpassword'
                    placeholder='Confirm Password'
                    className={styles.input_text}
                    onChange={(e) => setCpassword(e.target.value)} 
                    />
                     <span className='icon flex items-center px-4' onClick={() => setShow({ ...show, cpassword: !show.cpassword})}>
                        <HiFingerPrint size={25} />
                    </span>
     </div>         
                {/* {formik.errors.cpassword && formik.touched.cpassword ? <span className='text-rose-500'>{formik.errors.cpassword}</span> : <></>} */}

                {/* login buttons */}
                <div className="input-button">
                    <button type='submit' className={styles.button}>
                        Sign Up
                    </button>
                </div>
            </form>

            {/* bottom */}
            <p className='text-center text-gray-400 '>
                Have an account? <Link href={'/login'} className='text-blue-700'>
                Login</Link>
            </p>
        </section>
        </Layout>
    )
}