var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('config');
var auth = require('../middleware/auth');
var Admin = require('../models/Admin');

router.get('/', auth, (req, res) => {
  res.send('i ma here');
});

router.post('/login', async (req, res) => {
  try {
    var result = await Admin.findOne({ email: req.body.email });
    console.log(result);
    if (!result) {
      return res.status(406).send('Ivalid crandential');
    }

    var pass = result.password;
    var password = req.body.password;

    console.log('pass : ' + pass);
    console.log('hash : ' + password);

    var isMatch = bcrypt.compare(password, pass);

    if (!isMatch) {
      return res.json({ respose: 'login Error' }).send();
    }

    console.log('i am login success fully');

    var payload = {
      user: {
        user_id: result.id,
      },
    };

    jwt.sign(payload, config.get('secretkey'), (err, token) => {
      if (err) {
        throw err;
      } else {
        console.log(token);
        res.send(token);
      }
    });
  } catch (error) {}
});

router.post('/signup', async (req, res) => {
  try {
    var result = await Admin.findOne({ email: req.body.email });

    console.log(result);
    if (result) {
      return res.status(406).send('User already register ');
    }

    console.log('i am here before salt');
    var salt = await bcrypt.genSalt(10);

    var hash = await bcrypt.hash(req.body.password, salt);
    console.log('i am here before user');
    var user = new Admin({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });

    console.log('i am here');
    await user.save();

    res.json({ respose: 'tuhada admin teyar hai.' }).send();
  } catch (error) {}
});

module.exports = router;
