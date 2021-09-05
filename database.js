var MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017';
var db;
MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    db=client.db('netdb');
    // const bookCollection = db.collection('book')
    // var data=bookCollection.find().toArray();
  })
module.exports = db;