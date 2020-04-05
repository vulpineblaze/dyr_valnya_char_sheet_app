const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Weapon
let Weapon = new Schema({
  name: {
    type: String
  },
  sheet: {
    type: String
  },
  cost: {
    type: String
  },
  range: {
    type: String
  },
  damage: {
    type: String
  },
  ap: {
    type: String
  }
},{
    collection: 'weapon'
});

module.exports = mongoose.model('Weapon', Weapon);

