const bcrypt = require('bcrypt'); 
import jwt from 'jsonwebtoken';
const AWS = require('aws-sdk');
const s3 = new AWS.S3(); 
const { v4: uuidv4 } = require("uuid");
const mysql_db = require('./../datasources/mysql');
const { S3_BUCKET_NAME, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = process.env;
import authMiddleware from '../middleware/authenticate'
 

const userResolvers = {
Query: {
  me: (parent, args, { currentUser }) => {
    if (!currentUser) {
      throw new Error('Not authenticated');
    }

    return currentUser;
  },

  getAllUsers: async (_,args, {currentUser,database}) => {
   // const {mongo_db,mysql_db}=database

    const [rows, fields] = await mysql_db.query('SELECT * FROM users');
    return rows;
  }, 


  getUserById: async (_, { id }, {currentUser,database}) => {
    const {mongo_db,mysql_db}=database

    const [rows] = await mysql_db.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  },
},




//export default async function handler(req, res) {
Mutation:{
  loginUser: async (_,{email,password},  {currentUser,database}) => {
   
  console.log("authMiddleware",authMiddleware)
const [rows] = await mysql_db.execute('SELECT * FROM users WHERE email = ?', [email]);
const user = rows[0];
//console.log("user user",user)
if (!user) {
  throw new Error('Invalid username or password!'); 
}
const isMatch = await bcrypt.compare(password, user.password);
 
if (!isMatch) {
  throw new Error('Invalid username or password!');
}
if(isMatch){
const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

return {
token:token,
error:false,
message:'Login successful',
id:user.id,
name:user.id,
role:user.role,
email: user.email,
name: user.name,
photo_url: user.photo_url
};
}
  }, 


 
createUser: async (_, { input }, {currentUser,database}) => {   
const {email}=input
const {mongo_db,mysql_db}=database
 
const query = `SELECT * FROM users WHERE email = '${input.email}'`;

try {
const query = 'SELECT COUNT(*) AS count FROM users WHERE email = ?';
const [rows] = await mysql_db.query(query, [email]);
if (rows[0].count > 0) {
throw new Error('Email already exists!');
}

} catch (err) { 
throw new Error(err.message);
}

const { photo_url } = await input;
let key 
let img_url
const id_code=uuidv4()
input.id=id_code

if(photo_url){
key = `${id_code}.${'jpg'}`;
 
const uploadParams = {
Bucket: process.env.S3_BUCKET_NAME,
Key: key,
Body: photo_url,
ContentType:"image/jpeg",
ACL: 'public-read'
};
const { Location} = await s3.upload(uploadParams).promise();
input.photo_url=Location
 }

input.password=await bcrypt.hash(input.password,10)
await mysql_db.query('INSERT INTO users SET ?', input);
const response = await mysql_db.query('SELECT * FROM users WHERE id = ?', [id_code]);
const user = Object.assign({}, ...response[0]);
  
if(user){
const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
 
return {
token:token,
error:false,
message:'Login successful',
id:user.id,
name:user.id,
email: user.email,
role:user.role,
name: user.name,
photo_url: user.photo_url,
createdAt:user.createdAt,
modifiedAt:user.modifiedAt
};
}
else{
  throw new Error('Error, record not added!');
} 
}, 



uploadProfilePicture: async (_, { user,photo_url }, {currentUser,database}) => {  
  const {mongo_db,mysql_db}=database

  const [rows] = await mysql_db.execute('SELECT * FROM users WHERE id = ?', [user]);
  const userr = rows[0]; 
  if (!userr) {
  throw new Error('User does not exist!'); 
  }
  
  try{
  const updated = await mysql_db.execute('UPDATE users set photo_url = ? WHERE id = ?', [photo_url,user]);
  
  }catch(err){
    console.log("resolver error",err)
  }
  },
  

  updateUser: async (_, { user,input }, {currentUser,database}) => {  
    const {mongo_db,mysql_db}=database

    const [rows] = await mysql_db.execute('SELECT * FROM users WHERE id = ?', [user]);
    const userr = rows[0]; 
    if (!userr) {
    throw new Error('User does not exist!'); 
    }
    
    try{
   // const updated = await mysql_db.execute("UPDATE users set name = ?,role=? WHERE id = ?", [input.name,input.role,user]);
   const [result] = await mysql_db.execute("UPDATE users set name = ?,role=? WHERE id = ?",[input.name,input.role,user]);
 //return result.affectedRows; 
const [rowss] = await mysql_db.execute('SELECT * FROM users WHERE id = ?', [user]);
const userrr = rowss[0]; 
   
    if (result.affectedRows>0) {
    
    return userrr
    }  
    else{
      throw new Error('Record not updated!'); 
    }
    }catch(err){
      throw new Error('Record not updated!'); 
    }
    },
    

 




resetPassword: async (parent, { email },  {currentUser,database}) => {
  const {mongo_db,mysql_db}=database
const user = await mongo_db.collection('users').findOne({ email });

if (!user) {
  throw new Error('User not found');
}

// 2. Generate a new password and update the user's record
const newPassword = generatePassword();
const updated = await mysql_db.execute('UPDATE users set photo_url = ? WHERE id = ?', [photo_url,user]);
await context.db
  .collection('users')
  .updateOne({ _id: user._id }, { $set: { password: newPassword } });

// 3. Send an email to the user with their new password
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

await transporter.sendMail({
  from: process.env.SMTP_FROM_ADDRESS,
  to: email,
  subject: 'Your password has been reset',
  text: `Your new password is ${newPassword}`,
});

return true;
}, 


}
}
module.exports = userResolvers;




 