// JavaScript Document

/****initialize complain done screen****/

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

/*****function to send the stored data in localstorage to the server****/
function senduserregistration_to_server(){
	
	//window.location.replace("registeruser.html")
	///****loading the data from local storage */
	var uname=localStorage.getItem("username");
	var uid=localStorage.getItem("uid");
	var umob=localStorage.getItem("umob");
	var uemail=localStorage.getItem("uemail");
	var udisability_type=localStorage.getItem("udisability_type");
	//var umob= localStorage.getItem("branch");
	
	//showloader()
	$.ajax({
		url:  serverservicespath+'deafservice2.php',
		data: {order:7, val1:uname, val2:umob, val3:uid, val4:udisability_type, val5:uemail },
		dataType: 'jsonp',
		jsonp: 'callback',
		jsonpCallback: 'UserAddedBack',
		success:function(){
							$("#spinloader").hide();
							//title="تم بنجاح"
							//body="تم تسجيل بياناتك بنجاح، سيتم قريبا ارسال عروض خاصة لك";
							//validationerror_alert(title,body);
				},
		timeout: 10000,
		error: function(jqXHR, textStatus, errorThrown) {
						if(textStatus==="timeout") {
							//do something on timeout
							$("#spinloader").hide(); 
							title="خطأ"
							body="لايوجد اتصال بالانترنت , او توجد مشكلة في الاتصال بالخادم";
							validationerror_alert(title,body);
						} 
				}      				
	}).fail(function() { 
			$("#spinloader").hide(); 
			title="خطأ"
			body="لايوجد اتصال بالانترنت , او توجد مشكلة في الاتصال بالخادم";
			validationerror_alert(title,body);
	});;
}
//////////////////////////////////////////////////
function UserAddedBack(data)
{
	if(data.txt=="ok") {
		title="تم بنجاح"
		body="تم تسجيل بياناتك بنجاح، سيتم قريبا ارسال عروض خاصة لك";
		validationerror_alert(title,body);
	}else if(data.txt=="dublicate"){
		title="مكرر"
		body="هذه البيانات مسجلة مسبقا لدينا، شكرا لك";
		validationerror_alert(title,body);
	}else{
		title="خطأ"
		body="حدث مشكلة أثناء حفظ بياناتك ، يرجى اعادة المحاولة "+data.txt;
		validationerror_alert(title,body);
	}
		
}
$(document).ready(function(e) {
/****check if user info is loaded to the local storage then load them into the form***/
	var uname=localStorage.getItem("username");
	var uid=localStorage.getItem("uid");
	var umob=localStorage.getItem("umob");
	var uemail=localStorage.getItem("uemail");
	var udisability_type=localStorage.getItem("udisability_type");
	
	if(uname != 'undefined' || typeof uname != 'undefined' || uname!=null || uname!=''){
		$("#uname").val(uname);
	}
	if(uid != 'undefined' || typeof uid != 'undefined' || uid!=null || uid!=''){
		$("#uid").val(uid);
	}
	if(umob != 'undefined' || typeof umob != 'undefined' || umob!=null || umob!=''){
		$("#umob").val(umob);
	}
	if(uemail != 'undefined' || typeof uemail != 'undefined' || uemail!=null || uemail!=''){
		$("#uemail").val(uemail);
	}
	if(udisability_type != 'undefined' || typeof udisability_type != 'undefined' || udisability_type!=null || udisability_type!=''){
		$("#udisability_type").val(udisability_type);
	}else{
		$("#udisability_type").val("لايوجد اعاقة");
	}

/***when user submit the form***/
$(document).on('click', '#registeruser_btn',function(event){
	/*****validate the form fields***/
	var title="خطأ في ارسال الطلب / الشكوى!";
	if($("#uname").val()=="" || $("#uname").val().length<5) {
		body="من فضلك أدخل الاسم كاملا ";
		validationerror_alert(title,body);
	}else if($("#umob").val()=="" || $("#umob").val().length<11) {
		body="من فضلك أدخل رقم المحمول الصحيح "+" المكون من 11 رقم.";
		validationerror_alert(title,body);
	}else if($("#uid").val()=="" || $("#uid").val().length<14) {
		body="من فضلك أدخل رقم بطاقة الرقم القومي كاملة والمكونة من 14 رقم. ";
		validationerror_alert(title,body);
	}else if($("#udisability_type").val()=="") {
		body="من فضلك اختر نوع الاعاقة ";
		validationerror_alert(title,body);
	}else{
		/****check and save user data to local storage***/
		var uname=localStorage.getItem("username");
		var uid=localStorage.getItem("uid");
		var umob=localStorage.getItem("umob");
		if(typeof uname != 'undefined' || uname!=null  || typeof uid != 'undefined' || uid!=null || typeof umob != 'undefined' || umob!=null){
			body="من فضلك اختر نوع الاعاقة ";
			title=""
			
		$.confirm({
			title: "تنبيه",
			content: "هل أنت متأكد من رغبتك في حفظ بياناتك؟",
			type: 'red',
			buttons: {
				somethingElse: {
				text: 'موافق',
				btnClass: 'btn-blue',
				keys: ['enter', 'shift'],
				action: function(){
						/****add saving user info to localstorage code***/
						localStorage.setItem("username",$("#uname").val());
						localStorage.setItem("uid",$("#uid").val());
						localStorage.setItem("umob",$("#umob").val());
						localStorage.setItem("udisability_type",$("#udisability_type option:selected").val());
						localStorage.setItem("uemail",$("#uemail").val());
						senduserregistration_to_server()
						
					}
				},
				somethingElse1: {
				text: 'لا',
				btnClass: 'btn-blue',
				keys: ['enter', 'del'],
				action: function(){
						
					}
				}
			}
		});
	
			
		}else{/***if this is the first time the user saves his info --no localstorage data***/
			/****add saving user info to localstorage code***/
						localStorage.setItem("username",$("#uname").val());
						localStorage.setItem("uid",$("#uid").val());
						localStorage.setItem("umob",$("#umob").val());
						localStorage.setItem("udisability_type",$("#udisability_type option:selected").val());
						localStorage.setItem("uemail",$("#uemail").val());
						senduserregistration_to_server()
		}

	}
});
/****when click on any image with .PicContent enlarge the image in popup****/
	$(document).on('click', '.PicContent',function(event){
		var imgsrc= $(this).attr("src");
		var imgslist=$(this).attr("data-imgs");
		var imgslist_arr=imgslist.split(",");
		$("#images_popup .listofimages").empty();
		//$("#images_popup .listofimages").append('<img class="rounded mx-auto d-block img-fluid" src="'+imgsrc+'" >')
		for(i=0;i<imgslist_arr.length;i++){
			$("#images_popup .listofimages").append('<img class="rounded mx-auto d-block img-fluid popupimg" src="'+imgslist_arr[i]+'" >')
		}
		$("#images_popup").modal();
	});

});/*****end doc ready***/