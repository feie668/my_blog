var express = require("express");
var router = express.Router();

var { Article } = require("../../models/index");

/* 
 /api/articles/users/:uid
 获取文章列表
*/
router.get("/", function (req, res, next) {
  console.log(req.params); //{uid:11}

  // 设置默认值
  let pagesize = req.query.pagesize || 10;
  let pagenum = req.query.pagenum || 1;
  Article.find()
    .populate("author", { password: 0 })
    .populate("coms")
    .skip((pagenum - 1) * pagesize)
    .limit(pagesize)
    .then((r) => {
      res.json({
        code: 1,
        msg: "根据用户id获取文章列表成功",
        data: r,
      });
    })
    .catch((err) => {
      res.json({
        code: 0,
        msg: "根据用户id获取文章列表失败",
      });
    });
});

/* 
 /api/articles/:aid
 根据文章id获取文章详情
*/
router.get("/:aid", function (req, res, next) {
  console.log(req.params); //{uid:11}
  Article.findByIdAndUpdate(
    req.params.aid,
    { $inc: { views: 1 } },
    { new: true }
  )
    .then((r) => {
      res.json({
        code: 1,
        msg: "根据文章id获取文章详情",
        data: r,
      });
    })
    .catch((err) => {
      res.json({
        code: 0,
        msg: "根据文章id获取文章失败",
      });
    });
});

module.exports = router;
