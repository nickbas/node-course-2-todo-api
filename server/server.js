require('./config/config')

const _ = require('lodash')

const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

let { mongoose } = require('./db/mongoose');
let { Todo } = require('./models/todo');
let { User } = require('./models/user');

let app = express();
const port = process.env.PORT;

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

app.delete('/todos/:id', (req,res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)){
    res.status(404).send('Whoops! ID not valid.')
  };

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo){
      return res.status(404).send();
    }
    res.send({todo})
  }).catch((e) => {
    res.status(400).send()
  })
});

app.patch('/todos/:id', (req,res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)){
    res.status(404).send('Whoops! ID not valid.')
  };

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  };

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo})
  }).catch((e) => {
    res.status(400).send(e);
  });
});


// POST /users (similar would be the new todo post
// Pick instead of pulling off properties like we do for the patch method: email and password
app.post('/users', (req, res) => {
  console.log('posting user')
  let body = _.pick(req.body, ['email','password']);
  let user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
      res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`)
});

module.exports = { app };