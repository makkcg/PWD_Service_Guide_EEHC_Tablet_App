// JavaScript Documentfunction NewTalk()
////local storage data folder pathname
var mySwiper = new  Swiper ('.swiper-container', {
						// Optional parameters
						direction: 'vertical',
						slidesPerView: 1,
						mousewheel: false,
						
                        loop: true,
                        reverseDirection: true,
						
						
                  
					});
					
	
								
var picscol1;
var picscol2;
var picscol3;

function initialize_swipers(){
	
 var mySwiper = new Swiper ('.swiper-container', {
						// Optional parameters
						direction: 'vertical',
						slidesPerView: 1,
						mousewheel: false,
						loop: true,
                        reverseDirection: true,
						
                 
					});
			
			 		
}

function WriteCol1Word(param)
{
	var ss=$("#deaf_pics_txt").val();
	if($("#deaf_pics_txt").val()!="") ss=ss + " " + picscol1[param].word;
	else  ss=picscol1[param].word;
	$("#deaf_pics_txt").val(ss);
}



function WriteCol2Word(param)
{
	var ss=$("#deaf_pics_txt").val();
	if($("#deaf_pics_txt").val()!="") ss=ss + " " + picscol2[param].word;
	else  ss=picscol2[param].word;
	$("#deaf_pics_txt").val(ss);
}

function WriteCol3Word(param)
{
	var ss=$("#deaf_pics_txt").val();
	if($("#deaf_pics_txt").val()!="") ss=ss + " " + picscol3[param].word;
	else  ss=picscol3[param].word;
	$("#deaf_pics_txt").val(ss);
}

function fillColumnsData(col1json,col2json,col3json){
	/////fill column1
	$(".swiper-container-col1 .swiper-slide").remove()
	var col_all_slides='';
	var col_slide='';
	picscol1=col1json
	console.log(col1json)
	for(var i=0;i<col1json.length;i++){
		
		//col_slide='<div class=" swiper-slide" id="colpic~'+i+'" ><div class="col-xs-12 col-md-12 col-lg-12"><a onclick="WriteCol1Word('+i+')" class="col-xs-12 col-md-12 col-lg-12 slide_pics_div"><img class="slide_pics img-responsive" src = "'+datafolderpath+'pics/col1/'+col1json[i].pic+'" alt="'+col1json[i].word+'"  /></a><div class="col-xs-9 col-md-9 col-lg-9 slide_txt" onclick="WriteCol1Word('+i+')">'+col1json[i].word+'</div><div class="col-xs-3 col-md-3 col-lg-3 slide_sign_btn"><button type="button" class="btn btn-default slide-icons-signvid-pics" onclick="play_sign_video_sentence(\''+datafolderpath+'pics/col1/'+col1json[i].vid+'\',\''+picscol1[i].word+'\',1,'+i+')"><img alt="" title="ترجم للغة الاشارة"  src="img/signvideoicon.png"   class="img-responsive"></button></div></div></div>'
		col_all_slides=col_all_slides+col_slide
		
		col_slide='<div class="col-12 swiper-slide rounded2" id="colpic~'+i+'" ><div class="row"><a onclick="WriteCol1Word('+i+')" class="col-12 slide_pics_div"><img class="slide_pics rounded img-fluid" src = "'+datafolderpath+'pics/col1/'+col1json[i].pic+'" alt="'+picscol1[i].word+'"  /></a><div class="col-9 slide_txt" onclick="WriteCol1Word('+i+')">'+col1json[i].word+'</div><div class="col-3 slide_sign_btn"><button type="button" class="btn btn-default signvideo_btn slide-icons-signvid-pics img-fluid" data-signvid="'+datafolderpath+'pics/col1/'+col1json[i].vid+'" ><img alt="" title="ترجم للغة الاشارة"  src="imgs/signvideoicon.png"   class="rounded img-fluid"></button></div></div></div>'
		
	}
	$(".swiper-container-col1").append(col_all_slides)
	
	/////fill column2
	$(".swiper-container-col2 .swiper-slide").remove()
	var col_all_slides='';
	var col_slide='';
	picscol2=col2json
	for(var i=0;i<picscol2.length;i++){
		//col_slide='<div class=" swiper-slide" id="colpic~'+i+'" ><div class="col-xs-12 col-md-12 col-lg-12"><a onclick="WriteCol2Word('+i+')" class="col-xs-12 col-md-12 col-lg-12 slide_pics_div"><img class="slide_pics img-responsive" src = "'+datafolderpath+'pics/col2/'+picscol2[i].pic+'" alt="'+picscol2[i].word+'"  /></a><div class="col-xs-9 col-md-9 col-lg-9 slide_txt" onclick="WriteCol2Word('+i+')">'+picscol2[i].word+'</div><div class="col-xs-3 col-md-3 col-lg-3 slide_sign_btn"><button type="button" class="btn btn-default slide-icons-signvid-pics" onclick="play_sign_video_sentence(\''+datafolderpath+'pics/col2/'+picscol2[i].vid+'\',\''+picscol2[i].word+'\',2,'+i+')"><img alt="" title="ترجم للغة الاشارة"  src="img/signvideoicon.png"   class="img-responsive"></button></div></div></div>'
		
		col_slide='<div class="col-12 swiper-slide rounded2" id="colpic~'+i+'" ><div class="row"><a onclick="WriteCol2Word('+i+')" class="col-12 slide_pics_div"><img class="slide_pics rounded img-fluid" src = "'+datafolderpath+'pics/col2/'+col2json[i].pic+'" alt="'+picscol2[i].word+'"  /></a><div class="col-9 slide_txt" onclick="WriteCol2Word('+i+')">'+col2json[i].word+'</div><div class="col-3 slide_sign_btn"><button type="button" class="btn btn-default signvideo_btn slide-icons-signvid-pics img-fluid" data-signvid="'+datafolderpath+'pics/col2/'+col2json[i].vid+'" ><img alt="" title="ترجم للغة الاشارة"  src="imgs/signvideoicon.png"   class="rounded img-fluid"></button></div></div></div>'
		
		col_all_slides=col_all_slides+col_slide
	}
	$(".swiper-container-col2").append(col_all_slides)
	
	/////fill column3
	$(".swiper-container-col3 .swiper-slide").remove()
	var col_all_slides='';
	var col_slide='';
	picscol3=col3json
	for(var i=0;i<picscol3.length;i++){
		//col_slide='<div class=" swiper-slide" id="colpic~'+i+'" ><div class="col-xs-12 col-md-12 col-lg-12"><a onclick="WriteCol3Word('+i+')" class="col-xs-12 col-md-12 col-lg-12 slide_pics_div"><img class="slide_pics img-responsive" src = "'+datafolderpath+'pics/col3/'+picscol3[i].pic+'" alt="'+picscol3[i].word+'"  /></a><div class="col-xs-9 col-md-9 col-lg-9 slide_txt" onclick="WriteCol3Word('+i+')">'+picscol3[i].word+'</div><div class="col-xs-3 col-md-3 col-lg-3 slide_sign_btn"><button type="button" class="btn btn-default slide-icons-signvid-pics" onclick="play_sign_video_sentence(\''+datafolderpath+'pics/col3/'+picscol3[i].vid+'\',\''+picscol3[i].word+'\',3,'+i+')"><img alt="" title="ترجم للغة الاشارة"  src="img/signvideoicon.png"   class="img-responsive"></button></div></div></div>'
		
		col_slide='<div class="col-12 swiper-slide rounded2" id="colpic~'+i+'" ><div class="row"><a onclick="WriteCol3Word('+i+')" class="col-12 slide_pics_div"><img class="slide_pics rounded img-fluid" src = "'+datafolderpath+'pics/col3/'+col3json[i].pic+'" alt="'+picscol3[i].word+'"  /></a><div class="col-9 slide_txt" onclick="WriteCol3Word('+i+')">'+col3json[i].word+'</div><div class="col-3 slide_sign_btn"><button type="button" class="btn btn-default signvideo_btn slide-icons-signvid-pics img-fluid" data-signvid="'+datafolderpath+'pics/col3/'+col3json[i].vid+'" ><img alt="" title="ترجم للغة الاشارة"  src="imgs/signvideoicon.png"   class="rounded img-fluid"></button></div></div></div>'
		
		col_all_slides=col_all_slides+col_slide
	}
	$(".swiper-container-col3").append(col_all_slides)
	
	$(".swiper-container").css("max-height",parseInt(window.innerHeight)-parseInt($(".bottomtable").css("height"))-270)
	//initialize_swipers()
	//$(".slide_pics").css("max-height",(parseInt($(".swiper-slide").css("height"))/1));
	mySwiper[0].update();
	mySwiper[1].update();
	mySwiper[2].update();

	//mySwiper2.update();
	//mySwiper3.update();
	
}

////function to play attached video with the sentence if exist , if not exist it will use the translation service to translate the text into signText
function play_sign_video_sentence(videofilepath,sentence,col,piccol_index){
	//console.log(videofilepath)
	//console.log(sentence)
	//console.log(col)
	//console.log(piccol_index)
	var isvideo=false;
	var str="";
	var videofile="";
	switch(col){
		case 1:
		console.log(picscol1[piccol_index])
		if(picscol1[piccol_index].vid!=""){
			isvideo=true;
			videofile=picscol1[piccol_index].vid
		}
		str=picscol1[piccol_index].word
		
		break;
		case 2:
		console.log(picscol2[piccol_index])
		if(picscol2[piccol_index].vid!=""){
			isvideo=true;
			videofile=picscol2[piccol_index].vid
		}
		str=picscol2[piccol_index].word
		break;
		case 3:
		console.log(picscol3[piccol_index])
		if(picscol3[piccol_index].vid!=""){
			isvideo=true;
			videofile=picscol3[piccol_index].vid
		}
		str=picscol3[piccol_index].word
		break;
	}
	console.log(str)
	///if there is a video , load it to the video popup and play it else use the translation service
	if(isvideo){
		///play the video file
		localStorage.setItem("vapath_pics","");
		document.getElementById("video_player_pop_pics").src=videofilepath //.replace(".3gp",".webm");
		
		if($('#video_player_pop_pics').attr("src")=="" ){
			$('#video_player_pop_pics').trigger('pause');
			$('#video_popup_pics').modal('hide');
		}else{
			$('#video_popup_pics').modal(true);
			document.getElementById("video_player_pop_pics").play();
		}
	}else{
		///use the signlanguage dic service to translate 
		PlaySign_pics(str)
	}
	
}

//////////////////////////////////////////////////////////////////////////
function PlaySign_pics(str){
	 console.log(str)
	var sss=str;
	for (var i=0;i<1000;i++) sss=sss.replace("  "," ");
	console.log(sss)
	for (var i=0;i<1000;i++) sss=sss.replace(" ",",");
	  console.log(sss)
	$.ajax({
			url:  'http://169.50.5.146/deaf_service_apps/services/videospell.php',
			data: {val1:sss},
			dataType: 'jsonp',
			jsonp: 'callback',
			jsonpCallback: 'StoreVideoPaths_pics',
			success: function(){
								//alert("success");
							},
	timeout: 10000,
	error: function(jqXHR, textStatus, errorThrown) {
					if(textStatus==="timeout") {
						//do something on timeout
						$(".loaderoverlay").hide(); alert('لايوجد اتصال بالانترنت , او توجد مشكلة في الاتصال بالخادم');
					} 
			}      				
	}).fail(function() { $(".loaderoverlay").hide(); alert('لايوجد اتصال بالانترنت , او توجد مشكلة في الاتصال بالخادم'); });

}
 ////////////////////////////////////////////////////////////////////////////
function StoreVideoPaths_pics(data) {
	var temp="";
	var tex="";
	for(var i=0; i<data.videos.length;i++){
	  
		if(temp==""){
			temp=data.videos[i]["vpath"];
			tex=  data.videos[i]["txt"]; 
		}else{
			temp=temp+"~"+data.videos[i]["vpath"];
	        tex= tex + "~" + data.videos[i]["txt"]; 
		}
	}
		localStorage.setItem("vapath_pics",temp);
		localStorage.setItem("txt_pics",tex);
		localStorage.setItem("vindex_pics","0");
		MoreVideos_pics();
}
 ///////////////////////////////////////////////////////////////////////
function  MoreVideos_pics()
{
var temp=localStorage.getItem("vapath_pics");
var tex=localStorage.getItem("txt_pics");
var vindex=localStorage.getItem("vindex_pics");
var videos=[];
var textees=[];
if(temp.indexOf("~"))
{videos=temp.split("~");textees=tex.split("~");}
else 
{
videos[0]=temp;
textees[0]=tex;
}
var j= parseInt(vindex,10);

if(j<videos.length){
	document.getElementById("video_player_pop_pics").src=videos[j].replace(".3gp",".webm");
	if($('#video_player_pop_pics').attr("src")=="" ){
		$('#video_player_pop_pics').trigger('pause');
		$('#video_popup_pics').modal('hide');
	}else{
		localStorage.setItem("vindex_pics",j+1);
		$('#video_popup_pics').modal(true);
		//document.getElementById("video_player_pop_pics").play();
		$('#video_player_pop_pics').trigger('play');
	}
}
}
 /////////////////////////////////////////////////////////////////////////////

$(document).ready(function(e) {
	
	//fillCols();
	$("#btnclientsend").click(function(e) {
        if($("#deaf_pics_txt").val()!="")
		{
		var ss=$("#deaf_pics_txt").val();
		 PlaySign_pics(ss);
		}
    });
	
	$("#btnclear").click(function(e) {
        $("#deaf_pics_txt").val("");
    });
	$("#btnreturn").click(function(e) {
       /* window.location.replace("chat.html");*/
		if($("#deaf_pics_txt").val()!=""){
			$("#clienttxt").val($("#deaf_pics_txt").val())
		}else{
		    $("#clienttxt").val("")
		}
		$('#images_popup').modal("hide")
    });
	
	$("#video_popup_pics").on("hidden.bs.modal", function () {
		console.log("close of video modal is done")
		localStorage.setItem("vapath_pics","");
		localStorage.setItem("txt_pics","");
		localStorage.setItem("vindex_pics","0");
		$('#video_player_pop_pics').trigger('pause');
	});

	$.getJSON(datafolderpath+"jsons/cols.js", function(colsjson){
		col1json=colsjson.col1
		col2json=colsjson.col2
		col3json=colsjson.col3
		fillColumnsData(col1json,col2json,col3json)
			   
	});
	
});