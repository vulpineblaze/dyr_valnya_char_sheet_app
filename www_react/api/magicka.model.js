const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Magicka
let Magicka = new Schema({
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
  armor: {
    type: String
  },
  penalty: {
    type: String
  },
  damage: {
    type: String
  },
  ap: {
    type: String
  }
},{
    collection: 'magicka'
});

module.exports = mongoose.model('Magicka', Magicka);

