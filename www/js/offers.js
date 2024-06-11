// JavaScript Document

/****initialize offers screen****/
/***get the video and html from db/json***/


$(document).ready(function(e) {
	setTimeout(function(){ window.location.replace("registeruser.html"); }, 2000);
	
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