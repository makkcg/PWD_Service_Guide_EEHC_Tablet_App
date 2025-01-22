// JavaScript Document

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
	  var obj;
	  $.getJSON(jsonpath, function(objec) {	
	  console.log(objec);
	  obj=objec;
	  });
	  ////load datajson file into DataJSON property

			self.DataJSON=obj;
			//console.log(self.DataJSON);
			self.number_of_branches=obj.data.allservices.length
			self.number_of_services=obj.data.foundation.branches.length
			self.getDataJson()

  }
  this.getDataJson = function(){
	  return self.DataJSON;
  }
  this.getpagesignvideo=function(pagefilename,pagesArr){
	 // var pagesArr= self.DataJSON.data.pages_info
	  //console.log(pagesArr)
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

////function to set the top bar page title
function set_page_title_forsubserv(){
	/////////////////////////////////////////////////////////////////////////////////////
	////set page tilte for subservice, procedures,required docs, and faqs based on main and sub service id in the url
	//.serv_subserv_page_title
		var mainserviceid=GetURLParameter("mainserviceID");
		var subserviceid=GetURLParameter("serviceID");
		var subsubserviceid=GetURLParameter("sub_serviceID");
		
		var titleofpage="";
		
		if( subserviceid >0 && mainserviceid >0 ){
			var mainserviceOBJ=DataClass.get_service_obj_byid(mainserviceid,DataClass.DataJSON.data.allservices);
			var subserviceOBJ=DataClass.get_service_obj_byid(subserviceid,mainserviceOBJ[0].sub_services);
			if(subsubserviceid!=0){
				var subsubserviceOBJ = DataClass.get_service_obj_byid(subsubserviceid,subserviceOBJ[0].sub_sub_services);
			}else{
				var subsubserviceOBJ=[]
				subsubserviceOBJ.push({"title":""})
			}

				titleofpage="<a href='services.html?mainserviceID="+mainserviceid+"'>"+mainserviceOBJ[0].title+"</a> -> <a href='subservices.html?mainserviceID="+mainserviceid+"&serviceID="+subserviceid+"'>"+subserviceOBJ[0].title+"</a>"
				if(subsubserviceid>0){
				titleofpage=titleofpage+" <- <a href='servicedetails.html?mainserviceID="+mainserviceid+"&serviceID="+subserviceid+"&sub_serviceID="+subsubserviceid+"'>"+subsubserviceOBJ[0].title+"</a>"
				}
			}else{
				titleofpage="تطبيقات خدمة الأشخاص ذوي الاحتياجات الخاصة (صم ومكفوفين)";
			}
		$(".topheadertxt").html(titleofpage)
		////////////////////////////////////////////////////////////////////////////////
}
/*********************************END JSON DATA Class and Functions************************************************************************************/
/****initialize services screen****/
/***in intialization we load the JSON and draw the screen for the services and based on selected service from main screen use ? at url to get the service id***/
/***in intialization we load the JSON and draw the screen for the main services***/
var DataClass=new deafserviceapp_controller();
$.ajaxSetup({
    async: false
});
DataClass.construct(DataFolderPath,jsonpath)

var currentpage="servicedetails.html";

//////////////////////////////////////Application initialization ///////////
$(document).ready(function (timetostartapp) {
	
	setTimeout(function(){ startloadingtheapp(); }, timetostartapp);
	////console.log(DataClass.DataJSON.data.allservices[0])
});

/***importnat function to get url parameters GetURLParameter(sParam)*****/
/*we receive mainserviceID *** and creat urls for serviceID ,subserviceID****/
/***if subserviceID=0 means that the service is directly to service details***/


////loading the application after setted timeout
function startloadingtheapp(){
	////console.log(DataClass.DataJSON.data)
	//////loading foundation description page 
	//$(".htmlcontent").html(DataClass.DataJSON.data.foundation.foundation_desc)
		
		
	/////initialize controlos and display of controls in the pages
		///get page properties from json based on currentpage
		//var pageobj=DataClass.getpagesignvideo(currentpage,DataClass.DataJSON.data.pages_info)
		
	///////////////Get the main Service ID from the url////////////////////////////////////////
	
		var mainserviceid=GetURLParameter("mainserviceID");
		var subserviceid=GetURLParameter("serviceID");
		var subsubserviceid=GetURLParameter("sub_serviceID");
		
		if(typeof mainserviceid=="undefiend" || mainserviceid=="null" || mainserviceid==null || mainserviceid<1 ){
			mainserviceid=0
		}
		if(typeof subserviceid=="undefiend" || subserviceid=="null" || subserviceid==null || subserviceid<1 ){
			subserviceid=0
		}
		if(typeof subsubserviceid=="undefiend" || subsubserviceid=="null" || subsubserviceid==null || subsubserviceid<1 ){
			subsubserviceid=0
		}
		//////load all services slides
		//var allservices=DataClass.DataJSON.data.allservices
		/////load all sub services of service id parsed through url
		var mainserviceOBJ=DataClass.get_service_obj_byid(mainserviceid,DataClass.DataJSON.data.allservices);
		var subserviceOBJ=DataClass.get_service_obj_byid(subserviceid,mainserviceOBJ[0].sub_services);
		var subsubserviceOBJ = DataClass.get_service_obj_byid(subsubserviceid,subserviceOBJ[0].sub_sub_services);

		
		/********************************الموضوع مختلف هنا هتحط الوثائق والاجارات والشروط وخلافه************/
		
		/*******fill steps and procedures****/
		if(typeof subsubserviceOBJ=='undefined'){
			subsubserviceOBJ=[]
			subsubserviceOBJ.push({"procedures":[]})
		}else{
			
		}
		if( (subsubserviceid>0  && subsubserviceOBJ[0].procedures.length<1 ) && (subserviceid>0 &&  subserviceOBJ[0].procedures.length<1)){
			/***hide the steps_page topmenu tab***/
			$('.topmenuitem_li[data-subpage="steps_page"]').hide()
			
		}else{
			if((subsubserviceid==0  && subserviceOBJ[0].procedures.length<1)){
				$('.topmenuitem_li[data-subpage="steps_page"]').hide()
			}
			var procedursOBJs_arr
			
			if(mainserviceid>0 && subserviceid>0 && subsubserviceid==0 ){/***in case url is from services.html no sub service***/
				procedursOBJs_arr= subserviceOBJ[0].procedures
			}else if(mainserviceid>0 && subserviceid>0 && subsubserviceid>0 ){ /***in case url is from subservices.html subservice>0***/
				procedursOBJs_arr=subsubserviceOBJ[0].procedures
			}else{
				procedursOBJs_arr=subsubserviceOBJ[0].procedures
			}
			//console.log(procedursOBJs_arr)
			$(".steps_ol").children().remove()
			for(i=0;i<procedursOBJs_arr.length;i++){
				
				var step_desc=procedursOBJs_arr[i].desc
				var step_id=procedursOBJs_arr[i].id
				//var step_imgs_str=JSON.stringify(procedursOBJs_arr[i].imgs);
				var step_imgs_str=procedursOBJs_arr[i].imgs;
				//var step_imgs_arr=JSON.parse(procedursOBJs_arr[i].imgs)
				//console.log(procedursOBJs_arr[i].imgs)
				var setp_main_img=DataFolderPath+procedursOBJs_arr[i].imgs[0]
				var step_video=DataFolderPath+procedursOBJs_arr[i].vids[0];
				var procedures_item_html='<li class=" row rounded2 align-items-center" data-stepid="'+step_id+'"><div class="col-3 col-sm-3 rounded2 d-flex justify-content-center align-items-center step_item_img"><img class="PicContent rounded2 mx-auto d-block img-fluid" src="'+setp_main_img+'" data-imgs="'+step_imgs_str+'"></div><div class="col-5 col-sm-6  step_item_txt align-items-center h-100">'+step_desc+'</div><button type="button" class="col-2 col-sm-1 btn btn-default step_item_btn_div signvideo_btn  img-fluid" data-signvid="'+step_video+'"  style="margin-left:20px;"><img alt="" title="ترجم للغة الاشارة" src="imgs/signvideoicon.png"  class="rounded img-fluid" ></button><a onclick="playsound(\''+step_video.replace(".webm",".mp3").replace("videos","sounds") + '\')"><img alt="" title="إذاعة الصوت" src="imgs/soundx.png"  class="rounded" style="width:62px !important;"></a></li>';
				$(".steps_ol").append(procedures_item_html)
			}
		}
		/******fill docuements required*****/
		if(typeof subsubserviceOBJ=='undefined'){
			subsubserviceOBJ=[]
			subsubserviceOBJ.push({"docs":[]})
		}else{
			
		}
		if( (subsubserviceid>0  && subsubserviceOBJ[0].docs.length<1 ) && (subserviceid>0 &&  subserviceOBJ[0].docs.length<1)){
			/***hide the docs_page topmenu tab***/
			$('.topmenuitem_li[data-subpage="docs_page"]').hide()
			
		}else{
			if((subsubserviceid==0  && subserviceOBJ[0].docs.length<1)){
				$('.topmenuitem_li[data-subpage="docs_page"]').hide()
			}
			var docsOBJs_arr
			if(mainserviceid>0 && subserviceid>0 && subsubserviceid==0 ){/***in case url is from services.html no sub service***/
				docsOBJs_arr= subserviceOBJ[0].docs
			}else if(mainserviceid>0 && subserviceid>0 && subsubserviceid>0 ){ /***in case url is from subservices.html subservice>0***/
				docsOBJs_arr=subsubserviceOBJ[0].docs
			}else{
				docsOBJs_arr=subsubserviceOBJ[0].docs
			}
			//console.log(docsOBJs_arr)
			$("#services_swiper .swiper-wrapper").children().remove()
			for(i=0;i<docsOBJs_arr.length;i++){
				
				var docs_title=docsOBJs_arr[i].title
				var docs_desc=docsOBJs_arr[i].desc
				var docs_id=docsOBJs_arr[i].id
				//var docs_imgs_str=JSON.stringify(docsOBJs_arr[i].imgs);
				var docs_imgs_str=docsOBJs_arr[i].imgs;
				var docs_main_img=DataFolderPath+docsOBJs_arr[i].imgs[0]
				var docs_video=DataFolderPath+docsOBJs_arr[i].vids[0];
				var docs_item_html='<!----Start Slide---><div class="swiper-slide " data-docid="'+docs_id+'"><div class="ContentOfentities rounded"><div class="row justify-content-center align-items-center"><div class="col-9 d-flex justify-content-center align-items-center"><h4>'+docs_title+'</h4></div><div class="col-3 d-flex justify-content-center align-items-center"></div></div><div class="col-12 service-img-container rounded d-flex justify-content-center align-items-center"><img class="PicContent rounded mx-auto d-block img-fluid" src="'+docs_main_img+'" data-imgs="'+docs_imgs_str+'"></div><div class="row justify-content-center align-items-center"><div class="col-12 "><div class="slimScrollDiv"><div class="d-flex justify-content-center align-items-center service_slide_txt_container viewport"><div class="service_slide_txt">'+docs_title+'</div></div></div><!---End viewport--></div><div style="direction:ltr;" class="col-12 d-flex justify-content-center align-items-center signbtn_container"><button type="button" style ="margin-right:14em;" class="btn btn-default signvideo_btn slide-icons-signvid img-fluid" data-video="'+docs_video+'"><img alt="" title="ترجم للغة الاشارة" src="imgs/signvideoicon.png" class="rounded img-fluid" /></button><a  onclick="playsound(\''+docs_video.replace(".webm",".mp3").replace("videos","sounds")+'\')"><img alt="" title="إذاعة صوت" src="imgs/sound.png" class="rounded img-fluid"></a></div></div></div></div><!----END Slide--->';
				$("#services_swiper .swiper-wrapper").append(docs_item_html)
			}
		}/**end else if**/
		//reintializeSwipers(docsOBJs_arr.length,mq,mq1,mq2)
		swiper.update();
		if(swiper.slides.length>2 && window.innerWidth>700){
			swiper.slideNext()
		}
		$('.service_slide_txt_container').slimscroll({
			alwaysVisible: false
		});
		
		/*********fill regulations and conditions *****************/
		//console.log(mainserviceid+"-"+subserviceid+"-"+subsubserviceid)
			//console.log((mainserviceid>0 && subserviceid>0 && subsubserviceid==0 )+"-"+(mainserviceid>0 && subserviceid>0 && subsubserviceid>0 )+"-else")
			//console.log(subsubserviceOBJ)
		if(typeof subsubserviceOBJ=='undefined'){
			subsubserviceOBJ=[]
			subsubserviceOBJ.push({"conds":[]})
		}else{
			
		}
		////console.log((subserviceOBJ[0].conds.length<1 || subsubserviceOBJ[0].conds.length<1))
		if( (subsubserviceid>0 ) && (subserviceid>0)){
			/***hide the conditions topmenu tab***/
			$('.topmenuitem_li[data-subpage="conditions_page"]').hide()
			/***do nothing***/
		}else{
			if((subsubserviceid==0)){
				$('.topmenuitem_li[data-subpage="conditions_page"]').hide()
			}
			var condOBJs_arr
			if(mainserviceid>0 && subserviceid>0 && subsubserviceid==0 ){/***in case url is from services.html no sub service***/
				condOBJs_arr= subserviceOBJ[0].conds
			}else if(mainserviceid>0 && subserviceid>0 && subsubserviceid>0 ){ /***in case url is from subservices.html subservice>0***/
				condOBJs_arr=subsubserviceOBJ[0].conds
			}else{
				condOBJs_arr=subsubserviceOBJ[0].conds
			}
			//console.log(condOBJs_arr)
			$(".conditions_container").children().remove()
			/*
			for(i=0;i<condOBJs_arr.length;i++){
				
				var cond_title=condOBJs_arr[i].title
				var cond_desc=condOBJs_arr[i].desc
				var cond_id=condOBJs_arr[i].id
				//var cond_imgs_str=JSON.stringify(condOBJs_arr[i].imgs);
				var cond_imgs_str=condOBJs_arr[i].imgs;
				var cond_main_img=DataFolderPath+condOBJs_arr[i].imgs[0]
				var cond_video=DataFolderPath+condOBJs_arr[i].vids[0];
				var cond_item_html='<!---Start conditions row - --><div class="row conditions_row"><div class="col-12 conditions_controls rounded2"><div class="row align-items-center rounded2 conditionsH_row"><div class="col-12 col-sm-3 align-items-center"><button type="button" class="btn btn-default signvideo_btn slide-icons-signvid img-fluid" data-video="'+cond_video+'"><img alt="" title="ترجم للغة الاشارة" src="imgs/signvideoicon.png" class="rounded img-fluid" /></button></div><div class="col-12 col-sm-9 align-items-center conditions_h"><h4>'+cond_title+'</h4></div></div><!--end row--></div><div class="col-12 col-sm-3 rounded2 d-flex justify-content-center align-items-center  conditions_img"><img class="PicContent rounded2 mx-auto d-block img-fluid" src="'+cond_main_img+'" data-imgs="'+cond_imgs_str+'"></div><div class="col-12 col-sm-9 conditions_txt rounded2 align-items-center">'+cond_desc+'</div></div><!---end conditions row --->';
				$(".conditions_container").append(cond_item_html)
			}
			*/
		}/**end else if**/
		
		/*********fill FAQ (frequently asked questions) *****************/
		//console.log("faqs"+subserviceOBJ[0].faqs.length)
		//console.log("faqs"+ typeof subsubserviceOBJ[0]=="undefined")
		
		if(typeof subsubserviceOBJ[0]=="undefined"){
			var subsubserviceOBJ=[]
			subsubserviceOBJ.push({"faqs":[]})
		}
		if((subsubserviceid>0  && subsubserviceOBJ[0].faqs.length<1 ) && (subserviceid>0 &&  subserviceOBJ[0].faqs.length<1)){
			/***hide the conditions topmenu tab***/
			$('.topmenuitem_li[data-subpage="faq_page"]').hide()
			/***do nothing***/
		}else{
			if((subsubserviceid==0 &&  subserviceOBJ[0].faqs.length<1)){
				$('.topmenuitem_li[data-subpage="faq_page"]').hide()
			}
			var faqsOBJs_arr
			if(subsubserviceid==0 && subserviceid>0 && mainserviceid>0 ){/***in case url is from services.html no sub service***/
				faqsOBJs_arr= subserviceOBJ[0].faqs
				//console.log(faqsOBJs_arr)
			}else if(subsubserviceid>0 && subserviceid>0 && mainserviceid>0   ){ /***in case url is from subservices.html subservice>0***/
				faqsOBJs_arr=subsubserviceOBJ[0].faqs
			}else{
				faqsOBJs_arr=subsubserviceOBJ[0].faqs
			}
			$(".faq_ol").children().remove()
			for(i=0;i<faqsOBJs_arr.length;i++){
				
				var faqs_question=faqsOBJs_arr[i].question
				var faqs_answer=faqsOBJs_arr[i].answer
				var faqs_id=faqsOBJs_arr[i].id
				//var faqs_imgs_str=JSON.stringify(faqsOBJs_arr[i].imgs);
				var faqs_imgs_str=faqsOBJs_arr[i].imgs;
				var faqs_main_img=DataFolderPath+faqsOBJs_arr[i].imgs[0]
				var faqs_video=DataFolderPath+faqsOBJs_arr[i].vids[0];
				var faqs_item_html='<li class=" row rounded2 align-items-center" data-faqsid="'+faqs_id+'"><div class="col-1  d-flex justify-content-center faq_mark_box align-items-center"><i class="fa fa-question faq_mark"></i></div><div class="col-6 rounded2 d-flex align-items-center faq_q_box">'+faqs_question+'</div><div class="col-4  d-flex justify-content-center align-items-center h-100 signbtn_box"><button type="button" class="btn btn-default  faq_sign_btn signvideo_btn  img-fluid" data-signvid="'+faqs_video+'" style="margin-left:20px;" ><img alt="" title="ترجم للغة الاشارة" src="imgs/signvideoicon.png"  class="rounded img-fluid"></button><a class="img-fluid" onclick="playsound(\''+faqs_video.replace(".webm",".mp3").replace("videos","sounds")+'\')"><img alt="" title="إذاعة الصوت" src="imgs/soundx.png"  class="rounded img-fluid" ></a></div><div class="col-9 col-lg-11 rounded2  faq_a_box align-items-center h-100">'+faqs_answer+'</div></li>';
				$(".faq_ol").append(faqs_item_html)
			}
		}/**end else if ther is faqs**/

		set_page_title_forsubserv()
};///end start loading page function

/****initialize sub services screen****/
/***in intialization we load the JSON and draw the screen for the sub services and based on selected service from services screen use ? at url to get the service id and subservices id***/



$(document).ready(function(e) {
	$(window).bind('beforeunload', function(){
    $("#audcont").prop("src","");
    return;
   });
	
	/***initialize controls and variablse ***/
	/***hide all sub pages***/
	$(".service_subpage").hide()
	$('.swipenavigation .topmenuitem_li').removeClass("active");
	$('.swipenavigation .topmenuitem_li[data-subpage="steps_page"]').addClass("active");
	$(".steps_page").show();
	swiper.update()

	/***initialize swiper**/
	if (mq.matches) {
		swiper.slideNext()
	}
	/**initialize slider txt scrollbar***/

	$('.service_slide_txt_container').slimscroll({
		alwaysVisible: false
	});
	

	
	/****when click on any image with .PicContent enlarge the image in popup****/
	$(document).on('click', '.PicContent',function(event){
		var imgsrc= $(this).attr("src");
		var imgslist=$(this).attr("data-imgs");
		var imgslist_arr=imgslist.split(",");
		$("#images_popup .listofimages").empty();
		//$("#images_popup .listofimages").append('<img class="rounded mx-auto d-block img-fluid" src="'+imgsrc+'" >')
		for(i=0;i<imgslist_arr.length;i++){
			$("#images_popup .listofimages").append('<img class="rounded mx-auto d-block img-fluid popupimg" src="'+DataFolderPath+imgslist_arr[i]+'" >')
		}
		$("#images_popup").modal();
	});
	/******when user click on the top swiper menu item to show the specific page for the service***/
	$(document).on('click', '.topmenuitem_a',function(event){
		var subpagename= $(this).attr("data-subpage");
		/****show the selected subpage and hide all the other pages***/
		$(".service_subpage").hide()
		$('.swipenavigation .topmenuitem_li').removeClass("active");
		$('.swipenavigation .topmenuitem_li[data-subpage="'+subpagename+'"]').addClass("active");
		$("."+subpagename).show();
		//console.log(subpagename)
		swiper.update()
		
	});
	
	/****re initialize the controls***/
	$('.service_slide_txt_container').slimscroll();
	$('#services_swiper .service_slide_txt').show();
	
});/*****end doc ready***/
/***initialize swiper***/
//// TO be moved for all files that include scrolls
	/////////////////////////////////
	const mq = window.matchMedia( "(min-width: 992px)" );
	const mq1 = window.matchMedia( "(min-width: 612px)" );
	const mq2 = window.matchMedia("(max-width:992px)");
	if (mq.matches) {
		// window width is at least 992px
		var swiper = new Swiper('.swiper-container', {
			slidesPerView: 3,
      		spaceBetween: 30,
			grabCursor: true,
			centeredSlides: true,
			slidesPerView: 'auto',
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
		});
	} else if (mq1.matches){
		// window width is at least 612px
		var swiper = new Swiper('.swiper-container', {
			slidesPerView: 3,
      		spaceBetween: 30,
			grabCursor: true,
			centeredSlides: true,
			slidesPerView: 'auto',
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
		});
	}else {
		// window width is less than 612px
		var swiper = new Swiper('.swiper-container', {
			slidesPerView: 3,
      		spaceBetween: 30,
			grabCursor: true,
			centeredSlides: true,
			slidesPerView: 'auto',
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
		});
	};
function reintializeSwipers(noofslides,mq,mq1,mq2){
	if (mq.matches && noofslides>2) {
		// window width is at least 992px
		 swiper = new Swiper('.swiper-container', {
			effect: 'coverflow',
			grabCursor: true,
			centeredSlides: true,
			slidesPerView: 'auto',
			coverflowEffect: {
			rotate: 50,
			stretch: 0,
			depth: 100,
			modifier: 1,
			slideShadows : true,
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
		});
	}else if(mq.matches && noofslides==2){
		// window width is at least 992px
		swiper = new Swiper('.swiper-container', {
			effect: 'coverflow',
			grabCursor: true,
			centeredSlides: true,
			slidesPerView: 'auto',
			coverflowEffect: {
			rotate: 50,
			stretch: 0,
			depth: 100,
			modifier: 1,
			slideShadows : true,
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
		});
	}else if(mq.matches && noofslides==1){
		// window width is at least 992px
		 swiper = new Swiper('.swiper-container', {
			effect: 'coverflow',
			grabCursor: true,
			centeredSlides: true,
			slidesPerView: 'auto',
			coverflowEffect: {
			rotate: 50,
			stretch: 0,
			depth: 100,
			modifier: 1,
			slideShadows : true,
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
		});
	}else if (mq1.matches && noofslides>1){
		// window width is at least 612px
		 swiper = new Swiper('.swiper-container', {
			effect: 'coverflow',
			grabCursor: true,
			centeredSlides: true,
			slidesPerView: 'auto',
			coverflowEffect: {
			rotate: 50,
			stretch: 0,
			depth: 100,
			modifier: 1,
			slideShadows : true,
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
		});
	}else {
		// window width is less than 612px
		 swiper = new Swiper('.swiper-container', {
			effect: 'coverflow',
			grabCursor: true,
			centeredSlides: true,
			slidesPerView: 'auto',
			coverflowEffect: {
			rotate: 50,
			stretch: 0,
			depth: 100,
			modifier: 1,
			slideShadows : true,
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
		});
	};
	//console.log(noofslides)
	swiper.update()
}