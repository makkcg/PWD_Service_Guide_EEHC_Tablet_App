// JavaScript Document

/****initialize complain done screen****/


$(document).ready(function(e) {
	/***get the returned complain ID***/
	var complainid= GetURLParameter("complainid");
	/***show the complain id for the user***/
	
	$(".complainID").html(complainid)

});/*****end doc ready***/