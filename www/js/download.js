var handler;
var DownloadType="";
var DeviceReaydy=false;
var selectedSound="0";
var gender="0";
var onlineFlag=true;
var fsize=512*1024*1024;
var failflag=false;
//var progress=0;
 var fileTransfer;
 //////////////////////////////////////////////////////////////////////////
function downloadFile(filename,destfile) {

var ccc  =localStorage.getItem("datafileno");
var num=parseInt(ccc,10)+1;
var fn=localStorage.getItem("filescount");
var fno=parseInt(fn,10)+1;
$("#counterspan").html(num+"/"+fno);		
//this function down load zip file and call unzip function to un zip it
// create file transfer object
   fileTransfer = new FileTransfer();
   //set the showing download progress function
   fileTransfer.onprogress = DownloadProgress;
   var uri = encodeURI(filename); //prepare address of zip we want to download
   var fileURL = destfile; // set the path in which the zip file will be downloaded in
console.log("src:"+filename);
console.log("dest:"+destfile);
fileTransfer.download( uri, fileURL, DownloadSuccess,DownloadFail,false, { headers: {"Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="}});
}
////////////////////////////////////////////////////////////////////////////////////////////////////////
function DownloadProgress(result){
     //this function show the progress of the downloading file
	 
	 var percent =  (result.loaded / fsize) *100;
	 if (percent>95) percent=95;
	 console.log("result.loaded:"+result.loaded);
	 console.log("size:"+fsize);
	 //calculate ratio of downloaded 
     percent = Math.round(percent);
     console.log('Downloaded:  ' + percent + '%'); 
	 // update downloading progrees bar 
	 
	 //if(progress>99) progress=99;
	 var temp="<div class='progress-bar progress-bar-success progress-bar-striped active' role='progressbar' aria-valuenow='"+percent+"' aria-valuemin='0' aria-valuemax='100' style='width:"+percent+"%'>"+percent+"%</div>";
	   $("#bardiv").html(temp);
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////
function DownloadSuccess(entry) {
//event fire when download is completed
         console.log("download complete: " + entry.toURL());
				 //save the path of downloaded file
		
		var respath=localStorage.getItem("datafolderpath");
		$("#divalert").html("<strong>من فضلك إنتظر حتى يتم التنصيب</strong>") ;
		localStorage.setItem("zipfile",entry.toURL());
		 handler=setTimeout(function() {UnZipIt( entry.toURL(),respath);},7000);
	
		 console.log("unzip path:" + respath);
      }
////////////////////////////////////////////////////////////////////////////////////////////////////////
function DownloadFail(error){
	
	// event fires when downloading fail
	    fileTransfer.abort();
		//******* 24_7_2018********//failflag=true;
         handler=setTimeout(DelFile, 5000);
		var msg='<div style="font-size:16px;"><p>خطأ أثناء التحميل - سيتم إعادة التحميل مرة أخرى</p>' ;
//prepare error dialog
         console.log("download error: " +  error.code);
			//******* 24_7_2018********//$("#divalert").html('<strong style="color:red;">حدث خطأ أثناء التحميل سيتم إعادة المحاولة المرة القادمة</strong>') ;

      } /////////////////////////////////////////////////////////////////////////////////////////////////////////	  
function UnZipIt(PathToFileInString,PathToResultZip  )
{
	clearTimeout(handler);
	console.log("Start unzip");
	//unzip function 
 zip.unzip(PathToFileInString,PathToResultZip,UnzipSuccess,UnzipProgress);
}
///////////////////////////////////////////////////////////////////////////////////////////
function UnzipSuccess(status){
	if(status == 0){
	
       console.log("unzip:Wow everything goes good, but just in case verify data.success ");
	   
	   var ccc  =localStorage.getItem("datafileno");
	   	var datafileno=parseInt(ccc,10);
		
			 console.log('data file'+ccc+': unzipped: 100 %'); 
			
			datafileno=datafileno+1;
			localStorage.setItem("datafileno",datafileno);
			 handler=setTimeout(DelFile,30000);
	   
	}
	else if(status == -1){
//		console.log("unzip error:"+error);
       
  //       console.log("unzip error: " +  error.code);
		 $("#divalert").html('<strong style="color:red;">حدث خطأ أثناء التنصيب سيتم إعادة المحاولة المرة القادمة</strong>') ;
		
		   failflag=true;
		   handler=setTimeout(DelFile, 15000);
		
	}
	
    }
///////////////////////////////////////////////////////////////////////////////////////	
	function 	UnzipProgress(progressEvent) {
	
	var percent =  progressEvent.loaded / progressEvent.total * 100;
	 //calculate ratio of downloaded 
     percent = Math.round(percent);
     console.log('unzip:  ' + percent + '%'); 
	 // update downloading progrees bar 
	 var temp="<div class='progress-bar progress-bar-success progress-bar-striped active' role='progressbar' aria-valuenow='"+percent+"' aria-valemin='0' aria-valuemax='100' style='width:"+percent+"%'>"+percent+"%</div>";
	   $("#bardiv").html(temp);
	
	
	  // if(percent==100) 
//	   	   {
//	   
//		var ccc  =localStorage.getItem("datafileno");
//		var datafileno=parseInt(ccc,10);
//		
//			 console.log('data file'+ccc+': unzipped: 100 %'); 
//			
//			datafileno=datafileno+1;
//			localStorage.setItem("datafileno",datafileno);
//			 handler=setTimeout(DelFile, 7000);
//			
//		
//		
//		
//	   }
	 
	   
}
///////////////////////////////////////////////////////////////////////////////////////////////
function DelFile()
{
	var filetodel="";	
if (localStorage.getItem("filetodel")!="none")
{
	filetodel=localStorage.getItem("filetodel");
	DeleteFile(filetodel);
}
localStorage.setItem("filetodel",localStorage.getItem("zipfile"));

	console.log("Begin Delete zip file");
	if(!failflag) {
	    var fcc= localStorage.getItem("filescount");
		var filescount=parseInt(fcc,10);
		var ccc  =localStorage.getItem("datafileno");
		var datafileno=parseInt(ccc,10);
		if(datafileno<=filescount) StartDownload();
         else{
		   console.log('unzipped: 100 %'); 	   
	      localStorage.setItem('update_id','2022-01-31 13:24:05');
	      localStorage.setItem("Downloaded","done");
		   handler=setTimeout(GoHome(),7000);
		 }
	}
}
///////////////////////////////////////////////////////////////////////////////////////////////
function GoHome()
{
	window.plugins.insomnia.allowSleepAgain();
	if(failflag)  window.location.replace("login.html");
	else {
	console.log("unzip complete go home");
	clearTimeout(handler);
	//localStorage.setItem("downloading","none");
	 window.location.replace("main.html");
	}
}
////////////////////////////////////////////////////////////////////////////////////////////////
function onDeviceReady() {
	
	console.log("Device Ready");
	window.plugins.insomnia.keepAwake();
	//requesting file system object
	//document.addEventListener("online", onOnline, false);
	document.addEventListener("offline", onOffline, false);
    DeviceReaydy=true;
	//StartDownload();
     //var dsound=localStorage.getItem("downloading");
		  if(onlineFlag) StartDownload();
    }
//////////////////////////////////////////////////////////////////////////////////////////
	function onOffline()
	{
		onlineFlag=false;
	var msg='<div style="font-size:16px;"><p>الجهاز غير متصل بالإنترنت </p><p> لايمكن إستكمال عملية التنصيب</p>' ;

		 $("#dialogbody").html(msg);
		 $("#myModal").modal('show');	
	}
//////////////////////////////////////////////////////////////////////////////////////////
	function StartDownload() {
    // Handle the online event
    var networkState = navigator.connection.type;

    if (networkState !== Connection.NONE) {
       window.requestFileSystem(LocalFileSystem.PERSISTENT, 350 * 1024 * 1024, onFileSystemSuccess, onFileSystemFail);
      
    }
	else
	{
	var msg='<div style="font-size:16px;"><p>الجهاز غير متصل بالإنترنت </p><p> لايمكن إستكمال عملية التنصيب</p></div>' ;

		 $("#dialogbody").html(msg);
		 $("#myModal").modal('show');
		}
		}
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
 function onFileSystemSuccess(fileSystem) {
	    var filename="";
        console.log("file system:"+fileSystem.name);
		var temp=localStorage.getItem('settings');
	    // get user settings
		  console.log("setting:"+temp);
		var jsonObject =JSON.parse(temp);
	    //parse setting into object
		var ffname=jsonObject.datafile;
		var sarr=ffname.split("~");
		var fc=parseInt(sarr[1],10);
		var fname="";
		for (var i=0;i<=fc;i++)
		{
			if(fname=="") fname=sarr[0]+i+".zip";
			else fname=fname+","+sarr[0]+i+".zip";
		}
		var arrr=[];
		if(fname.indexOf(",")>0) arrr=fname.split(",");   
		else arrr[0]=fname;
		localStorage.setItem("filescount",arrr.length-1);
		var ccc  =localStorage.getItem("datafileno");
		var num=parseInt(ccc,10);
		
	   console.log("data file:"+arrr[num]);
		var destfile= fileSystem.root.toURL()+arrr[num];
		//localStorage.setItem("datafolderpath",fileSystem.root.toURL());
		localStorage.setItem("datafolderpath",cordova.file.dataDirectory);
		// set path in which you save your downloaded file
		console.log(destfile);
	
		//progress=0;
		filename="http://eehcaccessibility.com/tablet/zipfiles/"+arrr[num];
		console.log("file tto download:"+filename);
		//"+localStorage.getItem("downloading")+"/data.zip";
		///////////////////////////////23-7-2017 ////////////////////////////////
		GetDownloadSize(arrr[num],filename,destfile);
     // filename="https://kalamiapps.com/kalami_apps/downloads/"+localStorage.getItem("downloading")+"/data.zip";
	  
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////
function DownLoadpics()
{
	clearTimeout(handler);
	
	var Downloaded=localStorage.getItem("Downloaded");
	if(typeof Downloaded != 'undefined' && Downloaded!=null) { 
	
	if(Downloaded.indexOf("pics")>=0) 
	{
	GoHome();
	}
	else {localStorage.setItem("downloading","pics"); StartDownload();}
}
else {localStorage.setItem("downloading","pics"); StartDownload();}

}
//////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////
   // function onResolveSuccess(fileEntry) {
//        console.log(fileEntry.name);
//    }

 function onFileSystemFail(evt) {
        console.log(evt.target.error.code);
		console.log("no qouta return back to login");
		/////////////////////////////23-4-2007//////////////////
		 var msg='<div style="font-size:16px;"><p>لاتوجد مساحة كافية</p></div>' ;
      	 $("#dialogbody").html(msg);
		 $("#myModal").modal('show');
		 window.location.replace("login.html");
		
    }

   // function fail(evt) {
//        console.log(evt.target.error.code);
//    }
/////////////////////////////////////////added by  hany on 23-4-2017/////////////////
function GetDownloadSize(param,filename,destfile)
{
	$.get( "http://eehcaccessibility.com/tablet/zipfiles/getdownloadsize.php", { fname:param},function(data) { fsize=parseInt(data,10); console.log("fsize:"+fsize); 
	if(fsize>0) {
	 $("#divalert").html("<strong>من فضلك إنتظر حتى يتم التحميل</strong>");
	   $("#bardiv").show();
	    	downloadFile(filename,destfile);
	}
	else {
		var fcc= localStorage.getItem("filescount");
		var filescount=parseInt(fcc,10);
		var ccc  =localStorage.getItem("datafileno");
		var datafileno=parseInt(ccc,10);
		if(datafileno<filescount) {
			datafileno=datafileno+1;
			localStorage.setItem("datafileno",datafileno);
			StartDownload();
			}
	}
			
	});
	
}

////////////////////////////////////////////////////////////////////////////////////////////////
function DeleteFile(fpath) {

	clearTimeout(handler);
	var fname=fpath.substring(fpath.lastIndexOf("/")+1);
	fpath=fpath.substring(0,fpath.lastIndexOf("/"));
    window.resolveLocalFileSystemURL(fpath, function (dir) {

        dir.getFile(fname, {create: false}, function (fileEntry) {
            fileEntry.remove(function (file) {
                
            }, function () {
 				console.log("succeed to delete file");
			
               
            }, function () {
				console.log("fail to delete file");
                
            });
        });


    });
	

		
		

}

//////////////////////////////////////////////////////////////////////////////////
$(document).ready(function(e) {
	
	console.log("download page");

	document.addEventListener("deviceready", onDeviceReady, false);
    localStorage.setItem("datafileno","0");
	localStorage.setItem("filetodel","none");
	localStorage.setItem('update_id','2022-01-31 13:24:05');
	
});