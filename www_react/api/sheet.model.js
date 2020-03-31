const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Sheet
let Sheet = new Schema({
  id: {
    type: String
  },
  name: {
    type: String
  },
  owner: {
    type: String
  },
  concept: {
    type: String
  },
  virtue: {
    type: String
  },
  vice: {
    type: String
  },
  racial: {
    type: String
  },
  description: {
    type: String
  },
  //          ASPECTS   /////
  intelligence: {
    type: Number
  },
  wits: {
    type: Number
  },
  resolve: {
    type: Number
  },
  strength: {
    type: Number
  },
  dexterity: {
    type: Number
  },
  stamina: {
    type: Number
  },
  presence: {
    type: Number
  },
  manipulation: {
    type: Number
  },
  composure: {
    type: Number
  },
  //     APTITUDES /////
  athletics: {
    type: Number
  },
  crafts: {
    type: Number
  },
  culture: {
    type: Number
  },
  empathy: {
    type: Number
  },
  expression: {
    type: Number
  },
  intimidation: {
    type: Number
  },
  investigation: {
    type: Number
  },
  larceny: {
    type: Number
  },
  luck: {
    type: Number
  },
  magicka: {
    type: Number
  },
  medicine: {
    type: Number
  },
  observation: {
    type: Number
  },
  persuasion: {
    type: Number
  },
  portaelogy: {
    type: Number
  },
  riding: {
    type: Number
  },
  stealth: {
    type: Number
  },
  streetwise: {
    type: Number
  },
  subterfuge: {
    type: Number
  },
  survival: {
    type: Number
  },
  technika: {
    type: Number
  },
  //  COMPOSITE STATS ////

  astrylose: {
    type: Number
  },
  willpower: {
    type: Number
  },
  vitality: {
    type: Number
  },
  size: {
    type: Number
  },
  speed: {
    type: Number
  },
  initiative: {
    type: Number
  },
  defense: {
    type: Number
  },
  starting_xp: {
    type: Number
  },
  available_xp: {
    type: Number
  },
  ///  TEMP TEXT BOX ////
  temp_text_box: {
    type: String
  }
},{
    collection: 'sheet'
});

module.exports = mongoose.model('Sheet', Sheet);