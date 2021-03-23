const express = require('express');
const router = express.Router();

router.get('/hive', (req, res, next) => {
  res.send('im a hive')
})

module.exports = router;