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

        // Insert One TODO
        //   router.post()
// db.todos.insertOne({
//     title : 'todo #3',
//     content : 'Élément de ma todolist',
//     creation_date : new Date(),
//     updated_date : new Date(),
//     state : false,
//     user : 'johnDoe',
//     deadLine : ''
// })

        // Update One TODO
        router.put('/:id', function (req, res, next) {
          db.collection('todos').updateOne({_id:ObjectId(req.params.id)},
          {$set: req.body/*{state:true}*/}),
          function (err, result) {
                if (err) return next(err);
                return res.json(result);
            //   db.close();
            };
        });

        // Delete One TODO
        router.delete('/:id', function (req, res, next) {
          db.collection('todos').deleteOne({_id:ObjectId(req.params.id)}),
           function(err, result) {
                if(err) return next(err);
                return res.json(result);
            //   db.close();
            };
        });

//   /* GET todos */
//   router.get('/', function (req, res, next) {
//     db.collection('todos').find({}).toArray(function (err, todos) {
//       // res.render('index', { title: 'Todo List', todos: todos });
//       return res.json(todos);
//     })
//   });

// });

});

module.exports = router;