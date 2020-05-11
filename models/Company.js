const mongoose = require('mongoose');

var CompanySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneno: [
    {
      type: Number,
      require: true,
    },
  ],
  email: {
    type: String,
    require: true,
  },
  drivedate: {
    type: Date,
    required: true,
  },
  packageproposed: {
    type: Number,
    required: true,
  },
  companylocation: {
    type: String,
    required: true,
  },
  selectedsturollno: [
    {
      type: Number,
      required: true,
    },
  ],
});

module.exports = mongoose.model('company', CompanySchema);
