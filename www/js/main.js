// JavaScript Document

/****initialize main screen****/

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
			//console.log(self.DataJSON);
			self.number_of_branches=obj.data.allservices.length
			self.number_of_services=obj.data.foundation.branches.length
			self.getDataJson()
		});
  }
  this.construct=function(datafolderpath,jsonpath){
	  ////update the datafolder,datajsonpath,and load the json into datajson

	  self.datafolderpath=datafolderpath;
	  self.dataJSONpath=jsonpath;
	 /*  var obj=jsondataobject
	  ////load datajson file into DataJSON property
		
			self.DataJSON=obj;
			self.number_of_branches=obj.data.allservices.length
			self.number_of_services=obj.data.foundation.branches.length
			self.getDataJson() */
			
			////load datajson file into DataJSON property
	  $.getJSON(jsonpath, function(obj) {
			self.DataJSON=obj;
			//console.log(self.DataJSON);
			self.number_of_branches=obj.data.allservices.length
			self.number_of_services=obj.data.foundation.branches.length
			self.getDataJson()
		});

  }
  this.getDataJson = function(){
	  return self.DataJSON;
  }
  this.getpagesignvideo=function(pagefilename,pagesArr){
	 // var pagesArr= self.DataJSON.data.pages_info
	   var result = $.grep(pagesArr, function(e){ return e.pagefile == pagefilename; });
		  return result;
  };
  
  this.get_service_obj_byid=function(serviceid,allservicesArr){
	 // var pagesArr= self.DataJSON.data.pages_info
	  ////console.log(pagesArr)
	   var result = $.grep(allservicesArr, function(e){ return e.id == serviceid; });
		  return result;
  };
  this.get_procedures_of_service=function(serviceid,subserviceid,allservicesArr){
	 // var pagesArr= self.DataJSON.data.pages_info
	  ////console.log(pagesArr)
	  var procedures
	  if(subserviceid==0){///it is a main service
		  //$.grep(allservicesArr, function(e){ return e.id == 1; }).success(function(e){alert(e)})
		var mainservice_obj = $.grep(allservicesArr, function(e){ return e.id == serviceid; });
		 procedures = mainservice_obj[0].procedures

	  }else{
		   var mainservice_obj = $.grep(allservicesArr, function(e){ return e.id == serviceid; });
		   //console.log(mainservice_obj)
		   var allsubservicesArr=mainservice_obj[0].sub_services
		   //console.log(allsubservicesArr)
		   var subservice_obj = $.grep(allsubservicesArr, function(e){ return e.id == subserviceid; });
		   //console.log(subservice_obj)
		   procedures=subservice_obj[0].procedures
	  }
		  return procedures;
  };
  /////get the faqs of serv or subserv
  this.get_faqs_of_service=function(serviceid,subserviceid,allservicesArr){
	 // var pagesArr= self.DataJSON.data.pages_info
	  ////console.log(pagesArr)
	  var faqs
	  if(subserviceid==0){///it is a main service
		  //$.grep(allservicesArr, function(e){ return e.id == 1; }).success(function(e){alert(e)})
		var mainservice_obj = $.grep(allservicesArr, function(e){ return e.id == serviceid; });
		 faqs = mainservice_obj[0].faqs

	  }else{
		   var mainservice_obj = $.grep(allservicesArr, function(e){ return e.id == serviceid; });
		   ////console.log(mainservice_obj)
		   var allsubservicesArr=mainservice_obj[0].sub_services
		   ////console.log(allsubservicesArr)
		   var subservice_obj = $.grep(allsubservicesArr, function(e){ return e.id == subserviceid; });
		   ////console.log(subservice_obj)
		   faqs=subservice_obj[0].faqs
	  }
		  return faqs;
  };
  /////get the docs of serv or subserv
  this.get_docs_of_service=function(serviceid,subserviceid,allservicesArr){
	 // var pagesArr= self.DataJSON.data.pages_info
	  ////console.log(pagesArr)
	  var docs
	  if(subserviceid==0){///it is a main service
		  //$.grep(allservicesArr, function(e){ return e.id == 1; }).success(function(e){alert(e)})
		var mainservice_obj = $.grep(allservicesArr, function(e){ return e.id == serviceid; });
		 docs = mainservice_obj[0].docs

	  }else{
		   var mainservice_obj = $.grep(allservicesArr, function(e){ return e.id == serviceid; });
		   ////console.log(mainservice_obj)
		   var allsubservicesArr=mainservice_obj[0].sub_services
		   ////console.log(allsubservicesArr)
		   var subservice_obj = $.grep(allsubservicesArr, function(e){ return e.id == subserviceid; });
		   ////console.log(subservice_obj)
		   docs=subservice_obj[0].docs
	  }
		  return docs;
  };
   
};////end class declaration


/*********************************END JSON DATA Class and Functions************************************************************************************/

/***in intialization we load the JSON and draw the screen for the main services***/
var DataClass=new deafserviceapp_controller();
$.ajaxSetup({
    async: false
});
DataClass.construct(DataFolderPath,jsonpath)

var currentpage="main.html";
//////////////////////////////////////Application initialization ///////////
$(document).ready(function (timetostartapp) {
	setTimeout(function(){ startloadingtheapp(); }, timetostartapp);
	////console.log(DataClass.DataJSON.data.allservices[0])
});

////loading the application after setted timeout
function startloadingtheapp(){
	////console.log(DataClass.DataJSON.data)
	
	/////initialize controlos and display of controls in the pages
		///get page properties from json based on currentpage
		var pageobj=DataClass.getpagesignvideo(currentpage,DataClass.DataJSON.data.pages_info)

		//////load all mian services 
		var allservices=DataClass.DataJSON.data.allservices
		for(i=0;i<allservices.length;i++){
			var service_obj=allservices[i];
			var num_subservices=service_obj.length
			var service_has_subservice=service_obj.has_subservice
			var service_video=DataFolderPath+service_obj.vids[0];
			var service_imgs_str=JSON.stringify(service_obj.imgs);
			var service_main_img=DataFolderPath+service_obj.imgs[0]
			var num_of_sub_services=service_obj.sub_services.length
			var service_title=service_obj.title
			var service_desc=service_obj.desc
			var service_id=service_obj.id
			
			/******* offers_main_service ******* moblie_main_service **** weinternet_main_service ******* landline_main_service ******/
			/***1- set the link to subservices***/
			$($("a.subserviceslink")[i]).attr('href','services.html?mainserviceID='+service_id)
			/****2- set the main service title ***/
			$($(".mainservice_h")[i]).text(service_title)
			/****3- set the main service description ***/
			if(service_desc.length>93){
				$($(".mainservice_desc")[i]).text(service_desc.slice(0, 94));
			}else{
				$($(".mainservice_desc")[i]).text(service_desc)
			}
			
			/****4- set the sign videos paths****/
			$($(".service_main_vid")[i]).attr('data-video',service_video)
		}
};///end start loading page function


$(document).ready(function(e) {
	
	///click on sign video button for each main service
	$(document).on('click', '.service_main_vid_btn',function(event){
		signvideo= $(this).data("video");
		/*****the next line should be changed based on data from the JSON**/
		/*fullpath_signvideo=serverdataurl+signvideo;*/
		fullpath_signvideo=signvideo;
		var vid = document.getElementById("video_player_pop"); 
		vid.src=fullpath_signvideo;
		/*****the next line should be changed based on data from the JSON**/
		/**vid.src="videos/1.webm";**/
		$("#video_popup").modal();
		vid.play()
	});

});/*****end doc ready***/