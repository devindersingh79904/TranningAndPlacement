var express = require('express');
var router = express.Router();
var volunteer = require('../models/Volunteer');

router.get('/', function (req, res) {
  volunteer.find().then(
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

// POST /volunter/add
// PRIVATE
//desc create a volunteer profile
router.post('/add', (req, res) => {
  var dom = req.body.domain;
  console.log(dom);

  var vol = new volunteer({
    rollno: req.body.rollno,
    name: req.body.name.toUpperCase(),
    email: req.body.email.toUpperCase(),
    course: req.body.course.toUpperCase(),
    session: req.body.session.toUpperCase(),
    domain: dom.split(',').map((skill) => skill.trim().toUpperCase()),
  });

  console.log(vol);
  vol.save().then(
    (result) => {
      res.status(200).send('saved Succesfully');
    },
    (err) => {
      console.error(err.message);
    }
  );
});

//get /assign_duty
//Private
//desc it will incement number of duty assign

router.get('/assign/:id', (req, res) => {
  var id = req.params.id;

  volunteer.findByIdAndUpdate(id, { $inc: { noofdutiesassign: 1 } }).then(
    (result) => {
      console.log(result);
      res.status(200).send('duty assigned');
    },
    (err) => {
      if (err) {
        console.error(err.message);
        res.status(400).send('error on update');
      }
    }
  );
});

//get /accepted_duty
//Private
//desc it will incement number of duty accepted
router.get('/accepted/:id', (req, res) => {
  var id = req.params.id;

  volunteer
    .findByIdAndUpdate(id, { $inc: { noofdutiesaccepted: 1 } }, { new: true })
    .then(
      (result) => {
        console.log(result);
        res.status(200).send('duty Accepted');
      },
      (err) => {
        if (err) {
          console.error(err.message);
          res.status(400).send('error on update');
        }
      }
    );
});

//get /:id
//Private
//desc it will incement number of duty accepted

router.get('/:id', function (req, res) {
  var id = req.params.id;
  volunteer.findById(id).then(
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

module.exports = router;
