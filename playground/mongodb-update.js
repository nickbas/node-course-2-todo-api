// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

let obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server')
  };
  console.log('Connected to MongoDB server');

  db.collection('Users').findOneAndUpdate({_id: new ObjectID('5c1d21688cce3b353a66a686')},{
    $set: {
      name: 'John Smith'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((res) => {
    console.log(res)
  });

  db.close()
});
