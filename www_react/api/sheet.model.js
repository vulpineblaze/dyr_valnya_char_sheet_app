const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Sheet
let Sheet = new Schema({
  person_name: {
    type: String
  },
  business_name: {
    type: String
  },
  business_gst_number: {
    type: Number
  }
},{
    collection: 'sheet'
});

module.exports = mongoose.model('Sheet', Sheet);