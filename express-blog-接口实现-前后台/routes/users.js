var express = require("express");
var router = express.Router();

let { User } = require("../models/index");

/* 注册请求 */
router.post("/", function (req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  let nickname = req.body.nickname;
  let headImgUrl = req.body.headImgUrl;
  console.log(req.body);
  if (username && password && nickname && headImgUrl) {
    // 创建用户 插入数据库
    User.create(req.body)
      .then((r) => {
        console.log(req.body);
        res.json({
          code: 1,
          msg: "注册成功",
        });
      })
      .catch((err) => {
        console.log(req.body);
        res.json({
          code: 0,
          msg: "注册失败",
          err: "用户名已经存在",
        });
      });
  } else {
    res.json({
      code: 0,
      msg: "注册失败-缺少参数",
    });
  }
});
/* 登录请求 */
let jwt = require("jsonwebtoken");

router.get("/", function (req, res, next) {
  console.log(req.query);
  let { username, password } = req.query;
  User.findOne({ username, password }).then((r) => {
    console.log(r);
    if (r == null) {
      res.json({
        code: 0,
        msg: "登录失败",
      });
    } else {
      // 如果登录成功 返回jwt  ，并且在token 中存入用户名
      let token = jwt.sign({ username: username, uid: r._id }, "test12345", {
        expiresIn: "365d",
        algorithm: "HS256",
      });

      res.json({
        code: 1,
        msg: "登录成功",
        token,
        uid: r._id,
        username: r.username,
        nickname: r.nickname,
        headImgUrl: r.headImgUrl,
      });
    }
  });
});

module.exports = router;
