var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
let { expressjwt } = require("express-jwt");

var articlesRouter = require("./routes/articles");
var usersRouter = require("./routes/users");
var uploadRouter = require("./routes/upload");
var commentsRouter = require("./routes/comments");

var articlesFrontRouter = require("./routes/front/articles");
var commentsFrontRouter = require("./routes/front/comments");

var app = express();

//设置跨域访问
app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  //允许的header类型
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  // //跨域允许的请求方式
  res.header(
    "Access-Control-Allow-Methods",
    "PATCH,PUT,POST,GET,DELETE,OPTIONS"
  );
  // 可以带cookies
  res.header("Access-Control-Allow-Credentials", true);
  if (req.method == "OPTIONS") {
    res.sendStatus(200).end();
  } else {
    next();
  }
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//解析jwt
app.use(
  expressjwt({
    secret: "test12345",
    algorithms: ["HS256"],
  }).unless({
    // 要排除的 路由
    path: [
      "/api/users",
      "/api/upload",
      /^\/api\/articles\/users\/\w+/,
      {
        url: /^\/api\/articles\/\w+/,
        methods: ["GET"],
      },

      // 前台两个文章接口不需要权限
      "/api/front/articles",
      {
        url: /^\/api\/front\/articles\/\w+/,
        methods: ["GET"],
      },
      {
        url: /^\/api\/front\/comments\/articles\/\w+/,
        methods: ["GET"],
      },
    ],
  })
);

app.use("/api/users", usersRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/front/articles", articlesFrontRouter);
app.use("/api/front/comments", commentsFrontRouter);

app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res
      .status(401)
      .json({ code: 0, msg: "无效的token或者没有没有传递token-请重新登录" });
  } else {
    next(err);
  }
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
