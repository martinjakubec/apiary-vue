const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');

router.get('/hive', (req, res, next) => {
  res.send('im a hive');
});

router.post('/addhive', async (req, res, next) => {
  const hive = await UserModel.findOneAndUpdate(
    {_id: req.body.userId},
    {$push: {hives: req.body}}
  );
  console.log(hive);
  res.send('ok');
});

module.exports = router;

