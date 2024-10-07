let express = require("express");
let router = express.Router();
let { Comment } = require("../../models/index");

/* 
发布评论
*/
router.post("/", function (req, res) {
  req.body;
  req.auth.uid;
  Comment.create({
    reply_user_id: req.auth.uid,
    article_id: req.body.article_id,
    content: req.body.content,
  })
    .then((r) => {
      res.json({
        code: 1,
        msg: "发布评论成功",
      });
    })
    .catch((err) => {
      res.json({
        code: 0,
        msg: "发布评论失败",
      });
    });
});

/* 

根据文章id获取文章的评论列表
*/

router.get("/articles/:aid", function (req, res) {
  Comment.find({ article_id: req.params.aid })
    .populate("reply_user_id", { password: 0 })
    .then((r) => {
      res.json({
        code: 1,
        msg: "查询评论列表成功",
        data: r,
      });
    })
    .catch((err) => {
      res.json({
        code: 0,
        msg: "查询评论列表失败",
      });
    });
});

module.exports = router;
