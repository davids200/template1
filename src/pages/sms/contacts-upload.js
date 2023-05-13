import React, { useState } from 'react';
import SMSLayout from '../../../components/layout/SMSLayout';

import UploadExcelContacts from '../../../components/sms/uploadExcelContacts'
import UploadTextContacts from '../../../components/sms/uploadTextContacts'
//import { useQuery } from '@apollo/client';
//import { GET_ALL_GROUPS } from '../../../graphql/queries/smsQueries'




function Contact() {  
const [isChecked, setIsChecked] = useState(false);
const [phone, setPhone] = useState({value: '',code: 'ug', });


// const { loading, error, data } = useQuery(GET_ALL_GROUPS, {
//   variables: { limit: 1000, offset:0 }
// });

const [selectedUpload, setSelectedUpload] = useState('text');

  function handleUploadChange(event) {
    console.log("selected selected",event.target.value)
    setSelectedUpload(event.target.value);
  }


return (<>
<SMSLayout >
<div className='mx-auto rounded-md py-auto w-96  h-full sm:w-screen p-2 text-black'>
<div className="flex items-center justify-center mt-10">
  <div className="flex flex-col mb-5  items-center justify-center">
 <h3 className='text-lg text-black mb-3 uppercase'>Upload contacts from a file</h3>
 <hr></hr>
 
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
 