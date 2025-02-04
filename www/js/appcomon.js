/************application common functions **************/
/****global vars***/////global variable for the data folder path 
var signdic_services_server_path="https://signapiv4.kcgpwdapi.org/public/api/sep_ideom";
var PWDService_XSecurityKey="678c047ca29ea";
var apptype="androidTab";/****Android_online ,IOS_online, desktop, androidTab*/
var timetostartapp=500;
//var serverdomainNpath="https://weaccessibility.com/";
//var serverdomainNpath="https://10.19.136.100/";
//var serverdomainNpath="https://kcgserver.com/tablet/";
//var serverdomainNpath="http://eehcaccessibility.com/tablet/";//2024
var serverpublicappURL = "https://accessibility.eehc.gov.eg/public/";
var serverdomainNpath="https://accessibility.eehc.gov.eg/public/uploads/tablet/";// updated 1/2025
var serverservicespath=serverdomainNpath+"services/";
var servercomplainservicepath=serverdomainNpath+"mobileapp/data/complains/";
var serverrepliesservicepath=serverdomainNpath+"mobileapp/data/replies/";
var onlinedatapath=serverpublicappURL+"uploads/";
var originSource=""
var statistics_source=""
var aud=new Audio('');
//var chat_cols_pics_json="jsons/cols.js"
//var chat_cols_json_path=""+chat_cols_pics_json;

////global variable for the data folder path 
var datafolderpath=localStorage.getItem("datafolderpath")
if(typeof datafolderpath=="undefined" || datafolderpath==null || datafolderpath=="null"){
	datafolderpath="";
}
var DataFolderPath=datafolderpath;
var jsonpath=DataFolderPath+"dbd.js";

/******use this for loading the dbd.js for online app****/
if(apptype=="Android_online" || apptype=="IOS_online"){
	
	originSource="Android OR IOS"
	
	var offlinedatapath="data/";
	localStorage.setItem("datafolderpath",offlinedatapath)
	
	if(apptype=="Android_online"){
		statistics_source="android"
		localStorage.setItem("statistics_source",statistics_source)
	}else{
		statistics_source="ios"
		localStorage.setItem("statistics_source",statistics_source)
	}
	$('<script src="'+offlinedatapath+'dbd.js" crossorigin="anonymous"></script>').appendTo(document.body);
	///////////////////////tablet ///////////////
}else if(apptype=="androidTab"){ /****use this for loading the dbd.js for android AND desktop app***/
	originSource="AndroidTablet"
	statistics_source="tablet"
	localStorage.setItem("statistics_source",statistics_source)
	//var offlinedatapath="data/";
	$('<script src="'+localStorage.getItem("datafolderpath")+'dbd.js" crossorigin="anonymous"></script>').appendTo(document.body);
	/*SETUP///////////////////////////////////////////////////////////////////////////////////////////
	////////remove the localstorage key setter for localstorage (it shoud be in Android after downloading and unzipping the files)*/
	//localStorage.setItem("datafolderpath",offlinedatapath)
	
}else if(apptype=="desktop"){
	originSource="Desktop"
	statistics_source="web"
	localStorage.setItem("statistics_source",statistics_source)
	var offlinedatapath="data/";
	localStorage.setItem("datafolderpath",offlinedatapath)
	$('<script src="'+offlinedatapath+'dbd.js" crossorigin="anonymous"></script>').appendTo(document.body);
	
	var datafolderpath=localStorage.getItem("datafolderpath")
	if(typeof datafolderpath=="undefined" || datafolderpath==null || datafolderpath=="null"){
		datafolderpath="";
	}
	var DataFolderPath=datafolderpath;
	var jsonpath=DataFolderPath+"dbd.js";
}

/*/////////////////////////online //offline events listener////////////////////////////////*/

function online() {
	// Show a different icon based on offline/online
	//alert("لا يوجد اتصال بالانترنت")
	save_send_views()
}
function offline() {
	// Show a different icon based on offline/online
	//alert("لا يوجد اتصال بالانترنت")
}

//////////function to formate date
function frmtdatetimesql(optionD1DT0T2){
var d=new Date();
	if(optionD1DT0T2==1){		
	return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
	}else if (optionD1DT0T2==0){
	return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();	
	}else if (optionD1DT0T2==2){
	return d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();	
	
	}
}

//////////////function to refresh page on resize screen
function onresizewindow(){
	//window.location.reload();
}

// Update the online status icon based on connectivity
window.addEventListener('online',  online);
window.addEventListener('offline', offline);

/****function to get the parameters and values of URL using jqurey***/
/***to use this function var parmVal= GetURLParameter(parameterName);***/
function GetURLParameter(sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}
/**********************************views and statistics functions*******************************************/
let statsResponse=[];
function save_send_views() {
    // Retrieve views data from localStorage
    const statistics_source = localStorage.getItem("statistics_source");
    const views_obj_arr = JSON.parse(localStorage.getItem("views")) || [];

    //console.log("Views object in localStorage before saving:", views_obj_arr);

    if (views_obj_arr.length > 0) {
        // Prepare the data to send in a single request
        const requestData = views_obj_arr.map(item => ({
            srid: item.srid,
            subsrid: item.subsrid,
            subsubsrid: item.subsubsrid,
            views: item.views,
            source: statistics_source
        }));
		console.log("Request payload:", JSON.stringify({ order: 17, views: requestData }));
		
        // Send all data in one request
		var requestDataStr=JSON.stringify(requestData);
        $.ajax({
            url: serverservicespath + 'statsservice.php',
            type: 'post',
            crossDomain: true,
            data: JSON.stringify({order:17 ,views: requestData }),
            contentType: 'application/json', // Set content type to JSON
            timeout: 10000, // Short timeout for the request
            success: function(response) {
				
                // Parse and log the echoed data from the server
                if (response && response.received) {
					console.log(response.status);
                // Clear views from localStorage after successful save
                    console.log("Received echoed data from server:", JSON.parse(response));
					console.table(response);
					localStorage.removeItem("views");
					console.log("Views object Removed from localStorage after saving.");
                } else {
                    console.log("Unexpected response format from server:", response);
                }
				
                // Redirect if next page exists
                const nextPage = localStorage.getItem("nextpage");
                if (nextPage) {
                    window.location.href = nextPage;
                }
            },
            error: function(jqXHR, textStatus, error) {
                console.error("Error sending views:", textStatus, error);

                // Handle the error and keep the data in localStorage for retry
            }
        });
    } else {
        console.log("No views to send.");
    }
	if(localStorage.getItem("nextpage")!==null){
				window.location.href=localStorage.getItem("nextpage")
	}
}



/* function save_send_views(){
	//data : {order:16,srid:1,sr:'الانترنت الأرضي',subsrid:0,subsr:'',subsubsrid:0,subsubsr:'',source:'android',views:1 },
	///check if their is visits in locstorage to send
	var views_obj_arr=[]
	var statistics_source=localStorage.getItem("statistics_source")
	
	console.log("the following is the views object in localStorage before saving")
	console.log($.parseJSON(localStorage.getItem("views")));
	
	if(localStorage.getItem("views")!==null){
		views_obj_arr = $.parseJSON(localStorage.getItem("views"));
		//var pendingsendarr=views_obj_arr
		for(a=0;a<views_obj_arr.length;a++){
			srid=views_obj_arr[a].srid
			subsrid=views_obj_arr[a].subsrid
			subsubsrid=views_obj_arr[a].subsubsrid
			viewscount=views_obj_arr[a].views
			
				$.ajax({
					url : serverservicespath + 'deafservice.php',
					type : 'GET',	
					crossDomain: true,                   
					async:false,
					data : {order:16,val1:srid,val2:'',val3:subsrid,val4:'',val5:subsubsrid,val6:'',val7:statistics_source,val8:viewscount },
						//val1 service id
						//val2 service name
						//val3 subservice id
						//val4 sub service name
						//val5 subsub service id
						//val6 subsub service name
						//val7 source of views => web or android or ios or tablet
						//val8 no of views, if stored in localstorage get the number if sent directly to server set to 1
					success : function(data) {
						console.log("the following is the views object in localStorage after saving")
						console.log($.parseJSON(localStorage.getItem("views")));
						///clear localstorage vidws stats
						views_obj_arr.splice(a,1)
						localStorage.setItem("views",JSON.stringify(views_obj_arr))
						//.shift();
						console.log("the following is the views object in localStorage after saving to server and updating localstorage")
						console.log($.parseJSON(localStorage.getItem("views")));
					},
					error : function(jqXHR, textStatus, error)
							{
								////save views stats to localstorage
								console.log(textStatus);	
					}		 									 
				});///end send views statistics ajax
			}///END for
			if(localStorage.getItem("nextpage")!==null){
				window.location.href=localStorage.getItem("nextpage")
			}
			
	}
} */

/****function to manage views in local storage**/
function manageviewslocal(srid,sr,subsrid,subsr,subsubsrid,subsubsr){
	/****set the values of service,subservice,subsubservice***/
	var views_obj_arr=[]
	/****check if there is stored views in localstorage***/
	if(localStorage.getItem("views")==null){
		var views_obj={"srid":srid,"sr":sr,"subsrid":subsrid,"subsr":subsr,"subsubsrid":subsubsrid,"subsubsr":subsubsr,"views":1};
		views_obj_arr.push(views_obj)
		localStorage.setItem("views",JSON.stringify(views_obj_arr))
	}else{/***if there is views in localstorage***/
		/***get the object*/
		views_obj_arr = $.parseJSON(localStorage.getItem("views"));
		/***find if the servic,sub,subsub was added before to the stored values then increase views, else add it**/
		var itemindex=-1;
		for(u=0;u<views_obj_arr.length;u++){
			if(views_obj_arr[u].srid==srid && views_obj_arr[u].subsrid==subsrid && views_obj_arr[u].subsubsrid==subsubsrid){
				itemindex=u;
				break;
			}else{
				itemindex=-1
			}
		}
			if(itemindex==-1){//item not found then add it
				var views_obj={"srid":srid,"sr":sr,"subsrid":subsrid,"subsr":subsr,"subsubsrid":subsubsrid,"subsubsr":subsubsr,"views":1};
				views_obj_arr.push(views_obj)
			}else{
				views_obj_arr[itemindex].views=parseInt(views_obj_arr[itemindex].views)+1
			}
				localStorage.setItem("views",JSON.stringify(views_obj_arr))
	}//end main else
		
	/****check if there is internet send the stats to the server and cleare the locstorage view item***/
	if(checkNetConnection()){
		save_send_views()
		//window.location.href=localStorage.getItem("nextpage")
	}else{
		window.location.href=localStorage.getItem("nextpage")
	}
}

/**** Function to check if there is internet now ****/
function checkNetConnection() {
    var xhr = new XMLHttpRequest(); // Corrected the constructor name
    var file = onlinedatapath + "ajax-loader.gif";
    var r = Math.round(Math.random() * 10000); // Random query to prevent caching
    xhr.open('HEAD', file + "?subins=" + r, false);

    try {
        xhr.send(); // Sends the request
        if (xhr.status >= 200 && xhr.status < 304) {
            console.log("Internet is active for sending the stats.");
            return true;
        } else {
            console.log("Internet is NOT active for sending the stats.");
            return false;
        }
    } catch (e) {
        console.log("Internet is NOT active for sending the stats. Error: " + e.message);
        return false;
    }
}

/***helper function to get the values of url parameters service,subservice, subsub service***/
function GetURLParameterVisit(sParam,pUrl)
{
    //var sPageURL1 = pUrl;
	var sPageURL=pUrl.split('?')
    var sURLVariables = sPageURL[1].split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}

/*****document ready to get the clicked item***/
$(document).ready(function () {
	//, .servucebox a.subserviceslink
	localStorage.removeItem("nextpage")
	$(document).on('mouseup touchend', '.enterbtn , .servucebox a.subserviceslink',function(event){
		event.preventDefault()
		sr="Home"
		subsr="Home"
		subsubsr="Home"
		if(GetURLParameterVisit("mainserviceID",$(this).attr("href"))==null){
			srid=0
			
		}else{
			srid=parseInt(GetURLParameterVisit("mainserviceID",$(this).attr("href")))
		}
		
		if(GetURLParameterVisit("serviceID",$(this).attr("href"))==null){
			subsrid=0
		}else{
			subsrid=parseInt(GetURLParameterVisit("serviceID",$(this).attr("href")))
		}
		
		if(GetURLParameterVisit("sub_serviceID",$(this).attr("href"))==null){
			subsubsrid=0
		}else{
			subsubsrid=parseInt(GetURLParameterVisit("sub_serviceID",$(this).attr("href")))
		}
		var link = $(this).attr("href");
		if(link==null){
			link="main.html"
		}
		localStorage.setItem("nextpage",link)
		manageviewslocal(srid,sr,subsrid,subsr,subsubsrid,subsubsr)
			//var signvideo=$(this).attr("data-signvid");/***sign video file path***/
	});///end click event**/
});///end doc ready

/**********************************END //views and statistics functions*******************************************/

/*//////////////////////////////////////////////////////////////////////////////////////////*/
/***Video and Image modal popup show effect ->initialize modal show/hide amination effect ***/
	$(".modal").each(function(l){$(this).on("show.bs.modal",function(l){var o=$(this).attr("data-easein");"shake"==o?$(".modal-dialog").velocity("callout."+o):"pulse"==o?$(".modal-dialog").velocity("callout."+o):"tada"==o?$(".modal-dialog").velocity("callout."+o):"flash"==o?$(".modal-dialog").velocity("callout."+o):"bounce"==o?$(".modal-dialog").velocity("callout."+o):"swing"==o?$(".modal-dialog").velocity("callout."+o):$(".modal-dialog").velocity("transition."+o)})});

$(document).ready(function () {
	/***initialize controls and variablse ***/
	
	/***show sign video for any sign icon in any screen with the tag signvideo_btn ***/
	$(document).on('click', '.signvideo_btn',function(event){
		var signvideo=$(this).attr("data-signvid");/***sign video file path***/
		if(typeof signvideo=='' || signvideo=='' || signvideo==null){
			signvideo=$(this).attr("data-video");/***sign video file path***/
		}
		//console.log(signvideo);
		var vid = document.getElementById("video_player_pop"); 
		//vid.src=DataFolderPath+videofile;
		/*****the next line should be changed based on data from the JSON**/
		vid.src=signvideo;
		$("#video_popup").modal({backdrop: 'static',keyboard: false});
		vid.play()
	});
	/**********************************end sign video btn click*******/
	
	/**********REMOVE LATER AFTER CAIRO ICT*****/
	
	//$(".sidebar-nav li a[href='callcs.html']").hide()
	//$(".sidebar-nav li a[href='myfav.html']").hide()
	////$(".sidebar-nav li a[href='otherdeafapps.html']").hide()
	//$(".sidebar-nav li a[href='tebranches.html']").hide()
	$(".sidebar-nav li a[href='services.html?mainserviceID=20']").attr("href",'services.html?mainserviceID=28');
	$(".sidebar-nav li a[href='services.html?mainserviceID=39']").attr("href",'services.html?mainserviceID=48');
	/***hide the offers in the main screen AND from the side menu***/
	$(".offers_main_service").hide()
	$(".sidebar-nav li a[href='offers.html']").hide()
	$(".offers_main_service a").attr("href","offers.html")
	$(".offers_main_service .service_main_vid_btn").attr("disabled","true")
	$(".sidebar-nav li a[href='registeruser.html']").hide();
	$(".sidebar-nav li a[href='myfav.html']").hide();
	$(".sidebar-nav li a[href='complain.html']").hide();
	$(".sidebar-nav li a[href='replies.html']").hide();
	$(".sidebar-nav li a[href='callcs.html']").hide();
	$(".sidebar-nav li a[href='otherdeafapps.html']").hide();
});/***end doc ready***/

