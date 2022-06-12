const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");

const UserModel = require("../models/User");

const app = express();


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

  module.exports = router;
