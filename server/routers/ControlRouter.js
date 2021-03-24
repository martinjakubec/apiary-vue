const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');

router.get('/control', (req, res, next) => {
  res.send('im a control');
});

router.post('/addcontrol', async (req, res, next) => {
  // console.log(req.body);
  const hive = await UserModel.findOneAndUpdate({"_id": req.body.userId, "hives._id": req.body.hiveId}, {$push: {'hives.$.controls': req.body}})
  console.log(hive);
  res.send('ok');
});

module.exports = router;
