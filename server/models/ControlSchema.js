const mongoose = require('mongoose');

const ControlSchema = new mongoose.Schema(
  {
    dateOfControl: {type: Date},
    numberOfFrames: {type: Number},
    numberOfFullFrames: {type: Number},
    numberOfFramesWithSealedBrood: {type: Number},
    unsealedBrood: {type: Boolean},
    queenSpotted: {type: Boolean},
    freshEggs: {type: Boolean},
    weather: {type: String},
    temperature: {type: Number},
    hostility: {type: Number},
    workDone: {type: String},
    workToDo: {type: [Object]}
  },
);

module.exports = ControlSchema;
