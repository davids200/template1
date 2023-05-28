import React, { useState } from 'react';
import CountrySelect from '../common/countries/CountrySelect';
import { countries } from '../common/countries/countries'; 
import { useMutation } from '@apollo/client';
import { CREATE_GROUP } from "../../graphql/mutations/smsMutations";
import { useDispatch,useSelector } from 'react-redux';
import { toastSuccess,toastError } from '../../redux/slices/toastSlice';
import { GET_ALL_GROUPS } from '../../graphql/queries/smsQueries';
import { useRouter } from 'next/router';


const GroupCreate = () => {
const [name,setName]=useState('')
const [country,setCountry]=useState(countries[0].name)
const [isSubmitting, setIsSubmitting] = useState(false);
//const [createGroup,data] = useMutation(CREATE_GROUP);

const [createGroup, { data }] = useMutation(CREATE_GROUP, {
    refetchQueries: [{ query: GET_ALL_GROUPS }],
  });
  
const   { isAuthenticated,user } = useSelector(state => state.user);
const dispatch = useDispatch()
const router = useRouter()

const handleNameChange = (event) => {
setName(event.target.value) 
};
const handleCountryChange = (country) => {
setCountry(country) 
};



const handleSubmit = async(event) => {
  setIsSubmitting(true)
event.preventDefault();


if(name.length<1){
  setIsSubmitting(false)
  dispatch(toastError("Invalid group name!")) 
  return
}

const response = await createGroup({
  variables: {
  input:{
    user:user.id,
    role:user.role,
    country,
    name,
    country
  },
  },
  });
  
  if(response.data.createGroup.created){    
    dispatch(toastSuccess(response.data.createGroup.message))
    setIsSubmitting(false)
  }  
  else{
    dispatch(toastError(response.data.createGroup.message))
    setIsSubmitting(false)
   
  }
};

 

return (
<>
  
<div className='p-2'> 
<h3 className='text-white'>Create Group</h3>
<form className="bg-gray-700 text-white rounded-lg p-3" onSubmit={handleSubmit}>
  
 
  <div className="items-center">
    <div className="">
    <label className=" font-bold " >
      Group Name:
      </label>  
    </div>
    <div className=" mb-3">
      <input 
      className=" w-full bg-white appearance-none border-2 border-gray-200 rounded-md  py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
      id="name" 
      type="text" 
      value={name}
      onChange={handleNameChange}
      />
    </div>
  </div>


  <div className="items-center mb-3 sm:text-md">
    <div className="">
      <label className="w-full block text-white font-bold mb-1 md:mb-0 pr-2" htmlFor="inline-password">
        Country:
      </label>
    </div>
    <div className="w-full">   
    <CountrySelect countries={countries} onChange={handleCountryChange} />
    </div>
  </div> 
  
 
  <div className="relative items-center">
    <div className="">
 
    <button
       
      className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300 ${
        isSubmitting ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'
      }`}
      disabled={isSubmitting}
    >
      {isSubmitting ? 'Submitting...' : 'Submit'}
    </button>
 
    </div>
  </div>
</form>


</div>  

 </> );
};

export default GroupCreate;
 