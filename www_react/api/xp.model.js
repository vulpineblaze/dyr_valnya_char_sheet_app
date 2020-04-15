const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for XP
let XP = new Schema({
  timestamp: {
    type: Date, default: Date.now
  },
  gm: {
    type: String
  },
  target: {
    type: String
  },
  qty: {
    type: Number
  }
},{
    collection: 'xp'
});

module.exports = mongoose.model('XP', XP);