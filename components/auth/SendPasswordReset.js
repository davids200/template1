import { useMutation } from '@apollo/client';
import { SEND_RESET_PASSWORD_LINK } from '../../graphql/mutations/userMutations';
import { useState } from 'react';
import Link from 'next/link';


function sendResetPasswordLink() {
  const [email, setEmail] = useState('');
  const [sendResetPasswordLink, { loading, error, data }] = useMutation(SEND_RESET_PASSWORD_LINK);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await sendResetPasswordLink({ variables: { email } });
  };

  return (
    <div className=' bg-gray-400 p-5 lg:w-1/3 sm:w-100 md:w-3/4 mx-auto h-screen'>
      
        <h2 className="text-xl font-medium mb-4 text-xl text-white">Reset Password</h2>
        <hr className='border-white mb-5 '></hr>

        {data && data.resetPassword && (
          <p className="text-green-500 mb-4">An email with your new password has been sent.</p>
        )}
        {error && <p className="text-red-500 mb-4">{error.message}</p>}
        <form onSubmit={handleSubmit}  className='flex flex-col gap-2 shadow w-100 bg-white p-6 rounded-lg border' >
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 p-2 rounded-lg"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
    
  );
}

export default sendResetPasswordLink;
