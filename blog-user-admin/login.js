/* 
监听表单的提交事件
    获取用户名和密码
    发起登录请求

*/
let loginForm = document.querySelector(".login-form");
let ipts = document.querySelectorAll("input");

loginForm.onsubmit = async function (e) {
  e.preventDefault();
  let username = ipts[0].value;
  let password = ipts[1].value;
  let loginAPI = "/api/users";
  //   { params: { username, password } }
  // params 固定:{参数名：参数值}  参数会添加到url后面 /api/users?username=xxx&password=223
  //  }
  let r = await http.get(loginAPI, { params: { username, password } });
  console.log(r.data);
  layer.msg(r.data.msg);
  if (r.data.code == 1) {
    localStorage.setItem("username", username);
    localStorage.setItem("nickname", r.data.nickname);
    localStorage.setItem("uid", r.data.uid);
    localStorage.setItem("headImgUrl", r.data.headImgUrl);
    localStorage.setItem("token", r.data.token);

    setTimeout(() => {
      location.href = "blog-list.html";
    }, 1000);
  }
};
