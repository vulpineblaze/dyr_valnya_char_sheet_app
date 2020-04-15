const express = require('express');
const playerRoutes = express.Router();

// Require Player model in our routes module
let Player = require('./player.model');



// Defined get data(index or listing) route
playerRoutes.route('/:email').get(function (req, res) {
  const fixedEmail = decodeURI(req.params.email);
  var query = { email: fixedEmail };
  console.log("in player index, query:", query);
  Player.find(query, function(err, result){
    if(err){console.log(err);}
    else if (result.length == 0){
      console.log("in player add: ", err, fixedEmail);
      let player = new Player(req.body);
      player.email = fixedEmail;
      player.save()
        .then(addResult => {
          // res.status(200).json({'player': 'player in added successfully'});
          console.log("player db entry added:", addResult);
          res.json(addResult);
        })
        .catch(err => {
          res.status(400).send("unable to save to database");
        });
    }
    else {
      // console.log("player no err:", result);
      res.json(result);
    }
  });
});

// { <array field>: { <operator1>: <value1>, ... } }


// Defined edit route
playerRoutes.route('/edit/:id').get(function (req, res) {
  console.log("in edit");
  let id = req.params.id;
  Player.findById(id, function (err, player){
      res.json(player);
  });
});

//  Defined update route
playerRoutes.route('/update/:id').post(function (req, res) {
  console.log("in update");
    Player.findById(req.params.id, function(err, player) {
    if (!player)
      res.status(404).send("data is not found");
    else {
        player.nick = req.body.nick;
        player.discordname = req.body.discordname;
        
        player.save().then(player => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
playerRoutes.route('/delete/:id').get(function (req, res) {
  console.log("in delete");
    Player.findByIdAndRemove({_id: req.params.id}, function(err, player){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = playerRoutes;