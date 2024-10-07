// http.get()
// http.post()
let formIpts = document.querySelectorAll(".form-control");
console.log(formIpts);

let headImgUrl;
//头像上传
formIpts[3].onchange = function () {
  let file = this.files[0];
  console.log(file);
  let uploadAPI = "/api/upload";
  let fd = new FormData();
  fd.append("file", file);
  http
    .post(uploadAPI, fd)
    .then((r) => {
      console.log(r);
      r.data.data;
      headImgUrl = r.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

// 注册按钮
let regBtn = document.querySelector(".reg");

let regForm = document.querySelector(".reg-form");
regForm.onsubmit = async (evt) => {
  evt.preventDefault();
  let username = formIpts[0].value;
  let nickname = formIpts[1].value;
  let password = formIpts[2].value;

  // 变量名尽量和后端需要参数名一样

  let r = await http.post("/api/users", {
    username,
    nickname,
    password,
    headImgUrl,
  });
  console.log(r);

  //   弹出提示
  layer.msg(r.data.msg);
  //   注册成功跳转到登录页
  if (r.data.code == 1) {
    setTimeout(() => {
      location.href = "login.html";
    }, 1000);
  }
};
