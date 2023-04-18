import aws from 'aws-sdk';
import FormData from 'form-data';
 

export default async function handler(req, res) {
  const S3_BUCKET_NAME = 'your-s3-bucket-name';

  const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  const form = new FormData();
  console.log("req.body",form)
//   form.append('name', req.body.name);

//   form.append('file', req.body.image);
//   form.append('name', "image-custom-name");






  
  const params = {
    // Bucket: process.env.S3_BUCKET_NAME,
    Bucket: process.env.S3_BUCKET_NAME,
    Key:process.env.AWS_ACCESS_KEY,
    Body: form.getBuffer(),
    ContentType: form.getHeaders()['content-type'],
    ContentLength: form.getLengthSync(),
    ACL: 'public-read',
  };

  try {
    const { Location } = await s3.upload(params).promise();
    res.status(200).json({ url: Location });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload file to S3' });
  }
}
