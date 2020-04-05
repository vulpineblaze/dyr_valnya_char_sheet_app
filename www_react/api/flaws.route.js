const express = require('express');
const flawsRoutes = express.Router();

// Require Flaws model in our routes module
let Flaws = require('./flaws.model');

// Defined store route
flawsRoutes.route('/add').post(function (req, res) {
  console.log("in flaws add");
  let flaws = new Flaws(req.body);
  flaws.save()
    .then(flaws => {
      res.status(200).json({'flaws': 'flaws in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
flawsRoutes.route('/').get(function (req, res) {
  console.log("in flaws index");
    Flaws.find(function(err, flawses){
    if(err){
      console.log(err);
    }
    else {
      res.json(flawses);
    }
  });
});

// Defined get data(index or listing) route
flawsRoutes.route('/:guid').get(function (req, res) {
  console.log("in flaws index for: ",req.params.id);
    Flaws.find({sheet: req.params.guid},function(err, flawses){
    if(err){
      console.log(err);
    }
    else {
      res.json(flawses);
    }
  });
});

// Defined edit route
flawsRoutes.route('/edit/:id').get(function (req, res) {
  console.log("in flaws edit for:",req.params.id);
  let id = req.params.id;
  Flaws.findById(id, function (err, flaws){
      res.json(flaws);
  });
});

//  Defined update route
flawsRoutes.route('/update/:id').post(function (req, res) {
  console.log("in flaws update for:",req.params.id);
    Flaws.findById(req.params.id, function(err, flaws) {
    if (!flaws)
      res.status(404).send("data is not found");
    else {
        flaws.name = req.body.name;
        

        //  FIX THIS 
        
        flaws.save().then(flaws => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
flawsRoutes.route('/delete/:id').get(function (req, res) {
  console.log("in flaws delete for:",req.params.id);
    Flaws.findByIdAndRemove({_id: req.params.id}, function(err, flaws){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = flawsRoutes;