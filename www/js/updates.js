var handler;
var DownloadType="";
var DeviceReaydy=false;
var selectedSound="0";
var gender="0";
var onlineFlag=true;
var fsize=1024*1024*20;
var updatepath="";
var update_id="";
var fileTransfer;
//var progress=0;
function downloadFile(filename,destfile) {
console.log("function: downloadFile");
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
	console.log("function: DownloadProgress"); 
	 var percent =  (result.loaded / fsize) *100;
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
	console.log("function: DownloadSuccess");
//event fire when download is completed
         console.log("download complete: " + entry.toURL());
		//localStorage.setItem("respath",entry.toURL().substr(0,entry.toURL().lastIndexOf("/")));
		 //save the path of downloaded file
		 var respath=localStorage.getItem("datafolderpath");
		$("#divalert").html("<strong>من فضلك إنتظر حتى يتم الانتهاء من تحديث البيانات</strong>") ;
		handler=setTimeout(function() {UnZipIt( entry.toURL(),respath);},7000);
		 //UnZipIt( entry.toURL(),respath);
		 //call unzip function
      }
////////////////////////////////////////////////////////////////////////////////////////////////////////
function DownloadFail(error){
	console.log("function: DownloadFail");
	// event fires when downloading fail
	
        var msg='<div style="font-size:16px;"><p>خطأ أثناء التحميل - سيتم إعادة التحميل مرة أخرى</p>' ;
//prepare error dialog
      //   console.log("download error: " +  error.code);
//		 $("#dialogbody").html(msg);
//		 $("#myModal").modal('show');
	$("#divalert").html('<strong style="color:red; ">حدث خطا أثناء تحميل التحديث سيتم إعادة المحاولة المرة القادمة</strong>');
		 //StartDownload();
		 fileTransfer.abort();
		  handler=setTimeout(DelFile, 7000);
		  	// window.location.replace("home.html");
		 //show error dialog
      } /////////////////////////////////////////////////////////////////////////////////////////////////////////	  
function UnZipIt(PathToFileInString,PathToResultZip  )
{
		clearTimeout(handler);
	console.log("function: UnZipIt");
	console.log("Start unzip");
	//unzip function 
   zip.unzip(PathToFileInString,PathToResultZip,UnzipSuccess,UnzipProgress);
}
///////////////////////////////////////////////////////////////////////////////////////////
function UnzipSuccess(){
		console.log("function: UnzipSuccess"); 
       console.log("unzip:Wow everything goes good, but just in case verify data.success ");
	   localStorage.setItem("update_id",update_id);
	  
	//   window.location.replace("home.html");
    }
////////////////////////////////////////////////////////////////////////////////////////////////
function UnzipFail(error){
	console.log("function: UnzipFail"); 
     //event fires when unziping downloaded file fail
		console.log("zip error:"+error);
        var msg='<div style="font-size:16px;"><p>خطأ أثناء التنصيب</p>';

		 $("#dialogbody").html(msg);
		 $("#myModal").modal('show');
		 	 window.location.replace("main.html");
    }
/////////////////////////////////////////////////////////////////////////////////////////////
function 	UnzipProgress(progressEvent) {
	console.log("function: UnzipProgress"); 
	var percent =  progressEvent.loaded / progressEvent.total * 100;
	 //calculate ratio of downloaded 
     percent = Math.round(percent);
     console.log('unzip:  ' + percent + '%'); 
	 // update downloading progrees bar 
	 var temp="<div class='progress-bar progress-bar-success progress-bar-striped active' role='progressbar' aria-valuenow='"+percent+"' aria-valemin='0' aria-valuemax='100' style='width:"+percent+"%'>"+percent+"%</div>";
	   $("#bardiv").html(temp);
	   if(percent==100) 
	   {
		   console.log('update_id:'+update_id);
		localStorage.setItem('update_id',update_id);
	   handler=setTimeout(DelFile, 7000);
	   }
	   
}
///////////////////////////////////////////////////////////////////////////////////////////////
function DelFile()
{
clearTimeout(handler);
console.log("function: DelFile"); 
	DeleteFile(localStorage.getItem("respath"),"data.zip");
	console.log("Begin Delete zip file");
}
///////////////////////////////////////////////////////////////////////////////////////////////
function GoHome()
{
	console.log("function: GoHome"); 
	console.log("unzip complete");
	clearTimeout(handler);
	localStorage.setItem("downloading","none");
	 window.location.replace("main.html");
}
////////////////////////////////////////////////////////////////////////////////////////////////
function onDeviceReady() {
	console.log("function: onDeviceReady"); 
	console.log("Device Ready");
	document.addEventListener("offline", onOffline, false);
	if(navigator.connection.type!="none") {
		console.log("conneced to internet");
		var temp=localStorage.getItem('settings');
	    // get user settings
		  console.log("setting:"+temp);
		var jsonObject =JSON.parse(temp);
	    //parse setting into object
	     var uid=jsonObject.id;
	//	var level= jsonObject.level;
	
//		console.log("level parse:"+level);
		var id=localStorage.getItem('update_id');
		console.log("update_id:"+id);
		
		//get user level
		
$.get( "http://eehcaccessibility.com/tablet/services/deafservice.php", { order:10, val1:uid},function(data) {
	console.log("data:"+data);
	if(isStopped(data)) alert("لقد تم وقف البرنامج إتصل بخدمة العملاء");
	else CheckUpdate();
});
   
 
	}
	else window.location.replace("main.html");
}

	//////////////////////////////////////////////////////////////////////
	function isStopped(param)
	{
		var zz=param.split(" ");
	    var ddd=zz[0].split("-");
		  //parse setting into object
		var exp_date=ddd[2]+"-"+ddd[1]+"-"+ddd[0];
		var mydate = new Date(ddd[0], ddd[1] - 1, ddd[2]); 
		
		var d = new Date().getTime() ;
		var dd=mydate.getTime();
		 console.log("now:"+d);
		 console.log("date:"+dd);
		 console.log("diff:"+(dd-d));
		 var expireFlag=false;
		if ((dd-d)>0)  expireFlag=false;
		else expireFlag=true;
		return expireFlag;
	}
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////
	function CheckUpdate(uid)
	{
			
		if(navigator.connection.type!="none") {
		console.log("conneced to internet");
		var temp=localStorage.getItem('settings');
	    // get user settings
		  console.log("setting:"+temp);
		var jsonObject =JSON.parse(temp);
	    //parse setting into object
	     var uid=jsonObject.id;
	//	var level= jsonObject.level;
	
//		console.log("level parse:"+level);
		var id=localStorage.getItem('update_id');
		console.log("update_id:"+id);
		
	    $.get( "http://eehcaccessibility.com/EEHC/public/checkUpdate", {},function(data) {
	    console.log("data:"+data);
	    if(data.trim()==localStorage.getItem('update_id')) window.location.replace("index.html");
     	else {
		
         
		update_id=data.trim();
		console.log("updtae_id--->2:"+update_id);
		updatepath="http://eehcaccessibility.com/EEHC/public/ElecZip.zip"; 
		console.log("updatepath:"+updatepath);
		console.log("fsize:"+fsize);
		//fsize=parseInt(ss[2],10);
		GetDownloadSize('ElecZip.zip');
		
		}
	
	});
		}
	else window.location.replace("index.html");
	}
//////////////////////////////////////////////////////////////////////////////////////////
	function onOffline()
	{
		console.log("function: onOffline"); 
		onlineFlag=false;
	var msg='<div style="font-size:16px;"><p>الجهاز غير متصل بالإنترنت </p><p> لايمكن إستكمال عملية التنصيب</p>' ;

		 $("#dialogbody").html(msg);
		 $("#myModal").modal('show');	
	}
//////////////////////////////////////////////////////////////////////////////////////////
	function StartDownload() {
		console.log("function: StartDownload"); 
    // Handle the online event
    var networkState = navigator.connection.type;

    if (networkState !== Connection.NONE) {
       window.requestFileSystem(LocalFileSystem.PERSISTENT, fsize, onFileSystemSuccess, onFileSystemFail);
      
    }
	else
	{
	var msg='<div style="font-size:16px;"><p>الجهاز غير متصل بالإنترنت </p><p> لايمكن إستكمال عملية التنصيب</p></div>' ;

		 $("#dialogbody").html(msg);
		 $("#myModal").modal('show');
		}
		}
/////////////////////////////////////////////////////////////////////////////////////////////////
 function onFileSystemSuccess(fileSystem) {
	 var filename="";
      console.log("function: onFileSystemSuccess"); 
		
		var destfile= fileSystem.root.toURL()+"data.zip";
		localStorage.setItem("respath", fileSystem.root.toURL());
		console.log("destination:" +destfile);
		
		filename=updatepath;
	
	  console.log("src:"+filename);
	   $("#divalert").html("<strong>يوجد تحديث جديد من فضلك إنتظر حتى يتم التحديث</strong>");
	   
	   $("#bardiv").show();
	    	downloadFile(filename,destfile);
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////
function DownLoadpics()
{
	 console.log("function: DownLoadpics"); 
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
	  console.log("function: onFileSystemFail"); 
        console.log(evt.target.error.code);
		/////////////////////////////23-4-2007//////////////////
		 var msg='<div style="font-size:16px;"><p>لاتوجد مساحة كافية</p></div>' ;
      	 $("#dialogbody").html(msg);
		 $("#myModal").modal('show');
		 window.location.replace("main.html");
		
    }

   // function fail(evt) {
//        console.log(evt.target.error.code);
//    }
/////////////////////////////////////////added by  hany on 23-4-2017/////////////////
function GetDownloadSize(fname)
{
	 console.log("function: GetDownloadSize");
$.get( "http://eehcaccessibility.com/EEHC/public/getdownloadsize.php", { fname:fname},function(data) { fsize=parseInt(data,10); console.log("fsize:"+fsize);
     if(fsize<1) window.location.replace("main.html");
	 else {
	$("#bardiv").show();
	$("#divalert").show();
	StartDownload();
	 }
	});
	
		
}

////////////////////////////////////////////////////////////////////////////////////////////////
function DeleteFile(fpath,fname) {
	
console.log("function: DeleteFile");
	clearTimeout(handler);
	
    window.resolveLocalFileSystemURL(fpath.substring(0, fpath.length-1), function (dir) {

        dir.getFile(fname, {create: false}, function (fileEntry) {
            fileEntry.remove(function (file) {
                
            }, function () {
 				console.log("succeed to delete file");
			
               
            }, function () {
				console.log("fail to delete file");
                
            });
        });


    });
 
	        handler=setTimeout(GoHome(),3000);
}

//////////////////////////////////////////////////////////////////////////////////
$(document).ready(function(e) {
console.log("function: (document).ready");
	document.addEventListener("deviceready", onDeviceReady, false);
			
	//document.addEventListener("deviceready", onDeviceReady, false);
    
	//var filename="https://makkcg.com/kalami/download/"+level+"/data.zip";
	


});