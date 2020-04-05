const express = require('express');
const weaponRoutes = express.Router();

// Require Weapon model in our routes module
let Weapon = require('./weapon.model');

// Defined store route
weaponRoutes.route('/add').post(function (req, res) {
  console.log("in weapon add");
  let weapon = new Weapon(req.body);
  weapon.save()
    .then(weapon => {
      res.status(200).json({'weapon': 'weapon in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
weaponRoutes.route('/').get(function (req, res) {
  console.log("in weapon index");
    Weapon.find(function(err, weapones){
    if(err){
      console.log(err);
    }
    else {
      res.json(weapones);
    }
  });
});

// Defined get data(index or listing) route
weaponRoutes.route('/:guid').get(function (req, res) {
  console.log("in weapon index for: ",req.params.id);
    Weapon.find({sheet: req.params.guid},function(err, weapones){
    if(err){
      console.log(err);
    }
    else {
      res.json(weapones);
    }
  });
});

// Defined edit route
weaponRoutes.route('/edit/:id').get(function (req, res) {
  console.log("in weapon edit for:",req.params.id);
  let id = req.params.id;
  Weapon.findById(id, function (err, weapon){
      res.json(weapon);
  });
});

//  Defined update route
weaponRoutes.route('/update/:id').post(function (req, res) {
  console.log("in weapon update for:",req.params.id);
    Weapon.findById(req.params.id, function(err, weapon) {
    if (!weapon)
      res.status(404).send("data is not found");
    else {
        weapon.name = req.body.name;

        //  FIX THIS 
        
        weapon.save().then(weapon => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
weaponRoutes.route('/delete/:id').get(function (req, res) {
  console.log("in weapon delete for:",req.params.id);
    Weapon.findByIdAndRemove({_id: req.params.id}, function(err, weapon){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = weaponRoutes;