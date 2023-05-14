import React, { useState,useRef  } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; 
import { useMutation,useQuery } from '@apollo/client'; 
import {GET_ALL_GROUPS} from '../../graphql/queries/smsQueries'
import { SEND_GROUP_LISTS }  from '../../graphql/mutations/smsMutations'
import { useDispatch,useSelector } from 'react-redux';
import { toastSuccess,toastError } from '../../redux/slices/toastSlice';
import CountrySelect from '../common/countries/CountrySelect';
import { countries } from '../common/countries/countries'; 



export default function SendSMS() {   
const [message, setMessage] = useState('');
const [selectedContacts, setSelectedContacts] = useState(0);
const [pastedContactsLength, setPastedContactsLength] = useState(0);
const [scheduledMessage, setScheduledMessage] = useState(false);
const [date, setDate] = useState(new Date());
const [ submitting,setSubmitting ]=useState(false)
const [selectedOption, setSelectedOption] = useState("paste");
const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);  
const [pastedNumbers, setPastedNumbers] = useState([]);
let textareaRef = useRef(null);

//const [count, setCount] = useState(0);
const [country,setCountry]=useState(countries[0].code)
const handleCountryChange = (country) => {
setCountry(country) 
};

const   { isAuthenticated,user } = useSelector(state => state.user);
const dispatch=useDispatch()

const [sendGroupLists] = useMutation(SEND_GROUP_LISTS, {
  refetchQueries: [{ query: GET_ALL_GROUPS }],
  
});

let [offset, setOffset] = useState(0);  
const { loading, error, data } = useQuery(GET_ALL_GROUPS, {
  variables: { limit: 1000, offset },
  // fetchPolicy: 'cache-and-network',
});


const initialValues = {
    senderId: '', 
    message,
    scheduledMessage: scheduledMessage,
    scheduledTime:'',
    selectedGroups:[]
  };

  const validationSchema = Yup.object({
    senderId: Yup.string().required('Sender ID is required!').min(3, 'Sender ID must be at least 3 characters long!'),
    phones: Yup.string().required('No recipient numbers provided!').min(3, 'Invalid phone number provided!'),
    message: Yup.string().required('Message should be at least 5 characters!').max(160, 'Message must be at most 160 characters!'), 
  });
  
  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.post("/api/contact", values);
      alert("Message sent successfully!");
    } catch (err) {
      console.error(err);
      alert("An error occurred while sending the message.");
    }
    setSubmitting(false);
  };

  const onSubmit1 = () => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };




const formik = useFormik({
initialValues,
validationSchema,
onSubmit: async (values) => { console.log("jjjjjjjjjjjjjjj")
values.senderId=values.senderId.toUpperCase()
setSubmitting(true)
 
const now = new Date(values.scheduledTime);
const month = now.getMonth(); // 0-indexed, so January is 0
const day = now.getDate();
const time = now.toLocaleTimeString(); // format the time as a string

  
 console.log("ffffffffffffffff")
 console.log("senderId",event.target.senderId)
 console.log("selectedOption",selectedOption)
 console.log("message",message)
 console.log("scheduled date",scheduledTime) 
  
 

return

setSubmitting(false)

try {
//////////// SUBMIT GROUPS SELECTED  
if(selectedOption==='groups'){
if(selectedCheckboxes.length<1){
alert("Error, no group selected!")
return
}

const response = await sendGroupLists({
variables: {
input:selectedCheckboxes,user:user.id,role:user.role
},
});    

if(response.data.sendGroupLists.created){
dispatch(toastSuccess(response.data.sendGroupLists.message))
}  
else{
dispatch(toastError(response.data.sendGroupLists.message))
}
}// WHEN GROUPS CHECKED
  
//WHEN PASTED NUMBERS
if(selectedOption==="paste"){ 
const textAreaValue = document.getElementById('phones').value;   
if(textAreaValue.length===0){
alert("Error, no numbers present!")
document.getElementById('phones').value="";
document.getElementById('phones').focus();
return
}

const response = await sendGroupLists({
variables: {
input:pastedNumbers,user:user.id,role:user.role
},
});      


if(response.data.sendGroupLists.created){
dispatch(toastSuccess(response.data.sendGroupLists.message))
}  
else{
dispatch(toastError(response.data.sendGroupLists.message))
}
}//PASTED NUMBERS


} catch (error) {
 // console.error("submit error",error.message)
setSubmitting(false)
// handle error
}
},
});

 
function handleMessageChange(event) {
setMessage(event.target.value);
formik.values.message=event.target.value
}

function handleOptionChange(event) {
setPastedNumbers([])
setSelectedCheckboxes([])
setSelectedContacts(0)
setPastedContactsLength(0)
setSelectedOption(event.target.value);
const phoneTextArea=document.getElementById('phones')
if(event.target.value==='paste' && phoneTextArea)
phoneTextArea.focus();
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
value: group.id,groupContacts:group.totalContacts, label: group.name.toUpperCase()+" ("+group.totalContacts+")",
}))

function isChecked(value) {  
return selectedCheckboxes.indexOf(value) >= 0;
}





function handlePastedPhonesChange(event) {
const lines = event.target.value.split('\n');
const textAreaValue = document.getElementById('phones').value;  

if(textAreaValue.length===0){
  setPastedContactsLength(0)
}
if(textAreaValue.length>0) {
setPastedNumbers(lines);
setPastedContactsLength(lines.length)
 
} 
}
  

function handlePaste(event) {
 
  const lines = event.target.value.split('\n');
  setPastedNumbers(lines);
  setPastedContactsLength(pastedNumbers.length)
}


function sendMessage(){
  console.log("kkkkkkkkkkkkkk")
}
   

  return (
    <>
  
      <form  onSubmit={formik.handleSubmit} 
      className="px-2 py-4 bg-gray-200 shadow-md rounded-md text-blue-700">
     
      <div className="mb-4">
        <label htmlFor="senderId" className="block font-medium text-gray-700 mb-1">
          Sender ID
        </label>
        <input
          type="text"
          id="senderId"
          name="senderId"
          className={` uppercase p-1 block w-screen border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${formik.touched.senderId && formik.errors.senderId ? 'border-red-500' : ''}`}
          value={formik.values.senderId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.senderId && formik.errors.senderId && <p className="mt-2 text-red-500 text-sm">{formik.errors.senderId}</p>}
      </div>
     


     
      <div className="flex flex-row items-baseline justify-between">
  <label className="inline-flex flex-row items-center px-1  overflow-auto ">
    <input type="radio" 
    className="form-radio" 
    name="radio"  
    value="paste"
    checked={selectedOption === "paste"}
    onChange={handleOptionChange}
    />

    
<div  className={selectedOption==="paste" && 'flex  items-center text-blue-800 ml-1 bg-blue-50 p-2 rounded-md border-b-4 border-blue-700'  || 'flex  items-center'}>
   <span  className={selectedOption==="paste" && 'flex flex-col justify-between' || "flex items-center text-blue-800 ml-1"}>
   Paste Numbers  &nbsp;
   </span>
   <span className={selectedOption==="paste" && 'mb-0 text-blue-800' || 'flex text-blue-800'}><CountrySelect countries={countries} onChange={handleCountryChange} /></span>
   </div>  
  </label>

  <label className="inline-flex items-center px-1">
    <input type="radio" 
    className="form-radio" 
    name="radio" 
    value="groups"
    checked={selectedOption === "groups"}
    onChange={handleOptionChange}
    size={40}
    />
    <div  className={selectedOption==="groups" && 'flex  items-center text-blue-800 ml-1 bg-blue-50 p-2 rounded-md border-b-4 border-blue-700'  || 'flex  items-center'}>
   <span className={selectedOption==="groups" && 'flex justify-center text-blue-800 ml-1 ' || "flex items-center ml-1 text-blue-800"}>From Groups</span>
   </div>
  </label>
 
</div>
 
<hr className='border-5 bg-white mb-3'></hr>

 
{ (selectedOption==="paste") &&
<div className="mb-4">
<label htmlFor="phones" className="block font-medium text-gray-700 mb-2 pr-2 mt-4">

<h3 className='pl-1 mb-2 bg-blue-600 text-white rounded'>Paste numbers of the same country. </h3>
</label>
<textarea
id="phones"
cols={100}
rows={5}
name="phones"
ref={textareaRef} 
onPaste={handlePaste}
onChange={(event) => {handlePastedPhonesChange(event); formik.handleChange; }} 
className={` p-1 block w-full h-48 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 resize-none ${formik.touched.phones && formik.errors.phones ? 'border-red-500' : ''}`} 
 placeholder={`256701xxxxxx
25677xxxxxxx
256392xxxxxx
256712xxxxxx`}
onBlur={formik.handleBlur}
/>
 
<div className=' bg-black text-white pl-1 rounded mt-2'>
<div className='flex justify-between px-2'>
<div>{(selectedOption==='paste' && pastedContactsLength>0) && <>Total numbers: <b>{pastedContactsLength}</b></>} </div>
</div> 
</div>
 
 
{selectedOption==='paste' && (formik.errors.phones && (pastedContactsLength===0 || (document.getElementById("phones")?.value)?.length<9)) && <p className="w-screen mt-2 text-red-500 text-sm">{formik.errors.phones}</p>}
</div>
}


 
{ (selectedOption==="groups") &&
<div className=''>
<h3 className='pl-1 mb-2 bg-blue-600 text-white rounded'>Select Groups</h3>
<div className='flex flex-col bg-white rounded-md h-48 overflow-y-auto overflow-x-hidden text-blue-800'>


{checkboxOptions?.map(({ value,groupContacts, label }) => (
<label key={value} className="inline-flex items-start md:w-screen pl-2 mt-2 text-blue-800">

<input
type="checkbox"
value={value}
checked={isChecked(value)}
disabled={!groupContacts}
onChange={(e) => {

if (selectedCheckboxes.includes(e.target.value)) {
setSelectedContacts(selectedContacts-groupContacts)
}else{
setSelectedContacts(selectedContacts+groupContacts)
}

const isChecked = e.target.checked;
setSelectedCheckboxes((prevSelectedCheckboxes) => {
if (isChecked) {
return [...prevSelectedCheckboxes, value];
} else {
return prevSelectedCheckboxes.filter((v) => v !== value);
}
});
}}
className="form-checkbox h-5 w-4 rounded-xl text-blue-800"
/>
<span className="ml-2  text-blue-800 font-italic">{label}</span>
</label>
))}

</div> 
{selectedOption==='groups' && selectedCheckboxes.length===0 && <p className="mt-2 text-red-500 text-sm">Select groups!</p>}


</div> 
}  

<div className=' bg-black text-white pl-1 rounded mt-2'>
<div className='flex justify-between px-2'>
<div>{(selectedOption==='groups') && selectedCheckboxes.length>0 && <>Total numbers: <b>{selectedContacts}</b></>} </div>
</div> 
</div>


<div className="mb-4 mt-2"> country: {country}
        <label htmlFor="message" className="block font-medium text-blue-800 mb-2">
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
{(message.length<160) && <p className="flex justify-end mt-2 text-green-900 text-md"><b>{message.length} / 160</b></p>}
{(message.length>159) && <p className="flex justify-end mt-2 text-red-700 text-md"><b>{message.length} / 160</b></p>}


{formik.touched.message && message.length<3 && formik.errors.message && <p className="mt-2 text-red-500 text-sm">{formik.errors.message}</p>}
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
disabled={submitting || formik.errors.message || formik.errors.phones || formik.errors.senderId} 
className="px-4 py-2 cursor-pointer bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
//  onClick={sendMessage}
>
Send SMS
</button>
</div>
</form>
 
 </> )
}
