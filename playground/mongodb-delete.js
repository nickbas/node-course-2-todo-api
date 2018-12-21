// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

let obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server')
  };
  console.log('Connected to MongoDB server');

  //deleteMany
  // db.collection('Users').deleteMany({name: 'Nicholas Basinger'}).then((result) => {
  //   console.log(result);
  // });
  //deleteOne
  // db.collection('Todos').deleteOne({text: 'eat lunch'}).then((result) => {
  //   console.log(result)
  // });
  //findOneAndDelete
  db.collection('Users').findOneAndDelete({_id: new ObjectID('5c1d24e84113219c23fadcdc')}).then((result) => {
    console.log(result);
  })
  // db.close()
});
