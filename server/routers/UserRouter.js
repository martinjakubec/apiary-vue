const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel')

router.get('/user', (req, res, next) => {
  res.send('im a user')
})

router.post('/adduser', async (req, res, next) => {
  console.log(req.body);
  try {
    const newUser = await UserModel.create(req.body)
    return res.send('not saved yet')
  } catch(err) {
    console.log(err);
    return res.send({status: "error", error: err.code})
  }
})



module.exports = router;