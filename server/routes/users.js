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


// vô hiệu hóa tài khoản người dùng
router.post('/locked/:id', async (req, res, next) => {
  const userExist = await UserModel.find({ _id: req.params.id });

  try {
    if (userExist) {
      const lockUser = await UserModel.findOneAndUpdate({ _id: req.params.id }, { isDelete: req.body.isDelete });
      const users = await UserModel.find({});

      if (lockUser) {
        res.json({
          code: 200,
          message: "Thao tác thành công",
          data: users
        })
      }
    }
  } catch (error) {
    res.json({
      code: 500,
      message: "Khóa tài khoản thất bại",
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
