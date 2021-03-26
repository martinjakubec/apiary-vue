const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

router.get('/user', (req, res, next) => {
  res.send('im a user');
});

router.post('/register', async (req, res, next) => {
  let {username, password, email} = req.body;
  username = username.trim();
  password = password.trim();
  email = email.trim();
  if (username.length !== 0) {
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      const addUserToDb = await UserModel.create({
        username,
        password: hashedPassword,
        email,
      });
      return res.send({status: 'ok', data: 'User successfully registered.'});
    } catch (err) {
      if (err.code === 11000) {
        if (err.keyPattern?.username) {
          return res.send({
            status: 'error',
            error: 'Username is already taken',
          });
        }
        if (err.keyPattern?.email) {
          return res.send({
            status: 'error',
            error: 'An account with this email is already registered.',
          });
        }
      }
      return res.send({
        status: 'error',
        error: 'Something went terribly wrong',
      });
    }
  } else {
    return res.send({
      status: 'error',
      error: 'Username is not a valid option.',
    });
  }
});

router.post('/login', async (req, res, next) => {
  const {username, password} = req.body;
  try {
    const userFromDb = await UserModel.findOne({username: username});
    if (userFromDb) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        userFromDb.password
      );
      if (isPasswordCorrect) {
        const username = userFromDb.username;
        const payload = {username};
        const token = jwt.sign(
          payload,
          JWT_SECRET
          // {expiresIn: '1h'}
        );
        return res.send({status: 'ok', data: token});
      } else {
        return res.send({status: 'error', error: 'wrong password'});
      }
    } else {
      return res.send({status: 'error', error: 'user does not exist'});
    }
  } catch (err) {
    console.log(err);
    return res.send({
      status: 'error',
      error: 'authentication failed, try again',
    });
  }
});

// meh delete to add
router.post('/delete', (req, res, next) => {});

module.exports = router;
