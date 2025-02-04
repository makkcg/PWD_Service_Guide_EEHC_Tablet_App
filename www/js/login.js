﻿// JavaScript Document

var onlineflag=true;
let ServerTabServicesPath= "https://accessibility.eehc.gov.eg/public/uploads/tablet/services/";
let ServerZipfilePath= "https://accessibility.eehc.gov.eg/public/uploads/tablet/zipfiles/";

//1- check if the user was loged in before, if not show the login screen , if yes go to download to either download for first time or update
//2- after login success store user and licesens settings in local, and redirect to download for first time download

// function to check if the user is expired
function isExpiredUser(param)
{
	
	var zz=param.split(" ");
    var ddd=zz[0].split("-");
		
	var expireFlag=false;
	    //parse setting into object
		var exp_date=ddd[2]+"-"+ddd[1]+"-"+ddd[0];
		 console.log("expire:"+exp_date);
		
		 //exp_date= param;
		var d = new Date().getTime() ;
		var dd=new Date(exp_date).getTime();
		if ((dd-d)>0)  expireFlag=false;
		else {
			  expireFlag=true;
			  $("#msgspan").html("عفوا !قم باعادة تسجيل الدخول مرة أخرى قد تكون صلاحية رخصة هذا التطبيق قد انتهت.. رجاء الاتصال بخدمة العملاء 01001809624");
			  console.log("expire: msg show");
		      $("#msgspan").show();
		
		    }
		return expireFlag;
}

/////////////////////////////used in 2025 login screen//////////////////////////////////////////////////////////////////
function onOffline()
{	
	console.log("onOffline() "+onlineflag)
	onlineflag=false;
	console.log("onOffline() "+onlineflag)
}
function onOnline(){
	console.log("onONline() "+onlineflag)
	onlineflag=true;
	console.log("onONline() "+onlineflag)
}
/////////////////////////////////////////////////////////////////////////////////////////////////
function onDeviceReady() {
	
	//check if device went offline 
	document.addEventListener("offline", onOffline, false);
	
	//check if device whent back online
	document.addEventListener("online", onOnline, false);
	
	//request system file with qouta
	console.log("Device Ready fired in login");
	
	//1- check if the user was loged in before, if not show the login screen , if yes go to download to either download for first time or update
	//2- after login success store user and licesens settings in local, and redirect to download for first time download
	var loggedInBefore = localStorage.getItem("isLoggedin");
	
	if( typeof loggedInBefore != 'undefined' && loggedInBefore != null){ //if the user logged in before
		if(!onlineflag){
			alert("لايوجد اتصال بالانترنت للتحقق من التحديثات، يمكنك الاستمرار!");
		}
		window.location.replace("download.html");
		
	}else{//if user is first time login or settings key was not set start loginning in the user after entering credencials 
		
		//show login form for user to login 
		console.log("Show login form and submit login info");
		//set the focus and ask user to enter username 
		$("#form-username").attr("placeholder", "ادخل اسم المستخدم").focus();
	}
}
///////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function(e) {
	
	document.addEventListener("deviceready", onDeviceReady, false);
	
	
	
////CLICK Login button /////////////////
	
	///clickd login button after user entered the user & Password ,foundation & branch are set automatically
	$("#btnsubmit").click(function(e) {
			
		if(navigator.connection.type!="none") {//double check the internet connection if is online 
			
			//get the user inputs from login form 
			
			var uname =$("#form-username").val();
			var pwd=$("#form-password").val();
			
			//Set the foundation & Branch 
			var fnd="4";//$('#form-entity').find(":selected").val();
			var branch="11";//$('#form-branch').find(":selected").val();
			
			//Check for the user and password from the server 
			$.get(ServerTabServicesPath+"deafservice.php", {order:4, val1: uname, val2: pwd,val3:fnd,val4:branch },
				function(data){
					var flag=false;
					console.log("data:"+data);
					try
					{
						console.log("try to parse");
						var obj = jQuery.parseJSON(data);
						//in the response find "found" in user key
						if(obj.user.indexOf("found")>=0){
							console.log("User found");
							//in the response find if active key is 1
							if(obj.active.indexOf("1")>=0 ){
								console.log("check if expired");
								///in the response check if the expiration date is not expired using the function 
								if(!isExpiredUser(obj.exp_date)){
									console.log("data:"+data);
									//set the local storage variables/keys with settings and logged for first time
									
									//localStorage.setItem('userinfo', data);
									localStorage.setItem('settings', data);
									localStorage.setItem('isLoggedin', 1);
									console.log("settings and is logged in setted in localstorage")
									var isFilesDownloadedFirstTime = localStorage.getItem('ZipDataFiles-Download');
									console.log("checking ZipDataFiles-Download : "+isFilesDownloadedFirstTime)
									//check if the files was downloaded for first time or not 
									if( typeof isFilesDownloadedFirstTime != 'undefined' && isFilesDownloadedFirstTime != null){ 
										
										//go to download to download first set of data
										window.location.replace("download.html");
										
									}else{//if local storage key for zipfiles exist and equals to first means go and download first data set 
										//if localstorage for zipfile names doesnt exist
										
										//set local storage to first not downloaded yet
										localStorage.setItem('ZipDataFiles-Download',"first");
										
										///go to download to check for updates to download them if exist 
										window.location.replace("download.html");	
									}

								}else{//if the user is expired 
									 $("#msgspan").html("عفوا !قم باعادة تسجيل الدخول مرة أخرى قد تكون صلاحية رخصة هذا التطبيق قد انتهت.. رجاء الاتصال بخدمة العملاء 01001809624");
									  console.log("expire: msg show");
									  $("#msgspan").show();
									  alert("عفوا !قم باعادة تسجيل الدخول مرة أخرى قد تكون صلاحية رخصة هذا التطبيق قد انتهت.. رجاء الاتصال بخدمة العملاء 01001809624");
									  //remove the settings 
									  localStorage.removeItem("settings");
									  //on exit redirect to login
									$(".wrapperpage").fadeOut(2000, function() {
										window.location.replace("login.html");
									});
								}
							}else  $("#msgspan").html("هذا المستخدم غير مفعل");
						}else  $("#msgspan").html("خطأ في بيانات المستخدم");
					}catch(e){
						flag=false;
						console.log("returned:" + data);
						$("#msgspan").html(data);
						$("#msgspan").show(); 
					}
		  
			});
		}else { //if internet is offline 
			$("#msgspan").html("جهازك غير متصل بالإنترنت "); 
			$("#msgspan").show();
			console.log("internet: msg offline");
		}//END   ----   if internet is offline 
    });////END ----------- CLICK Login button ////////

	/************************form js***********************************/

    $('.login-form input[type="text"], .login-form input[type="password"], .login-form textarea').on('focus', function() {
    	$(this).removeClass('input-error');
    });
    
//////////////////////////////////////side bar menu JS ///////////to be seperated in 
/*****Sidebar menu ***********/


    // when opening the sidebar
    $('#sidebarCollapse').on('click', function () {
        // open sidebar
        $('#sidebar').addClass('active');
        // fade in the overlay
        $('.overlay').fadeIn();
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });

   /*****end Sidebar menu ***********/

    // if dismiss or overlay was clicked
    $('#dismiss, .overlay').on('click', function () {
      // hide the sidebar
      $('#sidebar').removeClass('active');
      // fade out the overlay
      $('.overlay').fadeOut();
    });

	
});

/////Unused here Function to get the foundations from db
function GetFoundations()
{
	$.get(ServerTabServicesPath+"deafservice.php",{order:8},function(data) {
		$("#form-entity").html(data);
		var temp=$("#form-entity").find(":selected").val();
		if(temp!="") GetBranches(temp);
	});	
}
/////////////////////////////////////////////////////////
//////Unused here function to get branches from db 
function GetBranches(fnd)
{
	$.get(ServerTabServicesPath+"deafservice.php",{order:9,val1:fnd},function(data) {	
		$("#form-branch").html(data);
	});	
}
/////////////////////////////////////////////////////////