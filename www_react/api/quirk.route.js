const express = require('express');
const quirkRoutes = express.Router();

// Require Quirk model in our routes module
let Quirk = require('./quirk.model');

// Defined store route
quirkRoutes.route('/add').post(function (req, res) {
  console.log("in quirk add");
  let quirk = new Quirk(req.body);
  quirk.save()
    .then(quirk => {
      res.status(200).json({'quirk': 'quirk in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
quirkRoutes.route('/').get(function (req, res) {
  console.log("in quirk index");
    Quirk.find(function(err, quirkes){
    if(err){
      console.log(err);
    }
    else {
      res.json(quirkes);
    }
  });
});

// Defined get data(index or listing) route
quirkRoutes.route('/:guid').get(function (req, res) {
  console.log("in quirk index for: ",req.params.id);
    Quirk.find({sheet: req.params.guid},function(err, quirkes){
    if(err){
      console.log(err);
    }
    else {
      res.json(quirkes);
    }
  });
});

// Defined edit route
quirkRoutes.route('/edit/:id').get(function (req, res) {
  console.log("in quirk edit for:",req.params.id);
  let id = req.params.id;
  Quirk.findById(id, function (err, quirk){
      res.json(quirk);
  });
});

//  Defined update route
quirkRoutes.route('/update/:id').post(function (req, res) {
  console.log("in quirk update for:",req.params.id);
    Quirk.findById(req.params.id, function(err, quirk) {
    if (!quirk)
      res.status(404).send("data is not found");
    else {
        quirk.name = req.body.name;

        //  FIX THIS 
        
        quirk.save().then(quirk => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
quirkRoutes.route('/delete/:id').get(function (req, res) {
  console.log("in quirk delete for:",req.params.id);
    Quirk.findByIdAndRemove({_id: req.params.id}, function(err, quirk){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = quirkRoutes;