import React, { useState,useRef  } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; 
import { useMutation,useQuery } from '@apollo/client'; 
import {GET_ALL_GROUPS} from '../../graphql/queries/smsQueries'
import { SEND_GROUP_LISTS }  from '../../graphql/mutations/smsMutations'
import { useDispatch,useSelector } from 'react-redux';
import { toastSuccess,toastError } from '../../redux/slices/toastSlice';

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

 //console.log("start",pastedNumbers)
const [count, setCount] = useState(0);

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
    message: Yup.string().required('Message should be atleast 5 characters!').max(160, 'Message must be at most 160 characters!'), 
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
console.log("pasted response...response",response)

if(response.data.sendGroupLists.created){
dispatch(toastSuccess(response.data.sendGroupLists.message))
}  
else{
dispatch(toastError(response.data.sendGroupLists.message))
}
}//PASTED NUMBERS


} catch (error) {
  console.error("submit error",error.message)
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


//SEND GROUP LISTS TO SEND MESSAGE

// const sendMessage = async(event) => {
// event.preventDefault();  
// } 

function handlePastedPhonesChange(event) {
const lines = event.target.value.split('\n');
const textAreaValue = document.getElementById('phones').value;  

if(textAreaValue.length===0){
  setPastedContactsLength(0)
}
if(textAreaValue.length>0) {
setPastedNumbers(lines);
setPastedContactsLength(lines.length)

console.log("setPastedNumbers",pastedNumbers)
console.log("setpastedContactsLength",pastedContactsLength)
} 
}
 



function handlePaste(event) {
  console.log("event.target.value",event.target.value)
  const lines = event.target.value.split('\n');
  setPastedNumbers(lines);
  setPastedContactsLength(pastedNumbers.length)
}



   

  return (
    <>
  

      <form  onSubmit={formik.handleSubmit} className="w-full px-1 py-6 bg-gray-200 shadow-md rounded-md">
     
      <div className="mb-4">
        <label htmlFor="senderId" className="block font-medium text-gray-700 mb-1">
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

  <label className="inline-flex items-center ">
    <input type="radio" 
    className="form-radio" 
    name="radio" 
    value="groups"
    checked={selectedOption === "groups"}
    onChange={handleOptionChange}
    size={40}
    />
   <span className={selectedOption==="groups" && 'text-blue-900 ml-1  border-b-4 border-blue-800' || "ml-1"}>From Groups</span>
  </label>
 
</div>
 
<hr className='border-5 bg-white mb-3'></hr>

 
{ (selectedOption==="paste") &&
<div className="mb-4">
<label htmlFor="message" className="block font-medium text-gray-700 mb-2 px-2 mt-4">
Phone numbers ({pastedContactsLength})
</label>
<textarea
id="phones"
cols={100}
rows={5}
name="phones"
ref={textareaRef} 
onPaste={handlePaste}
onChange={(event) => {handlePastedPhonesChange(event); formik.handleChange; }} 
className={` p-1 block w-full h-32 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 resize-none ${formik.touched.phones && formik.errors.phones ? 'border-red-500' : ''}`} 
 placeholder={`256701xxxxxx
25677xxxxxxx
256392xxxxxx
256712xxxxxx`}
// style={{ whiteSpace: "pre-wrap" }}
onBlur={formik.handleBlur}
/>        
{selectedOption==='paste' && formik.errors.phones && (document.getElementById("phones")?.value)?.length<9 && <p className="w-screen mt-2 text-red-500 text-sm">{formik.errors.phones}</p>}
</div>
}


 
{ (selectedOption==="groups") &&
<div className=''>
<h3 className='pl-1 mb-2 bg-blue-600 text-white rounded'>Select Groups</h3>
<div className='bg-white rounded-md h-64 overflow-y-auto bg-gray-300'>


{checkboxOptions?.map(({ value,groupContacts, label }) => (
<label key={value} className="inline-flex items-center w-screen md:w-screen pl-2 mt-2">

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
className="form-checkbox h-4 w-4 rounded text-gray-600"
/>

<span className="ml-2 text-gray-700">{label}</span>
</label>
))}

</div> 


</div> 
}  

<div className=' bg-black text-white pl-1 rounded mt-2'>

<div className='flex justify-between px-2'>
<div>{(selectedOption==='groups') && <>Total Contacts: <b>{selectedContacts}</b></>}
</div></div>
 
{/* 
<div className='flex justify-between px-2'>
<div>{(selectedOption==='paste') && <div>Total Contacts: <b>{pastedContactsLength}</b></div>}
</div></div> */}

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
<p className="mt-2 text-orange-600 text-md">{message.length} / 160</p>
{formik.touched.message && message<3 && formik.errors.message && <p className="mt-2 text-red-500 text-sm">{formik.errors.message}</p>}
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
//onClick={sendMessage}
>
Send SMS
</button>
</div>
</form>
 
 </> )
}
