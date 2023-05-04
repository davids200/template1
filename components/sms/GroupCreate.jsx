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
event.preventDefault();
 
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
  // window.location.reload()
   //router.push('/sms/groups-list')
  }  
  else{
    dispatch(toastError(response.data.createGroup.message))
  }
};

 

return (
<>
  
<div className='w-full p-2'> 
<h3 className='text-white'>Create Group</h3>
<form className="bg-gray-50  rounded-lg p-2" onSubmit={handleSubmit}>
  
 
  <div className="items-center ">
    <div className="w-full">
    <label className="" >
      Group Name:
      </label>  
    </div>
    <div className="w-full mb-3">
      <input 
      className="bg-white appearance-none border-2 border-gray-200 rounded-md w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
      id="name" 
      type="text" 
      value={name}
      onChange={handleNameChange}
      />
    </div>
  </div>


  <div className="items-center mb-3 sm:text-md">
    <div className="w-full">
      <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-2" htmlFor="inline-password">
        Country:
      </label>
    </div>
    <div className="md:w-full">   
    <CountrySelect countries={countries} onChange={handleCountryChange} />
    </div>
  </div> 
  
 
  <div className="relative items-center">
    <div className="w-full">
    <button
type="submit"
className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
Submit
</button>
    </div>
  </div>
</form>


</div>  

 </> );
};

export default GroupCreate;
 