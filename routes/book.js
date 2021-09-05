const express = require('express');
const router = express.Router();
const book = require('../models/book_model');

const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017';


/* router.get('/:name', (req, res) => {
  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      const dbo = db.db("netdb");
      dbo.collection("book").findOne({
          name: req.params.name
      }, 
      function(err, result) {
          if (err) throw err;
          res.json(result);
          db.close();
      });
  });
}); */


router.get('/', function(req, res){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        const dbo = db.db("netdb");
        dbo.collection("book").find({}).toArray(
        function(err, result) {
            if (err) throw err;
            res.json(result);
            db.close();
        });
    });
});


router.post('/', function(req,res){
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  const dbo = db.db("netdb");
  dbo.collection("book").insertOne({
    name:req.body.name,
    author:req.body.author,
    isbn:req.body.isbn
  },
  function(err, result) {
      if (err) throw err;
      res.json(result);
      db.close();
});
});
});


router.delete('/:id', 
function(request, response) {
  book.delete(request.params.id, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
  });
});


router.put('/:id', 
function(request, response) {
  book.update(request.params.id, request.body, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
  });
});

module.exports = router;
