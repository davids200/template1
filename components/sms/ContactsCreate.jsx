import React, { useState,useEffect } from 'react';
import CountrySelect from '../common/countries/CountryPhoneSelect';
import { useMutation,useQuery } from '@apollo/client';  
import {GET_ALL_GROUPS} from '../../graphql/queries/smsQueries'
import { CREATE_CONTACT } from "../../graphql/mutations/smsMutations";
import Select from './SelectGroup' 
import { isValidPhoneNumber } from '../../lib/validate-phone'
import { useDispatch,useSelector } from 'react-redux';
import { toastSuccess,toastError } from '../../redux/slices/toastSlice';


function ContactsCreate({countryCode}) {  
let [offset, setOffset] = useState(0);  
const [phone, setPhone] = useState({value: '',code: 'ug', }); 
const [name,setName]=useState('')
const [selectedGroup, setselectedGroup] = useState('')
const   { isAuthenticated,user } = useSelector(state => state.user);
const dispatch=useDispatch()

const { loading, error, data } = useQuery(GET_ALL_GROUPS, {
  variables: { limit: 1000, offset }
});

const [createContact] = useMutation(CREATE_CONTACT, {
  refetchQueries: [{ query: GET_ALL_GROUPS }],
});

const options = data?.groups?.map(group => ({
value: group.id,
label: group.name,
}))



const handleSubmit = async(event) => {
event.preventDefault();  
//const isPhoneValid=isValidPhoneNumber(phone.value,phone.code.toUpperCase())

if(!selectedGroup.value || !phone.isValid){
alert("Missing required fields")
return
}
const myname=name? name:phone.value
 
const response = await createContact({
  variables: {
    input:{ 
      user:user.id,
      role:user.role,
      name:myname,
      phone:phone.value,
      group:selectedGroup.value
    },
    },
  });
  
  if(response.data.createContact.created){
    dispatch(toastSuccess(response.data.createContact.message))
   // window.location.reload()
  }  
  else{
    dispatch(toastError(response.data.createContact.message))
  }
};




return (<>
 
<div className='mb-5 mt-5 flex items-center justify-center text-lg text-blue-800 mb-3'>
<h3>Add contact number(s)</h3>
</div>
 

<div className=" items-center justify-center">
  <div className=" mb-5">

<form className="bg-gray-100 p-3 rounded-lg mt-2" onSubmit={handleSubmit}>
  
<div className="w-full">
      <label className="">
        Group Name
      </label>
      <div className="w-full">
    <div className="flex items-center justify-center mb-0 w-full">
      <Select className=""
        options={options}
        value={selectedGroup}
        onChange={option => setselectedGroup(option)}
      />         
    </div>
    {(!selectedGroup) && <i className='text-red-700 text-sm'>Group required!</i>} 
    </div>

    
  
<div className="mt-3">
    <div className="">
      <label className="">
        Phone:
      </label>
    </div>
    <div className="">
    <div className="flex items-center justify-center mb-4 text-black">
<CountrySelect value={phone} onChange={setPhone} className='w-full'/> 
</div> 
    </div>
    {(!phone.isValid) && <i className='text-red-700 text-sm'>Invalid phone number!</i>}
  </div>
   

<div className="mt-3">
<div className="">
      <label className="">
        Contact Name:
      </label>
    </div>
    <div className="">
    <div className="flex items-center justify-center mb-4">
      <input 
      className="appearance-none border-2 border-gray-200 w-full rounded-md py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
      id="inline-full-name" 
      type="text" 
      placeholder={phone.value || 'Optional'}
      onChange={(e)=>setName(e.target.value)}
       />
    </div>
    </div>
</div>
  
 
    <div className="">
    <button
type="submit"
className="bg-blue-500  hover:bg-blue-900 text-white font-bold py-2 px-4 sm:w-full md:w-full rounded"
disabled={!phone.isValid || !selectedGroup}
>
Submit
</button>
    </div>
   </div>
  
</form> 
 

</div>
</div> 
 
</> );
};
export default ContactsCreate;
