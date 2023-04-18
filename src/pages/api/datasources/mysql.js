const mysql = require('mysql2/promise');

// const pool = mysql.createPool({
//   host: 'elitetools.org',
//   user: 'elitetools_nextjs',
//   password: 'i#fv0P5CC%kY',
//   database: 'elitetools_nextjs',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'next_graphql_example',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;

 