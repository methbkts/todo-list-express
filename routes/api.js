var express = require('express'),
router = express.Router(),
mongodb = require('mongodb'),
MongoClient = mongodb.MongoClient,
ObjectId = mongodb.ObjectID ,
url = "mongodb://localhost:27017/todolist";

MongoClient.connect(url,
  {useNewUrlParser:true},
  
  function(err, client) {
    if (err) throw err;
    
    let db = client.db('todolist');
    // let userId = "5bf3e80351334b228d1bbcf1";
    
    router.use(function (req, res, next) {
      res.setHeader('Content-Type', 'application/json');
      next();
    });
    
    /* GET all todos */
    router.get('/', function (req, res, next) {
      db.collection('todos').find({}).toArray(function (err, todos) {
        return res.json(todos);
      })
    });

    /* POST one todo */
      router.post('/', function (req, res, next) {
        var todo = {
          title: req.body.title,
          content: req.body.content,
          creation_date : new Date(),
          updated_date : new Date(),
          state : false,
          user : 'johnDoe',
          deadLine : '',
        }
        db.collection('todos').insertOne(todo, function (err, result) {
          return res.json(result); 
        })
      });

    /* GET one todo */
    // router.get('/:id', function (req, res, next) {
      
    // })

    /* PUT (Update) One TODO */
    router.put('/:id', function (req, res, next) {
      db.collection('todos').updateOne({_id:ObjectId(req.params.id)},
        {$set: req.body/*{state:true}*/},
        function (err, result) {
            if (err) return next(err);
            db.collection('todos').findOne({_id:ObjectId(req.params.id)}, function (err, doc){
              if(err) return next(err);
              res.render('todos', {todos : doc}, function(err, html) {
                  if(err) return next(err);
                  return res.json({response : html})   
              })
            });
            // return res.json(result);
            //   db.close();
        }
      );
    });

    /* DELETE One TODO */
    router.delete('/:id', function (req, res, next) {
      db.collection('todos').deleteOne({_id:ObjectId(req.params.id)},
        function(err, result) {
            if(err) return next(err);
            return res.json(result);
        //   db.close();
        }
      );
    });

}); /* END MongoClient.connect*/

module.exports = router;