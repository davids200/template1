const bcrypt = require('bcrypt');

import jwt from 'jsonwebtoken';
import pool from '../datasources/mysql';
const { v4: uuidv4 } = require("uuid");

export default async function handler(req, res) {
  const { name, email, password } = req.body;
 
   
  const [rows] = await pool.execute('SELECT * FROM users WHERE email = ? ', [email]); 
  if (rows.length > 0) {
   
  res.status(409).json({ message: 'Email address already exists' });
  }

  const saltRounds = 10; 
const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
 
  // Insert user into database
  const userId=uuidv4();
  const dt=new Date();
  const result = await pool.query(
    'INSERT INTO users (id,name, email, password, createdAt,modifiedAt) VALUES (?,?, ?, ?, ?,?)',
    [userId,name, email, hashedPassword, dt,dt]
  );

  // Generate JWT token
  const token = jwt.sign({ userId }, process.env.NEXTAUTH_SECRET);
  const [ress] = await pool.execute('SELECT * FROM users WHERE email = ? ', [email]);
  ress[0].token=token
  ress[0].password=null
  // Set token as cookie
  res.setHeader('Set-Cookie', `token=${token}; Path=/`);
  res.status(200).json({ message: 'User registered successfully','user':ress[0] });
}
