var express = require('express');
var router = express.Router();
var Student = require('../models/Student');

router.get('/', (req, res) => {
  Student.find().then(
    (result) => {
      console.log('Total recored found : ' + result.length);
      res.status(200).send(result);
    },
    (err) => {
      if (err) {
        console.error(err.message);
        res.status(400).send('main error agea');
      }
    }
  );
});

//get /:id
//private
//desc to get ditail of specific student

router.get('/:id', function (req, res) {
  var id = req.params.id;
  Student.findById(id).then(
    (result) => {
      console.log('i am ' + result);
      res.status(200).send(result);
    },
    (err) => {
      if (err) {
        console.error(err.message);
        res.status(400).send('main error agea');
      }
    }
  );
});

//post /add
//private
// des add ditail of student in database

router.post('/add', (req, res) => {
  var std = new Student({
    rollno: req.body.rollno,
    name: req.body.name.toUpperCase(),
    class: req.body.class.toUpperCase(),
    dept: req.body.dept.toUpperCase(),
    session: req.body.session.toUpperCase(),
    backlog: req.body.backlog.toUpperCase(),
    email: req.body.email.toUpperCase(),
    phoneno: req.body.phoneno,
    interest: req.body.interest.toUpperCase(),
  });

  console.log(std);
  std.save().then(
    (result) => {
      res.status(200).send('saved Succesfully');
    },
    (err) => {
      console.error(err.message);
    }
  );
});

module.exports = router;
