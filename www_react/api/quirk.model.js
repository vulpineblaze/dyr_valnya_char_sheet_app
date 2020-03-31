const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Quirk
let Quirk = new Schema({
  name: {
    type: String
  },
  sheet: {
    type: String
  },
  cost: {
    type: String
  },
  desc: {
    type: String
  },
  prereq: {
    type: String
  },
  benefit: {
    type: String
  },
  aspects: {
    type: String
  },
  aptitudes: {
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

