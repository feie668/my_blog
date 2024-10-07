let mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1/test-blog")
  .then((res) => {
    console.log("链接成功");
  })
  .catch((err) => {
    console.log("链接失败");
  });

let Schema = mongoose.Schema;

// 1-定义了文章表的结构
let ArticleSchema = new Schema(
  {
    title: String,
    content: String,
    // 文章表 作者id --ref: "User"关联了 用户表中id
    author: { type: Schema.Types.ObjectId, ref: "User" },
    tag: String,
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
// 2-创建数据模型--根据表结构创建数据模型---》并且把表结构映射数据中一个表 Articles
//Article 通过这个对象我们就可以数据库中的数据进行增删改查CRUD
ArticleSchema.virtual("coms", {
  ref: "Comment",
  localField: "_id",
  foreignField: "article_id",
  justOne: false, //取Array值- 会把文章对应的评论全部提取出来
  // count: true, //取总数  如果为true 只显示数组的长度，不显示数组的内容
});
// 下面这两句只有加上了， 虚拟字段才可以显性的看到，不然只能隐性使用
ArticleSchema.set("toObject", { virtuals: true });
ArticleSchema.set("toJSON", { virtuals: true });

let Article = mongoose.model("Article", ArticleSchema);

/* 
定义的用户表
*/
let UserSchema = new Schema(
  {
    username: {
      type: String,
      // 如果数据库已经有了重复的数据，再次修改了结构--清空数据库的数据， 断开数据库连接-
      unique: true,
      required: true,
    },
    password: String,
    nickname: String,
    headImgUrl: String,
  },
  {
    timestamps: true,
  }
);
let User = mongoose.model("User", UserSchema);

let CommentSchema = new Schema(
  {
    content: String,
    article_id: { type: Schema.Types.ObjectId, ref: "Article" },
    reply_user_id: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
let Comment = mongoose.model("Comment", CommentSchema);

module.exports = { Comment, User, Article };

// Comment.create({
//   content: "确实好",
//   article_id: "637cdeb21e7c7826a6cc6b29",
//   reply_user_id: "637cdd4c73290614f8cd5548",
// }).then((r) => {
//   console.log(r);
// });

// Comment.find({ article_id: "637cdeb21e7c7826a6cc6b29" })
//   .populate("reply_user_id", { password: 0 })
//   .then((r) => {
//     console.log(r);
//   });

// 李姐的id 637cdd7235342b39401c9f9f

// User.create({
//   username: "lisi",
//   password: "12345",
//   nickname: "李姐",
//   headImgUrl:
//     "https://img0.baidu.com/it/u=740679572,1472990262&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
// }).then((r) => {
//   console.log(r);
// });

/* 
创建数据-插入数据库中 1 
*/
// Article.create({
//   title: "今天天气很好啊555",
//   content: "我想要在下午的时候出去玩",
//   tag: "日常生活",
//   author: "637cdd7235342b39401c9f9f",
// }).then((r) => {
//   console.log(r);
//   console.log("创建-并且插入数据成功");
// });

// Article.create([
//   {
//     title: "今天天气很好啊2222",
//     content: "我想要在下午的时候出去玩",
//     tag: "日常生活",
//     author: "翔哥",
//   },
//   {
//     title: "今天天气很好啊44444",
//     content: "我想要在下午的时候出去玩",
//     tag: "日常生活",
//     author: "翔哥",
//   },
//   {
//     title: "今天天气很好啊45555",
//     content: "我想要在下午的时候出去玩",
//     tag: "日常生活",
//     author: "翔哥",
//   },
//   {
//     title: "今天天气很好啊666",
//     content: "我想要在下午的时候出去玩",
//     tag: "日常生活",
//     author: "翔哥",
//   },
// ]).then((r) => {
//   console.log(r);
//   console.log("创建-并且插入数据成功");
// });

// let a1 = new Article({
//   title: "今天天气很好啊5555",
//   content: "我想要在下午的时候出去玩",
//   tag: "日常生活",
//   author: "翔哥",
// });
// a1.save().then((r) => {
//   console.log("创建成功-插入成功");
//   console.log(r);
// });

/* 
删除数据

*/
// 删除id删除文章
// Article.deleteOne({ _id: "637c9a8d3943248a5051375f" })
//   .then((r) => {
//     // { acknowledged: true, deletedCount: 1 }
//     console.log(r);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// Article.deleteMany({ content: /出去玩/ })
//   .then((r) => {
//     // { acknowledged: true, deletedCount: 1 }
//     console.log(r);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// Article.updateOne(
//   {
//     _id: "637c9cdc535ce4cbb4c1ed74",
//   },
//   {
//     title: "测试一下-修改功能title",
//     content: "测试一下-修改功能-content",
//   }
// ).then((r) => {
//   console.log(r);
// });

// Article.updateOne(
//   {
//     _id: "637c9cdc535ce4cbb4c1ed74",
//   },
//   {
//     $inc: { views: 1 },
//   },
//   {
//     timestamps: false,
//   }
// ).then((r) => {
//   console.log(r);
// });

/* 

查询操作

*/

// Article.findById("74ba81db8bd469d533891334").then((r) => {
//   console.log(r);
// });

// Article.findOne({ _id: "74ba81db8bd469d533891334" }).then((r) => {
//   console.log(r);
// });

// Article.findByIdAndUpdate(
//   "74ba81db8bd469d533891334",
//   { $inc: { views: 1 } },
//   { timestamps: false }
// ).then((r) => {
//   console.log(r);
// });

// Article.find({ views: { $gte: 0, $lte: 1000 }, title: /4/ })
// Article.find({ views: { $gte: 0, $lte: 1000 } })
// Article.find({})
//   .sort({ _id: -1 })
//   .skip(0)
//   .limit(10)
//   .select({ updatedAt: 0, __v: 0 })
//   .populate("author", { password: 0 })
//   .populate("coms")
//   .exec()
//   .then((r) => {
//     console.log(r);
//   });
