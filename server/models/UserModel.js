const mongoose = require('mongoose');

const HiveSchema = require('./HiveSchema')

const UserSchema = new mongoose.Schema(
  {
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    hives: [HiveSchema]
  },
  {collection: 'users'}
);

const model = mongoose.model('UserSchema', UserSchema);

module.exports = model;
