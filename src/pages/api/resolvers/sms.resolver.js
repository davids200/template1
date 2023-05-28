const AWS = require('aws-sdk');
const s3 = new AWS.S3(); 
const { v4: uuidv4 } = require("uuid");
const mysql_db = require('./../datasources/mysql');
import { getSession } from 'next-auth/react';
import { isValidPhoneNumber } from '../../../../lib/validate-phone'
import axios from 'axios'

import cors from 'cors';
import fetch from 'isomorphic-unfetch';
import { isValidNumberForRegion } from 'libphonenumber-js';


const smsResolvers = {
Query: {
groups:async (_, { limit, offset }, context) => {
//const {mysql_db}=database
const session = await getSession(context.req, context.res);
console.log("context in resolver",context)
 

if (limit) { 
const [rows] = await mysql_db.execute('SELECT COUNT(*) AS totalGroups FROM groups');
const totalGroups = rows[0].totalGroups;

console.log("context in ffffffffffffff")
//const [results, fields] = await mysql_db.query(`SELECT name,id,country FROM groups order by id desc LIMIT ?,?`, [offset, limit]);
const [results, fields] = await mysql_db.query(`
SELECT groups.id, groups.name,groups.country, COUNT(contacts.id) AS totalContacts
FROM groups LEFT JOIN contacts ON groups.id = contacts.group_id GROUP BY groups.id order by id desc LIMIT ?,?`, [offset, limit]);


results[0].totalGroups=totalGroups
console.log("results[0]. results[0].",results)
return results;
}
},
},
 
    


Mutation:{    
       
createGroup: async (_, {input}, __) => { 
const { name,user,country,role } = input


const [rows] = await mysql_db.execute(
'SELECT * FROM groups WHERE name = ? AND user_id = ?',[name,user],
);
if (rows.length > 0) {    
return {message:"Group name already exists!",created:false} 
} else {


const id_code=uuidv4()

const [insertResult] = await mysql_db.execute(
'INSERT INTO groups (id,user_id,name,country) VALUES (?,?,?,?)',
[id_code,user,name,country],
);
try{
if(insertResult.affectedRows)
return {message:"Group created successfully.",created:true} 
}
catch(err){
throw new Error(err.message);   
}  
    }

},



uploadGroupContacts: async (_, { contacts }, __) => {   

    if(contacts){



        if(!contacts){
            return
         }   
        
        const _contacts=contacts
        let i=1;
        for (const contact of _contacts) {
        
        const [c_rows] = await mysql_db.execute('SELECT country FROM groups WHERE id = ? and user_id=?', [contact.group,contact.user]);
        const country = c_rows[0]; 
        if(contact && !isValidPhoneNumber(contact.phone,country.country)){
        return {message:"Invalid number format on line: "+i,created:false}  
        }
        i++
        }
        
        let insertedRows=0; let phone;
        for (const cont of contacts) {
        
        const [rows] = await mysql_db.execute(
        'SELECT * FROM contacts WHERE phone = ? AND group_id = ? AND user_id=?',[cont.phone,cont.group,cont.user],
        );
        if (rows.length > 0) {      
        //skip
        } else {
        phone=cont.phone.replace(/\n/g, '')
        const id_code=uuidv4()
        await mysql_db.execute('INSERT INTO contacts (id,user_id,name,phone,group_id) VALUES (?,?,?,?,?)',
        [id_code,cont.user,cont.name,cont.phone,cont.group],
        );
        //results.push({ id: insertResult.insertId, name: contact.name });
        insertedRows++
        }
        }
        await mysql_db.end(); 
        
        if(insertedRows>0){
        return {message:"("+insertedRows+") contacts added successfully.",created:true}  
        }
        
        else{
            return {message:"No contact saved!",created:false}  
        }


    }

},


    
createContact: async (_, {input},__) => {
//console.log("create contact resolver",input)

const { name,phone,role,user,group } = input    

const [rows] = await mysql_db.execute(
'SELECT * FROM contacts WHERE phone = ? AND group_id = ?',[phone,group],
);
if (rows.length > 0) {    
return {message:"Contact number already exists in this group!",created:false} 
} else {

const id_code=uuidv4()

const [insertResult] = await mysql_db.execute(
'INSERT INTO contacts (id,user_id,group_id,phone,name) VALUES (?,?,?,?,?)',
[id_code,user,group,phone,name],
);
try{
if(insertResult.affectedRows)
return {message:"Contact added successfully.",created:true} 
}
catch(err){
throw new Error(err.message);   
}  
    }

},

// sendSMS:async(_,{input},__)=>{
// const numbers = ['256774644449', '256708578167']
// const message = 'Hello, world!'
// const results = await sendMessage(numbers, message)
// console.log(results)
// },


    
sendSMS: async (_, {numbers,method,country='UG',message,senderId,scheduledTime,user,role},__) => { 

if(method==='groups'){        
// Convert the input groupIds array into a comma-separated string for the MySQL query
const groupIdString = numbers.map(groupId => mysql_db.escape(groupId)).join(',');
const query = `SELECT phone FROM contacts WHERE group_id IN (${groupIdString})`;

// Execute the query
let myArray=[]
const result = await mysql_db.query(query);
const singleList = [].concat(...result); 

singleList.map((obj) => {      
    if(obj.phone)  
    myArray.push(obj.phone) 
}); 
numbers=myArray
console.log("numbers",numbers)
country='UG'
}
   

////////////////// VALIDATE NUMBERS ////////////////////////
const filterPhones=numbers; let numOfWrongNumbers=0

const isValidPromises = filterPhones.map(async (phoneNumber) => {
const isValid = await isValidPhoneNumber(phoneNumber, country);
 
if(!isValid) numOfWrongNumbers++
if(filterPhones.length===0)
return isValid
});
const isValidResults = await Promise.all(isValidPromises);
//const text = isValidResults.toString();
 
if(numOfWrongNumbers>0) return {message:"["+numOfWrongNumbers+"] invalid number(s) !",created:false} 
  
 ////////// IF NUMBERS PASTED ARE VALID, PROCEED WITH SENDING 
return sendBulkSMS(numbers,country,message,senderId,scheduledTime).then(res=>{
   if(res.includes('OK')){ 
    console.log("return",res)
    return {message:"Sent message(s)",created:true}
}
   
   else { 
    console.log("return",res)
    return {message:"Message not sent",created:false} }
})

},

} // mutations
         
 
} 
module.exports = smsResolvers;


 
  

async function sendBulkSMS(numbers,country,message,sender,scheduledTime) {
const username="ictgiants@gmail.com"
const password="P@ssw0rd"


try {
const smsPromises = numbers.map(async (number) => {
const url = `http://www.egosms.co/api/v1/plain/?number=${encodeURIComponent(number)}&message=${encodeURIComponent(message)}&username=${username}&password=${password}&sender=${sender}`;
const response = await axios.get(url);

const myString = response.data;
const isSent = myString.replace(/^\s+/, '').replace(/\s+$/, '');

return response.data;
 });
const smsResponses = await Promise.all(smsPromises);
console.log("smsResponses",smsResponses)
const listAsString = `${smsResponses}`;  
return listAsString;

} catch (error) {
return {message:error.message,created:false}   
console.error('Error sending bulk SMS:', error);
throw error;
}
}

export default sendBulkSMS;

 

async function testAsync(){
    console.log("3333333333333333333333")
}


async function validateNumber(numbers,country){
    const filterPhones=numbers;

    const isValidPromises = filterPhones.map(async (phoneNumber) => {
        // Perform validity test for each phone number
        const isValid = await isValidPhoneNumber(phoneNumber, country);
       
        return isValid;
      });
      
      const isValidResults = await Promise.all(isValidPromises);
     return isValidResults
      
}


 