const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

router.get('/user', async (req, res, next) => {
  if (res.locals.isUserLoggedIn) {
    const token = req.headers.authorization;
    const username = jwt.decode(token).username;
    try {
      const userToFind = await UserModel.findOne({username: username}, {})

    } catch(err) {
      console.log(err);
    }
    res.send({status: 'ok', data: 'data'})
  } else {
    res.send({status: 'error', error: 'please login to access this feature'})
  }
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
      if (addUserToDb) {
        return res.send({status: 'ok', data: 'User successfully registered.'});
      } else {
        return res.send({
          status: 'error',
          error: 'Something went terribly wrong, please, try again later.',
        });
      }
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

router.post('/deleteuser', async (req, res, next) => {
  // MEH MEH MEH
  return res.send({status: 'critical error', error: 'stop trying to delete a user while testing your API, seriously.'})
  const isUserLoggedIn = res.locals.isUserLoggedIn;
  if (isUserLoggedIn) {
    const username = res.locals.username;
    try {
      const userFromDb = await UserModel.findOneAndDelete(
        {username: username},
        {username: 1, password: 1}
      );
      console.log(userFromDb);
      if (userFromDb) {
        return res.send({
          status: 'ok',
          data: `user ${username} successfully deleted`,
        });
      } else {
        return res.send({
          status: 'error',
          data:
            'the account you are trying to delete does not exist. contact the admin to resolve this problem.',
        });
      }
    } catch (err) {
      console.log(err);
      res.send({
        status: 'error',
        error:
          "account couldn't be deleted, try again later or contact the admin.",
      });
    }
  }
});

router.post('/validateToken', async (req, res, next) => {
  if (res.locals.isUserLoggedIn) {
    return res.json({
      status: 'ok',
      data: 'Your token is validated, continue with using the site.',
    });
  } else {
    return res.json({
      status: 'error',
      error: 'Your token is invalid, pelase, login again',
    });
  }
});

module.exports = router;
