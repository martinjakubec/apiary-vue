const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    temperatureUnit: {type: String},
    hives: [
      {
        overalState: {type: String},
        hiveNumber: {type: Number, required: true}, 
        hiveDescription: {type: String}, 
        totalNumberOfFrames: {type: Number, required: true},
        hiveColor: {type: String},
        queenBreed: {type: String, required: true}, 
        queenNumber: {type: Number},
        queenColor: {type: String, required: true}, 
        dateAdded: {type: Date, required: true},
        honeySuper: {type: Number},
        honeyAmount: {type: Number, min: 0, max: 5},
        controls: [
          {
            controlCustomId: {type: String},
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
            workDone: {type: Array},
            workToDo: [
              {
                todoCustomId: {type: String},
                text: {type: String},
                isDone: {type: Boolean}
              }
            ],
          },
        ],
      },
    ],
  },
  {collection: 'users'}
);

const model = mongoose.model('UserSchema', UserSchema);

module.exports = model;
