/********************************************************
 ************************ 菜单初始化 ********************
 ********************************************************/
// 菜单模块
var div_module_ids = ['home', 'qrcode', 'idcard', 'http_request'];
// 从第二个下标开始，第一个是主页模块
for(var i = 1; i < div_module_ids.length; i++) {
	// 菜单模块点击切换内容
	document.getElementById('btn_module_' + div_module_ids[i]).addEventListener('click', function(){
		changeModule(this.getAttribute('id'), 'div-module-show', 'div-module-hide');
	}, false);
	// 点击返回主页内容
	document.getElementById('btn_module_backhome_' + div_module_ids[i]).addEventListener('click', function(){
		changeModule(div_module_ids[0], 'div-module-show', 'div-module-hide');
	}, false);
}
/*
 * 切换模块
 */
function changeModule(showEleId, showClassName, hideClassName) {
	for(var i = 0; i < div_module_ids.length; i++) {
		s = document.getElementById(div_module_ids[i]);
		c = s.className;
		if(showEleId.replace('btn_module_', '') == div_module_ids[i]) {
			s.className = c.replace(showClassName, '').replace(hideClassName, '') + ' ' + showClassName;
		} else {
			s.className = c.replace(showClassName, '').replace(hideClassName, '') + ' ' + hideClassName;
		}
	}
}

/*
 * 切换样式
 */
function doMoveClass(eleId, destClass){
    c = s.className;
    //有more属性
    if(c != null && c.indexOf(destClass) > -1){
        s.className = c.replace(destClass, '');
    }else{
        s.className = c + ' ' + destClass;
    }
}


/********************************************************
 ************************ 生成二维码 ********************
 ********************************************************/
var qrcodeWidth = 150;
var qrcodeHeight = 150;

var qrcode = new QRCode(document.getElementById('show_qrcode'),{width:qrcodeWidth,height:qrcodeHeight});
var qrcode1 = new QRCode(document.getElementById('show_qrcode1'),{width:qrcodeWidth,height:qrcodeHeight});

/*
 * 监听粘贴事件，实现动态生成二维码
 */
document.getElementById('qrcode_url').addEventListener('paste', function(e){
	qrcode.makeCode(e.clipboardData.getData("text"));
}, false);
/*
 * 按键事件，实现动态生成二维码
 */
document.getElementById('qrcode_url').onkeypress = function(e){
	qrcode.makeCode(this.value);
};

/*
 * chrome加载时获取网页地址
 */
 if(!chrome.windows) {
	 qrcode1.makeCode(window.location.href);
	 document.getElementById('show_qrcode1').className = 'show-qrcode1-img';
 } else {
	chrome.windows.getCurrent(function(win){
		chrome.tabs.getSelected(function(tab){
			
			qrcode1.makeCode(tab.url);
			document.getElementById('show_qrcode1').className = 'show-qrcode1-img';

			if(tab.favIconUrl){
				img = new Image();
				img.src = tab.favIconUrl;
				img.onload=function(){
					// 按照网站的favIcon大小格式
					//var _x = img.width,_y = img.height,_w=img.width,_h=img.height;
					// 固定favIcon大小格式
					var _x = img.width,_y = img.height,_w=32,_h=32,width=0,height=0;

					width = _w == _w ? parseInt(qrcodeWidth)-_x : _w > _x ? parseInt(qrcodeWidth)-_w-_x : parseInt(qrcodeWidth)+_w-_x;
					height = _h == _y ? parseInt(qrcodeHeight)-_y : _h > _y ? parseInt(qrcodeHeight)-_h-_y : parseInt(qrcodeHeight)+_h-_y;
					if(_x && _y){
						drawImg(img,width/2,height/2,_w,_h)
					}
				}
			}
		});
	});
}

//二维码图片嵌入icon图片
function drawImg(img,x,y,width,height){
	var myCanvas = document.getElementsByTagName('canvas')
		,_canvas = myCanvas[0]
		,myctx = _canvas.getContext('2d')
	;
	myctx.drawImage(img,x||0,y||0,width,height);
}


/********************************************************
 ************************ 获取本机IP ********************
 ********************************************************/
getIPs(function(ip,type){
	if('1' == type) {
		document.getElementById('div_private_ip').innerHTML = ip;
	} else if('2' == type) {
		document.getElementById('div_public_ip').innerHTML = ip;
	}
});

/*
 * 获取本机内网、外网IP地址  type==1：内网；type==2：外网
 * add by yzChen
 * time: 2015-10-29 21:04:56
 */
function getIPs(callback){
    var ip_dups = {};

    //compatibility for firefox and chrome
    var RTCPeerConnection = window.RTCPeerConnection
        || window.mozRTCPeerConnection
        || window.webkitRTCPeerConnection;

    //bypass naive webrtc blocking
    if (!RTCPeerConnection) {
        var iframe = document.createElement('iframe');
        //invalidate content script
        iframe.sandbox = 'allow-same-origin';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        var win = iframe.contentWindow;
        window.RTCPeerConnection = win.RTCPeerConnection;
        window.mozRTCPeerConnection = win.mozRTCPeerConnection;
        window.webkitRTCPeerConnection = win.webkitRTCPeerConnection;
        RTCPeerConnection = window.RTCPeerConnection
            || window.mozRTCPeerConnection
            || window.webkitRTCPeerConnection;
    }

    //minimal requirements for data connection
    var mediaConstraints = {
        optional: [{RtpDataChannels: true}]
    };

    //firefox already has a default stun server in about:config
    //    media.peerconnection.default_iceservers =
    //    [{"url": "stun:stun.services.mozilla.com"}]
    var servers = undefined;

    //add same stun server for chrome
    if(window.webkitRTCPeerConnection)
        servers = {iceServers: [{urls: "stun:stun.services.mozilla.com"}]};

    //construct a new RTCPeerConnection
    var pc = new RTCPeerConnection(servers, mediaConstraints);

    //listen for candidate events
    pc.onicecandidate = function(ice){

        //skip non-candidate events
        if(ice.candidate){

            //match just the IP address
            var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/
            var ip_addr = ip_regex.exec(ice.candidate.candidate)[1];

            //remove duplicates
            if(ip_dups[ip_addr] === undefined) {
				_type = '';
				if(ip_addr.match(/^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/)) {
					_type = '1';
				} else {
					_type = '2';
				}
                callback(ip_addr, _type);
			}

            ip_dups[ip_addr] = true;
        }
    };

    //create a bogus data channel
    pc.createDataChannel("");

    //create an offer sdp
    pc.createOffer(function(result){

        //trigger the stun server request
        pc.setLocalDescription(result, function(){}, function(){});

    }, function(){});
}
