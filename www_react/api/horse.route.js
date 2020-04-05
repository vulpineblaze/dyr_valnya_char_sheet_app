const express = require('express');
const horseRoutes = express.Router();

// Require Horse model in our routes module
let Horse = require('./horse.model');

// Defined store route
horseRoutes.route('/add').post(function (req, res) {
  console.log("in horse add");
  let horse = new Horse(req.body);
  horse.save()
    .then(horse => {
      res.status(200).json({'horse': 'horse in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
horseRoutes.route('/').get(function (req, res) {
  console.log("in horse index");
    Horse.find(function(err, horsees){
    if(err){
      console.log(err);
    }
    else {
      res.json(horsees);
    }
  });
});

// Defined get data(index or listing) route
horseRoutes.route('/:guid').get(function (req, res) {
  console.log("in horse index for: ",req.params.id);
    Horse.find({sheet: req.params.guid},function(err, horsees){
    if(err){
      console.log(err);
    }
    else {
      res.json(horsees);
    }
  });
});

// Defined edit route
horseRoutes.route('/edit/:id').get(function (req, res) {
  console.log("in horse edit for:",req.params.id);
  let id = req.params.id;
  Horse.findById(id, function (err, horse){
      res.json(horse);
  });
});

//  Defined update route
horseRoutes.route('/update/:id').post(function (req, res) {
  console.log("in horse update for:",req.params.id);
    Horse.findById(req.params.id, function(err, horse) {
    if (!horse)
      res.status(404).send("data is not found");
    else {
        horse.name = req.body.name;

        //  FIX THIS 
        
        horse.save().then(horse => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
horseRoutes.route('/delete/:id').get(function (req, res) {
  console.log("in horse delete for:",req.params.id);
    Horse.findByIdAndRemove({_id: req.params.id}, function(err, horse){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = horseRoutes;