// JavaScript Document
function playsound(param)
{
console.log(param);
$("#audcont").prop("src","");
$("#audcont").prop("src",param);
//$("#audcont").play();
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
		
		var titleofpage="";
		
		if( (mainserviceid>0 && subserviceid>0) || (typeof mainserviceid!='undefined' && typeof subserviceid!='undefined') || (mainserviceid!=null && subserviceid!=null)){
			var mainserviceOBJ=DataClass.get_service_obj_byid(mainserviceid,DataClass.DataJSON.data.allservices);
			var subserviceOBJ=DataClass.get_service_obj_byid(subserviceid,mainserviceOBJ[0].sub_services);
				titleofpage="<a href='services.html?mainserviceID="+mainserviceid+"'>"+mainserviceOBJ[0].title+"</a> -> <a href='subservices.html?mainserviceID="+mainserviceid+"&serviceID="+subserviceid+"'>"+subserviceOBJ[0].title+"</a>"
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
		
		if(typeof mainserviceid=="undefiend" || mainserviceid=="null" || mainserviceid==null || mainserviceid<1 ){
			mainserviceid=0
		}
		if(typeof subserviceid=="undefiend" || subserviceid=="null" || subserviceid==null || subserviceid<1 ){
			subserviceid=0
		}

		/////load all sub services of service id parsed through url
		var mainserviceOBJ=DataClass.get_service_obj_byid(mainserviceid,DataClass.DataJSON.data.allservices);
		var subserviceOBJ=DataClass.get_service_obj_byid(subserviceid,mainserviceOBJ[0].sub_services);
		all_sub_services=subserviceOBJ[0].sub_sub_services
		////console.log(all_sub_services)
		$(".swiper-wrapper").children().remove()
		for(i=0;i<all_sub_services.length;i++){
			var service_obj=all_sub_services[i];
			////console.log(service_obj)
			var service_has_subservice=service_obj.has_subservice
			var service_video=DataFolderPath+service_obj.vids[0];
			////console.log(service_video)
			var service_imgs_str=JSON.stringify(service_obj.imgs);
			var service_main_img=DataFolderPath+service_obj.imgs[0]
			//var num_of_sub_services=service_obj.sub_services.length
			var service_title=service_obj.title
			var service_desc=service_obj.desc
			//console.log(service_desc)
			var service_id=service_obj.id
			var enter_url="services.html"
			////if the main service has sub services go to sub-services.html, else go to servicedetails.html
			if(service_has_subservice==0){
				/***if their is no faqs or docs, or conds, or offers, or procedurs then hide the enter btn***/
				var faqslentgh=service_obj.faqs.length
				var proclenth=service_obj.procedures.length
				var docslength=service_obj.docs.length
				var condslenth=0;//service_obj.conds.length
				var hideenterkey=0
				
				if(faqslentgh<1 && proclenth<1 && docslength<1 && condslenth<1){
						hideenterkey=1
						//enter_url="servicedetails.html?mainserviceID="+mainserviceid+"&serviceID="+service_id+"&sub_serviceID=0"
						enter_url="#"
				}else{
						hideenterkey=0
						
						enter_url="servicedetails.html?mainserviceID="+mainserviceid+"&serviceID="+subserviceid+"&sub_serviceID="+service_id
				}
				
			}else{
				enter_url="subservice.html?mainserviceID="+mainserviceid+"&serviceID="+subserviceid
			}
			
			
			////slide html
			
			service_slide='<!-- Slides --><div class="swiper-slide "><div class="ContentOfentities rounded"><div class="row justify-content-center align-items-center"><div class="col-9 d-flex justify-content-center align-items-center"><h4>'+service_title+'</h4></div><div class="col-3 d-flex justify-content-center align-items-center"><a href="'+enter_url+'" type="button" class="btn btn-default slide-icons-signvid enterbtn img-fluid" data-hideenter="'+hideenterkey+'"><img alt="" title="دخول للخدمة" src="imgs/enter.png" class="rounded img-fluid"></a></div></div><div class="col-12 service-img-container rounded d-flex justify-content-center align-items-center"><a href="'+enter_url+'" target="_self"><img class="PicContent rounded mx-auto d-block img-fluid" src="'+service_main_img+'" data-imgs="'+service_main_img+'"></a></div><div class="row justify-content-center align-items-center"><div class="col-12" style="height:90px !importnat;"><div class="d-flex justify-content-center align-items-center service_slide_txt_container viewport"><div class="service_slide_txt ">'+service_desc+'</div></div><!---End viewport--></div><div class="col-12 d-flex justify-content-center align-items-center signbtn_container" style="direction:ltr;width:100%"><button type="button" class="btn btn-default signvideo_btn slide-icons-signvid img-fluid" data-video="'+service_video+'"><img alt="" title="ترجم للغة الاشارة" src="imgs/signvideoicon.png" class="rounded img-fluid" style="margin-right:7em;"></button><a  onclick="playsound(\''+service_video.replace(".webm",".mp3").replace("videos","sounds")+'\')"><img alt="" title="إذاعة صوت" src="imgs/sound.png" class="rounded img-fluid"></a></div></div></div></div><!----END Slide--->';

			$(".swiper-wrapper").append(service_slide)
		}
		$(".ContentOfentities a.enterbtn[data-hideenter=1]").hide()
		//reintializeSwipers(all_sub_services.length,mq,mq1,mq2)
		swiper.update();
		$('.service_slide_txt_container').slimscroll({
		alwaysVisible: false
	});
		set_page_title_forsubserv()
};///end start loading page function


/***initialize swiper***/
//// TO be moved for all files that include scrolls
	/////////////////////////////////
	const mq = window.matchMedia( "(min-width: 992px)" );
	const mq1 = window.matchMedia( "(min-width: 612px)" );
	const mq2 = window.matchMedia("(max-width:992px)");
	if (mq.matches) {
		// window width is at least 992px
		var swiper = new Swiper('.swiper-container', {
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
				swiper.on('slideChange', function () {
  console.log('slide changed');
 $("#audcont").prop("src","");
});
	} else if (mq1.matches){
		// window width is at least 612px
		var swiper = new Swiper('.swiper-container', {
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
			swiper.on('slideChange', function () {
  console.log('slide changed');
 $("#audcont").prop("src","");
});
	
	}else {
		// window width is less than 612px
		var swiper = new Swiper('.swiper-container', {
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
		
				swiper.on('slideChange', function () {
  console.log('slide changed');
 $("#audcont").prop("src","");
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
		swiper.slideNext()
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
	//console.log("number of slides "+noofslides+" ")
	swiper.update()
}	

$(document).ready(function(e) {
	$(window).bind('beforeunload', function(){
    $("#audcont").prop("src","");
    return;
   });
	/***initialize controls and variablse ***/
	
	/***initialize swiper**/
	if (mq.matches) {
		swiper.slideNext()
	}
	/**initialize slider txt scrollbar***/
	/*setInterval(function(){
		$('.service_slide_txt_container').slimscroll();
	}, 1000);*/

	$('.service_slide_txt_container').slimscroll({
		alwaysVisible: false
	});
	
	///click on sign video button for each main service
	$(document).on('click', '.slide-icons-signvid',function(event){
		signvideo= $(this).data("video");
		/*****the next line should be changed based on data from the JSON**/
		fullpath_signvideo=serverdataurl+signvideo;
		fullpath_signvideo=localdataurl+signvideo;
		//console.log(signvideo);
		
		//var pageobj=DataClass.getpagesignvideo(currentpage,DataClass.DataJSON.data.pages_info)
		//var videofile=pageobj[0].video
		
		var vid = document.getElementById("video_player_pop"); 
		//vid.src=DataFolderPath+videofile;
		/*****the next line should be changed based on data from the JSON**/
		vid.src="videos/1.webm";
		$("#video_popup").modal();
		vid.play()
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
	/****re initialize the controls***/
	$('.service_slide_txt_container').slimscroll();3
	$('#services_swiper .service_slide_txt').show();
});/*****end doc ready***/