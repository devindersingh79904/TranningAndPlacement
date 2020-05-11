const mongoose = require('mongoose');
const config = require('config');

const dbStr = config.get('mongoURI');

const connectDb = async () => {
  try {
    await mongoose.connect(dbStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('Connected Successfully to the database ');
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = connectDb;
