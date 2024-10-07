const { createEditor, createToolbar } = window.wangEditor;

const editorConfig = {
  placeholder: "请输入",
  onChange(editor) {
    const html = editor.getHtml();
    console.log("editor content", html);
    // 也可以同步到 <textarea>
    // content = html
  },
  //******配置1-创建配置对象
  MENU_CONF: {},
};
//***配置2--上传地址和 返回数据处理
editorConfig.MENU_CONF["uploadImage"] = {
  server: "http://localhost:3000/api/upload",
  fieldName: "file",
  // 自定义插入图片
  customInsert(res, insertFn) {
    console.log(res);
    // TS 语法
    // customInsert(res, insertFn) {                  		  // JS 语法
    //***配置3------处理服务端的返回结果
    // 从 res 中找到 url alt href ，然后插图图片
    insertFn("http://localhost:3000" + res.data);
  },
};

const editor = createEditor({
  selector: "#editor-container",
  html: "<p><br></p>",
  config: editorConfig,
  mode: "default", // or 'simple'
});

const toolbarConfig = {};

const toolbar = createToolbar({
  editor,
  selector: "#toolbar-container",
  config: toolbarConfig,
  mode: "default", // or 'simple'
});
