const bcrypt = require('bcrypt');
import jwt from 'jsonwebtoken';
import pool from '../datasources/mysql';
const { v4: uuidv4 } = require("uuid");
import { hashPassword,verifyPassword } from './auth';

export default async function handler(req, res) {
  const { email, password } = req.body;
 
 
const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
const user = rows[0];

if (!user) {
throw new Error('Invalid email or password');
}

const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
throw new Error('Invalid email or password');
}

const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
console.log("useruser",user)
return {
token,
user,
};
  // res.setHeader('Set-Cookie', `token=${token}; Path=/`);
  // res.status(200).json({ 'user':ress[0] });
  //   }
  
  // else  {
  // res.status(401).json({ message: 'Invalid username or password!' });
  // }
 
  
}
