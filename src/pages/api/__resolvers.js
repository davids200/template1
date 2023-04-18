const AWS = require('aws-sdk');
const { S3_BUCKET_NAME, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, AWS_REGION } = process.env;
const s3 = new AWS.S3({ /* s3 configuration */ });
const mysql_db = require('./datasources/mysql');
// ...


const resolvers = {
  
Mutation:{
  saveForm: async (_,input) => {
    const { file,name,description} = await input;
    console.log("input input",input)

   // return
   
    const stream = createReadStream();
    const params = {
      Bucket: S3_BUCKET_NAME,
      Key: file.filename,
      Body: file.stream,
      ContentType: file.mimetype,
      ContentEncoding: encoding,
    };
    const response = await s3.upload(params).promise();
   const img= response.Location;

   const result = await db.query('UPDATE Users set photo=? WHERE id = ?', [img,id]);
   const id = result.insertId;
 
   const user = await db.query('SELECT * FROM Users WHERE id = ?', [id]);
   return user[0];
  },
  },

}

