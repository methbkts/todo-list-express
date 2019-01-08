var express = require('express'),
router = express.Router(),
mongodb = require('mongodb'),
MongoClient = mongodb.MongoClient,
// ObjectId = mongodb.ObjectID ,
url = "mongodb://localhost:27017/todolist";

MongoClient.connect(url,
  {useNewUrlParser:true},
      
      function(err, client) {
      if (err) throw err;
      
      let db = client.db('todolist');
      // let userId = "5bf3e80351334b228d1bbcf1";
  
      // router.use(function (req, res, next) {
      //     res.setHeader('Content-Type', 'application/json');
      //     next();
      // });

  /* GET todos */
  router.get('/', function (req, res, next) {
    db.collection('todos').find({}).toArray(function (err, todos) {
      res.render('index', { title: 'TodoExpress', todos: todos });
      // return res.json(todos);
    })
  });

});

module.exports = router;