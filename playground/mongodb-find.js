// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

let obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server')
  };
  console.log('Connected to MongoDB server');

  // db.collection('Todos').find({
  //   _id: new ObjectID('5c1bd3d97b98022c5ba9361e')
  // }).toArray().then((docs) => {
  //   console.log('Todos', docs);
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });
  db.collection('Todos').find().count().then((count) => {
    console.log(`Todos count: ${count}`);
  }, (err) => {
    console.log('Unable to fetch todos', err);
  });
  db.collection('Users').find({name: "Nicholas Basinger"}).toArray().then((doc) => {
    console.log(`Todos count: ${JSON.stringify(doc, undefined, 2)}`);
  }, (err) => {
    console.log('Unable to fetch todos', err);
  });
  db.close()
});
