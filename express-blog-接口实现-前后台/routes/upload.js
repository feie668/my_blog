let express = require("express");
let router = express.Router();

// 上传文件模块
var multer = require("multer");
//内置的path 模块 操作路径的模块
let path = require("path");
// 配置上传图片的路径
var storage = multer.diskStorage({
  //上传图片的路径
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    //path.extname(file.originalname) 获取前端上传图片的 后缀名
    //文件名字 以上传的时间戳为文件的名字
    // 1.png--》 122323232323.png
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
//根据存储设置，创建upload
// single("img"); 支持一次上传一张图，请求体里面的 参数名img，参数的值 图片
var upload = multer({ storage: storage }).single("file");

router.post("/", upload, function (req, res) {
  let file = req.file; //图片对象
  let imgUrl = "/images/" + file.filename;
  res.json({
    code: 1,
    msg: "上传文件成功",
    data: imgUrl,
  });
});

module.exports = router;
