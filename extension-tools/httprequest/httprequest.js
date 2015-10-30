/********************************************************
 ************************ 模拟http请求 ******************
 ********************************************************/
document.getElementById('btn_http_request_url').addEventListener('click', function(){
	document.getElementById('http_request_callback').value = '处理中，请稍候...';
	var _http_type = document.getElementById('http_request_type').value;
	// 默认加 http:// 前缀
	var _http_url = document.getElementById('txt_http_request_url').value;
	if(_http_url.indexOf('http://') != 0) {
		_http_url = 'http://' + _http_url;
	}
	// 发送http请求
	httpRequest(function(status, respText, flag) {
		var _callback_txt = '';
		if(flag) {
			_callback_txt = respText;
		} else {
			respText = '请求正在处理，若响应码不是200，则表示请求失败！\n当前响应码：' + status;
		}
		document.getElementById('http_request_callback').value = respText;
	}, _http_type, _http_url);
});

/*
 * http异步请求封装
 * @param callback 回调函数
 * @param type 请求类型  GET、POST
 * @param url 请求地址
 */
function httpRequest(callback, type, url) {
	var xhr = new XMLHttpRequest();
	xhr.open(type, url, true);
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xhr.onreadystatechange = function() {
		callback(xhr.status, xhr.responseText, (xhr.readyState == 4 && xhr.status == 200));
	}
	xhr.send();
}














