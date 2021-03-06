const express = require('express');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;

//const url = 'mongodb://localhost:27017';
console.log(process.env.MONGO_URI);
if(process.env.MONGO_URI !=undefined){
  var url =  process.env.MONGO_URI;
}
else {
  var url = 'mongodb://localhost:27017';
}
console.log(url);
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
