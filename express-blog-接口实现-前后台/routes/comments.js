let express = require("express");
let router = express.Router();
let { Comment } = require("../models/index");

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

/* 
根据评论id删除评论
*/
router.delete("/:cid", async function (req, res) {
  //根据评论id找打对应的评论 --关联文章信息
  let commentObj = await Comment.findById(req.params.cid).populate(
    "article_id"
  );
  console.log(commentObj);
  console.log(req.auth.uid);
  //   获取评论对应文章的作者
  let author_id = commentObj.article_id.author;

  //   /如果 评论文章的对应的作者 就是登录账号的话-说明具备删除权限
  if (author_id == req.auth.uid) {
    let r = await Comment.findByIdAndDelete(req.params.cid);
    if (r) {
      res.json({
        code: 1,
        msg: "删除评论成功",
      });
    } else {
      res.json({
        code: 0,
        msg: "删除评论-已经被删除",
      });
    }
  } else {
    res.json({
      code: 0,
      msg: "删除评论-没有权限",
    });
  }

  //
});

module.exports = router;
