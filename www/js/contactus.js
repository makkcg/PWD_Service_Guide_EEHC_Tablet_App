
var DataClass=new deafserviceapp_controller();
//DataClass.construct(DataFolderPath,jsonpath)
DataClass.construct(DataFolderPath,jsonpath)
//console.log(DataClass.DataJSON)

var timetostartapp=5000;
var currentpage="contactus.html";
//////////////////////////////////////Application initialization ///////////
$(document).ready(function () {
	setTimeout(function(){ startloadingtheapp(); }, 500);
	//console.log(DataClass.DataJSON.data.allservices[0])

});

////loading the application after setted timeout
function startloadingtheapp(){
	
	//////loading foundation description page 
	//$(".htmlcontent").html(DataClass.DataJSON.data.foundation.foundation_desc)
	
	/////initialize controlos and display of controls in the pages
		///get page properties from json based on currentpage
		var pageobj=DataClass.getpagesignvideo(currentpage,DataClass.DataJSON.data.pages_info)
		////show/hide sign video btn at toolbar according ot page.has_video property
		
		var show_signvidBtn_btn=pageobj[0].has_video
		//console.log(show_signvidBtn_btn)
		if(show_signvidBtn_btn==1){
			$(".signvidBtn").show()
		}else{
			$(".signvidBtn").hide()
		}
}
