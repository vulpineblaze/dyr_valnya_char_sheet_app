const express = require('express');
const magickaRoutes = express.Router();

// Require Magicka model in our routes module
let Magicka = require('./magicka.model');

// Defined store route
magickaRoutes.route('/add').post(function (req, res) {
  console.log("in magicka add");
  let magicka = new Magicka(req.body);
  magicka.save()
    .then(magicka => {
      res.status(200).json({'magicka': 'magicka in added successfully for sheet: '+magicka.sheet});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
magickaRoutes.route('/').get(function (req, res) {
  console.log("in magicka index");
    Magicka.find(function(err, magickaes){
    if(err){
      console.log(err);
    }
    else {
      res.json(magickaes);
    }
  });
});

// Defined get data(index or listing) route
magickaRoutes.route('/:guid').get(function (req, res) {
  console.log("in magicka index for: ",req.params.id);
    Magicka.find({sheet: req.params.guid},function(err, magickaes){
    if(err){
      console.log(err);
    }
    else {
      res.json(magickaes);
    }
  });
});

// Defined edit route
magickaRoutes.route('/edit/:id').get(function (req, res) {
  console.log("in magicka edit for:",req.params.id);
  let id = req.params.id;
  Magicka.findById(id, function (err, magicka){
      res.json(magicka);
  });
});

//  Defined update route
magickaRoutes.route('/update/:id').post(function (req, res) {
  console.log("in magicka update for:",req.params.id);
    Magicka.findById(req.params.id, function(err, magicka) {
    if (!magicka)
      res.status(404).send("data is not found");
    else {
        magicka.name = req.body.name;

        //  FIX THIS 
        
        magicka.save().then(magicka => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
magickaRoutes.route('/delete/:id').get(function (req, res) {
  console.log("in magicka delete for:",req.params.id);
    Magicka.findByIdAndRemove({_id: req.params.id}, function(err, magicka){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});


magickaRoutes.route('/getmagickas').post(function (req, res) {
  console.log("in magicka getmagickas");
  // let magicka = new Sheet(req.body);
  const ownerArray = req.body;
  const ownerQuery = { sheet: { $in: ownerArray } };
  Magicka.find(ownerQuery, function(err, magickaResult){
    if(err){console.log(err);}
    else {
      // console.log("emails:",emailArray,"| found:",magickaResult);
      res.json(magickaResult);
    }
  });
});




module.exports = magickaRoutes;