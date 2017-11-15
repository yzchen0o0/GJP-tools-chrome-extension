/********************************************************
 ***************** 银行卡开户行信息查询 *******************
 ********************************************************/
// 添加监听事件
document.getElementById('btn_bank_card').addEventListener('click',queryBankCardInfo,false);

function queryBankCardInfo() {
	var bankCard = document.getElementById("txt_bank_card").value;
	if(null == bankCard || '' == bankCard) {
		return;
	}
	
	httpRequest(function(status, respText, isSuccess) {
		if(isSuccess) {
			document.getElementById("p_bank_card_no").innerText = '银行卡号：' + document.getElementById("txt_bank_card").value;
			respJSON = JSON.parse(respText);
			if(respJSON.success) {
				bankInfo = JSON.parse(respText).datas.bankInfo;
				console.log(bankInfo)
				document.getElementById("p_bank_card_name").innerText = '银行名称：' + bankInfo.bankName;
				document.getElementById("p_bank_card_type").innerText = '银行卡种：' + bankInfo.cardTypeName;
				document.getElementById("p_bank_card_logo").innerHTML = '<span style="vertical-align: super;">银行图标：</span><img src="' + bankInfo.logo + '"/>';
			} else {
				document.getElementById("p_bank_card_name").innerText = '银行名称：' + respJSON.msg;
				document.getElementById("p_bank_card_type").innerText = '银行卡种：' + respJSON.msg;
			}
		}		
	}, 'POST', 'http://jokes.guijianpan.com/WS/bankInfo?bc=' + bankCard);
}




