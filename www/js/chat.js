// JavaScript Document
var pwords=[];
var pwordsalt=[];
var correctFlag=false;
var pwordsindex=0;
var done=[];
var handler;
/*********************************JSON DATA Class and Functions************************************************************************************/
//////////////////////////////////////Application Main Class///////////////////////
function deafserviceapp_controller() {
  /// object variables
  this.datafolderpath="";////data folder path
  this.dataJSONpath="";///full path of the json and file name
  this.DataJSON={};
  this.number_of_services
  this.number_of_branches
  var self=this;
  ///methods
  ////construct the class and load the data 
  this.construct_remote=function(datafolderpath,jsonpath){
	  ////update the datafolder,datajsonpath,and load the json into datajson

	  self.datafolderpath=datafolderpath;
	  self.dataJSONpath=jsonpath;
	  
	  ////load datajson file into DataJSON property
	  $.getJSON(jsonpath, function(obj) {
			self.DataJSON=obj;
			console.log(self.DataJSON);
			self.number_of_branches=obj.data.allservices.length
			self.number_of_services=obj.data.foundation.branches.length
			self.getDataJson()
		});
  }
  this.construct=function(datafolderpath,jsonpath){
	  ////update the datafolder,datajsonpath,and load the json into datajson

	  self.datafolderpath=datafolderpath;
	  self.dataJSONpath=jsonpath;
	 // var obj=jsondataobject
	    var obj;
	  $.getJSON(jsonpath, function(objec) {	
	  console.log(objec);
	  obj=objec;
	  });
	  ////load datajson file into DataJSON property

			self.DataJSON=obj;
			console.log(self.DataJSON);
			self.number_of_branches=obj.data.allservices.length
			self.number_of_services=obj.data.foundation.branches.length
			self.getDataJson()

  }
  this.getDataJson = function(){
	  return self.DataJSON;
  }
  this.getpagesignvideo=function(pagefilename,pagesArr){
	 // var pagesArr= self.DataJSON.data.pages_info
	  console.log(pagesArr)
	   var result = $.grep(pagesArr, function(e){ return e.pagefile == pagefilename; });
		  return result;
  };
  
  this.get_service_obj_byid=function(serviceid,allservicesArr){
	 // var pagesArr= self.DataJSON.data.pages_info
	  //console.log(pagesArr)
	   var result = $.grep(allservicesArr, function(e){ return e.id == serviceid; });
		  return result;
  };
  this.get_procedures_of_service=function(serviceid,subserviceid,allservicesArr){
	 // var pagesArr= self.DataJSON.data.pages_info
	  //console.log(pagesArr)
	  var procedures
	  if(subserviceid==0){///it is a main service
		  //$.grep(allservicesArr, function(e){ return e.id == 1; }).success(function(e){alert(e)})
		var mainservice_obj = $.grep(allservicesArr, function(e){ return e.id == serviceid; });
		 procedures = mainservice_obj[0].procedures

	  }else{
		   var mainservice_obj = $.grep(allservicesArr, function(e){ return e.id == serviceid; });
		   console.log(mainservice_obj)
		   var allsubservicesArr=mainservice_obj[0].sub_services
		   console.log(allsubservicesArr)
		   var subservice_obj = $.grep(allsubservicesArr, function(e){ return e.id == subserviceid; });
		   console.log(subservice_obj)
		   procedures=subservice_obj[0].procedures
	  }
		  return procedures;
  };
  /////get the faqs of serv or subserv
  this.get_faqs_of_service=function(serviceid,subserviceid,allservicesArr){
	 // var pagesArr= self.DataJSON.data.pages_info
	  //console.log(pagesArr)
	  var faqs
	  if(subserviceid==0){///it is a main service
		  //$.grep(allservicesArr, function(e){ return e.id == 1; }).success(function(e){alert(e)})
		var mainservice_obj = $.grep(allservicesArr, function(e){ return e.id == serviceid; });
		 faqs = mainservice_obj[0].faqs

	  }else{
		   var mainservice_obj = $.grep(allservicesArr, function(e){ return e.id == serviceid; });
		   //console.log(mainservice_obj)
		   var allsubservicesArr=mainservice_obj[0].sub_services
		   //console.log(allsubservicesArr)
		   var subservice_obj = $.grep(allsubservicesArr, function(e){ return e.id == subserviceid; });
		   //console.log(subservice_obj)
		   faqs=subservice_obj[0].faqs
	  }
		  return faqs;
  };
  /////get the docs of serv or subserv
  this.get_docs_of_service=function(serviceid,subserviceid,allservicesArr){
	 // var pagesArr= self.DataJSON.data.pages_info
	  //console.log(pagesArr)
	  var docs
	  if(subserviceid==0){///it is a main service
		  //$.grep(allservicesArr, function(e){ return e.id == 1; }).success(function(e){alert(e)})
		var mainservice_obj = $.grep(allservicesArr, function(e){ return e.id == serviceid; });
		 docs = mainservice_obj[0].docs

	  }else{
		   var mainservice_obj = $.grep(allservicesArr, function(e){ return e.id == serviceid; });
		   //console.log(mainservice_obj)
		   var allsubservicesArr=mainservice_obj[0].sub_services
		   //console.log(allsubservicesArr)
		   var subservice_obj = $.grep(allsubservicesArr, function(e){ return e.id == subserviceid; });
		   //console.log(subservice_obj)
		   docs=subservice_obj[0].docs
	  }
		  return docs;
  };
   
};////end class declaration
/***in intialization we load the JSON and draw the screen for the main services***/
var DataClass=new deafserviceapp_controller();
$.ajaxSetup({
    async: false
});
DataClass.construct(DataFolderPath,jsonpath)
$(document).ready(function (timetostartapp) {
	setTimeout(function(){ startloadingtheapp(); }, timetostartapp);
	//console.log(DataClass.DataJSON.data.allservices[0])
});
////loading the application after setted timeout
function startloadingtheapp(){
		/***load the foundation/company info from dbd.js***/
		var foundation_obj=DataClass.DataJSON.data.foundation
		/////initialize vars and localstorage
		
		localStorage.setItem("pwordsindex","0");
		localStorage.setItem("foundation_name",foundation_obj.name);
		localStorage.setItem("foundation",foundation_obj.foundation_id);
		localStorage.setItem("branch",0);/***0 means all branches***/
		localStorage.setItem("talkid","");

};///end start loading page function

$(document).ready(function(e) {
	/***initialize some staff***/
	initialize_chat_session()
	$("#clientname").val("");
	$("#clientid").val("");

	/***when user submit the form***/
	/////start session user clicks on start chat session
	$(document).on('click', '#btnstart',function(e){
		NewTalk();
		//initialize_chat_session()
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
	
	/////employee/clerk click on SEND msg btn
	$(document).on('click', '#btnclerksend',function(e){
		var talkid=localStorage.getItem("talkid");
		//sendClerkMessage();
		if($("#clerktxt").val()!="") {
			correctFlag=true; 
			correct($("#clerktxt").val());
				
				//sendClerkMessage();
		}
	});
	
	/////citizen click on SEND msg btn
	$(document).on('click', '#btnclientsend',function(e){
	var talkid=localStorage.getItem("talkid");
	///check if the client text is not empty then start correcting and tashkeel the sentence
	if($("#clienttxt").val()!="") {
		//correctFlag=true; 
		//correct($("#clienttxt").val());
			sendClientMessage();
			
	}
	// sendClientMessage();
		   
	});
	

	
	//////user clicks on END chat session btn
	$(document).on('click', '#btnend',function(e){
        //var temp='<table class="chattable text-center"><tr><td><p class="triangle-border top">الموظف</p></td><td><p class="triangle-border">العميل</p></td></tr></table>';
		$(".chatsboxDiv").hide();
		$(".beforstartchat_btns_div").show()
		$("#startsessionInputs").show(500)
		//$("#btnstart").prop('disabled', false);
        //$("#clientid").prop('disabled', false);
       // $("#clientname").prop('disabled', false);
		//$("#btnclientsend").prop("disabled",false);
        //$("#btnclerksend").prop("disabled",false);
		//$("#chatdiv").html(temp);
		$(".endchatBtn").hide();
		$("#clientname").val("");
		$("#clientid").val("");
		$("#bottomdiv").hide();
		$(".toolsbarrow").show();
		$("#chat_baloons_div").children().remove();
    });
	
	$(document).on('click', '#btnclerkcorrect',function(e){
        if($("#clerktxt").val()!="")  correct($("#clerktxt").val());
    });
	
	$(document).on('click', '#btnclientfav',function(e){
		correctFlag=true;
        getFav();
    });
	
	$(document).on('click', '#btnclerkfav',function(e){
		correctFlag=false;
        getFav();
    });
	
	$(document).on('click', '#btnfavdialogclose',function(e){
        if(!correctFlag)  $("#clerktxt").val($('#sel2').find(":selected").text());
		else  $("#clienttxt").val($('#sel2').find(":selected").text());
    });
	
	$(document).on('click', '#btnpics',function(e){
       // window.location.replace("pics.html");
	   //initialize_swipers();
	   $("#images_popup").modal(true);
	   
	   
    });
	
	////when input is focused makeit full width for either 
	$("#clienttxt").focusin(function(){
		$(".citizen_chatinputDiv").removeClass("col-6").addClass("col-12");	
		$(".clerk_chatinputDiv").hide()
		$("#clerktxt").val("")
	});
	
	$("#clienttxt").focusout(function(){
		$(".citizen_chatinputDiv").removeClass("col-12").addClass("col-6");
		$(".clerk_chatinputDiv").show()
	});
	//////////////////////////
	$("#clerktxt").focusin(function(){
		$(".clerk_chatinputDiv").removeClass("col-6").addClass("col-12");
		$(".citizen_chatinputDiv").hide()
		$("#clienttxt").val("")
	});

	$("#clerktxt").focusout(function(){
		$(".clerk_chatinputDiv").removeClass("col-12").addClass("col-6");
		$(".citizen_chatinputDiv").show()
	});
	
	/*
	$("#chatsblockDiv, .bubble,.navbar ,.footerContainer").click(function(){
		$(".clerk_chatinputDiv").removeClass("col-xs-12 col-md-12 col-lg-12").addClass("col-xs-6 col-md-6 col-lg-6");
		$(".citizen_chatinputDiv").removeClass("col-xs-12 col-md-12 col-lg-12").addClass("col-xs-6 col-md-6 col-lg-6");
		$(".citizen_chatinputDiv").show()
		$(".clerk_chatinputDiv").show()
	});
	*/
	$("#video_popup").on("hidden.bs.modal", function () {
		localStorage.setItem("vapath","");
		localStorage.setItem("txt","");
		localStorage.setItem("vindex","0");
		$('#video_player_pop').trigger('pause');
	});
	$("#images_popup").on("shown.bs.modal", function () {
		//initialize_swipers();
	});
	/***************ADJUSTING SIGN ICON IN PICS 3-4-2019****/
	$(".signvideo_btn img").attr("style","min-width:35px")
$(".slide_txt").attr("style","font-size:1rem")
$(".signvideo_btn").attr("style","min-width:50px;margin-right:-20px;")
/***********************************************/
	
});/*****end doc ready***/
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

/***********Chat functions******************************/
/****initialize chat when at the begining and wen click on end chat***/
function initialize_chat_session(){
	/////show enter name and ID box

	$("#chats_container").hide()
	$("#startsessionInputs").show()
	$("#spinloader").hide()
	/***clear the chats***/
	$("#chat_baloons_div").children().remove();
	/****clear the chat inputs for clerk and client***/
	$("#clerktxt").val("")
	$("#clienttxt").val("")
	localStorage.setItem("words","");
	localStorage.setItem("alts","");
	localStorage.setItem("windex","");

}
/***function to check if the input is non Arabic Language-****/
function checkinputlanguage(inputboxselector){
		var english = /^[a-z][a-z\d]*$/i;
		var textval = inputboxselector.val();
		var textlength=textval.length;
		var curEntkey = textval.substring(textlength-1,textlength)
		if(english.test(curEntkey)){
			//alert("عفوا... يرجى تغير لغة الاكتابة الى العربية ،، اللغة الانجليزية غير مدعمة حاليا!");
			title="خطأ"
			body="عفوا... يرجى تغير لغة الاكتابة الى العربية ،، اللغة الانجليزية غير مدعمة حاليا!";
			validationerror_alert(title,body);
			inputboxselector.val(inputboxselector.val().replace(curEntkey,""))
		return false;
		}
}
//////////show loader spinner correctly according to hight
function showloader(){
	window.scrollTo(1,parseInt($("#chatsblockDiv").css("height")))
	window.scrollTo(0,0)
	if(parseInt($("#chatsblockDiv").css("height"))> parseInt(window.innerHeight)){
		//console.log()
		$(".loaderoverlay").css("height",$("#chatsblockDiv").css("height"));
		//$(".loaderoverlay").css("height",parseInt(window.innerHeight));
		
		$(".loader").css("top",(parseInt($(".loaderoverlay").css("height"))/1)-(parseInt(window.innerHeight)/2)-parseInt($(".loader").css("height")));
		$("#spinloader").show()
	}else{
		$("#spinloader").show()
	}
}
/*****funciton to handle transactions during chat and saving it online, starting new chat session***/
function NewTalk(){
	if($("#clientname").val()=="") {
		title="خطأ"
		body="من فضلك ادخل اسمك بالكامل";
		validationerror_alert(title,body);
		
		return;
	}
	if($("#umob").val()=="") {
		title="خطأ"
		body="من فضلك أدخل رقم الموبايل/ المحمول المكون من 11 رقم";
		validationerror_alert(title,body);
		return;
	}
	/*
	if($("#clientid").val()=="" ) {
		title="خطأ"
		body="من فضلك أدخل رقم البطاقة المكون من 14 رقم";
		validationerror_alert(title,body);
		return;
	}
	*/
	var fnd=localStorage.getItem("foundation");
    var brnch= localStorage.getItem("branch");
	showloader()
	$.ajax({
	url:  serverservicespath+'deafservice2.php',
	data: {order:2, val1:fnd, val2:brnch, val3:$("#clientid").val(), val4:$("#clientname").val(), val5:$("#umob").val() },
	dataType: 'jsonp',
	jsonp: 'callback',
	jsonpCallback: 'TalkCallBack',
	success: function(){
		$("#chats_container").show()
		$("#startsessionInputs").hide()
		$("#spinloader").hide()
	},
	timeout: 10000,
	error: function(jqXHR, textStatus, errorThrown) {
					if(textStatus==="timeout") {
						title="خطأ"
						body="لايوجد اتصال بالانترنت , او توجد مشكلة في الاتصال بالخادم";
						validationerror_alert(title,body);
						$("#spinloader").hide()
					} 
			}      				
	}).fail(function() { 
		title="خطأ"
		body="لايوجد اتصال بالانترنت , او توجد مشكلة في الاتصال بالخادم";
		validationerror_alert(title,body);
		$("#spinloader").hide()
	});;
	
}
//////////////////////////////////////////////////////////////////////////////////
/***when chat session is started after submitting the form***/
function TalkCallBack(data){
	localStorage.setItem("talkid",data.talkid);  
	console.log("talkid=  "+data.talkid)
	/****hide chat start form and show chats box***/
	$("#chats_container").show()
	$("#startsessionInputs").hide()
	$("#spinloader").hide()
	/*
	$("#btnstart").prop('disabled', true);
	$("#clientid").prop('disabled', true);
	$("#clientname").prop('disabled', true);
	$(".chatsboxDiv").show(500)
	*/
}
/////////////////////////////////////////////////////////////								 
function ChatCallBack(data){
	updateTable(data.txt);
}

/****************************************chat send receive sign correct functions***/
////////////////////////////////////////////////////////////////////
// function CorrectBack(data){
	// j=0;
	// var words="";
	// var alts="";
	// var windex="0";
	// console.log(data)
	// for(var i=0;i<data.words.length;i++)
	// {
		// if(data.words[i]["status"]=="Found")
		// {
			// if(words==""){
				// words=data.words[j]["word"];
						   
			    // alts=data.words[j]["alternates"].toString();
				// /*alts_arr=[]
				// for(ii=0;ii<data.words[j]["alternates"].length;ii++){
					// if(data.words[j]["word"]!=data.words[j]["alternates"][ii]){
						// alts_arr.push(data.words[j]["alternates"][ii])
					// }
				// }
				// alts=alts_arr.toString();*/
				// console.log(alts)
			// }else {
				// /*alts_arr=[]
				// for(ii=0;ii<data.words[j]["alternates"].length;ii++){
					// if(data.words[j]["word"]!=data.words[j]["alternates"][ii]){
						// alts_arr.push(data.words[j]["alternates"][ii])
					// }
				// }*/
				// //alts=alts_arr.toString();
			       // words=words+"~"+data.words[j]["word"];
			       // alts=alts+"~"+data.words[j]["alternates"].toString();
				   // //alts=alts+"~"+alts_arr.toString();
				   // //console.log(alts)
			     // }
			// j++;
			
		// }
	// }
	// if(words!="") {
		// localStorage.setItem("words",words);
		// localStorage.setItem("alts",alts);
		// localStorage.setItem("windex",windex);
		// //handler=setTimeout("showAlts()",2000);
			
	
		// ///show coolmenu with alternatives of the entered text to be corrected
		// showAlts();
		// }else if(correctFlag){
			
			// if($("#clienttxt").val()!=""){
				// sendClientMessage();
			// }else if($("#clerktxt").val()!=""){
				// sendClerkMessage()
			// }
		// } 
	// //alert(data.words[0]["word"]);
	// //alert(data.words[0]["alternates"][0]);
// }

////////////////////////////////////////////////////////////////////
function CorrectBack(data){
	var j=0;
	var words="";
	var alts="";
	var windex="0";

	for(var i=0;i<data.words.length;i++)
	{
		//if(data.words[i]["status"]=="Found")

		//{
			if(words==""){ 
			               words=data.words[j]["word"];
			               var altsss="";
						   


						   if(data.words[j]["alternates"].length>0) 








							   altsss=data.words[j]["alternates"].toString();





						   else 
							   altsss=data.words[j]["word"];
			               alts=altsss;
		                 }
						 
			else { 
			
			       words=words+"~"+data.words[j]["word"];
				   var altsss="";
						   
				   if(data.words[j]["alternates"].length>0) 


				   altsss=data.words[j]["alternates"].toString();
				   else 
				   altsss=data.words[j]["word"];
			       alts=alts+"~"+altsss;
			     }
			j++;
			

		//}
	}
	if(words!="") {
		localStorage.setItem("words",words);
		localStorage.setItem("alts",alts);
		localStorage.setItem("windex",windex);
		//handler=setTimeout("showAlts()",2000);
			
	
		///show coolmenu with alternatives of the entered text to be corrected
		showAlts();
		}else if(correctFlag){
			
			if($("#clienttxt").val()!=""){
				sendClientMessage();
			}else if($("#clerktxt").val()!=""){
				sendClerkMessage()
			}
		} 
	//alert(data.words[0]["word"]);
	//alert(data.words[0]["alternates"][0]);
}
////////////////////////////////////////////////////////////////////
function correct(str)
{
	localStorage.setItem("words","");
	localStorage.setItem("alts","");
	localStorage.setItem("windex","");

	///call the correction webservice
	showloader()
	$.ajax({
	url:  "http://169.50.5.146/deaf_service_apps/services/"+"phrase2.php",
	data: {val1:str},
	dataType: 'jsonp',
	jsonp: 'callback',
	jsonpCallback: 'CorrectBack',
	success: function(){
						//alert("success");
						$("#spinloader").hide();
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
	}).fail(function() { $("#spinloader").hide(); 
		title="خطأ"
		body="لايوجد اتصال بالانترنت , او توجد مشكلة في الاتصال بالخادم";
		validationerror_alert(title,body);
	});;


}
/////////////////////////////////////////////////////////////////
function getFav(){
	var fnd=localStorage.getItem("foundation");
    var brnch= localStorage.getItem("branch");
	showloader()
	$.ajax({
	url:  serverservicespath+'deafservice2.php',
	data: {order:5, val1:fnd, val2:brnch},
	dataType: 'jsonp',
	jsonp: 'callback',
	jsonpCallback: 'FillFav',
	success:function(){
						//alert("success");
						$("#spinloader").hide();
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
	}).fail(function() { $("#spinloader").hide(); 
		title="خطأ"
		body="لايوجد اتصال بالانترنت , او توجد مشكلة في الاتصال بالخادم";
		validationerror_alert(title,body);
	});;

}
//////////////////////////////////////////////////////////////
function AddToFav(str){
	var fnd=localStorage.getItem("foundation");
    var brnch= localStorage.getItem("branch");
	showloader()
	$.ajax({
	url:  serverservicespath+'deafservice2.php',
	data: {order:4, val1:fnd, val2:brnch, val3:str },
	dataType: 'jsonp',
	jsonp: 'callback',
	jsonpCallback: 'AddedBack',
	success:function(){
						//alert("success");
						$("#spinloader").hide();
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
	}).fail(function() { $("#spinloader").hide(); 
		title="خطأ"
		body="لايوجد اتصال بالانترنت , او توجد مشكلة في الاتصال بالخادم";
		validationerror_alert(title,body);
	});;

}
/////////////////////////////////////////////////////////
function FillFav(data)
{
	if(data.txt!="ok")
	{
		var temp= data.txt;
		var sss="";
		var ss=[];
		if(temp.indexOf("~")>=0) ss=temp.split("~");
		else ss[0]=temp;
		
		for(var i=0; i<ss.length; i++ )
		{
			if(sss=="") sss="<option value='"+ss[i]+"'>"+ss[i]+"</option>";
			else sss=sss+"<option value='"+ss[i]+"'>"+ss[i]+"</option>";
		}
		$("#sel2").html(sss);
		$("#favModal").modal(true);
		
	}
}
//////////////////////////////////////////////////
function AddedBack(data)
{
	if(data.txt=="ok") {
		title="تنبيه"
		body="تم اضافة الجملة لقائمة المفضلة بنجاح";
		validationerror_alert(title,body);
	}
		
}
///////////////////////////////////////////////////////////
function playvoice(str)
{
responsiveVoice.setDefaultVoice("Arabic Female");
responsiveVoice.speak(str);

}
/////////////////////////////////////////////////
function PlaySound(data)
{
	var url=data.url;
	var audio = new Audio(url);
	audio.play();
}

/////////////////////////////////////////////////////////////////////
function showAlts(){
	clearTimeout(handler);
	var windex=-1;
	var words=[];
	var alts=[];
	if(localStorage.getItem("windex")!="") 
	windex=parseInt(localStorage.getItem("windex"),10);
	if(windex>=0)
	{
		var wordstr=localStorage.getItem("words");
		var altstr=localStorage.getItem("alts");

		if(wordstr.indexOf("~")>=0) {
			words=wordstr.split("~");
			alts=altstr.split("~");
		}
		else{words[0]=wordstr; alts[0]=altstr;}
		
	}
	if(windex>=0 && windex<words.length)
	{
	
		var innerstr = '<a href="#">'+ 'ا لمقصود بكلمة  '+words[windex]+' : ' + '</a>';
		var sss=alts[windex].split(",");
		for(var i=0; i<sss.length;i++)
		{ 
		if(sss[i]!='')	innerstr = innerstr + '<a href="#" onclick="ReplaceWord(\''+ words[windex] + '\',\'' + sss[i] + '\')">' + sss[i] + '</a>';
		else innerstr = innerstr + '<a href="#" onclick="ReplaceWord(\''+ words[windex] + '\',\'' + words[windex] + '\')">' + words[windex] + '</a>';
		}
		 
		
		$("#coolmenu").html(innerstr);
		var offset;	  
		if(!correctFlag) 
			offset = $('#clerktxt').offset();
		else
			offset = $('#clienttxt').offset();
		var height = $('#coolmenu').height();

		var top = offset.top - (height+10) + "px";
		var left = offset.left-20 + "px";
		//$('#coolmenu').css("top",top);
		//$('#coolmenu').css( 'left',left);
		if(parseInt($("#chatsblockDiv").css("height"))>parseInt(window.innerHeight)){
			$("#coolmenu").css("top",(parseInt($("#chatsblockDiv").css("height"))/1)-(parseInt(window.innerHeight)/1)+10);
			window.scrollTo(1,parseInt($("#chatsblockDiv").css("height")))
		}

		$("#coolmenu").show();
	}else if(correctFlag){
		if($("#clienttxt").val()!=""){
				sendClientMessage();
			}else if($("#clerktxt").val()!=""){
				sendClerkMessage()
			}
	} //sendClientMessage();
	
}
////////////////////////////////////////////////////////////////////
/*function ReplaceWord(olword,newword){
	console.log(olword)
	console.log(newword)
	var ss=""
	$("#coolmenu").hide();
	console.log(correctFlag)
	
	if($("#clienttxt").val()!=""){
		ss=$("#clienttxt").val();
	}else if($("#clerktxt").val()!=""){
		ss=$("#clerktxt").val();
	}
		ss=ss.replace(olword,newword);
		
		
	if(correctFlag){
		if($("#clienttxt").val()!=""){
			$("#clienttxt").val(ss);
		}else if($("#clerktxt").val()!=""){
			$("#clerktxt").val(ss);
		}
	}
 
	var windex=localStorage.getItem("windex");
	if(windex!=""){
		var cc=parseInt(windex,10);
		cc=cc+1;
		localStorage.setItem("windex",cc);
	}
	handler=setTimeout("showAlts()",1000);
	
}*/
////////////////////////////////////////////////////////////////////
function ReplaceWord(olword,newword){
	console.log(olword)
	console.log(newword)
	var ss=""
	$("#coolmenu").hide();
	console.log(correctFlag)
	
	if($("#clienttxt").val()!=""){
		ss=$("#clienttxt").val();
	}else if($("#clerktxt").val()!=""){
		ss=$("#clerktxt").val();
	}
		ss=ss.replace(olword,newword);
		
	//if(correctFlag){
		if($("#clienttxt").val()!=""){
			$("#clienttxt").val(ss);
		}else if($("#clerktxt").val()!=""){
			$("#clerktxt").val(ss);
		//}
	}
 
	var windex=localStorage.getItem("windex");
	if(windex!=""){
		var cc=parseInt(windex,10);
		cc=cc+1;
		localStorage.setItem("windex",cc);
	}
	handler=setTimeout("showAlts()",1000);
	
}
////////////////////////////////////////////////////////////////////
function sendClientMessage(){
	
	var talkid=localStorage.getItem("talkid");
	var cname=$("#clientname").val();
	var clerk="";
	
	if($("#clienttxt").val()=="") {
		title="خطأ"
		body="لايمكن ارسال رسالة فارغة";
		validationerror_alert(title,body);
		return;
	}
	//$("#btnclientsend").prop("disabled",true);
	//$("#btnclerksend").prop("disabled",true);

	showloader()
	$.ajax({
	url:  serverservicespath+'deafservice2.php',
	data: {order:3, val1:cname, val2:talkid, val3:$("#clienttxt").val(), val4:clerk  },
	dataType: 'jsonp',
	jsonp: 'callback',
	jsonpCallback: 'ChatCallBack_client',
	success:function(){
						//alert("success");
						$("#spinloader").hide();
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
	}).fail(function() { $("#spinloader").hide(); 
		title="خطأ"
		body="لايوجد اتصال بالانترنت , او توجد مشكلة في الاتصال بالخادم";
		validationerror_alert(title,body);
	});;

}

/////////////////////////////////////////
function ChatCallBack_client(data){
	AddChatBaloon(data.txt,1);
}

 /////////////////////////////////////////////////////////////////////////////
function sendClerkMessage(){
	 var talkid=localStorage.getItem("talkid");
	 var cname=$("#clientname").val();
	 var client="";
	if($("#clerktxt").val()=="") {
		title="خطأ"
		body="عفوا عزيزي مسؤول خدمة العملاء لايمكن ارسال رسالة فارغة";
		validationerror_alert(title,body);
		return;
		}
	//$("#btnclientsend").prop("disabled",true);
	//$("#btnclerksend").prop("disabled",true);


	////jsonpCallback: 'ChatCallBack',
	showloader()
	$.ajax({
	url:  serverservicespath+'deafservice2.php',
	data: {order:3, val1:cname, val2:talkid, val3:client, val4:$("#clerktxt").val()},
	dataType: 'jsonp',
	jsonp: 'callback',
	jsonpCallback: 'ChatCallBack_clerk',
	success:function(){
						//alert("success");
						$("#spinloader").hide();
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
	}).fail(function() { $("#spinloader").hide(); 
		title="خطأ"
		body="لايوجد اتصال بالانترنت , او توجد مشكلة في الاتصال بالخادم";
		validationerror_alert(title,body);
	});;

}
///////////////////////////////////////////////
function ChatCallBack_clerk(data){
	AddChatBaloon(data.txt,2);
}
////////////////////////////////////////////////////////
function AddChatBaloon(txt,client1_clerk2){
	var temp='';
	var ss=[];
	if(txt.indexOf(",")>0){
		ss=txt.split(","); 
	}else{
		ss[0]=txt;
	}
	var lastmsg=ss[ss.length-1];
	var lastmsg_parts_arr=lastmsg.split("~");
	
	///if first part in the last msg is "---" its clerk msg
	if(lastmsg_parts_arr[0]=="---"){
		
		/*txt='<div class="col-xs-12 col-md-12 col-lg-12 chatrow clerkchatrow"><div class="bubble2" style="background-color: rgb(255, 255, 255); border-color: rgb(127, 127, 127);"><div class="chatclerkpic"><img src="img/clerkpic.png" class="img-responsive"></div><div class="chattime2">'+properDate(lastmsg_parts_arr[2])+'</div><div class="chattext2">'+lastmsg_parts_arr[1]+'</div><div class="chat_buttons2"><button class="btn-warning glyphicon glyphicon-heart-empty" onclick="AddToFav(\''+lastmsg_parts_arr[1]+'\')"></button><button class="btn-info glyphicon glyphicon-thumbs-up" onclick="PlaySign('+'\''+lastmsg_parts_arr[1]+'\''+')"></button></div><div class="pointer2" style=""></div></div></div>';
		**/
		txt='<div class="col-12 chatrow clerkchatrow" ><div class="bubble2" style="background-color: rgb(255, 255, 255); border-color: rgb(127, 127, 127);"><div class="chattime2">'+properDate(lastmsg_parts_arr[2])+'</div><div class="chatclerkpic"><img src="imgs/we_logo_chat.png" class="img-responsive"/></div><div class="chattext2">'+lastmsg_parts_arr[1]+'</div><div class="chat_buttons2"><button class="fa fa-heart" onclick="AddToFav(\''+lastmsg_parts_arr[1]+'\')"></button><button class="fa fa-sign-language" onclick="PlaySign('+'\''+lastmsg_parts_arr[1]+'\''+')"></button></div><div class="pointer2" style=""></div></div></div>'
		
		temp=temp+txt;
		
	}else if(lastmsg_parts_arr[1]=="---"){///if second part in the last msg is "---" its deaf client msg
	
		/*txt='<div class="col-xs-12 col-md-12 col-lg-12 chatrow deafchatrow"><div class="bubble" style="background-color: rgb(255, 255, 255); border-color: rgb(127, 127, 127);"><div class="chatdeafpic"><img src="img/deafpic.png" class="img-responsive"></div><div class="chattime">'+properDate(lastmsg_parts_arr[2])+'</div><div class="chattext">'+lastmsg_parts_arr[0]+'</div><div class="chat_buttons"><button class="btn-warning glyphicon glyphicon-heart-empty" onclick="AddToFav('+'\''+lastmsg_parts_arr[0]+'\''+')"></button><button class="btn-info glyphicon glyphicon-thumbs-up" onclick="PlaySign('+'\''+lastmsg_parts_arr[0]+'\''+')"></button><button class="btn-danger glyphicon glyphicon-volume-up" onclick="playvoice('+'\''+lastmsg_parts_arr[0]+'\''+')"></button></div><div class="pointer" style=""></div></div></div>';
		*/
		txt='<div class="col-12 chatrow deafchatrow" ><div class="bubble" style="background-color: rgb(255, 255, 255); border-color: rgb(127, 127, 127);"><div class="chatdeafpic"><img src="imgs/deafpic.png" class="img-responsive"/></div><div class="chattime">'+properDate(lastmsg_parts_arr[2])+'</div><div class="chattext">'+lastmsg_parts_arr[0]+'</div><div class="chat_buttons"><button class="fa fa-heart" onclick="AddToFav('+'\''+lastmsg_parts_arr[0]+'\''+')"></button><button class="fa fa-sign-language" onclick="PlaySign('+'\''+lastmsg_parts_arr[0]+'\''+')"></button><button class="fa fa-volume-up" onclick="playvoice('+'\''+lastmsg_parts_arr[0]+'\''+')"></button></div><div class="pointer" style=""></div></div></div>'
		temp=temp + txt;
	}
	
	$("#chat_baloons_div").append(temp);
	//$("#btnclientsend").prop("disabled",false);
	//$("#btnclerksend").prop("disabled",false);
	window.scrollTo(1,parseInt($("#chatsblockDiv").css("height")))
 }
 
 
//////////////////////////////////////////////////////////////////////////
function PlaySign(str){
	var sss=str;
	for (var i=0;i<200;i++) sss=sss.replace("  "," ");
	for (var i=0;i<200;i++) sss=sss.replace(" ",",");
	showloader()
	$.ajax({
	url:  signdic_services_server_path+'videospell.php',
	data: { val1:sss},
	dataType: 'jsonp',
	jsonp: 'callback',
	jsonpCallback: 'StoreVideoPaths',
	success:function(){
						//alert("success");
						$("#spinloader").hide();
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
	}).fail(function() { $("#spinloader").hide(); 
		title="خطأ"
		body="لايوجد اتصال بالانترنت , او توجد مشكلة في الاتصال بالخادم";
		validationerror_alert(title,body);
	});;
}
 ////////////////////////////////////////////////////////////////////////////
function StoreVideoPaths(data){
	var temp="";
	var tex="";
	for(var i=0; i<data.videos.length;i++){
	  
		if(temp==""){
			temp=data.videos[i]["vpath"];
			tex=  data.videos[i]["txt"];
		}else{
			temp=temp+"~"+data.videos[i]["vpath"];
	        tex= tex + "~" + data.videos[i]["txt"]; 
	    }
	}
	localStorage.setItem("vapath",temp);
	localStorage.setItem("txt",tex);
	localStorage.setItem("vindex","0");
	MoreVideos();
 }
 ///////////////////////////////////////////////////////////////////////
function  MoreVideos(){
	var temp=localStorage.getItem("vapath");
	var tex=localStorage.getItem("txt");
	var vindex=localStorage.getItem("vindex");
	var videos=[];
	var textees=[];
	if(temp.indexOf("~")){
		videos=temp.split("~");textees=tex.split("~");
	}else{
		videos[0]=temp;
		textees[0]=tex;
	}
	var j= parseInt(vindex,10);

	if(j<videos.length){
		
		document.getElementById("video_player_pop").src=videos[j].replace(".3gp",".webm");
		$("#lab").html(textees[j]);
		localStorage.setItem("vindex",j+1);
		$('#video_popup').modal(true);
		document.getElementById("video_player_pop").play();
	}
}
///////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
function properDate(datestr){
	var sss=datestr.split(" ");
	var ss=sss[1].split(":");
	var zz=sss[0].split("-");
	var temp=ss[0]+":"+ ss[1]+ ":"+ss[2]+" "+ zz[2]+"-"+zz[1]+"-"+ zz[0];
	return temp;
}
//////////////////////////////////////////////////////////////