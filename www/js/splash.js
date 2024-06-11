// JavaScript Document
var hh;
function ChecSetting()
{
	clearTimeout(hh);
	window.location.replace("home.html");
	
}

$(document).ready(function(e) {
    hh=setTimeout( "ChecSetting()",7000);
});