开源 Web 富文本编辑器，开箱即用，配置简单

https://www.wangeditor.com/ 官网网址

## 基本使用

https://www.wangeditor.com/v5/getting-started.html 快速开始

## 配置图片上传

参考

https://www.wangeditor.com/v5/menu-config.html#%E4%B8%8A%E4%BC%A0%E5%9B%BE%E7%89%87

```
 const { createEditor, createToolbar } = window.wangEditor;

      const editorConfig = {
        placeholder: "Type here...",
        onChange(editor) {
          const html = editor.getHtml();
          console.log("editor content", html);
          // 也可以同步到 <textarea>
        },
        //******配置1-创建配置对象
        MENU_CONF: {},
      };
      //***配置2--上传地址和 返回数据处理
      editorConfig.MENU_CONF["uploadImage"] = {
        server: "http://jx.xuzhixiang.top/upload_file_qn.php/",
        fieldName: "file",
        // 自定义插入图片
        customInsert(res, insertFn) {
          console.log(res);
          // TS 语法
          // customInsert(res, insertFn) {                  		  // JS 语法
          //***配置3------处理服务端的返回结果
          // 从 res 中找到 url alt href ，然后插图图片
          insertFn(res.file_url);
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


```
