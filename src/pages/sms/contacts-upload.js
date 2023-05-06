import React, { useState } from 'react';
import SMSLayout from '../../../components/layout/SMSLayout';

import UploadExcelContacts from '../../../components/sms/uploadExcelContacts'
import UploadTextContacts from '../../../components/sms/uploadTextContacts'
import { useQuery } from '@apollo/client';
import { GET_ALL_GROUPS } from '../../../graphql/queries/smsQueries'




function Contact() {  
const [isChecked, setIsChecked] = useState(false);
const [phone, setPhone] = useState({value: '',code: 'ug', });


const { loading, error, data } = useQuery(GET_ALL_GROUPS, {
  variables: { limit: 1000, offset:0 }
});

const [selectedUpload, setSelectedUpload] = useState('text');

  function handleUploadChange(event) {
    console.log("selected selected",event.target.value)
    setSelectedUpload(event.target.value);
  }



if (loading) return <p>Loading...</p>
if (error) return <p>Error :(</p>
 
const options = data.groups.map(group => ({
value: group.id,
label: group.name,
}))



const handleSubmit = (event) => {
event.preventDefault(); 
};

return (<>
<SMSLayout >
<div className='mx-auto rounded-md bg-blue-900 shadow-md py-auto w-96 md:w-screen h-full sm:w-screen py-2 text-white'>
<div className="flex items-center justify-center mt-10">
  <div className=" mb-5">
 <h3 className='text-lg text-white mb-3 uppercase'>Upload contacts from a file</h3>
 <hr className='mb-5'></hr>

<div className='mb-5'> 
<div className='flex justify-between'> 
<label>
<input type="radio" name="option" value="text" checked={selectedUpload === 'text'} onChange={handleUploadChange} />
&nbsp;From Text File
</label>
<label>
<input type="radio" name="option" value="excel" checked={selectedUpload === 'excel'} onChange={handleUploadChange} />
&nbsp;From Excel File <br></br>
</label> 
</div>
 


{ (selectedUpload==='excel') && <>
<UploadExcelContacts/>
</>

}
{(selectedUpload==='text') &&  <UploadTextContacts/>}
</div>
 



</div>
</div> 
</div>
</SMSLayout>
</> );
};
export default Contact;
 