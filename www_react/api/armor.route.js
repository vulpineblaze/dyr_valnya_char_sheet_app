const express = require('express');
const armorRoutes = express.Router();

// Require Armor model in our routes module
let Armor = require('./armor.model');

// Defined store route
armorRoutes.route('/add').post(function (req, res) {
  console.log("in armor add");
  let armor = new Armor(req.body);
  armor.save()
    .then(armor => {
      res.status(200).json({'armor': 'armor in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
armorRoutes.route('/').get(function (req, res) {
  console.log("in armor index");
    Armor.find(function(err, armores){
    if(err){
      console.log(err);
    }
    else {
      res.json(armores);
    }
  });
});

// Defined get data(index or listing) route
armorRoutes.route('/:guid').get(function (req, res) {
  console.log("in armor index for: ",req.params.id);
    Armor.find({sheet: req.params.guid},function(err, armores){
    if(err){
      console.log(err);
    }
    else {
      res.json(armores);
    }
  });
});

// Defined edit route
armorRoutes.route('/edit/:id').get(function (req, res) {
  console.log("in armor edit for:",req.params.id);
  let id = req.params.id;
  Armor.findById(id, function (err, armor){
      res.json(armor);
  });
});

//  Defined update route
armorRoutes.route('/update/:id').post(function (req, res) {
  console.log("in armor update for:",req.params.id);
    Armor.findById(req.params.id, function(err, armor) {
    if (!armor)
      res.status(404).send("data is not found");
    else {
        armor.name = req.body.name;

        //  FIX THIS 
        
        armor.save().then(armor => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
armorRoutes.route('/delete/:id').get(function (req, res) {
  console.log("in armor delete for:",req.params.id);
    Armor.findByIdAndRemove({_id: req.params.id}, function(err, armor){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = armorRoutes;