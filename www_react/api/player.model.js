const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const makeNick = () => {
  var nick = "newPlayer";
  var min = 100000;
  var max = 999999;
  var num = Math.floor(Math.random() * (max - min + 1)) + min;
  var dt = Date.now();
  var out = dt + num;
  return nick + out.toString();
}

// Define collection and schema for Player
let Player = new Schema({
  nick: {
    type: String, default: makeNick()
  },
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

