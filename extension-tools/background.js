
/********************************************************
 ************************ 右键菜单 **********************
 ********************************************************/
 /*
// 点击事件
function genericOnClick(info, tab) {
  var content = JSON.stringify(info);
  var pageBasic = JSON.stringify(tab);
  console.log("网页基本信息: " + pageBasic);
  console.log("操作内容: " + content);
  // 文本
  if(null != info.selectionText) {
    console.log("选中内容：" + info.selectionText);
	// 异步发送消息到服务器
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "http://localhost:8080/jeewx/demoController.do?aorudemo", true);
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xhr.onreadystatechange = function() {
	  if (xhr.readyState == 4) {
		var resp = JSON.parse(xhr.responseText);
	  }
	}
	xhr.send("name="+encodeURI(info.selectionText));
  }
}

// 遍历所有类型，并创建右键菜单
var contexts = ["page","selection","link","editable","image","video","audio"];
var contextsClickType = ["page","selectionText","link","editable","image","video","audio"];
var titles = ["页面","选择内容","链接","editable","图片","video","audio"];
for (var i = 0; i < contexts.length; i++) {
  var context = contexts[i];
  var title = titles[i];
  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                       "onclick": genericOnClick});
  console.log("类型：'" + context + "', ID: " + id);
}
*/


/********************************************************
 ************************ 弹窗界面 **********************
 ********************************************************/






















