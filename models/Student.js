const mongoose = require('mongoose');

var StudentSchema = mongoose.Schema({
  rollno: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  dept: {
    type: String,
    required: true,
  },
  session: {
    type: String,
    required: true,
  },
  backlog: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phoneno: {
    type: String,
    require: true,
  },
  interest: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('student', StudentSchema);
