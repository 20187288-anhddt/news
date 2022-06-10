var express = require("express");
const CateNewsModel = require("../models/CateNews");
const NewsModel = require("../models/News");
var router = express.Router();

router.get("/", async function(req, res, next) {
    try {
      const cateNews = await CateNewsModel.find({ isDelete: false }).populate(
        "createdBy"
      );
      return res.json({
        code: 200,
        err: null,
        data: cateNews
      });
    } catch (err) {
      console.log(err);
      return res.json({
        code: 400,
        err: err.messege,
        data: null
      });
    }
  });
  
  router.post("/", async function(req, res, next) {
    try {
      const { category, createdBy } = req.body;
      const Category = new CateNewsModel({
        name: category,
        createdBy: createdBy
      });
      const CategoryClass = await Category.save();
  
      return res.json({
        code: 200,
        message: "Thêm thành công",
        data: CategoryClass,
        err: null
      });
    } catch (err) {
      return res.json({
        code: 400,
        message: "Thêm thất bại",
        err: err,
        data: null
      });
    }
  });

  router.delete("/:id", async function(req, res, next) {
    const cateId = req.params.id;
    const cateCheck = CateNewsModel.findOne({ _id: cateId });
    try {
      if (cateCheck) {
        const cateDelete = await CateNewsModel.findOneAndDelete({ _id: cateId });
        const cateNews = await CateNewsModel.find({ isDelete: true }).populate(
          "createdBy"
        );
  
        if (cateDelete) {
          res.json({
            code: 200,
            message: "Xóa thành công",
            data: cateNews
          });
        }
      }
    } catch (err) {
      res.json({
        code: 400,
        message: "Xóa thất bại",
        data: null
      });
    }
  });
  
  module.exports = router;