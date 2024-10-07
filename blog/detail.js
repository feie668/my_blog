//获取aid 文章的id
let paramsObj = new URLSearchParams(location.search);
let aid = paramsObj.get("aid");

http.get("/api/front/articles/" + aid).then((r) => {
  console.log(r.data);
  let at = document.querySelector(".article-title");
  at.innerHTML = r.data.data.title;

  let p = document.querySelector(".ibox p");
  p.innerHTML = r.data.data.content;
});

// 评论列表

async function loadCommentList() {
  let r = await http.get("/api/front/comments/articles/" + aid);
  console.log(r.data);
  let divArr = r.data.data.map(
    (v) => `
  <div class="social-feed-box">
                      <div class="social-avatar">
                        <a href="javascript:;" class="pull-left">
                          <img alt="image" src="${
                            baseURL + v.reply_user_id.headImgUrl
                          }" />
                        </a>
                        <div class="media-body">
                          <a href="javascript:;"> ${
                            v.reply_user_id.nickname
                          }</a>
                          <small class="text-muted">${v.createdAt}</small>
                        </div>
                      </div>
                      <div class="social-body">
                        <p>${v.content}</p>
                      </div>
                    </div> 
  
  `
  );
  document.querySelector(".com-list").innerHTML = divArr.join("");
}

// 发布评论
// 发布评论

let sendBtn = document.querySelector(".send-btn");
let sendIpt = document.querySelector(".send-ipt");
sendBtn.onclick = async () => {
  let content = sendIpt.value;
  //   发布评论请求
  let r = await http.post("/api/front/comments", { content, article_id: aid });
  console.log(r.data);
  //   成功以后清空输入框
  sendIpt.value = "";
  loadCommentList();
};

loadCommentList();
