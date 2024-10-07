let pagenum = 1;
let pagesize = 2;

async function loadList() {
  let r = await http.get("/api/front/articles", {
    params: { pagenum, pagesize },
  });
  console.log(r);
  let artArr = r.data.data;
  let liArr = artArr.map(
    (v) => `
      <div class="col-sm-12">
      <div class="ibox">
        <div class="ibox-content">
          <a href="detail.html?aid=${v._id}" class="btn-link">
            <h2>
             ${v.title}
            </h2>
          </a>
          <div class="small m-b-xs">
            <strong>${v.author ? v.author.nickname : ""}</strong>
            <span class="text-muted"
              ><i class="fa fa-clock-o"></i> ${v.createdAt}
            </span>
          </div>
          <p>
            ${v.content}
          </p>
          <div class="row">
            <div class="col-md-1"><i class="fa fa-eye"> </i> ${
              v.views
            } 浏览</div>
            <div class="col-md-1">
              <i class="fa fa-comments-o"> </i> ${v.coms.length} 评论
            </div>
          
          </div>
        </div>
      </div>
</div>
  `
  );

  document.querySelector(".art-list").innerHTML += liArr.join("");
}

loadList();

// 加载更多
let loadMoreBtn = document.querySelector(".pager a");
loadMoreBtn.onclick = function () {
  pagenum++;
  loadList();
};
