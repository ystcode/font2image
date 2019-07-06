 //文字转图片
 var change = $('#reduce');
 var context = $("#context");
 var frame = $("#frame");
 //富文本编辑器
 //https://ueditor.baidu.com/doc/#UE.Editor
 var ue = UE.getEditor('container');
 //对编辑器的操作最好在编辑器ready之后再做
 ue.ready(function() {
     //设置编辑器的内容
     ue.setContent('<p><br/><br/><br/><br/><br/><br/><br/></p><p style="text-align: center;"><span style="font-size: 36px; color: rgb(255, 255, 255); font-family: comic sans ms;">Zi Tu</span></p>');
     //获取html内容，返回: <p>hello</p>
     // var html = ue.getContent();
     //获取纯文本内容，返回: hello
     // var txt = ue.getContentTxt();
     ue.addListener('selectionchange', function(editor) {
         context.html(ue.getContent());
     })
     $("#ueditor_0").contents().find('.view').css('background-color', context.css("background-color"));
 });
 // let w = $(window).width(); //图片宽度
 // let h = $(window).height(); //图片高度
 var dom = context.get(0); //将jQuery对象转换为dom对象
 function getOS() { // 获取当前操作系统
     var os;
     if (navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1) {
         os = 'Android';
     } else if (navigator.userAgent.indexOf('iPhone') > -1 || navigator.userAgent.indexOf('iPad') > -1) {
         os = 'iOS';
     } else if (navigator.userAgent.indexOf('Windows Phone') > -1) {
         os = 'WP';
     } else {
         os = 'Others';
     }
     return os;
 }
 console.log("操作系统" + getOS());
 // 点击转成canvas，最后用于生成图片
 change.click(function(e) {
     // 调用html2canvas插件
     //https://github.com/niklasvh/html2canvas/blob/master/docs/configuration.md
     html2canvas(dom, {
         useCORS: true,
         //滚动条导致空白的解决方案
         windowWidth: document.body.scrollWidth,
         windowHeight: document.body.scrollHeight,
     }).then(function(canvas) {
         // canvas宽度
         var canvasWidth = canvas.width;
         // canvas高度
         var canvasHeight = canvas.height;
         // 控制台查看绘制区域的宽高
         console.log("canvas: " + canvasWidth + "    " + canvasHeight);
         // 渲染canvas，这个时候将我们用于生成图片的区域隐藏
         // context.hide();
         // 下面注释内容为测试内容，测试时可以去掉注释，方便查看生成的canvas区域
         // $("body").after(canvas);
         // 调用Canvas2Image插件
         var w = $(window).width(); //图片宽度
         // let h = $(window).height(); //图片高度
         // 这里因为我们生成图片区域高度为400，所以这里我们直接指定
         var h = $(window).height();
         console.log(w + "    " + h);
         // 将canvas转为图片
         var img = Canvas2Image.convertToImage(canvas, canvasWidth, canvasHeight);
         // 渲染图片，并且加到页面中查看效果
         // frame.html(img);
         // 保存
         var type = "png"; //图片类型
         var f = "DNF"; //图片文件名，自定义名称
         // w = (w === '') ? canvasWidth : w; //判断输入宽高是否为空，为空时保持原来的值
         // h = (h === '') ? canvasHeight : h;
         // 这里的判断用于区分移动端和pc端
         if (getOS() == "Others") {
             // 调用Canvas2Image插件
             Canvas2Image.saveAsImage(canvas, w, h, type, f);
         }
     });
 });
 //开启全功能
 colorpicker.render({
     elem: '#test-all',
     color: context.css("background-color"),
     format: 'rgb',
     predefine: true,
     alpha: true,
     change: function(color) {
         //给当前页面头部和左侧设置主题色
         context.css('background-color', color);
         $("#ueditor_0").contents().find('.view').css('background-color', color);
     }
 });