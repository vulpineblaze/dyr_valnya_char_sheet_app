const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Empty
let Empty = new Schema({
  empty: {
    type: String
  },
  sheet: {
    type: String
  }
},{
    collection: 'empty'
});

module.exports = mongoose.model('Empty', Empty);

