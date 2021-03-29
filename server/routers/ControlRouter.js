const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');
const {v4: uuidv4} = require('uuid');

router.post('/hive/:hiveNumber/editcontrol', async (req, res, next) => {
  const hiveNumber = req.params.hiveNumber;
  const isUserLoggedIn = res.locals.isUserLoggedIn;
  if (isUserLoggedIn) {
    const username = res.locals.username;
    const controlCustomId = req.body.controlCustomId;
    try {
      const placeholder = {};
      for (let [key, value] of Object.entries(req.body)) {
        if (key === 'controlCustomId') {
          continue;
        }
        placeholder['hives.$[hive].controls.$[control].' + key] = value;
      }

      const controlToUpdate = await UserModel.findOneAndUpdate(
        {
          username: username,
          'hives.hiveNumber': hiveNumber,
          'hives.controls.controlCustomId': controlCustomId,
        },
        {$set: placeholder},
        {
          arrayFilters: [
            {'hive.hiveNumber': hiveNumber},
            {'control.controlCustomId': controlCustomId},
          ],
        }
      );
      if (controlToUpdate) {
        return res.send({status: 'ok', data: 'control updated successfully'})
      } else {
        return res.send({status: 'error', error: 'you seem to be updating a control that does not exist'})
      }
    } catch (err) {
      console.log(err);
      res.send({
        status: 'error',
        error: 'control could not be updated, try again later',
      });
    }
  } else {
    return res.send({
      status: 'error',
      data: 'Please login to access this feature.',
    });
  }
});

router.post('/hive/:hiveNumber/addcontrol', async (req, res, next) => {
  const hiveNumber = req.params.hiveNumber;
  const isUserLoggedIn = res.locals.isUserLoggedIn;
  if (isUserLoggedIn) {
    const username = res.locals.username;
    if (req.body.hiveNumber) {
      return res.send({status: 'error', error: "You can't modify hive number"});
    }
    try {
      const newControl = req.body;
      newControl.controlCustomId = uuidv4();
      for (todo of newControl.workToDo) {
        todo.todoCustomId = uuidv4();
      }
      const hive = await UserModel.findOneAndUpdate(
        {username: username, 'hives.hiveNumber': hiveNumber},
        {$push: {'hives.$[hive].controls': newControl}},
        {arrayFilters: [{'hive.hiveNumber': hiveNumber}]}
      );
      if (hive) {
        return res.send({status: 'ok', data: 'Control has been added'});
      } else {
        return res.send({
          status: 'error',
          data: 'Hive with this number is not found',
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

router.post('/hive/:hiveNumber/deletecontrol', async (req, res, next) => {
  const isUserLoggedIn = res.locals.isUserLoggedIn;
  if (isUserLoggedIn) {
    const username = res.locals.username;
    const hiveNumber = req.params.hiveNumber;
    const {controlCustomId} = req.body;
    try {
      const controlToRemove = await UserModel.findOneAndUpdate(
        {
          username: username,
          'hives.hiveNumber': hiveNumber,
          'hives.controls.controlCustomId': controlCustomId,
        },
        {
          $pull: {'hives.$[hive].controls': {controlCustomId: controlCustomId}},
        },
        {
          arrayFilters: [{'hive.hiveNumber': hiveNumber}],
        }
      );
      if (controlToRemove) {
        return res.send({status: 'ok', data: 'control deleted successfully'});
      } else {
        return res.send({
          status: 'error',
          error: 'you seem to be deleting a control that does not exist',
        });
      }
    } catch (err) {
      console.log(err);
      return res.send({
        status: 'error',
        error: 'control could not be deleted, try again later.',
      });
    }
  } else {
    return res.send({
      status: 'error',
      data: 'Please login to access this feature.',
    });
  }
});

module.exports = router;
