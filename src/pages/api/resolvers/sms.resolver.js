const AWS = require('aws-sdk');
const s3 = new AWS.S3(); 
const { v4: uuidv4 } = require("uuid");
const mysql_db = require('./../datasources/mysql');
import { getSession } from 'next-auth/react';
 

const smsResolvers = {
Query: {
groups:async (_, { limit, offset }, context) => {
//const {mysql_db}=database
const session = await getSession(context.req, context.res);
console.log("context in resolver",context)
 

        if (limit) {
        const [rows] = await mysql_db.execute('SELECT COUNT(*) AS totalGroups FROM groups');
        const totalGroups = rows[0].totalGroups;
           
        
            const [results, fields] = await mysql_db.query(`SELECT name,id,country FROM groups order by id desc LIMIT ?,?`, [offset, limit]);
            results[0].totalGroups=totalGroups
            
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

console.log("uploadGroupContacts")
const results = [];
let insertedRows=0;

for (const contact of contacts) {
console.log("contact",contact)

}
return
const [rows] = await mysql_db.execute(
'SELECT * FROM contacts WHERE phone = ? AND group = ?',[contact.phone,contact.group],
);
if (rows.length > 0) {      
results.push(rows[0]);
} else {

const id_code=uuidv4()
const [insertResult] = await mysql_db.execute(
'INSERT INTO contacts (id,user_id,name,phone,country,group) VALUES (?,?,?,?,?,?)',
[id_code,'1',contact.name,contact.phone,contact.country,contact.group],
);
//results.push({ id: insertResult.insertId, name: contact.name });
insertedRows++
}
//}
await mysql_db.end(); 
console.log("insertedRows",insertedRows)
if(insertedRows>0){
return true;
}

else{
return false
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

}
         
 
} 
module.exports = smsResolvers;




 