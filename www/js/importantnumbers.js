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
	  var obj=jsondataobject
	  ////load datajson file into DataJSON property

			self.DataJSON=obj;
			self.number_of_branches=obj.data.allservices.length
			self.number_of_services=obj.data.foundation.branches.length
			self.getDataJson()

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


/*********************************END JSON DATA Class and Functions************************************************************************************/

/***in intialization we load the JSON and draw the screen for the main services***/
var DataClass=new deafserviceapp_controller();
$.ajaxSetup({
    async: false
});
DataClass.construct(DataFolderPath,jsonpath)

var currentpage="importantnumbers.html";
//////////////////////////////////////Application initialization ///////////
$(document).ready(function (timetostartapp) {
	setTimeout(function(){ startloadingtheapp(); }, timetostartapp);
	//console.log(DataClass.DataJSON.data.allservices[0])
});

////loading the application after setted timeout
function startloadingtheapp(){	
	/////initialize controlos and display of controls in the pages
	///get page properties from json based on currentpage
	//var pageobj=DataClass.getpagesignvideo(currentpage,DataClass.DataJSON.data.pages_info)

		//////load all mian services 
		var allcodes=DataClass.DataJSON.data.important_numbers
		$("#codes_rows").children().remove()
		for(i=0;i<allcodes.length;i++){
			var code_row_obj=allcodes[i];
			console.log(code_row_obj)
			var code_id=code_row_obj.id
			var code_name=code_row_obj.service
			var code_cost=code_row_obj.cost
			var code_no=code_row_obj.code_number
			var code_vid=DataFolderPath+code_row_obj.vids[0]; 
			/**var code_imgs_str=JSON.stringify(service_obj.imgs);**/
			var code_main_img=DataFolderPath+code_row_obj.imgs[0]
			
			code_html='<div class="row justify-content-center align-items-center importantNo_rows_container_inner"><div class="col-3 col-sm-3  justify-content-center align-items-center inp_img left_border"><img class="PicContent mx-auto d-block img-fluid" src="'+code_main_img+'" data-imgs="'+code_main_img+'"></div><div class="col-2 col-sm-2  justify-content-center align-items-center inp_title left_border">'+code_name+'</div><div class="col-2 col-sm-2  justify-content-center align-items-center inp_txt left_border">'+code_cost+'</div><div class="col-2 col-sm-2  justify-content-center align-items-center inp_txt left_border"><a dir="ltr" href="tel:'+code_no+'">'+code_no+'</a></div><div class="col-3 col-sm-3  justify-content-center align-items-center inp_txt"><button type="button" class="btn btn-default signvideo_btn img-fluid" data-video="'+code_vid+'"><img alt="" title="ترجم للغة الاشارة" src="imgs/signvideoicon.png" class="rounded img-fluid sign_btn_small_img"></button></div></div>'
			
			$("#codes_rows").append(code_html)
		}
};///end start loading page function


$(document).ready(function(e) {
	
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