const express = require('express');
const campaignRoutes = express.Router();

// Require Campaign model in our routes module
let Campaign = require('./campaign.model');

// Defined store route
campaignRoutes.route('/add').post(function (req, res) {
  console.log("in campaign add");
  let campaign = new Campaign(req.body);
  campaign.save()
    .then(campaign => {
      res.status(200).json({'campaign': 'campaign in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
campaignRoutes.route('/:id').get(function (req, res) {
  console.log("in campaign index");
  var query = { id: req.params.id };
  Campaign.find(query, function(err, campaignes){
    if(err){
      console.log(err);
    }
    else {
      res.json(campaignes);
    }
  });
});

// Defined get data(index or listing) route
campaignRoutes.route('/gp/:email').get(function (req, res) {
  console.log("in campaign index");
  var query = { players: decodeURI(req.params.email) };
  Campaign.find(query, function(err, campaignes){
    if(err){
      console.log(err);
    }
    else {
      res.json(campaignes);
    }
  });
});

// Defined get data(index or listing) route
campaignRoutes.route('/gs/:sheet').get(function (req, res) {
  console.log("in campaign index");
  var query = { sheets: req.params.sheet };
  Campaign.find(query, function(err, campaignes){
    if(err){
      console.log(err);
    }
    else {
      res.json(campaignes);
    }
  });
});

// Defined edit route
campaignRoutes.route('/edit/:id').get(function (req, res) {
  console.log("in campaign edit");
  let id = req.params.id;
  Campaign.findById(id, function (err, campaign){
      res.json(campaign);
  });
});

//  Defined update route
campaignRoutes.route('/update/:id').post(function (req, res) {
  console.log("in campaign update");
    Campaign.findById(req.params.id, function(err, campaign) {
    if (!campaign)
      res.status(404).send("data is not found");
    else {
        campaign.name = req.body.name;
        campaign.desc = req.body.desc;
        campaign.players = req.body.players;
        campaign.gms = req.body.gms;
        campaign.sheets = req.body.sheets;
        
        campaign.save().then(campaign => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
campaignRoutes.route('/delete/:id').get(function (req, res) {
  console.log("in campaign delete");
    Campaign.findByIdAndRemove({_id: req.params.id}, function(err, campaign){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = campaignRoutes;