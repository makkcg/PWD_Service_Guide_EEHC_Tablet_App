// JavaScript Document

/****initialize replies screen****/

/************************************/
/****function to get the selected complains data from db***/
function GetSelecteComplainData(){
	/***if success reply submitted show the chats of complainid again***/
	var complainid= GetURLParameter("complainid");
	if(typeof GetURLParameter("complainid") != 'undefined' && GetURLParameter("complainid")!=null){
		/***load the complain id that was loaded before submission***/
		fillhtml_chat_boxex(complainid);
		$("#seldates").val(complainid)
	}
	
	var selval=$( "#seldates option:selected" ).val();
	if(selval!="" && typeof selval!='undefined' && selval!=null && selval!=0){
		fillhtml_chat_boxex(selval)
	}
}

/************************************/
/********function to get the list of complains for the dropdown from db by user id stored in localstorage***/
function GetComplains(){
	var uid=localStorage.getItem("uid");
	/***if the user info is stored in localstorage***/
	if(typeof uid != 'undefined' && uid!=null){
		$.get("https://10.19.136.100/services/deafservice.php", {order:12, val1: uid}, function(data){
			$("#seldates").html(data);
			/***if success reply submitted show the chats of complainid again***/
			var complainid= GetURLParameter("complainid");
			if(typeof GetURLParameter("complainid") != 'undefined' && GetURLParameter("complainid")!=null){
				/***load the complain id that was loaded before submission***/
				fillhtml_chat_boxex(complainid);
				$("#seldates").val(complainid)
			}
		});
	}else{/***if user info is not stored in localstorage use the search box for getting the info by user eg.id***/
		title='تنبيه';
		body='لم تقم بتسجيل بياناتك وتقديم شكوى او مقترح مسبقا!. يمكنك البحث برقم البطاقة الشخصية لعرض الشكاوى والمقترحات.';
		validationerror_alert(title,body);
	}
}
 
/****alert msg****/
function validationerror_alert(title,body){
	$.confirm({
		title: title,
		content: body,
		type: 'red',
		buttons: {
			somethingElse: {
            text: 'اغلاق',
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
	$("#compid").val($( "#seldates option:selected" ).val());
	var selected_complain_id=$( "#seldates option:selected" ).val()
	var title="خطأ في ارسال الطلب / الشكوى!";
	if($("#txtcustomer").val()=="") {
		body="من فضلك اكتب التعليق قبل الارسال ";
		validationerror_alert(title,body);
		return false;
	}else if(selected_complain_id==0 || typeof selected_complain_id=='undefined' || selected_complain_id==null){
		body="لم يتم اختيار شكوى/مقترح للرد عليه! يرجى الاختيار أولا... ";
		validationerror_alert(title,body);
		return false;
	}else{
		$("#csform").attr('action', serverrepliesservicepath+'addreply.php');
		return true;
	}
}/***end function***/

/*********function to draw chat boxex****/
function fillhtml_chat_boxex(selval){
	$(".chat").empty();
	var json_chats="";
	
	$.get(serverservicespath+"deafservice.php", {
			order:13,
			val1: selval},
			function(data){
				console.log(JSON.parse(data));
				json_chats=JSON.parse(data);
				var chatshtml="";
				for(i=0;i<json_chats.length;i++){

					var msg=json_chats[i].msg
					var attachment=json_chats[i].attach
					var chattime=json_chats[i].msgdatetime
					if(json_chats[i].iscustomer==0){
						var cs_name='We Customer Service';
						html='<li class="left clearfix chat_item_li"><div class="row justify-content-center align-items-center chatheader"><div class="col-9 col-sm-11 header justify-content-center align-items-center"><strong class="primary-font pull-left chat_user">'+cs_name+'</strong><small class="pull-left text-muted chat_time"><span class="glyphicon glyphicon-time"></span>'+chattime+'</small></div><div class="col-3 col-sm-1 user_avatar"><img src="imgs/welogoheader.png" alt="User Avatar" class="pull-left img-circle img-fluid"></div></div><div class="row chat_txt_container clearfix justify-content-center align-items-center"><div class=" col-9 col-sm-11 chat_txt_msg chat_txt_cs">'+msg+'</div><div class="col-3 col-sm-1 chat_txt_attach">'
						if(json_chats[i].has_attach==1){
							html=html+'<div class="col-12 justify-content-center align-items-center attach_label rounded">مرفقات</div><img class="PicContent rounded2 mx-auto d-block img-fluid" src="'+attachment+'" data-imgs="'+attachment+'">'
						}
						html=html+'</div></div></li>'
					}else{
						var uname=localStorage.getItem("username");
						if(typeof uname == 'undefined' || uname==null){
						/****use the uid made in search***/
							uname="بطاقة # "+$("#searchinp").val();
						}
						
						html='<li class="right clearfix chat_item_li"><div class="row justify-content-center align-items-center chatheader2"><div class="col-3 col-sm-1 user_avatar "><img src="imgs/reguser.png" alt="User Avatar" class="pull-left img-circle img-fluid"></div><div class="col-9 col-sm-11 header justify-content-center align-items-center"><strong class="primary-font pull-right chat_user">'+uname+'</strong><small class="pull-right text-muted chat_time"><span class="glyphicon glyphicon-time"></span>'+chattime+'</small></div></div><div class="row chat_txt_container clearfix justify-content-center align-items-center"><div class=" col-9 col-sm-11 chat_txt_msg chat_txt_customer">'+msg+'</div><div class="col-3 col-sm-1 chat_txt_attach">'
						if(json_chats[i].has_attach==1){						
							html=html+'<div class="col-12 justify-content-center align-items-center attach_label rounded">مرفقات</div><img class="PicContent rounded2 mx-auto d-block img-fluid" src="'+attachment+'" data-imgs="'+attachment+'">'
						}						
						html=html+'</div></div></li>'
					}
					chatshtml=chatshtml+html;
					$(".chat").html(chatshtml)
				}
	});
}/***end function***/
$(document).ready(function(e) {
	
	/***check if error is returned from submission of reply***/
	var error= GetURLParameter("error");
	if( typeof GetURLParameter("error") != 'undefined' && GetURLParameter("error")!=null){
		title="خطأ أثناء الحفظ!"
		body="حدث خطأ أثناء الارسال ! يرجى اعادة المحاولة... "+error;
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
				window.location="replies.html";
				}
			}
		}
	});
	}
	/***initialize***/
	$(".chat").empty()
	GetComplains();
	GetSelecteComplainData();
	
	/****initialize replies***/
	
	var uid=localStorage.getItem("uid");
	if(uid!='' && uid!=' ' && typeof uid!='undefined' && uid!=null){
		$("#searchinp").val(uid)
	}
	/********when complain selection changes*****/	
	$("#seldates").change(function(e) {  
	   GetSelecteComplainData();
    });
	
	/*****when user searches for complains using uid***/
	$(document).on('click', '#searchbtn',function(event){
		var uid=$("#searchinp").val();
		if(uid!='' && uid!=' ' && typeof uid!='undefined' && uid!=null){
			/***search and populate the dropdown with complains of the searched uid**/
			$.get("https://10.19.136.100/services/deafservice.php", {order:12, val1: uid}, function(data){
				$("#seldates").html(data);
				console.log(data) 
			});
		}else{
			title='خطأ';
			body='يرجى ادخال رقم بطاقة صحيح!';
			validationerror_alert(title,body);
			return false;
		}
		
	});
	/***open images popup***/
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