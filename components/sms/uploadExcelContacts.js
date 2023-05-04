import { useState } from 'react';
import * as XLSX from 'xlsx';
import { useMutation } from '@apollo/client'; 
import { UPLOAD_GROUP_CONTACTS } from "../../graphql/mutations/smsMutations";
import { useQuery } from '@apollo/client';
import { GET_ALL_GROUPS } from '../../graphql/queries/smsQueries'
import { useDispatch,useSelector } from 'react-redux';
import { toastSuccess,toastError } from '../../redux/slices/toastSlice';
import Select from '../../components/sms/SelectGroup'
import { FaFileExcel } from 'react-icons/fa'

export default function UploadExcelContacts() {
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
     

////////////// EXCEL FILE SELECTED ///////////  
if (selectedFile.name.includes('.xls') || selectedFile.name.includes('.xlsx') || selectedFile.name.includes('.csv')) {
  console.log("excel file")
setFile(selectedFile);
//const reader = new FileReader();
reader.onload = async function (event) {
const data = new Uint8Array(event.target.result);
const workbook = XLSX.read(data, { type: 'array' });
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(sheet, { header: 0 });

const contacts = [];
 
for (let i = 0; i < rows.length;) {
  const row = rows[i];
  const obj = {
    phone: row[Object.keys(row)[0]].toString(),
    name: row[Object.keys(row)[1]].toString(),
    group:'group1',
    user:user.id,
    role:user.role,
  };
  contacts.push(obj);
  i++
}

const submitted = await uploadGroupContacts({
variables: {
contacts,
},
});
if(submitted) dispatch(toastSuccess("Success")) 
setselectedGroup(null)
setFile(null) 
}
reader.readAsArrayBuffer(selectedFile);
}
} 



const options = data.groups.map(group => ({
  value: group.id,
  label: group.name,
  }))


  return (
    <div className='mt-1 rounded-md p-3 bg-green-900 text-white'>

<b className='flex mb-6  text-white'><FaFileExcel size={25} className='text-white'/>
 Excel</b>

<pre className='text-yellow-400 mb-2'>First column is number,
second column is name.<br></br> Top row should be for headers!
</pre>

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
accept=".xls,.xlsx,.csv" 
onChange={handleFileChange}  
className='rounded-md'
disabled={!selectedGroup}
/>


</form>

</div>
);
}