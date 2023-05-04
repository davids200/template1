const AWS = require('aws-sdk');
const s3 = new AWS.S3(); 
const { v4: uuidv4 } = require("uuid");
const mysql_db = require('./../datasources/mysql');
 
 

const bookResolvers = {
Query: {
  books: async (_, { limit, offset }, { mysql }) => {
if (limit) {
const [rows] = await mysql_db.execute('SELECT COUNT(*) AS totalBooks FROM books');
const totalBooks = rows[0].totalBooks;
console.log("totalRows totalRows",totalBooks)
    

    const [results, fields] = await mysql_db.query(`SELECT title,id,author FROM books WHERE id > ? LIMIT ?`, [offset, limit]);
    results[0].totalBooks=totalBooks
    console.log("totalBooks totalBooks",results)
    return results;
    }
  },
  // book: async (_parent, args, _context, _info) => {
  //   if (args.limit) {
  //     const start = args.offset;
  //     const end = args.limit;
  //     return [...booksBasic].slice(start, end);
  //   } else {
  //     return [...booksBasic];
  //   }
  // },

    // bookss: async (_,args, {currentUser,database}) => {
    //    console.log("args args",args)
    //    //  const {mongo_db,mysql_db}=database
     
    //      const [rows, fields] = await mysql_db.query('SELECT distinct title,id,author FROM books');
    //      console.log("secondary of all, am in books",rows)
    //      return rows;
    //    },   
},

 
         
 
} 
module.exports = bookResolvers;




 