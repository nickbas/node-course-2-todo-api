let express = require('express');
let bodyParser = require('body-parser');
let { ObjectID } = require('mongodb');

let { mongoose } = require('./db/mongoose');
let { Todo } = require('./models/todo');
let { User } = require('./models/user');

let app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req,res) => {
  // console.log(req.body);
  // console.log('req',req)
  let todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req,res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  // res.send(req.params)
  let id = req.params.id;
  //validate id using isValid
   //404 - send back empty body
  if (!ObjectID.isValid(id)){
    res.status(404).send('Whoops! ID not valid.')
  };
  Todo.findById(id).then((todo) => {
    console.log('todo',todo)
    if (!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send()
  })
});

app.listen(port, () => {
  console.log(`Started on port ${port}`)
});

module.exports = { app };