import AWS from 'aws-sdk'
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};


export default async function handler(req, res) {
  const form = new formidable.IncomingForm();
 
 return form.parse(req, (err, fields, files) => {
   

    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    
    // Process the file here
    // const { path: tempFilePath, name } = files.file;
    // const targetPath = path.join(__dirname, 'uploads', name);

   
    console.log("files.file.filePath//==================",files.file.filepath)

    // fs.rename(tempFilePath, targetPath, (err) => {
    //   if (err) {
    //     console.error(err);
    //     return res.status(500).send(err);
    //   }

    //   return res.status(200).send('File uploaded successfully');
    // });
 
  
  
  

  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  })
  
 
  const fileName = "profile/00000mmmmm.png";
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
    Body: files.file.filepath,
    ContentType: files.file.type,
  }
  
   
  s3.upload(params, function(err, data) {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Upload successful', data.Location);
    }
  });
  

 
//  const res= s3.upload(params, function (err, data) {
//     if (err) {
//       console.log('Error uploading file:', err)
//      // res.status(500).send('Error uploading file')
//     } else {
//       console.log('File uploaded successfully:', data.Location)
//       //res.status(200).send('File uploaded successfully')
//       console.log(('File uploaded successfully'))
//     }
//   })
return res
});
}
