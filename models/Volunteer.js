const mongoose = require('mongoose');

var VolunteerSchema = mongoose.Schema({
  rollno: {
    type: Number,
    require: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  session: {
    type: String,
    required: true,
  },
  noofdutiesaccepted: {
    type: Number,
    required: true,
    default: 0,
  },
  noofdutiesassign: {
    type: Number,
    required: true,
    default: 0,
  },
  domain: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model('volunteer', VolunteerSchema);
