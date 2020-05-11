var express = require('express');
var router = express.Router();
var Drive = require('../models/Drive');
var Student = require('../models/Student');
var Comapny = require('../models/Company');
var Volunteer = require('../models/Volunteer');

router.get('/details', async (req, res) => {
  let selectedsturollno;
  let selectedstudentdetail;
  let allstudentdetail;
  let volunteerRollno;
  let volunteerdetail;
  let companydetail;
  let stdrollno;
  let driveResult;

  try {
    driveResult = await Drive.find(
      {},
      { selectedsturollno: 1, volrollno: 1, stdrollno: 1, companyname: 1 }
    );
    // console.log(driveResult);
    selectedsturollno = driveResult[0].selectedsturollno;
    selectedstudentdetail = await Student.find({
      rollno: { $in: selectedsturollno },
    });

    stdrollno = driveResult[0].stdrollno;
    allstudentdetail = await Student.find({ rollno: { $in: stdrollno } });

    volunteerRollno = driveResult[0].volrollno;
    volunteerdetail = await Volunteer.find({
      rollno: { $in: volunteerRollno },
    });

    company = driveResult[0].companyname;
    companydetail = await Comapny.find({ name: company });
  } catch (error) {
    console.error(error.message);
    res.status(401).send('drive ch error');
  }
  res.send(
    '\n\n' +
      selectedstudentdetail +
      'all student \n\n\n' +
      allstudentdetail +
      'comapny detial\n\n\n' +
      companydetail +
      'volunteer ditail \n\n\n' +
      volunteerdetail
  );

  //   Drive.find({},{selectedsturollnstdrollnoo:1,volrollno:1,stdrollno:1,companyname:1}).then((result)=>{
  //       selectedsturollno = result[0].selectedsturollno;
  //       volunteerRollno = result[0].volrollno;
  //       comapny = result[0].companyname;
  //       stdrollno = result[0].stdrollno;

  //     //   Student.find({rollno:{$in:selectedsturollno}}).then( (result) => {
  //     //       resultArray.selectedsturollno = result;
  //     //       console.log('i am inside : '+resultArray.selectedsturollno);
  //     //   });

  //     //   Student.find({rollno:{$in:stdrollno}}).then( (result) => {
  //     //     console.log(result);
  //     //     resultArray.stdrollno = result;
  //     // });

  //     // console.log(resultArray);
  //     // res.send(resultArray);

  //     var result = async () => {
  //       try {
  //         selectedsturollno = await Student.find({rollno:{$in:selectedsturollno}});

  //       } catch (error) {
  //         console.log(error.message);
  //         res.status(400).send('getting error ');
  //       }
  //     };
  //   }).catch((error) => {
  //      console.error(error);
  //      res.status(401).send(error.message);
  //  });
});

router.get('/', (req, res) => {
  Drive.find().then(
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
  Drive.findById(id).then(
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
//desc add a drive ditail

router.post('/add', (req, res) => {
  var volrol = req.body.volrollno;
  var volrollno = volrol.split(',').map((rs) => parseInt(rs.trim()));

  var stdroll = req.body.stdrollno;
  var stdrollno = stdroll.split(',').map((rs) => parseInt(rs.trim()));

  var sstd = req.body.selectedsturollno;
  var selectedsturollno = sstd.split(',').map((rs) => parseInt(rs.trim()));

  var dr = new Drive({
    companyname: req.body.companyname,
    drivedate: req.body.drivedate,
    volrollno: volrollno,
    stdrollno: stdrollno,
    selectedsturollno: selectedsturollno,
  });

  dr.save().then(
    (result) => {
      res.send('main save hogea');
    },
    (err) => {
      if (err) {
        console.error(err.message);
        res.status(401).send('internal eror');
      }
    }
  );
});

//post /add
//private
//desc add a drive ditail

module.exports = router;
