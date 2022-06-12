var express = require('express');
var router = express.Router();

// Models
const UserModel = require("../models/User");

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const users = await UserModel.find({});

  try {
    res.json({
      code: 200,
      data: users
    })
  } catch (error) {
    res.json({
      code: 500,
      error: TypeError,
    })
  }
});

// get user
router.get('/name/:id', async (req, res, next) => {
  const users = await UserModel.find({ _id: req.params.id });

  try {
    res.json({
      code: 200,
      data: users
    })
  } catch (error) {
    res.json({
      code: 500,
      error: TypeError,
    })
  }
});

module.exports = router;
