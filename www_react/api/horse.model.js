const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Horse
let Horse = new Schema({
  name: {
    type: String
  },
  sheet: {
    type: String
  },
  cost: {
    type: String
  },
  health: {
    type: String
  },
  armor: {
    type: String
  },
  size: {
    type: String
  },
  speed: {
    type: String
  }
},{
    collection: 'horse'
});

module.exports = mongoose.model('Horse', Horse);

