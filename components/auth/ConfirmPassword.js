 import { useState } from "react";
 import { useMutation } from "@apollo/client";
 import Link from "next/link";
 import {RESET_PASSWORD} from '../../graphql/mutations/userMutations';
 

function SendPasswordReset() {
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState(''); 
const [resetMyPassword, { loading, error, data }] = useMutation(RESET_PASSWORD);

const handleSubmit = async (event) => {
event.preventDefault();
const { data } = await resetMyPassword({ variables: { token, password } });
if (data.resetMyPassword.success) {
router.push("/login");
} else {
console.error(data.resetMyPassword.message);
}
};


  return (<>
  <div className=' bg-gray-400 p-5 lg:w-1/3 sm:w-100 md:w-3/4 mx-auto h-screen'>
      
      <h2 className="text-xl font-medium mb-4 text-xl text-white">Confirm Password Reset</h2>
      <hr className='border-white mb-5 '></hr>

    <form onSubmit={handleSubmit}  className='flex flex-col gap-2 shadow w-100 bg-white p-6 rounded-lg border' >
         
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 p-2 rounded-lg"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-2">
             Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full border border-gray-300 p-2 rounded-lg"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 sm:w-full text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Reset Password'}
          </button>

           
       <div className='flex justify-between mt-5 '>
       <Link href='/login' className=' text-blue-900 text-lg ' > Login here  </Link>         
        <Link  href='/register' className='text-green-600 text-lg ' > Register here  </Link>
       </div> 
        </form>
        </div>
  </>
    
  )
}

export default SendPasswordReset