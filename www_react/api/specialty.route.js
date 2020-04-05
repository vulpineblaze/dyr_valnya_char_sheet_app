const express = require('express');
const specialtyRoutes = express.Router();

// Require Specialty model in our routes module
let Specialty = require('./specialty.model');

// Defined store route
specialtyRoutes.route('/add').post(function (req, res) {
  console.log("in specialty add");
  let specialty = new Specialty(req.body);
  specialty.save()
    .then(specialty => {
      res.status(200).json({'specialty': 'specialty in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
specialtyRoutes.route('/').get(function (req, res) {
  console.log("in specialty index");
    Specialty.find(function(err, specialtyes){
    if(err){
      console.log(err);
    }
    else {
      res.json(specialtyes);
    }
  });
});

// Defined get data(index or listing) route
specialtyRoutes.route('/:guid').get(function (req, res) {
  console.log("in specialty index for: ",req.params.id);
    Specialty.find({sheet: req.params.guid},function(err, specialtyes){
    if(err){
      console.log(err);
    }
    else {
      res.json(specialtyes);
    }
  });
});

// Defined edit route
specialtyRoutes.route('/edit/:id').get(function (req, res) {
  console.log("in specialty edit for:",req.params.id);
  let id = req.params.id;
  Specialty.findById(id, function (err, specialty){
      res.json(specialty);
  });
});

//  Defined update route
specialtyRoutes.route('/update/:id').post(function (req, res) {
  console.log("in specialty update for:",req.params.id);
    Specialty.findById(req.params.id, function(err, specialty) {
    if (!specialty)
      res.status(404).send("data is not found");
    else {
        specialty.name = req.body.name;

        //  FIX THIS 
        
        specialty.save().then(specialty => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
specialtyRoutes.route('/delete/:id').get(function (req, res) {
  console.log("in specialty delete for:",req.params.id);
    Specialty.findByIdAndRemove({_id: req.params.id}, function(err, specialty){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = specialtyRoutes;