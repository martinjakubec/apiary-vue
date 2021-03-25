const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');

router.get('/hive/:id', async (req, res, next) => {
  const isUserLoggedIn = res.locals.isUserLoggedIn;
  if (isUserLoggedIn) {
    const hiveNumber = req.params.id;
    const username = res.locals.username;
    try {
      let hiveToGet = await UserModel.findOne(
        {username: username, 'hives.hiveNumber': hiveNumber},
        {'hives.$': 1, _id: 0}
      );
      if (hiveToGet) {
        hiveToGet = hiveToGet.hives[0]; // since hiveNumber is unique, it only makes sense that it will be on position 0
        console.log(hiveToGet);
        return res.send({status: 'ok', data: hiveToGet});
      }
      return res.send({status: 'error', error: 'Hive could not be found.'});
    } catch (err) {
      console.log(err);
      return res.send({
        status: 'error',
        error:
          "A terrible thing happened when fetching the hive data, ask the administrator to check what is going on. Don't worry, your bees are still okay. Bzzz.",
      });
    }
  } else {
    return res.send({
      status: 'error',
      data: 'Please login to access this feature.',
    });
  }
});

router.post('/addhive', async (req, res, next) => {
  const isUserLoggedIn = res.locals.isUserLoggedIn;
  if (isUserLoggedIn) {
    let hiveNumbersAlreadyRegistered = await UserModel.find(
      {_id: req.body.userId},
      {'hives.hiveNumber': 1}
    );
    hiveNumbersAlreadyRegistered = hiveNumbersAlreadyRegistered[0].hives;
    console.log(hiveNumbersAlreadyRegistered);
    if (
      hiveNumbersAlreadyRegistered.some(
        (el) => el.hiveNumber === req.body.hiveNumber
      )
    ) {
      return res.send({
        status: 'error',
        error:
          'Hive with this number already exists, please, choose different number',
      });
    } else {
      const hiveToAdd = await UserModel.findOneAndUpdate(
        {_id: req.body.userId},
        {$push: {hives: req.body}}
      );
      return res.send({status: 'ok', data: 'Hive has been added successfully'});
    }
  } else {
    return res.send({
      status: 'error',
      data: 'Please login to access this feature.',
    });
  }
});

router.post('/deletehive', async (req, res, next) => {
  const isUserLoggedIn = res.locals.isUserLoggedIn;
  if (isUserLoggedIn) {
    try {
      const hiveToDelete = await UserModel.updateOne(
        {_id: req.body.userId},
        {
          $pull: {hives: {_id: req.body.hiveNumber}},
        }
      );
      if (hiveToDelete.nModified === 0) {
        return res.send({
          status: 'error',
          error: 'No hive with this ID exists',
        });
      }
      return res.send({status: 'ok', data: 'Hive successfully deleted'});
    } catch (err) {
      console.log(err);
      return res.send({status: 'error', error: 'Hive could not be deleted.'});
    }
  } else {
    return res.send({
      status: 'error',
      data: 'Please login to access this feature.',
    });
  }
});

router.post('/edithive', async (req, res, next) => {
  const isUserLoggedIn = res.locals.isUserLoggedIn;
  if (isUserLoggedIn) {
    try {
      const userId = req.body.userId;
      const editOptions = req.body;
      const hiveNumber = req.body.hiveNumber;

      const placeholder = {};
      for (let [key, value] of Object.entries(editOptions)) {
        if (key === 'userId') {
          continue;
        }
        placeholder['hives.$.' + key] = value;
      }
      const hiveToEdit = await UserModel.findOneAndUpdate(
        {_id: userId, 'hives.hiveNumber': hiveNumber},
        {$set: placeholder}
      );
      if (hiveToEdit) {
        return res.send({status: 'ok', data: 'Hive updated successfully.'});
      } else {
        return res.send({
          status: 'error',
          error: 'There is no hive with this ID to be updated.',
        });
      }
    } catch (err) {
      console.log(err);
      return res.send({status: 'error', error: err});
    }
  } else {
    return res.send({
      status: 'error',
      data: 'Please login to access this feature.',
    });
  }
});

module.exports = router;
