const express = require('express');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;

//const url = 'mongodb://localhost:27017';


//const url = 'mongodb+srv://netuser:vemLMmwNe36gG1ve@cluster0.pf0hf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

//const url =process.env.MONGODB_URI;
const url =System.getenv("MONGODB_URI");

router.get('/:name', function(req, res) {
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
}); 


router.get('/', function(req, res){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        const dbo = db.db("netdb");
        dbo.collection("book").find().toArray(
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
router.put('/:isbn',function(req,res){
  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      const dbo = db.db("netdb");
      dbo.collection("book").updateOne({isbn:req.params.isbn},{$set:{
        name:req.body.name,
        author:req.body.author
      }},
      function(err, result) {
          if (err) throw err;
          res.json(result);
          db.close();
      });
    });
  });

  router.delete('/:isbn',function(req,res){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        const dbo = db.db("netdb");
        dbo.collection("book").deleteOne({
          isbn:req.params.isbn
        },
        function(err, result) {
            if (err) throw err;
            res.json(result);
            db.close();
        });
      });
    });




module.exports = router;
