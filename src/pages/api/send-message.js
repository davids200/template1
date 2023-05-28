import cors from 'cors';
import fetch from 'isomorphic-unfetch';

export default async function handler(req, res) {
  //  await cors()(req, res);
  
    const { numbers, message,sender,username,password } = req.body;
  console.log("===numbers, message,sender,username,password===",{numbers, message,sender,username,password})
try {
const responses = await Promise.all(
numbers.map(async (number) => {
const response = await fetch(
`http://www.egosms.co/api/v1/plain`,
{
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify({ 
number:numbers,
message,
sender,
username,
password,
}),
}
);
// Process the response if needed
const result = await response.json();
return result;
        })
      );
  
      // Handle the responses
      res.status(200).json({ success: true, responses });
    } catch (error) {
      // Handle any errors that occurred during the process
      res.status(500).json({ success: false, error: error.message });
    }
  }
  
  