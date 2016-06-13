var needTags = ['TEXTAREA', 'INPUT'];
var onFocusInput;

chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
	if (request.idcard) {
		onFocusInput.value = request.idcard;
	}
});

(function(){
	window.addEventListener("focus", function(e){
		e = e || window.event;
		if(needTags.indexOf(e.target.tagName) >= 0) {
			onFocusInput = e.target;
		}
	}, true)
}())

