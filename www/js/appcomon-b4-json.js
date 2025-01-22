/************application common functions **************/
/****global vars***/
var serverdataurl="";
var localdataurl="";
/*/////////////////////////online //offline events listener////////////////////////////////*/
function online() {
	// Show a different icon based on offline/online
	//alert("لا يوجد اتصال بالانترنت")
}
function offline() {
	// Show a different icon based on offline/online
	//alert("لا يوجد اتصال بالانترنت")
}
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

// Update the online status icon based on connectivity
window.addEventListener('online',  online);
window.addEventListener('offline', offline);
/*//////////////////////////////////////////////////////////////////////////////////////////*/
/***initialize modal show/hide amination effect ***/
	$(".modal").each(function(l){$(this).on("show.bs.modal",function(l){var o=$(this).attr("data-easein");"shake"==o?$(".modal-dialog").velocity("callout."+o):"pulse"==o?$(".modal-dialog").velocity("callout."+o):"tada"==o?$(".modal-dialog").velocity("callout."+o):"flash"==o?$(".modal-dialog").velocity("callout."+o):"bounce"==o?$(".modal-dialog").velocity("callout."+o):"swing"==o?$(".modal-dialog").velocity("callout."+o):$(".modal-dialog").velocity("transition."+o)})});
	
$(document).ready(function () {
	/***initialize controls and variablse ***/
	
	/***show sign video for any sign icon in any screen with the tag signvideo_btn ***/
	$(document).on('click', '.signvideo_btn',function(event){
		var signvideo=$(this).attr("data-signvid");/***sign video file path***/
		console.log(signvideo);
		var vid = document.getElementById("video_player_pop"); 
		//vid.src=DataFolderPath+videofile;
		/*****the next line should be changed based on data from the JSON**/
		vid.src=signvideo;
		$("#video_popup").modal();
		vid.play()
	});
	/**********************************end sign video btn click*******/
	
	
});/***end doc ready***/

