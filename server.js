const express = require('express');
const admin = require('./routes/admin');
const company = require('./routes/company');
const drive = require('./routes/drive');
const student = require('./routes/student');
const user = require('./routes/users');
const volunteer = require('./routes/volunteer');
const connectDb = require('./config/db');

const app = express();
const PORT = 5000;

connectDb();
app.use(express.json({ extended: false }));

app.use('/api/admin', admin);
app.use('/api/drive', drive);
app.use('/api/student', student);
app.use('/api/user', user);
app.use('/api/volunteer', volunteer);

app.get('/', (req, res) => {
  return res.json({ msg: 'Welcome to TPC' });
});

app.listen(PORT, () => {
  console.log(`Node server started on port :  ${PORT}`);
});
