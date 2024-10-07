# 使用express和js开发的一个博客系统，采用mongodb数据库
## 使用方法
### 本地安装 开发依赖
### 配合 本地安装 配合 npm 脚本使用 

 #### 找到express-blog-接口实现-前后台文件夹 终端中输入 npm start 即可启动后端服务器
 #### 找到blog文件夹下index.html文件使用open with live server即可打开网站首页 
 #### 找到blog-user-admin 文件夹下register.html或login.html文件使用open with live server即可打开网站后台登录和注册功能
 # express框架使用
 express完全是由路由和中间件构成的框架
 从本质上来说一个express应用就是为了调用各种中间件
 ## express创建服务器
下面展示一个创建服务器的demo
````javascript
const express = require('express');
const app = express();
//客户端发起get请求 如果请求的路径是/，返回hello world字符串
app.get('/', (req, res) =>
     res.send('Hello World!哈哈')
)
//启动服务器 然后我就可以通过IP地址和端口号访问这台服务器了   127.0.0.1:3000 或者 
localhost:3000 或者自己电脑的ip:3000
app.listen(3000, () =>
     console.log('Example app listening on port 3000!')
)
````
## 路由和中间件
express完全是由路由和中间件构成的框架，从本质上来说一个express应用就是为了监听不同的路径 
调用各种中间件

中间件本质就是一个函数，也可以叫插件，只不过express里面我们更习惯叫中间件
## 路由
路由：前端访问不同的地址，后端要返回不同的数据，这就叫后端路由
如果/users/login 接口是登录用的，/users/reg 接口是注册用的。
监听不同的路径执行不同的函数，从而来处理不同的请求
 

这个路由一般是在app上使用的，一般我们也叫应用级别的路由！
## 通过路由挂载中间件
### app.use(中间件监听的路径，中间件函数)
use里面面可以设置两个参数
 第一个参数设置的路径，不传参数，默认是* 匹配任何路径
 第二个参数是回调函数，如果匹配到路径，就会执行后的函数。很多时候后面都是第三方封装好的
一个函数，这个函数我们称之为中间件。
请求的路径如果匹配到了路径，就会执行后面的函数
````javascript
app.use （path，fn）
前端发起请求的路径匹配一个path的时候，就会执行后面的函数fn
-path称之为路径
-fn称之为中间件函数
-app.use我们可以让不同的路径（接口地址）执行不同的函数，这个叫做路由(注意use可以监听不同的请求
方式，get-post等等)
app.use （'*'，fn1） // 和后面等效 app.use （fn1）
app.use （'/about-me'，fn1）
app.use （'/login'，fn2）
````
路由的匹配顺序时从上到下，如果我们一开始使用了 * ，那么匹配到的到了 * 下面的路径就不会执行
了。
所以我们现在不用 * ,后面的我们会将到怎么避免这种情况。
 
http请求的方式很多，use可以监听到所有方式的请求。
除了use，也可以专门的去监听某种请求
### app.get 可以监听get请求 
### app.post 可以监听post请求 
### app.put可以监听put请求 
### app.patch可以监听patch请求
### app.delete可以监听delete请求
### 例如注册接口的设计
````javascript
var usersRouter = require("./routes/users");
````
````javascript
app.use("/api/users", usersRouter);
````
````javascript
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

````
# 以下是后端接口文档
## 用户相关

### 注册
- **路径**：`/api/users`
- **方法**：`POST`
- **功能**：创建新用户。
- **请求参数**：
  - `username`: 用户名
  - `password`: 密码
  - `nickname`: 昵称
  - `headImgUrl`: 头像URL
- **响应**：注册成功或失败的消息。

### 登录
- **路径**：`/api/users`
- **方法**：`GET`
- **功能**：用户登录。
- **请求参数**：
  - `username`: 用户名
  - `password`: 密码
- **响应**：登录成功后返回 JWT 令牌和其他用户信息，或登录失败的消息。

## 文章相关

### 发布文章
- **路径**：`/api/articles`
- **方法**：`POST`
- **功能**：创建一篇新文章。
- **请求参数**：文章内容。
- **响应**：发布成功或失败的消息。

### 根据用户id获取文章列表
- **路径**：`/api/articles/users/:uid`
- **方法**：`GET`
- **功能**：获取指定用户的所有文章。
- **请求参数**：用户id (`uid`)。
- **响应**：包含文章列表的响应或错误消息。

### 根据文章id获取文章详情
- **路径**：`/api/articles/:aid`
- **方法**：`GET`
- **功能**：获取一篇特定文章的详细信息。
- **请求参数**：文章id (`aid`)。
- **响应**：文章详情或错误消息。

### 根据文章id删除文章
- **路径**：`/api/articles/:aid`
- **方法**：`DELETE`
- **功能**：删除一篇特定文章。
- **请求参数**：文章id (`aid`)。
- **响应**：删除成功或失败的消息。

### 根据文章id编辑文章
- **路径**：`/api/articles/:aid`
- **方法**：`PATCH`
- **功能**：更新一篇特定文章的内容。
- **请求参数**：文章id (`aid`) 和更新内容。
- **响应**：更新成功或失败的消息。

## 评论相关

### 发布评论
- **路径**：`/api/comments`
- **方法**：`POST`
- **功能**：为文章创建一个新的评论。
- **请求参数**：文章id (`article_id`) 和评论内容 (`content`)。
- **响应**：发布成功或失败的消息。

### 根据文章id获取文章的评论列表
- **路径**：`/api/comments/articles/:aid`
- **方法**：`GET`
- **功能**：获取特定文章的所有评论。
- **请求参数**：文章id (`aid`)。
- **响应**：包含评论列表的响应或错误消息。

### 根据评论id删除评论
- **路径**：`/api/comments/:cid`
- **方法**：`DELETE`
- **功能**：删除一条特定评论。
- **请求参数**：评论id (`cid`)。
- **响应**：删除成功或失败的消息。只有文章的作者可以删除评论。

## 文件上传

### 上传文件
- **路径**：`/api/upload`
- **方法**：`POST`
- **功能**：上传一个文件（如图片）。
- **请求参数**：文件 (`file`)。
- **响应**：上传成功后返回图片的URL或错误消息。

