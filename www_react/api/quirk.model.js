const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Quirk
let Quirk = new Schema({
  quirk: {
    type: String
  },
  sheet: {
    type: String
  },
  ///  TEMP TEXT BOX ////
  temp_text_box: {
    type: String
  }
},{
    collection: 'quirk'
});

module.exports = mongoose.model('Quirk', Quirk);