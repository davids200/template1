import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; 
import { useMutation,useQuery } from '@apollo/client'; 
import {GET_ALL_GROUPS} from '../../graphql/queries/smsQueries'

export default function SendSMS() {   
const [text, setText] = useState('');
const [scheduledMessage, setScheduledMessage] = useState(false);
const [date, setDate] = useState(new Date());
const [ submitting,setSubmitting ]=useState(false)
const [selectedOption, setSelectedOption] = useState("paste");
const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);  
const [count, setCount] = useState(0);

let [offset, setOffset] = useState(0);  
const { loading, error, data } = useQuery(GET_ALL_GROUPS, {
  variables: { limit: 1000, offset }
});


const initialValues = {
    senderId: '', 
    message: text,
    scheduledMessage: scheduledMessage,
    scheduledTime:'',
    selectedGroups:[]
  };

  const validationSchema = Yup.object({
    senderId: Yup.string().required('Sender ID is required'),
    message: Yup.string().required('Message should be atleast 5 characters').max(160, 'Message must be at most 160 characters'), 
  });
  
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
        values.senderId=values.senderId.toUpperCase()
        setSubmitting(true)
        

        const now = new Date(values.scheduledTime);
const month = now.getMonth(); // 0-indexed, so January is 0
const day = now.getDate();
const time = now.toLocaleTimeString(); // format the time as a string

        setSubmitting(false)
        try {
         // const response = await axios.post("/api/submit-form", values);
          // handle success
        } catch (error) {
            setSubmitting(false)
          // handle error
        }
      },
  });

 
function handleMessageChange(event) {
setText(event.target.value);
formik.values.message=event.target.value
}

function handleOptionChange(event) {
setSelectedOption(event.target.value);
} 

function handleScheduleChange(event){    
formik.values.scheduledMessage=event.target.checked
formik.values.scheduledTime=date
setScheduledMessage(formik.values.scheduledMessage)
}

const formatDate = (date) => {
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const hours = date.getHours();
const minutes = date.getMinutes();

const mydate=`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
 
return mydate;
};

const handleDateChange = (event) => {  
setDate(new Date(event.target.f));     
formik.values.scheduledTime=new Date(event.target.value)
  };


  
const checkboxOptions = data?.groups?.map(group =>({
  value: group.id,f:group.totalContacts, label: group.name+" ("+group.totalContacts+")",
  }))

function isChecked(value) {     
return selectedCheckboxes.indexOf(value) >= 0;
}

   

  return (
    <>
  


      <form  onSubmit={formik.handleSubmit} className="px-4 py-6 bg-gray-200 shadow-md rounded-md">
     
      <div className="mb-4">
        <label htmlFor="senderId" className="block font-medium text-gray-700 mb-2">
          Sender ID
        </label>
        <input
          type="text"
          id="senderId"
          name="senderId"
          className={`p-2 uppercase  block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${formik.touched.senderId && formik.errors.senderId ? 'border-red-500' : ''}`}
          value={formik.values.senderId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.senderId && formik.errors.senderId && <p className="mt-2 text-red-500 text-sm">{formik.errors.senderId}</p>}
      </div>
     
     
      <div className="flex flex-row justify-start gap-5 items-center">
  <label className="inline-flex items-center">
    <input type="radio" 
    className="form-radio" 
    name="radio"  
    value="paste"
    checked={selectedOption === "paste"}
    onChange={handleOptionChange}
    />
   <span className={selectedOption==="paste" && 'text-blue-900 ml-1 border-b-4 border-blue-800' || "ml-1"}>Paste Numbers</span>
  </label>

  <label className="inline-flex items-center">
    <input type="radio" 
    className="form-radio" 
    name="radio" 
    value="groups"
    checked={selectedOption === "groups"}
    onChange={handleOptionChange}
    />
   <span className={selectedOption==="groups" && 'text-blue-900 ml-1  border-b-4 border-blue-800' || "ml-1"}>From Groups</span>
  </label>

  <label className="inline-flex items-center">
    <input 
    type="radio" 
    className="form-radio" 
    name="radio" 
    value="lists"
    checked={selectedOption === "lists"}
    onChange={handleOptionChange}
    />
    <span className={selectedOption==="lists" && 'text-blue-900 ml-1  border-b-4 border-blue-800' || "ml-1"}>From List</span>
  </label>
 
</div>
 
<hr className='border-5 bg-white mb-3'></hr>





{ (selectedOption==="paste") &&
<div className="mb-4">
<label htmlFor="message" className="block font-medium text-gray-700 mb-2 px-2">
Phone numbers
</label>
<textarea
id="phones"
name="phones"
 className={` p-1 block sm:w-2/4  w-full  h-48 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 resize-none ${formik.touched.phones && formik.errors.phones ? 'border-red-500' : ''}`}
 placeholder={`256701xxxxxx
25677xxxxxxx
256392xxxxxx
256712xxxxxx`}
  style={{ whiteSpace: "pre-wrap" }}
onChange={formik.handleChange}
onBlur={formik.handleBlur}
/>        
{formik.touched.phones && text.length<3  && formik.errors.phones && <p className="mt-2 text-red-500 text-sm">{formik.errors.message}</p>}
</div>
}


 
{ (selectedOption==="groups") &&
<div>
<h3 className='pl-1 mb-2 bg-blue-600 text-white rounded'>Select Groups</h3>
<div className='flex flex-col bg-white rounded-md w-full h-32 overflow-y-auto'>



    {checkboxOptions.map(({ value,f, label }) => (
      <label key={value} className="inline-flex items-center">
      
        <input
          type="checkbox"
          value={value}
          checked={isChecked(value)}
          onChange={(e) => {
            
            const isChecked = e.target.checked;
            setSelectedCheckboxes((prevSelectedCheckboxes) => {
              if (isChecked) {
                return [...prevSelectedCheckboxes, value];
              } else {
                return prevSelectedCheckboxes.filter((v) => v !== value);
              }
            });
          }}
          className="form-checkbox h-5 w-5 text-gray-600"
        />
        
        <span className="ml-2 text-gray-700">{label}</span>
      </label>
    ))}
   
    </div>  </div> 
}  

<div className='bg-blue-600 text-white pl-1 rounded mt-2'>
{(selectedCheckboxes.length===1) && <p>Selected ({selectedCheckboxes.length}) group</p>}
{(selectedCheckboxes.length>1) && <p>Selected ({selectedCheckboxes.length}) groups</p>}
</div>


<div className="mb-4">
        <label htmlFor="message" className="block font-medium text-gray-700 mb-2">
          Message
        </label>



        <textarea
          id="message"
          name="message"
          maxLength={160}
          className={` p-1 block w-full h-32 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 resize-none ${formik.touched.message && formik.errors.message ? 'border-red-500' : ''}`}
        //   value={text}
          onChange={handleMessageChange}
          onBlur={formik.handleBlur}
        />
        <p className="mt-2 text-orange-600 text-md">{text.length} / 160</p>
        {formik.touched.message && text.length<3  && formik.errors.message && <p className="mt-2 text-red-500 text-sm">{formik.errors.message}</p>}
</div>


<div className="mb-4">
<div className="flex items-center">
<input
         type="checkbox"
         id="scheduledMessage"
         name="scheduledMessage"
         className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
         checked={scheduledMessage}
         value={scheduledMessage}
         onChange={handleScheduleChange}
         onBlur={formik.handleBlur}
       />
<label htmlFor="scheduledMessage" className="ml-2">
Schedule message
</label><br></br>
{
(scheduledMessage) && 
<div className="flex items-center space-x-4">
<label 
htmlFor="datetime" 
className="sr-only">Date and time</label>
<input 
type="datetime-local" 
id="scheduledTime" 
name="scheduledTime" 
onBlur={formik.handleBlur}
value={formatDate(date)} 
onChange={handleDateChange} 

className="block w-full px-4 py-2 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />

</div>
}  
</div>
</div>


<div className="mt-6">
<button type="submit" 
disabled={submitting}
className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
Send
</button>
</div>
</form>
 </> )
}
