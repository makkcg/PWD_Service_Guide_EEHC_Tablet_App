// JavaScript Document

/****initialize main screen****/
/***in intialization we load the JSON and draw the screen for the main services***/

var hh;

function ChecSetting() {
    clearTimeout(hh);
    $(".wrapperpage").fadeOut(3000, function() {
        window.location.replace("main.html");
    });
}

$(document).ready(function(e) {


    $(".wrapperpage").fadeIn(3000, function() {
        hh = setTimeout("ChecSetting()", 2000);
    });

    $(".wrapperpage").click(function(e) {
        $(".wrapperpage").fadeOut(3000, function() {
            /*window.location.replace("main.html");*/
        });
    });

}); /*****end doc ready***/