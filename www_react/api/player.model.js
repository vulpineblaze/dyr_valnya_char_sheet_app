const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Player
let Player = new Schema({
  email: {
    type: String
  },
  discordname: {
    type: String, default: ""
  },
  xp: {
    type: Number, default: 0
  }
},{
    collection: 'player'
});

module.exports = mongoose.model('Player', Player);

