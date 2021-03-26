const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');
const { v4: uuidv4 } = require('uuid');

router.get('/todos', async (req, res, next) => {
  const isUserLoggedIn = res.locals.isUserLoggedIn;
  if (isUserLoggedIn) {
    const username = res.locals.username;
    try {
      const todosToGet = await UserModel.findOne(
        {
          username: username,
        },
        {
          'hives.hiveNumber': 1,
          'hives.controls.workToDo': 1,
          'hives.controls.isToDoDone': 1,
          'hives.controls.customId': 1,
        }
      ).select({_id: 0});
      return res.send(todosToGet);
    } catch (err) {
      console.log(err);
      return res.send({status: 'error', error: "Todos couldn't be fetched."});
    }
  } else {
    return res.send({
      status: 'error',
      data: 'Please login to access this feature.',
    });
  }
});

router.get('/hive/:hiveNumber/todos', async (req, res, next) => {
  const isUserLoggedIn = res.locals.isUserLoggedIn;
  if (isUserLoggedIn) {
    const username = res.locals.username;
    const hiveNumber = req.params.hiveNumber;
    try {
      let todosToGet = await UserModel.findOne(
        {
          username: username,
          'hives.hiveNumber': hiveNumber,
        },
        {
          'hives.hiveNumber': 1,
          'hives.controls.workToDo.$': 1,
          'hives.controls.isToDoDone': 1,
          'hives.controls.customId': 1,
        }
      ).select({_id: 0});
      if (todosToGet) {
        todosToGet = todosToGet.hives;
        return res.send({status: 'ok', data: todosToGet});
      } else {
        return res.send({
          status: 'error',
          error: 'you seem to be getting data from a hive which does not exist',
        });
      }
    } catch (err) {
      console.log(err);
      return res.send({
        status: 'error',
        error: `could not fetch todos from hive n° ${req.params.hiveNumber}`,
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
      newControl.customId = uuidv4();
      console.log(typeof newControl.customId);
      const hive = await UserModel.findOneAndUpdate(
        {username: username, 'hives.hiveNumber': hiveNumber},
        {$push: {'hives.$.controls': newControl}}
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

router.post('/hive/:hiveNumber/updatetodo', async (req, res, next) => {
  const isUserLoggedIn = res.locals.isUserLoggedIn;
  const hiveNumber = req.params.hiveNumber;
  if (isUserLoggedIn) {
    try {
      const username = res.locals.username;
      const {customId, toDoValue} = req.body;
      const toDoToUpdate = await UserModel.findOneAndUpdate(
        {username: username, 'hives.controls.customId': customId, 'hives.hiveNumber': hiveNumber},
        {$set: {'hives.$[].controls.$[control].isToDoDone': toDoValue}},
        {arrayFilters: [{'control.customId': customId}]}
      );
      return res.send({status: 'ok', data: 'todo has been updated successfully.'})
    } catch (err) {
      console.log(err);
      return res.send({status: 'error', error: 'todo could not be updated'})
    }
  } else {
    return res.send({
      status: 'error',
      data: 'Please login to access this feature.',
    });
  }
});

module.exports = router;
