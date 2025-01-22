// JavaScript Document

/****initialize aboutproject screen****/
/***get the video and html from db/json***/
function playsound()
{
param=localStorage.getItem("datafolderpath")+'abouts/sounds/about_project.mp3';
$("#audcont").prop("src","");
$("#audcont").prop("src",param);
$("#audcont").play();
}

$(document).ready(function(e) {
	$("#video_player_intro").prop("src",localStorage.getItem("datafolderpath")+'abouts/videos/about_project.webm');
	console.log(localStorage.getItem("datafolderpath")+'abouts/videos/about_project.webm');
	/***when user submit the form***/
	$(document).on('click', '#q',function(event){

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