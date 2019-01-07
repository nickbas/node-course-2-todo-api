let mongoose = require('mongoose');

let User = mongoose.model('User', {
  // User: {
  //   type: String,
  //   required: true,
  //   minlength: 1,
  //   trim: true
  // },
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    match: /([A-Za-z\.]+)@([A-Za-z\.]+)/g
  }
});

module.exports = { User }