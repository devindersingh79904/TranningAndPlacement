var express = require('express');
var router = express.Router();
var Company = require('../models/Company');
var { check, validationResult } = require('express-validator/check');

router.get('/', (req, res) => {
  Company.find().then(
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

router.get('/:id', function (req, res) {
  var id = req.params.id;
  Company.findById(id).then(
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

router.post(
  '/add',
  [
    check('email', 'email must be a valid email address')
      .not()
      .isEmpty()
      .isEmail(),
    check('phoneno', 'phoneNO contain only numeric and length is exactly 10')
      .isNumeric()
      .isLength({ min: 10, max: 10 }),
  ],
  (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(400).send('validation error');
    }
    var sstd = req.body.selectedsturollno;
    var selectedsturollno = sstd.split(',').map((rs) => parseInt(rs.trim()));

    var phn = req.body.phoneno;
    var phoneno = phn.split(',').map((rs) => parseInt(rs.trim()));

    //console.log('resulted array is : ' + selectedsturollno[1]);
    var comp = new Company({
      name: req.body.name,
      phoneno: phoneno,
      email: req.body.email,
      drivedate: req.body.drivedate,
      packageproposed: req.body.packageproposed,
      companylocation: req.body.companylocation,
      selectedsturollno: selectedsturollno,
    });

    comp.save().then(
      (result) => {
        res.status(200).send('company save hogi e');
      },
      (err) => {
        if (err) {
          console.error(err.message);
          res.status(401).send('bad request');
        }
      }
    );
  }
);

module.exports = router;
