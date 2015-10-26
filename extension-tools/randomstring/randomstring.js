/********************************************************
 ************************ 随机字符串 ********************
 ********************************************************/
// 随机字数
var random_nums = ['4', '8', '16', '32'];
for(var i = 0; i < random_nums.length; i++) {
	document.getElementById('random_btn_' + random_nums[i]).addEventListener('click', function(){
		var idStr = this.getAttribute('id');
		_print(document.getElementById('random_val'), idStr.substring(idStr.lastIndexOf('_') + 1, idStr.length));
	}, false);
	
}

function _print(destInput, len) {
	destInput.value = _getRandomString(len);
}

function _getRandomString(len) {
	var _chars = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890'; // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
	var maxPos = _chars.length;
	var str = '';
	for (i = 0; i < len; i++) {
		str += _chars.charAt(Math.floor(Math.random() * maxPos));
	}
	return str;
}




