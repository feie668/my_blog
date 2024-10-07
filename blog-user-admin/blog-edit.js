console.log(location.search);
// ?aid=637f77e9c927f8b219614ec2
// 获取从列表页面传递过来的参数 文章id
let paramsObj = new URLSearchParams(location.search);
let aid = paramsObj.get("aid");
console.log(aid);

let ipt = document.querySelector("input");

// 获取文章详情
http.get("/api/articles/" + aid).then((r) => {
  console.log(r.data);
  ipt.value = r.data.data.title;
  editor.setHtml(r.data.data.content);
});

//修改文章--给保存按钮加点击事件
let saveBtn = document.querySelector(".save");
saveBtn.onclick = async () => {
  let title = ipt.value;
  let content = editor.getHtml();
  let r = await http.patch("/api/articles/" + aid, { title, content });
  console.log(r.data);
  layer.msg("修改成功");
};

// 发布评论

let sendBtn = document.querySelector(".send-btn");
let sendIpt = document.querySelector(".send-ipt");
sendBtn.onclick = async () => {
  let content = sendIpt.value;
  //   发布评论请求
  let r = await http.post("/api/comments", { content, article_id: aid });
  console.log(r.data);
  //   成功以后清空输入框
  sendIpt.value = "";
  loadCommetsList();
};

loadCommetsList();

// 请求评论列表
async function loadCommetsList() {
  let r = await http.get("/api/comments/articles/" + aid);
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
                      <div class="social-footer">
                        <button type="button" class="btn btn-danger del" data-id="${
                          v._id
                        }">删除</button>
                      </div>
                    </div> 
  
  `
  );
  document.querySelector(".com-list").innerHTML = divArr.join("");
}

// 删除功能
let comList = document.querySelector(".com-list");
comList.onclick = async function (evt) {
  if (evt.target.classList.contains("del")) {
    // 获取按钮的 data-id 属性
    let cid = evt.target.dataset.id;
    console.log(cid);
    //发起删除请求
    let r = await http.delete("/api/comments/" + cid);
    console.log(r.data);
    layer.msg("删除成功");
    loadCommetsList();
  }
};
