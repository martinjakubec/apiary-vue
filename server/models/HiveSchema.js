const mongoose = require('mongoose');

const ControlSchema = require('./ControlSchema');

const HiveSchema = new mongoose.Schema(
  {
    overalState: {type: String},
    hiveNumber: {type: Number},
    hiveColor: {type: String},
    totalNumberOfFrames: {type: Number},
    queenColor: {type: String},
    queenNumber: {type: Number},
    queenBreed: {type: String},
    dateAdded: {type: Date},
    honeySuper: {type: Number},
    controls: [ControlSchema]
  },
  {collection: 'hives'}
);

module.exports = HiveSchema;
