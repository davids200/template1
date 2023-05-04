import { useState } from 'react'; 
import { useMutation } from '@apollo/client'; 
import { UPLOAD_GROUP_CONTACTS } from "../../graphql/mutations/smsMutations";
import { useQuery } from '@apollo/client';
import { GET_ALL_GROUPS } from '../../graphql/queries/smsQueries'
import { useDispatch,useSelector } from 'react-redux';
import { toastSuccess,toastError } from '../../redux/slices/toastSlice';
import Select from '../../components/sms/SelectGroup'
import { FaFileAlt } from 'react-icons/fa'


export default function UploadTextContacts() {

const [file, setFile] = useState(null); 
const [selectedGroup, setselectedGroup] = useState('') 
const   { isAuthenticated,user } = useSelector(state => state.user);
const dispatch = useDispatch()
const [uploadGroupContacts] = useMutation(UPLOAD_GROUP_CONTACTS);

const { loading, error, data } = useQuery(GET_ALL_GROUPS, {
  variables: { limit: 1000, offset:0 }
});

function handleFileChange(event) {
const selectedFile = event.target.files[0];
const reader = new FileReader();
    
if (selectedFile.name.includes('.txt')) { 
const contactList = [];

reader.onload = async function(event) {
const contents = event.target.result;
const lines = contents.split('\n');

lines.forEach(function(phone) {
  
const item = {
user:user.id,
role:user.role,
phone: phone,
group: selectedGroup.value,
name:phone
};
contactList.push(item); 

});
 
const submitted = await uploadGroupContacts({
variables: {
contacts:contactList,
},
});
if(submitted?.data?.uploadGroupContacts.created) 
dispatch(toastSuccess(submitted?.data?.uploadGroupContacts.message)) 
else
dispatch(toastError(submitted?.data?.uploadGroupContacts.message)) 

setselectedGroup(null)
setFile(null) 
};
reader.readAsText(selectedFile);
}
}
 
 
const options = data.groups.map(group => ({
  value: group.id,
  label: group.name,
  }))


return (
  <div className='p-4 mt-1 rounded-md  bg-gray-900 text-white'>

<b className='flex mb-6 text-white'><FaFileAlt size={25}/> 
Text</b>
<em className='text-yellow-400 mb-2'>The file should only container numbers in one column!
</em>


<form className=''> 
    
<label className="mr-2 mt-3 block text-white font-bold  md:mb-0 pr-4">
Group Name
</label>
<div className="w-full">
<div className="flex items-center justify-center mb-4 w-full">
<Select className=""
options={options}
value={selectedGroup}
onChange={option => setselectedGroup(option)}
/>      
</div>
{(!selectedGroup) && <em className='text-yellow-500 mb-2'>Select group!</em>

}
</div>


<input type="file"  
accept=".txt" 
onChange={handleFileChange} 
className='rounded-md cursor-pointer'
disabled={!selectedGroup}
/>
 
</form>

</div>
);
}
