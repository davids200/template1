/* eslint-disable react/no-unknown-property */
import Head from 'next/head'
import AuthLayout from '../../../components/layout/AuthLayout'
import Link from 'next/link'
import styles from '../styles/Form.module.css';
import Image from 'next/image'
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useState } from 'react';
//import { signIn, signOut } from "next-auth/react"
import { useFormik } from 'formik';
//import login_validate from '../lib/validate';
import { useRouter } from 'next/router'; 
import { useSelector, useDispatch } from 'react-redux';
import { toastError, toastSuccess } from '../../redux/reducers/toastReducer';
import { setIsAuthenticated, setAuthUser } from '../../redux/reducers/authReducer'; 
import { signIn } from '../api/auth/auth' 
import { jwt } from 'jsonwebtoken';

import { useEffect } from 'react';
import { useMutation,gql } from '@apollo/client';
import { getSession,useSession} from 'next-auth/react';

export default function Login(){ 
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

const dispatch = useDispatch()

const [show, setShow] = useState(false)
const router = useRouter()

async function onSubmit(e) {
e.preventDefault()
const result=await signIn({ email, password });
console.log("result in login",result)
if(result.data){
    const token = jwt.sign({ id:result.data.id }, 'mySecret');
    console.log("token in login",token)
    dispatch(setAuthUser(result.data.login));
    router.push('/')
}
else{
    dispatch(toastError("Invalid username or password!"))  
 //   router.push('/')
} 
}


//Google Handler function
async function handleGoogleSignin(){
signIn('google', { callbackUrl : "http://localhost:3000",authorizationParams:['email']},
)
}

// Github Login 
async function handleGithubSignin(){
signIn('github', { callbackUrl : "http://localhost:3000"})
}
//Twitter Login
async function handleTwitterSignin(){
signIn('twitter', { callbackUrl : "http://localhost:3000"})
}

    return (
        <AuthLayout>

        <Head>
            <title>Login</title>
        </Head>
        
        <section className='w-3/4 mx-auto flex flex-col gap-10'>
            <div className="title">
                <h1 className='text-gray-800 text-4xl font-bold py-4'>Explore</h1>
                <p className='w-3/4 mx-auto text-gray-400'>Login to the system</p>
            </div>

            {/* form */}

{/* <form onSubmit={onSubmit}>
<div className={`${styles.input_group} `}>
<input
type="text"
placeholder="username"
onChange={(e) => setUsername(e.target.value)}
/>
<span className='icon flex items-center px-4'>
                        <HiAtSymbol size={25} />
                    </span>
</div>

<input
type="password"
placeholder="password"
onChange={(e) => setPassword(e.target.value)}
></input>
<button type="submit">Sign In</button>
</form> */}


            <form className='flex flex-col gap-5' method='post' onSubmit={onSubmit}>
                <div className={`${styles.input_group} `}>
<input
type="text"
placeholder="Email"
name="email"
onChange={(e) => setEmail(e.target.value)}
className={styles.input_text} 
/>    
<span className='icon flex items-center px-4'>
<HiAtSymbol size={25} />
</span>
</div>
  
  
  
<div className={`${styles.input_group} `}>
<input 
type={`${show ? "text" : "password"}`}
name='password'
placeholder='Password'
className={styles.input_text}
onChange={(e) => setPassword(e.target.value)} 
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
                <div className="input-button">
                    <button type='button' onClick={handleTwitterSignin} className={styles.button_custom}>
                        Sign In with Twitter <Image alt=' Login' src={'/assets/twitter.png'} width={27} height={20}></Image>
                    </button>
                </div>

                <div className="input-button">
                    <button type='button' onClick={handleGoogleSignin} className={styles.button_custom}>
                        Sign In with Google <Image alt='Google Login' src={'/assets/google.svg'} width="20" height={20} ></Image>
                    </button>
                </div>
                <div className="input-button">
                    <button type='button' onClick={handleGithubSignin} className={styles.button_custom}>
                        Sign In with Github <Image alt='Github Login' src={'/assets/github.svg'} width={25} height={25}></Image>
                    </button>
                </div>
            </form>

            {/* bottom */}
            <p className='text-center text-gray-400 '>
            Don&apos;t have an account yet? 
            <Link href={'/register'}  className='text-blue-700'>Sign Up</Link>
            </p>
        </section>

        </AuthLayout>
    )
}