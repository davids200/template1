import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const file = req.files.file;

    if (!file) {
      return res.status(400).send('No file uploaded');
    }

    const fileExtension = path.extname(file.name);

    if (fileExtension !== '.txt' && fileExtension !== '.xls' && fileExtension !== '.xlsx') {
      return res.status(400).send('Invalid file type');
    }

    const filePath = path.join(process.cwd(), 'public/uploads', file.name);

    fs.writeFile(filePath, file.data, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Failed to upload file');
      }
      return res.status(200).send('File uploaded successfully');
    });
  }
}
