const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Armor
let Armor = new Schema({
  name: {
    type: String
  },
  sheet: {
    type: String
  },
  cost: {
    type: String
  },
  armor: {
    type: String
  },
  penalty: {
    type: String
  }
},{
    collection: 'armor'
});

module.exports = mongoose.model('Armor', Armor);

