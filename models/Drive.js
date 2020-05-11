const mongoose = require('mongoose');

var DriveScheema = new mongoose.Schema({
  companyname: {
    type: String,
    required: true,
  },
  drivedate: {
    type: Date,
    required: true,
  },
  volrollno: [
    {
      type: Number,
      required: true,
    },
  ],
  stdrollno: [
    {
      type: Number,
      required: true,
    },
  ],
  selectedsturollno: [
    {
      type: Number,
      required: true,
    },
  ],
});

module.exports = mongoose.model('drive', DriveScheema);
