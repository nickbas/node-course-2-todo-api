const {ObjectID} = require('mongodb')
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

let id = '5c33621621ddc3cf8a27a08b';

if (!ObjectID.isValid(id)){
    return console.log('ID not valid')
};

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//   if (!todo){
//     return console.log('Id not found')
//   }
//   console.log('Todo By Id', todo)
// }).catch((e) => console.log(e));

//User.findById

User.findById(id).then((user) => {
    console.log('user',user)
  if (!user){
    return console.log('User not found')
  }
  console.log('User', user)
}).catch((e) => console.log(e))