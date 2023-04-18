import React, { useState,useEffect } from 'react';
import Modal from '../../../components/modals/FormModal';
import { useMutation } from '@apollo/client';
import { 
HiPencilAlt
} from "react-icons/hi"; 
import { useFormik } from 'formik';
import { editUserSchema } from "../../../utils/form-validation/user"
import { useSelector,useDispatch } from 'react-redux';
import { UPDATE_USER, } from "../../../graphql/mutations/userMutations";
import { updateUserDetails } from "../../../redux/slices/userSlice" 

export default function UpdateUserInfo({buttonTitle}) {
const [modalOpen, setUserEditModal] = useState(false);
const   { isAuthenticated,user } = useSelector(state => state.user);
const [isSubmitting, setIsSubmitting] = useState(false);
const [message,setMessage]=useState('')
  

const [updateUser] = useMutation(UPDATE_USER);
const dispatch=useDispatch()
let submitted;
 
const formik = useFormik({
initialValues: {
email: user?.email,
name: user?.name,
role:user?.role
},
validationSchema: editUserSchema,
// onChange:async()=>{
//   console.log("onchange formik")
//   setMessage('')
// },
onSubmit: async(values) => {  
setMessage('')  
setIsSubmitting(true)
 
submitted = await updateUser({variables: {user:user?.id,input:values},}) 

dispatch(updateUserDetails(submitted.data.updateUser));
setIsSubmitting(false)
setMessage("Record updated successfully.") 
},
})
 


function openUserEditModal() {
setIsSubmitting(false)
setMessage('')
setUserEditModal(true);
}

function closeUserEditModal() {
setIsSubmitting(false)
setMessage('')
setUserEditModal(false);
}

  return (
    <div>
     <button className='flex ' onClick={openUserEditModal}>{buttonTitle}&nbsp;&nbsp;
     <HiPencilAlt className='text-red-900'/></button> 
    
<Modal isOpen={modalOpen} onClose={closeUserEditModal}>
<div className='flex justify-between items-center  text-lg sm:text-lg'>  
<div className="flex items-center justify-between"><HiPencilAlt className='text-red-900'/>&nbsp; Edit User</div>
<button onClick={closeUserEditModal}>X</button></div>
<hr></hr>
<br></br>


{/* /////////////////////////////////////////////////////////////////////// */}
<div className="w-full max-w-xs"> 

<form className="bg-white  rounded px-1 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
 
 
<div className="mb-4">
<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
Email
</label>
<input  
id="username" 
type="text" 
disabled
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.email}  
className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
{formik.touched.email && formik.errors.email ? (
<div className='text-red-600'>{formik.errors.email}</div>
      ) : null}
</div>

<div className="mb-4">
<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
Name
</label>
<input  
id="name" 
type="text" 
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.name} 
className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
 {formik.touched.name && formik.errors.name ? (
<div className='text-red-600'>{formik.errors.name}</div>
) : null}
</div>

<div className="mb-4">
<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
Role
</label>

<div className="flex justify-start">
<div className="mb-3 xl:w-96">
<select data-te-select-init
id='role'
name='role'
onChange={formik.handleChange}
onBlur={formik.handleBlur}
value={formik.values.role}  
className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
<option defaultValue={user?.role} value={user?.role}>{user?.role}</option>
<option value="USER">USER</option>
<option value="ADMIN">ADMIN</option>
<option value="STAFF">STAFF</option>      
    </select>
{formik.touched.role && formik.errors.role ? (
<div className='text-red-600'>{formik.errors.role}</div>
) : null}   
  </div>
</div>

</div>



<div className="flex  justify-between">
<button
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    type="submit"
    disabled={isSubmitting}  >
    {isSubmitting ? 'Submitting...' : 'Submit'}
  </button>
  <div className='flex-1 ml-2 text-green-500'>{message}</div>
    </div>
     
  </form>
  
</div>     

 
       
      </Modal>
    </div>
  );
}
// module.exports={
//     openUserEditModal,closeUserEditModal
// }