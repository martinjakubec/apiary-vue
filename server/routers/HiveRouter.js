const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');

router.get('/hives', async (req, res, next) => {
  const isUserLoggedIn = res.locals.isUserLoggedIn;
  if (isUserLoggedIn) {
    const username = res.locals.username;
    try {
      const hivesToGet = await UserModel.findOne(
        {username: username},
        {
          'hives.overalState': 1,
          'hives.hiveNumber': 1,
          'hives.hiveColor': 1,
          'hives.honeySuper': 1,
          'hives.honeyAmount': 1,
          'hives.hiveDescription': 1,
        }
      ).select({_id: 0});
      res.send({status: 'ok', data: hivesToGet});
    } catch (err) {
      console.log(err);
      res.send('meh error');
    }
  } else {
    return res.send({status: 'error', error: 'Please login to access this feature'})
  }
});

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
    const username = res.locals.username;
    try {
      let hiveNumbersAlreadyRegistered = await UserModel.find(
        {username: username},
        {'hives.hiveNumber': 1}
      );
      hiveNumbersAlreadyRegistered = hiveNumbersAlreadyRegistered[0].hives;
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
          {username: username},
          {$push: {hives: req.body}}
        );
        return res.send({
          status: 'ok',
          data: 'Hive has been added successfully',
        });
      }
    } catch (err) {
      console.log(err);
      return res.send({
        status: 'error',
        error: 'hive could not be added, please try again later',
      });
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
    const username = res.locals.username;
    try {
      const hiveToDelete = await UserModel.updateOne(
        {username},
        {
          $pull: {hives: {hiveNumber: req.body.hiveNumber}},
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

router.post('/hive/:id/edit', async (req, res, next) => {
  const isUserLoggedIn = res.locals.isUserLoggedIn;
  const hiveNumber = req.params.id;
  if (isUserLoggedIn) {
    const username = res.locals.username;
    try {
      const editOptions = req.body;
      let canHiveNumberBeChanged = true;
      if (editOptions.hiveNumber) {
        let hiveNumbersAlreadyRegistered = await UserModel.find(
          {username: username},
          {'hives.hiveNumber': 1}
        );
        hiveNumbersAlreadyRegistered = hiveNumbersAlreadyRegistered[0].hives;
        if (
          hiveNumbersAlreadyRegistered.some(
            (el) => el.hiveNumber === req.body.hiveNumber
          )
        ) {
          delete editOptions.hiveNumber;
          canHiveNumberBeChanged = false;
        }
      }

      const placeholder = {};
      for (let [key, value] of Object.entries(editOptions)) {
        if (key === 'username') {
          continue;
        }
        placeholder['hives.$.' + key] = value;
      }
      const hiveToEdit = await UserModel.findOneAndUpdate(
        {username: username, 'hives.hiveNumber': hiveNumber},
        {$set: placeholder}
      );
      if (hiveToEdit) {
        return res.send({
          status: 'ok',
          data:
            'Hive updated successfully' +
            (canHiveNumberBeChanged
              ? '.'
              : ' except Hive number field. Hive number must be unique.'),
        });
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
