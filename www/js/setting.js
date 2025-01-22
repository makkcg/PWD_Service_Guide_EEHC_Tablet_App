// JavaScript Document

var setOrder=0;

function InitializeSettings()
{
	var gg=localStorage.getItem("gender");
	if (typeof gg == 'undefined' || gg == null) 	localStorage.setItem("gender","1");
var ss=localStorage.getItem("sound");
	if (typeof ss == 'undefined' || ss == null) 	localStorage.setItem("sound","1");
	
	var ll=localStorage.getItem("level");
	if (typeof ll == 'undefined' || ll == null) 	localStorage.setItem("level","1");
	
	var dd=localStorage.getItem("disp");
	if (typeof dd == 'undefined' || dd == null) localStorage.setItem("disp","3");

    var pp=localStorage.getItem("picnum");
	if (typeof pp == 'undefined' || pp == null) localStorage.setItem("picnum","2");

gg=localStorage.getItem("gender");	
ss=localStorage.getItem("sound");
ll=localStorage.getItem("level");
dd=localStorage.getItem("disp");
pp=localStorage.getItem("picnum");

if(gg=="1") $("#optmale").prop("checked", true);
if(gg=="2") $("#optfemale").prop("checked", true);

if(ss=="1")	 $("#optboy").prop("checked", true);
if(ss=="3")	 $("#optman").prop("checked", true);
if(ss=="2")	 $("#optgirl").prop("checked", true);
if(ss=="4")	 $("#optwoman").prop("checked", true);

if(ll=="1")	 $("#optlevel1").prop("checked", true);
if(ll=="2")	 $("#optlevel2").prop("checked", true);
if(ll=="3")	 $("#optlevel3").prop("checked", true);
if(ll=="4")	 $("#optlevel4").prop("checked", true);

if(dd=="1")	 $("#opttext").prop("checked", true);
if(dd=="2")	 $("#optpic").prop("checked", true);
if(dd=="3")	 $("#opttextpic").prop("checked", true);

if(pp=="2")	 $("#optnum1").prop("checked", true);
if(pp=="4")	 $("#optnum2").prop("checked", true);
if(pp=="6")	 $("#optnum3").prop("checked", true);
if(pp=="8")	 $("#optnum4").prop("checked", true);
if(pp=="1000")	 $("#optnum5").prop("checked", true);

hideDivs();
if(localStorage.getItem("setting")=="down") {
setOrder=0;
$("#genderdiv").show();
}
if(localStorage.getItem("setting")=="up") {
setOrder=4;
$("#picdiv").show();
}
}

////////////////////////////////////////////////////////////////
function savegender()
{
	if($("#optmale").is(':checked'))  {localStorage.setItem("gender","1");localStorage.setItem("sound","1");}
	else  {localStorage.setItem("gender","2");localStorage.setItem("sound","2");}
}
//////////////////////////////////////////////////////////////////
function savesound()
{
	 if(localStorage.getItem("gender")=="1") if($("#optboy").is(':checked')) localStorage.setItem("sound","1");
	else  localStorage.setItem("sound","3");
	
	 if(localStorage.getItem("gender")=="2") if($("#optgirl").is(':checked')) localStorage.setItem("sound","2");
	else  localStorage.setItem("sound","4");
}
////////////////////////////////////////////////////////////////////////////////
function savelevel() {
	if($("#optlevel1").is(':checked'))  localStorage.setItem("level","1");
	if($("#optlevel2").is(':checked'))  localStorage.setItem("level","2");
	if($("#optlevel3").is(':checked'))  localStorage.setItem("level","3");
	if($("#optlevel4").is(':checked'))  localStorage.setItem("level","4");
}
//////////////////////////////////////////////////////////////////////////////
function savedisplay()
{
		if($("#opttext").is(':checked'))  localStorage.setItem("disp","1");
	    if($("#optpic").is(':checked'))  localStorage.setItem("disp","2");
		if($("#opttextpic").is(':checked'))  localStorage.setItem("disp","3");
}
//////////////////////////////////////////////////////////////////////////////
function savepicnum()
{
	if($("#optnum1").is(':checked'))  localStorage.setItem("picnum","2");
	if($("#optnum2").is(':checked'))  localStorage.setItem("picnum","4");
	if($("#optnum3").is(':checked'))  localStorage.setItem("picnum","6");
	if($("#optnum4").is(':checked'))  localStorage.setItem("picnum","9");
	if($("#optnum5").is(':checked'))  localStorage.setItem("picnum","1000");
}

///////////////////////////////////////////////////////////////////////////
function hideDivs() {
	$("#genderdiv").hide();
	$("#malesounddiv").hide();
	$("#femalesounddiv").hide();
	$("#leveldiv").hide();
	$("#displaydiv").hide();
	$("#picdiv").hide();
	
}

/////////////////////////////////////////////////////////////////////////////

$(document).ready(function(e) {
	
	InitializeSettings();
	
    $("#btnnext").click(function(e) {
		 hideDivs();
        setOrder++;
		switch(setOrder) 
		{ 
		
		case 0:$("#genderdiv").show(); break; 
		case 1: var xx=localStorage.getItem("gender");
				if(xx=="1") $("#malesounddiv").show();
				else{ $("#femalesounddiv").show(); 
				 if(localStorage.getItem("sound")!="2" && localStorage.getItem("sound")!="4")  $("#optgirl").prop("checked", true);
				}
		        break;
		case 2:  $("#leveldiv").show();break;
		case 3:  $("#displaydiv").show();break;
		case 4:  $("#picdiv").show();break;
		case 5: window.location.replace("capture.html");break;
		  }
		if(setOrder==1) $("#btnprev").show();
		  
    });
	
	$("#btnprev").click(function(e) {
		if(setOrder>0)
		{
		setOrder--;
         hideDivs();
        switch(setOrder) 
		{ 
		case 0:$("#genderdiv").show(); break; 
		case 1:if(localStorage.getItem("gender")=="1") $("#malesounddiv").show();               else $("#femalesounddiv").show(); break;
		case 2:  $("#leveldiv").show();break;
		case 3:  $("#displaydiv").show();break;
		case 4:  $("#picdiv").show();break;
		case 5:window.location.replace("capture.html");break;
		  }
		 
		}
		if(setOrder==0) $("#btnprev").hide();
    });
	
$("#optmale").change(function(e) {
   savegender();
    
});


$("#optfemale").change(function(e) {
     savegender(); 
});

$("#optboy").change(function(e) {
     savesound();
});

$("#optman").change(function(e) {
     savesound();
});

$("#optgirl").change(function(e) {
     savesound();
});

$("#optwoman").change(function(e) {
     savesound();
});

$("#optlevel1").change(function(e) {
     savelevel();
});

$("#optlevel2").change(function(e) {
     savelevel();
});

$("#optlevel3").change(function(e) {
     savelevel();
});

$("#optlevel4").change(function(e) {
     savelevel();
});

$("#opttext").change(function(e) {
     savedisplay();
});

$("#optpic").change(function(e) {
     savedisplay();
});

$("#opttextpic").change(function(e) {
     savedisplay();
});
$("#optnum1").change(function(e) {
    savepicnum();
});

$("#optnum2").change(function(e) {
    savepicnum();
});

$("#optnum3").change(function(e) {
    savepicnum();
});

$("#optnum4").change(function(e) {
    savepicnum();
});

$("#optnum5").change(function(e) {
    savepicnum();
});

});