const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserModel = require("../models/User");

const key = {
  tokenKey: "djghhhhuuwiwuewieuwieuriwu_cus"
};


router.post("/register", async function(req, res) {
    try {
      const userExist = await UserModel.findOne({ email: req.body.email });
  
      if (!userExist) {
        const User = new UserModel();
  
        User.username = req.body.userName;
        User.password = password;
        // User.image = file.name;
        User.email = req.body.email;
  
        const userCreate = await User.save();
  
        return res.json({
          code: 200,
          message: "Bạn đã đăng ký thành công",
          data: { userCreate }
        });
      } else {
        return res.json({
          code: 200,
          message: "Người dùng đã tồn tại",
          data: null
        });
      }
    } catch (err) {
      return res.json({ code: 400, message: err.message, data: null });
    }
  });

  router.post("/", async function(req, res, next) {
    try {
      const user = await UserModel.findOne({ email: req.body.email });
  
      if (!user) {
        return res.json({
          code: 401,
          message: "Nhập sai email đăng nhập",
          data: null
        });
      }
  
      const result = await bcrypt.compare(req.body.password, user.password);
  
      if (result) {

        const { username, role, email, image, _id } = user;
  
        return res.json({
          code: 200,
          message: "Đăng nhập thành công",
          data: { username, role, email, image, _id },
        });
      } else {
        return res.json({
          code: 400,
          message: "Nhập sai password",
          data: null
        });
      }
    } catch (err) {
      return res.json({ code: 400, message: err.message, data: null });
    }
  });
  // get user
router.get("/:token", async (req, res) => {
  const userToken = req.params.token;

  try {
    let decoded = jwt.decode(userToken);

    if (decoded) {
      const id = decoded._id;
      const user = await UserModel.findOne({ _id: id });
      const { username, role, email, image, _id } = user;

      return res.json({
        code: 200,
        data: { username, role, email, image, _id }
      })

    } else {
      return res.json({
        message: "Lỗi xác thực!"
      })
    }

  } catch (err) {
    return res.json({
      code: 400,
      message: err
    })
  }
});

// update name, email, password, photo
router.put("/updateName/:id", async (req, res) => {
  const userExist = await UserModel.findOne({ _id: req.params.id });

  if (userExist) {
    try {
      const user = {
        username: req.body.userName
      };

      const updateUserName = await UserModel.findOneAndUpdate(
        { _id: req.params.id },
        user,
        {
          new: true,
          useFindAndModify: false
        }
      );

      if (updateUserName) {
        res.json({
          data: updateUserName,
          code: 200,
          message: "Cập nhật name thành công"
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error
      });
    }
  }
});

router.put("/updateEmail/:id", async (req, res) => {
  const userExist = await UserModel.findOne({ _id: req.params.id });
  const emailExist = await UserModel.findOne({ email: req.body.email });

  if (userExist) {
    if (emailExist) {
      res.json({
        code: 404,
        message: "Email đã tồn tại"
      });
    } else {
      try {
        const user = {
          email: req.body.email
        };

        const updateUserEmail = await UserModel.findOneAndUpdate(
          { _id: req.params.id },
          user,
          {
            new: true,
            useFindAndModify: false
          }
        );

        if (updateUserEmail) {
          res.json({
            code: 200,
            data: updateUserEmail,
            message: "Cập nhật email thành công"
          });
        }
      } catch (error) {
        res.status(500).json({
          message: error
        });
      }
    }
  }
});

router.put("/updatePassword/:id", async (req, res) => {
  const userExist = await UserModel.findOne({ _id: req.params.id });

  if (userExist) {
    const comparePassword = await bcrypt.compare(
      req.body.currentPassword,
      userExist.password
    );

    if (comparePassword) {
      try {
        const hashPassword = await bcrypt.hash(req.body.newPassword, 8);

        const user = {
          password: hashPassword
        };

        const updateUserPassword = await UserModel.findOneAndUpdate(
          { _id: req.params.id },
          user,
          {
            new: true,
            useFindAndModify: false
          }
        );

        if (updateUserPassword) {
          res.json({
            data: updateUserPassword,
            code: 200,
            message: "Cập nhật password thành công"
          });
        }
      } catch (error) {
        res.status(500).json({
          message: error
        });
      }
    } else {
      res.json({
        code: 404,
        message: "Nhập password hiện tại không đúng"
      });
    }
  }
});


  module.exports = router;
