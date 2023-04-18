const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
  await client.connect();
  return client.db('<database-name>').collection('<collection-name>');
}

module.exports = connect;
