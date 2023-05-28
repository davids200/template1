const mysql_db = require('../datasources/mysql');

import cron from 'node-cron'; 
 
// cron job every minute
cron.schedule('* * * * * ', async () => {
    console.log("cron job started",Date.now())
//   try {
//     // Run your MySQL query or perform other operations
//     const [rows] = await connection.execute('SELECT * FROM your_table');
//     console.log('Query results:', rows);
//     // Process the results or perform other actions
//   } catch (error) {
//     console.error('Error executing MySQL query:', error);
//   }
});

export default function handler(req, res) {
  // Handle the API request (if needed) or simply return a response
  res.status(200).json({ message: 'Cron job started' });
}
