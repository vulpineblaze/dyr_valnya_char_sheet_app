
const md5 = require('crypto-js/md5');
const express = require('express');
const campaignRoutes = express.Router();

// Require Campaign model in our routes module
let Campaign = require('./campaign.model');
let Player = require('./player.model');
let Sheet = require('./sheet.model');
let XP = require('./xp.model');

const makeID = () => {
  // var hash = md5(new Date().valueOf() + Math.random()).toString();
  var date = new Date().valueOf();
  var rnd = Math.random();
  var hash = md5((date + rnd).toString());
  var hashStr = hash.toString();
  console.log("md5 hash:", hash, hashStr, rnd, date);
  return hashStr.substr(-7);
}



// Defined store route
campaignRoutes.route('/add').post(function (req, res) {
  console.log("in campaign add");
  let campaign = new Campaign(req.body);
  campaign.id = makeID();
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
  var queryP = { players: decodeURI(req.params.email) };
  var queryG = { gms: decodeURI(req.params.email) };
  Campaign.find(queryP, function(err, campaignP){
    if(err){
      console.log(err);
    }
    else {
      Campaign.find(queryG, function(err, campaignG){
        if(err){
          console.log(err);
        }
        else {
          var obj = {
            asPlayer: campaignP,
            asGM: campaignG
          };
          // console.log("campaign/player no err: ", campaign, "result: ", emailResult);
          res.json(obj);
        }
      });
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
    // res.json(campaign);
    if(err){
      console.log(err);
    }
    else {
      // // { <array field>: { <operator1>: <value1>, ... } }
      // res.json(campaignes);
      // var queryMany = { email: { <operator1>: <value1>, ... } };
      var queryEmailArray = campaign.players;
      var queryGMArray = campaign.gms;
      var querySheetArray = campaign.sheets;
      var queryEmailMany = { email: { $in: queryEmailArray } };
      var queryGMMany = { email: { $in: queryGMArray } };
      var querySheetMany = { id: { $in: querySheetArray} };
      console.log("campaign/player queryEmailArray", queryEmailArray);

      Player.find(queryEmailMany, function(err, emailResult){
        if(err){console.log(err);}
        else {
          Player.find(queryGMMany, function(err, gmResult){
          if(err){console.log(err);}
          else {
            Sheet.find(querySheetMany, function(err, sheetResult){
              if(err){console.log(err);}
              else {
                var obj = {
                  campaign: campaign,
                  playerObjs: emailResult,
                  gmObjs: gmResult,
                  sheetObjs: sheetResult
                };
                // console.log("campaign/player no err: ", campaign, "result: ", emailResult);
                res.json(obj);
              }
            });
          }
        });
        }
      });
    }
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


// Defined get data(index or listing) route
campaignRoutes.route('/invite/:id/:email').get(function (req, res) {
  console.log("in campaign invite");
  var query = { id: req.params.id };
  Campaign.findOne(query, function(err, campaign){
    if (!campaign)
      res.status(404).send("data is not found");
    else {
      var array = campaign.players;
      var email = decodeURI(req.params.email);
      var successMsg = "You have been added to: "+campaign.name;
      if(array.includes(email)){
        // if exists, skip db and send back campaign
        res.json(campaign);
      }

      array.push();

      campaign.players = array;
        
      campaign.save().then(campaign => {
        res.json(campaign);
      })
      .catch(err => {
        res.status(400).send("unable to update the database");
      });
    }
  });
});



// Defined get data(index or listing) route
campaignRoutes.route('/xp').post(function (req, res) {
  console.log("in campaign xp");
  // req.body
  let xp = new XP();
  xp.gm = req.body.gm;
  xp.target = req.body.target;
  xp.qty = req.body.qty;

  xp.save()
    .then(xp => {
      res.status(200).json({'xp': 'xp in added successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save xp to database");
    });

});




module.exports = campaignRoutes;