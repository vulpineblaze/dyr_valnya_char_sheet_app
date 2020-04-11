const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Campaign
let Campaign = new Schema({
  id: {
    type: String
  },
  name: {
    type: String
  },
  start: {
    type: Date, default: Date.now
  },
  desc: {
    type: String
  },
  players: [{
    type: String
  }],
  gms: [{
    type: String
  }],
  sheets: [{
    type: String
  }]
},{
    collection: 'campaign'
});

module.exports = mongoose.model('Campaign', Campaign);