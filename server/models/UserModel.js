const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    hives: [
      {
        overalState: {type: String},
        hiveNumber: {type: Number},
        hiveDescription: {type: String},
        hiveColor: {type: String},
        totalNumberOfFrames: {type: Number},
        queenColor: {type: String},
        queenNumber: {type: Number},
        queenBreed: {type: String},
        dateAdded: {type: Date},
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
            workDone: [String],
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
