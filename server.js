const express = require('express');
const connectDb = require('./config/db');

const app = express();

const PORT = 5000;

connectDb();
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  return res.json({ msg: 'Welcome to TPC' });
});

app.listen(PORT, () => {
  console.log(`Node server started on port :  ${PORT}`);
});
