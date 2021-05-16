const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');

// working with new system ✅
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
          'hives.controls.controlCustomId': 1,
          'hives.controls.dateOfControl': 1,
          'hives.controls.workToDo': 1,
        }
      ).select({_id: 0});
      return res.send({status: 'ok', data: todosToGet});
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
        todosToGet = todosToGet.hives[0]; // clears up the array wrapper and unnecessary hives[]
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

router.post('/hive/:hiveNumber/updatetodo', async (req, res, next) => {
  const isUserLoggedIn = res.locals.isUserLoggedIn;
  const hiveNumber = req.params.hiveNumber;
  if (isUserLoggedIn) {
    try {
      const username = res.locals.username;
      const {todoCustomId, toDoValue} = req.body;
      const toDoToUpdate = await UserModel.findOneAndUpdate(
        {
          username: username,
          'hives.hiveNumber': hiveNumber,
        },
        {
          $set: {
            'hives.$[hive].controls.$[].workToDo.$[todo].isDone': toDoValue,
          },
        },
        {
          arrayFilters: [
            {'hive.hiveNumber': hiveNumber},
            {'todo.todoCustomId': todoCustomId},
          ],
        }
      );
      if (toDoToUpdate) {
        return res.send({
          status: 'ok',
          data: 'todo has been updated successfully.',
        });
      } else {
        return res.send({
          status: 'error',
          error: 'todo you want to update does not seem to exist',
        });
      }
    } catch (err) {
      console.log(err);
      return res.send({status: 'error', error: 'todo could not be updated'});
    }
  } else {
    return res.send({
      status: 'error',
      data: 'Please login to access this feature.',
    });
  }
});

module.exports = router;
