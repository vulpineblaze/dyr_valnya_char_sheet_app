const express = require('express');
const emptyRoutes = express.Router();

// Require Empty model in our routes module
let Empty = require('./empty.model');

// Defined store route
emptyRoutes.route('/add').post(function (req, res) {
  console.log("in empty add");
  let empty = new Empty(req.body);
  empty.save()
    .then(empty => {
      res.status(200).json({'empty': 'empty in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
emptyRoutes.route('/').get(function (req, res) {
  console.log("in empty index");
    Empty.find(function(err, emptyes){
    if(err){
      console.log(err);
    }
    else {
      res.json(emptyes);
    }
  });
});

// Defined get data(index or listing) route
emptyRoutes.route('/:guid').get(function (req, res) {
  console.log("in empty index for: ",req.params.id);
    Empty.find({sheet: req.params.guid},function(err, emptyes){
    if(err){
      console.log(err);
    }
    else {
      res.json(emptyes);
    }
  });
});

// Defined edit route
emptyRoutes.route('/edit/:id').get(function (req, res) {
  console.log("in empty edit for:",req.params.id);
  let id = req.params.id;
  Empty.findById(id, function (err, empty){
      res.json(empty);
  });
});

//  Defined update route
emptyRoutes.route('/update/:id').post(function (req, res) {
  console.log("in empty update for:",req.params.id);
    Empty.findById(req.params.id, function(err, empty) {
    if (!empty)
      res.status(404).send("data is not found");
    else {
        empty.name = req.body.name;

        //  FIX THIS 
        
        empty.save().then(empty => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
emptyRoutes.route('/delete/:id').get(function (req, res) {
  console.log("in empty delete for:",req.params.id);
    Empty.findByIdAndRemove({_id: req.params.id}, function(err, empty){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = emptyRoutes;