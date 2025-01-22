// JavaScript Document

/****initialize main screen****/
/***in intialization we load the JSON and draw the screen for the main services***/

var hh;

function isExpired()
{
	//this function check if user license is expired  or not  it checks the setting of user which is saved
	//in local storage as json string
    var expireFlag=false;
	var temp=localStorage.getItem('settings');
	   
	if (typeof temp != 'undefined' && temp != null) //if the settings key exist (it is created after first login and dowloand of original data)
	{ 
		// get user settings
	    console.log("setting:"+temp);
		var jsonObject = jQuery.parseJSON(temp);
	    
		//parse setting into object
		var param= jsonObject["exp_date"];
		var zz=param.split(" ");
        var ddd=zz[0].split("-");
		 
		//parse setting into object
		var exp_date=ddd[2]+"-"+ddd[1]+"-"+ddd[0];
		console.log("expire:"+exp_date);
		var d = new Date().getTime() ;
		var dd=new Date(exp_date).getTime();
		if ((dd-d)>0)  expireFlag=false;
		else {
			  expireFlag=true;
		    }
	}else{ // if the settings key is not set in local storage consider it expired to redirect to login 
		 expireFlag=true;
	}
		
		return expireFlag;
}

function ChecSetting() {
	//1- check if user is loggedin befor or this is first login 
	//2- check if data is downloaded for fist time or not
	//3- if downloaded for first time , check for updates download all the updates,
	var loggedInBefore = localStorage.getItem("isLoggedin");
	
	if( typeof loggedInBefore != 'undefined' && loggedInBefore != null){ //if the user logged in before
		
		//check if license is expired 
		if(!isExpired()){ //if not expired and settings key exist in localstorage 
		
			//go to download screen to check download 1st time , and updates
			$(".wrapperpage").fadeOut(3000, function() {
				window.location.replace("download.html");
			});
		}else{//if license is expired or settings key was not created
		
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
		
	}else{//if user not loggedin before go to login
		
		//go to download screen to check download 1st time , and updates
		$(".wrapperpage").fadeOut(2000, function() {
			window.location.replace("login.html");
		});
	}
    clearTimeout(hh);
}

$(document).ready(function(e) {


    $(".wrapperpage").fadeIn(2000, function() {
        hh = setTimeout("ChecSetting()", 2000);
    });

    $(".wrapperpage").click(function(e) {
        $(".wrapperpage").fadeOut(3000, function() {
            /*window.location.replace("main.html");*/
        });
    });

}); /*****end doc ready***/