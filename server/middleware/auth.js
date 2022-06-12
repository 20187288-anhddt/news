const UserModle = require('../models/User');
const jwt = require("jsonwebtoken");
const key = {
  tokenKey: "djghhhhuuwiwuewieuwieuriwu"
}
module.exports = async function (req, res, next) {

    const token = req.header('auth-token');
    if (!token) {
      return res.json({
        code: 401,
        message: "k co quyen dang nhap",
        data: null
      })
    } else {
      
        const verified = jwt.verify(token, key.tokenKey);
        req.user = await UserModle.findOne({ _id: verified._id });
        req.user.password = undefined;
        next();
      }
}