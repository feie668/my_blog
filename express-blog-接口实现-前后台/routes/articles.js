var express = require("express");
var router = express.Router();

var { Article } = require("../models/index");

/* GET home page. */
/* 
 /api/articles
 发布文章
*/
router.post("/", function (req, res, next) {
  console.log(req.body);
  // { username: 'admin', iat: 1668954424, exp: 1668954544 }
  console.log(req.auth.uid);
  //
  Article.create({
    ...req.body,
    author: req.auth.uid,
  })
    .then((r) => {
      res.json({
        code: 1,
        msg: "发布文章成功",
        data: r,
      });
    })
    .catch((r) => {
      res.json({
        code: 0,
        msg: "发布文章失败",
      });
    });
});
/* 
 /api/articles/users/:uid
 根据用户id获取文章列表
*/
router.get("/users/:uid", function (req, res, next) {
  console.log(req.params); //{uid:11}
  Article.find({ author: req.params.uid })
    .populate("author", { password: 0 })
    .populate("coms")
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

/* 
 /api/articles/:aid
 根据文章id删除文章
*/
router.delete("/:aid", function (req, res, next) {
  console.log(req.params); //{uid:11}
  Article.findByIdAndDelete(req.params.aid)
    .then((r) => {
      if (r) {
        res.json({
          code: 1,
          msg: "根据文章id删除文章",
        });
      } else {
        res.json({
          code: 0,
          msg: "根据文章id删除文章--文章已经不存在了",
        });
      }
    })
    .catch((err) => {
      res.json({
        code: 0,
        msg: "根据文章id删除文章--操作失败",
      });
    });
});
/* 
 /api/articles/:aid
 根据文章id编辑文章
*/
router.patch("/:aid", function (req, res, next) {
  console.log(req.params); //{aid:11}
  console.log(req.body);
  Article.findByIdAndUpdate(req.params.aid, { ...req.body }, { new: true })
    .then((r) => {
      res.json({
        code: 1,
        msg: "根据文章id编辑文章",
        data: r,
      });
    })
    .catch((err) => {
      res.json({
        code: 0,
        msg: "根据文章id编辑文章 -- 失败",
      });
    });
});

module.exports = router;
