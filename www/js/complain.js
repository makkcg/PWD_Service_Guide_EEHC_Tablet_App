// JavaScript Document

/****initialize complain screen****/

/****alert msg****/
function validationerror_alert(title,body){
	$.confirm({
		title: title,
		content: body,
		type: 'red',
		buttons: {
			somethingElse: {
            text: 'تم',
            btnClass: 'btn-blue',
            keys: ['enter', 'shift'],
            action: function(){
					
				}
			}
		}
	});
}

/***validate form inputs***/
function  validateForm(){
	var title="خطأ في ارسال الطلب / الشكوى!";
	if($("#txtname").val()=="") {
		body="من فضلك أكتب الاسم ";
		validationerror_alert(title,body);
		return false;
	}else if($("#txtid").val()=="") {
		body="من فضلك أكتب رقم البطاقة ";
		validationerror_alert(title,body);
		return false;
	}else if($("#txtcomplain").val()=="") {
		body="من فضلك أدخل المقترح أو الشكوى ";
		validationerror_alert(title,body);
		return false;
	}else if($("#txtmobile").val()=="") {
		body="من فضلك أكتب رقم الموبايل ";
		validationerror_alert(title,body);
		return false;
	}else{
		/****check and save user data to local storage***/
		var uname=localStorage.getItem("username");
		var uid=localStorage.getItem("uid");
		var umob=localStorage.getItem("umob");
		if(typeof uname == 'undefined' || uname==null){
			
			localStorage.setItem("username",$("#txtname").val());
			localStorage.setItem("uid",$("#txtid").val());
			localStorage.setItem("umob",$("#txtmobile").val());
		}
		$("#txtname").prop('disabled', false);
		$("#txtid").prop('disabled', false);
		$("#csform").attr('action', servercomplainservicepath+'addcomplain.php');
		return true;
	}
}/***end function***/

/*/////////////////////////online //offline events listener////////////////////////////////*/
function online() {
	// Show a different icon based on offline/online
	//alert("لا يوجد اتصال بالانترنت")
}
function offline() {
	// Show a different icon based on offline/online
	//alert("لا يوجد اتصال بالانترنت")
		title="لا يوجد انترنت"
		body="لايوجد اتصال بالانترنت ، يرجى ايصال الجهاز بالانترنت واعادة المحاولة ";
		//validationerror_alert(title,body);
		$.confirm({
		title: title,
		content: body,
		type: 'red',
		buttons: {
			somethingElse: {
            text: 'حسنا',
            btnClass: 'btn-blue',
            keys: ['enter', 'shift'],
            action: function(){
				window.location="main.html";
				}
			}
		}
	});
}

$(document).ready(function(e) {
	
	var uname=localStorage.getItem("username");
	if(typeof uname != 'undefined' && uname!=null) {
		$("#txtname").val(uname);
		$("#txtname").prop('disabled', true);
	};
	var uid=localStorage.getItem("uid");
   if(typeof uid != 'undefined' && uid!=null){
	   $("#txtid").val(uid);
	   $("#txtid").prop('disabled', true);
	}
	var error= GetURLParameter("error");
	if( typeof GetURLParameter("error") != 'undefined' && GetURLParameter("error")!=null){
		title="خطأ أثناء الحفظ!"
		body="حدث خطأ أثناء ارسال الشكوى! يرجى اعادة المحاولة. "+error;
		//validationerror_alert(title,body);
		$.confirm({
		title: title,
		content: body,
		type: 'red',
		buttons: {
			somethingElse: {
            text: 'تم',
            btnClass: 'btn-blue',
            keys: ['enter', 'shift'],
            action: function(){
				window.location="complain.html";
				}
			}
		}
	});
	}
});/*****end doc ready***/