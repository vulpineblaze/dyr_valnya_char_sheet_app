const express = require('express');
const sheetRoutes = express.Router();

// Require Sheet model in our routes module
let Sheet = require('./sheet.model');

// Defined store route
sheetRoutes.route('/add').post(function (req, res) {
  console.log("in add");
  let sheet = new Sheet(req.body);
  sheet.save()
    .then(sheet => {
      res.status(200).json({'sheet': 'sheet in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
sheetRoutes.route('/').get(function (req, res) {
  console.log("in index");
    Sheet.find(function(err, sheetes){
    if(err){
      console.log(err);
    }
    else {
      res.json(sheetes);
    }
  });
});

// Defined edit route
sheetRoutes.route('/edit/:id').get(function (req, res) {
  console.log("in edit");
  let id = req.params.id;
  Sheet.findById(id, function (err, sheet){
      res.json(sheet);
  });
});

//  Defined update route
sheetRoutes.route('/update/:id').post(function (req, res) {
  console.log("in update");
    Sheet.findById(req.params.id, function(err, sheet) {
    if (!sheet)
      res.status(404).send("data is not found");
    else {
        sheet.name = req.body.name;
        sheet.concept = req.body.concept;
        sheet.virtue = req.body.virtue;
        sheet.vice = req.body.vice;
        sheet.racial = req.body.racial;
        sheet.description = req.body.description;
        sheet.intelligence = req.body.intelligence;
        sheet.wits = req.body.wits;
        sheet.resolve = req.body.resolve;
        sheet.strength = req.body.strength;
        sheet.dexterity = req.body.dexterity;
        sheet.stamina = req.body.stamina;
        sheet.presence = req.body.presence;
        sheet.manipulation = req.body.manipulation;
        sheet.composure = req.body.composure;
        sheet.athletics = req.body.athletics;
        sheet.crafts = req.body.crafts;
        sheet.culture = req.body.culture;
        sheet.empathy = req.body.empathy;
        sheet.expression = req.body.expression;
        sheet.intimidation = req.body.intimidation;
        sheet.investigation = req.body.investigation;
        sheet.larceny = req.body.larceny;
        sheet.luck = req.body.luck;
        sheet.magicka = req.body.magicka;
        sheet.medicine = req.body.medicine;
        sheet.observation = req.body.observation;
        sheet.persuasion = req.body.persuasion;
        sheet.portaelogy = req.body.portaelogy;
        sheet.riding = req.body.riding;
        sheet.stealth = req.body.stealth;
        sheet.streetwise = req.body.streetwise;
        sheet.subterfuge = req.body.subterfuge;
        sheet.survival = req.body.survival;
        sheet.technika = req.body.technika;
        sheet.astrylose = req.body.astrylose;
        sheet.willpower = req.body.willpower;
        sheet.vitality = req.body.vitality;
        sheet.size = req.body.size;
        sheet.speed = req.body.speed;
        sheet.init = req.body.init;
        sheet.defense = req.body.defense;
        sheet.starting_xp = req.body.starting_xp;
        sheet.available_xp = req.body.available_xp;
        sheet.temp_text_box = req.body.temp_text_box;
        
        sheet.save().then(sheet => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
sheetRoutes.route('/delete/:id').get(function (req, res) {
  console.log("in delete");
    Sheet.findByIdAndRemove({_id: req.params.id}, function(err, sheet){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = sheetRoutes;