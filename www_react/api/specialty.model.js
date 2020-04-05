const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Specialty
let Specialty = new Schema({
  specialty: {
    type: String
  },
  cost: {
    type: Number
  },
  sheet: {
    type: String
  }
},{
    collection: 'specialty'
});

module.exports = mongoose.model('Specialty', Specialty);

