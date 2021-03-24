const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    hives: [{
      overalState: {type: String},
      hiveNumber: {type: Number},
      hiveColor: {type: String},
      totalNumberOfFrames: {type: Number},
      queenColor: {type: String},
      queenNumber: {type: Number},
      queenBreed: {type: String},
      dateAdded: {type: Date},
      honeySuper: {type: Number},
      controls: [
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
        }
      ]
    }],
  },
  {collection: 'users'}
);

const model = mongoose.model('UserSchema', UserSchema);

module.exports = model;
