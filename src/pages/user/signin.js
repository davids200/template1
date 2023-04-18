/* eslint-disable react/no-unknown-property */
import Head from 'next/head'
import AuthLayout from '../../../components/layout/AuthLayout'
import Link from 'next/link'
import styles from '../../src/styles/Form.module.css';
import Image from 'next/image'
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useState } from 'react';
import { signIn, signOut } from "next-auth/react"
import { useFormik } from 'formik';
import login_validate from '../../../lib/validate';
import { useRouter } from 'next/router'; 
import { useSelector, useDispatch } from 'react-redux';
import { toastError } from '../../redux/reducers/toastReducer';
//import LoadingScreen from "../../components/LoadingComponent";
import { setIsAuthenticated, setAuthUser } from '../../redux/reducers/authReducer';

export default function Login(){ 
    const [loading, setLoading] = useState(false);
const dispatch = useDispatch()

const [show, setShow] = useState(false)
const router = useRouter()
// formik hook
const formik = useFormik({
    initialValues: {
        email: '',
        password: ''
    },
    validate : login_validate,
    onSubmit
})
 
async function onSubmit(values){
   
const response = await signIn('credentials', {
    redirect: false,
    email: values.email,
    password: values.password,
    callbackUrl: "/profile"
})
 
console.log("res res res user in login",response) 


if(response.status===401){ 
dispatch(toastError("Invalid username or password!"))
}

if(response.ok){ 
const item=await localStorage.getItem('authUser');
 console.log("response user in login",response)   
    //dispatch(setAuthUser(values));
    router.push(response.url);
}

}
 
    return (
      <>

        <Head>
            <title>Login</title>
        </Head>
        
        <section className='w-3/4 mx-auto flex flex-col gap-10'>
            <div className="title">
                <h1 className='text-gray-800 text-4xl font-bold py-4'>Explore</h1>
                <p className='w-3/4 mx-auto text-gray-400'>Login to the system</p>
            </div>

            {/* form */}
            <form className='flex flex-col gap-5' onSubmit={formik.handleSubmit}>
                <div className={`${styles.input_group} ${formik.errors.email && formik.touched.email ? 'border-rose-600' : ''}`}>
                    <input 
                    type="email"
                    name='email'
                    placeholder='Email'
                    className={styles.input_text}
                    {...formik.getFieldProps('email')}
                    />
                    <span className='icon flex items-center px-4'>
                        <HiAtSymbol size={25} />
                    </span>
                   
                </div>
                {/* {formik.errors.email && formik.touched.email ? <span className='text-rose-500'>{formik.errors.email}</span> : <></>} */}

                <div className={`${styles.input_group} ${formik.errors.password && formik.touched.password ? 'border-rose-600' : ''}`}>
                    <input 
                    type={`${show ? "text" : "password"}`}
                    name='password'
                    placeholder='password'
                    className={styles.input_text}
                    {...formik.getFieldProps('password')}
                    />
                     <span className='icon flex items-center px-4' onClick={() => setShow(!show)}>
                        <HiFingerPrint size={25} />
                    </span>
                   
                </div>

                {/* {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span> : <></>} */}
                {/* login buttons */}
                <div className="input-button">
                    <button type='submit' className={styles.button}>
                        Login
                    </button> 

{/* <div className='w-50 flex'><LoadingScreen/></div> */}

                </div>
               
            </form>

            {/* bottom */}
            <p className='text-center text-gray-400 '>
            Don&apos;t have an account yet? 
            <Link href={'/register'}  className='text-blue-700'>Sign Up</Link>
            </p>
        </section>

        </>
    )
}