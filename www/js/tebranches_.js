// JavaScript Document

/****initialize main screen****/

function playsound(param)
{
$("#audcont").prop("src","");
$("#audcont").prop("src",param);
$("#audcont").play();
}

function isPlaying() { return !$("#audcont").paused; }
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
	  //// by hany/////var obj=jsondataobject
	  ////load datajson file into DataJSON property
 var obj;
	  $.getJSON(jsonpath, function(objec) {	
	  console.log(objec);
	  obj=objec;
	  });
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

var currentpage="tebranches.html";
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
		var allbranches=DataClass.DataJSON.data.branches_contacts
		$("#codes_rows").children().remove()
		for(i=0;i<allbranches.length;i++){
			var branch_row_obj=allbranches[i];
			//console.log(branch_row_obj)
			var branch_id=branch_row_obj.id
			var branch_gov=branch_row_obj.gov
			var branch_name=branch_row_obj.branch
			var branch_addr=branch_row_obj.address
			var branch_tel1=branch_row_obj.tel1
			var branch_sound=localStorage.getItem("datafolderpath")+branch_row_obj.sound[0]
			//var branch_tel2=branch_row_obj.tel2
			//var branch_tel3=branch_row_obj.tel3
			//var branch_mobile=branch_row_obj.mobile
			//var branch_email=branch_row_obj.email
			//var branch_map=branch_row_obj.map
			var branch_work_time="من 9 صباحا إالى 3 عصراً";//branch_row_obj.work_time;

			if(1==1){
				var isaccessible_link='<img alt="" title="إذاعة الصوت" src="imgs/sound.png" onclick="playsound(\''+branch_sound+'\')" class="mx-auto d-block img-fluid imgpadding">'
			}else{
				var isaccessible=''
			}
			/*
			if(branch_map==""){
				var maplink='---'
			}else{
				var maplink='<a dir="ltr" href="'+branch_map+'"><img class="mx-auto d-block img-fluid imgpadding" src="imgs/maps.jpg"></a>'
			}
			*/
			code_html='<div class="row justify-content-center align-items-center importantNo_rows_container_inner branch_row" data-branchid="'+branch_id+'" data-branch_gov="'+branch_gov+'"><div class="co2-1 col-sm-2  justify-content-center align-items-center inp_img left_border">'+branch_name+'</div><div class="col-4 col-sm-4  justify-content-center align-items-center inp_title left_border">'+branch_addr+'</div><div class="co2-1 col-sm-2  justify-content-center align-items-center inp_txt left_border"><a dir="ltr" href="tel:'+branch_tel1+'">'+branch_tel1+'</a></div>'
			
			code_html=code_html+'<div class="col-2 col-sm-2  justify-content-center align-items-center inp_title left_border">'+branch_work_time+'</div><div class="col-1 col-sm-1  justify-content-center align-items-center inp_txt">'
			
			code_html=code_html+isaccessible_link+'</div></div>';

			$("#codes_rows").append(code_html)
		}
};///end start loading page function

////load the branches of specific gov
function reload_branches(branch_gov_name){	
	/////initialize controlos and display of controls in the pages
	///get page properties from json based on currentpage
	//var pageobj=DataClass.getpagesignvideo(currentpage,DataClass.DataJSON.data.pages_info)

		//////load all mian services 
		var allbranches=DataClass.DataJSON.data.branches_contacts
		$("#codes_rows").children().remove()
		for(i=0;i<allbranches.length;i++){
			var branch_row_obj=allbranches[i];
			//console.log(branch_row_obj)
			var branch_id=branch_row_obj.id
			var branch_gov=branch_row_obj.gov
			var branch_name=branch_row_obj.branch
			var branch_addr=branch_row_obj.address
			var branch_tel1=branch_row_obj.tel1
			var branch_sound=localStorage.getItem("datafolderpath")+branch_row_obj.sound[0]
			//var branch_tel2=branch_row_obj.tel2
			//var branch_tel3=branch_row_obj.tel3
			//var branch_mobile=branch_row_obj.mobile
			//var branch_email=branch_row_obj.email
			//var branch_map=branch_row_obj.map
			var branch_work_time="من 9 صباحا إالى 3 عصراً";//bbranch_row_obj.work_time

			if(1==1){
				var isaccessible_link='<img alt="" title="إذاعة الصوت" src="imgs/sound.png" onclick="playsound(\''+branch_sound+'\')"  class="mx-auto d-block img-fluid imgpadding">'
			}else{
				var isaccessible=''
			}
			/*
			if(branch_map==""){
				var maplink='---'
			}else{
				var maplink='<a dir="ltr" href="'+branch_map+'"><img class="mx-auto d-block img-fluid imgpadding" src="imgs/maps.jpg"></a>'
			}
			*/
			if(branch_gov==branch_gov_name){
				code_html='<div class="row justify-content-center align-items-center importantNo_rows_container_inner branch_row" data-branchid="'+branch_id+'" data-branch_gov="'+branch_gov+'"><div class="co2-1 col-sm-2  justify-content-center align-items-center inp_img left_border">'+branch_name+'</div><div class="col-4 col-sm-4  justify-content-center align-items-center inp_title left_border">'+branch_addr+'</div><div class="co2-1 col-sm-2  justify-content-center align-items-center inp_txt left_border"><a dir="ltr" href="tel:'+branch_tel1+'">'+branch_tel1+'</a></div>'
			
			code_html=code_html+'<div class="col-2 col-sm-2  justify-content-center align-items-center inp_title left_border">'+branch_work_time+'</div><div class="col-1 col-sm-1  justify-content-center align-items-center inp_txt">'
			
			code_html=code_html+isaccessible_link+'</div></div>';

			$("#codes_rows").append(code_html)
			}
		}
};///end start loading page function

function populate_gov_DD(){
	
	var unique_govs=unique(getAllgovs())
	$("#sel_gov_dd").children().remove()
	//$("#sel_gov_dd").append('<option value="all">الكل</option>')
	options_html='<option value="all">الكل</option>'
	for(ii=0;ii<unique_govs.length;ii++){
		options_html=options_html+'<option value="'+unique_govs[ii]+'">'+unique_govs[ii]+'</option>'
	}
	$("#sel_gov_dd").append(options_html);

}
function getAllgovs(){
	var allgovs=DataClass.DataJSON.data.branches_contacts
	var govs=[]
	for(i=0;i<allgovs.length;i++){
        govs.push(allgovs[i].gov)
	}
	return govs;
}
function unique(list) {
  var result = [];
  $.each(list, function(i, e) {
    if ($.inArray(e, result) == -1) result.push(e);
  });
  return result;
}
$(document).ready(function(e) {
	$(window).bind('beforeunload', function(){
   $("#audcont").prop("src","");
    return;
   });
	populate_gov_DD()
	$('#sel_gov_dd').on('change', function() {
		var sel=this.value
		if(sel=="all"){
			startloadingtheapp()
		}else{
			reload_branches(sel)
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