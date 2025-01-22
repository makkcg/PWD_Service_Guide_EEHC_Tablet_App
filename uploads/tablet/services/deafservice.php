<?php
header('Content-Type: text/html; charset=utf-8');
/*****temporary for testing REMOVE when on server***/
header("Access-Control-Allow-Origin: *"); 
/*****************************************************/
$temp= $_REQUEST["order"];
$order=intval($temp);
$val1="";
$val2="";
$val3="";
$val4="";
$val5="";
$views="";
$mobile_site_folder="mobileapp";
if(isset($_REQUEST["val1"])) $val1=strval($_REQUEST["val1"]);
if( isset($_REQUEST['val2']) ) $val2=strval($_REQUEST["val2"]);
if( isset($_REQUEST['val3']) ) $val3=strval($_REQUEST["val3"]);
if( isset($_REQUEST['val4']) ) $val4=strval($_REQUEST["val4"]);
if( isset($_REQUEST['val5']) ) $val5=strval($_REQUEST["val5"]);
if( isset($_REQUEST['views']) ) $views=strval($_REQUEST["views"]);

switch ($order) {
case 1:isValidUser($val1,sha1($val2));break;
case 2:InsertTalk($val1,$val2,$val3,$val4);break;
case 3:InsertChat($val1,$val2,$val3,$val4);break;
case 4:isValidAndroidUser($val1,$val2,$val3,$val4);break;
case 5:GetFoundations();break;
case 6:GetBranches($val1);break;
case 7:GetUpdates();break;
case 8:GetFoundationsopt();break;
case 9:GetBranchesopt($val1);break;
case 10:GetExpDate($val1);break;
case 11:SaveComplain($val1,$val2,$val3,$val4);break;
case 12:GetComplains($val1);break;
/*case 13:GetReplies($val1);break;*/
case 13:GetReplies_json($val1,$mobile_site_folder);break;
case 14:SaveReply($val1,$val2);break;
case 15:GetLastUpdate();break;
case 16:GetLastUpdate2025($val1);break;
case 17:SaveStatistics($order,$views);break;
}
///saving statistics function 2025////
/*function SaveStatistics($statsData){
    	$datafile="";	$userinfo=new stdClass();
    	$datafile = json_encode($statsData);
    	
	    $mainServiceID = $datafile->srid;
	    $SubServiceID = $datafile->subsrid;
	    $SubSubServiceID = $datafile->subsubsrid;
	    $NoOfViews = $datafile->views;
	    $StatsSource = $datafile->source;
		
		echo json_encode($statsData);
}*/
function SaveStatistics($order,$statsData) {
     //header('Content-Type: application/json');
    // Decode the JSON payload received in $statsData
    $decodedStats = json_encode($statsData);
    
    //echo json_encode($order);
    die($decodedStats);
    // Initialize a response object
    $response = new stdClass();

    if ($decodedStats && is_array($decodedStats)) {
        // Prepare the response to include all received data
        $response->received = $decodedStats;

        // Optionally, you can log or process the data here
        foreach ($decodedStats as $stat) {
            $mainServiceID = $stat['srid'] ?? null;
            $SubServiceID = $stat['subsrid'] ?? null;
            $SubSubServiceID = $stat['subsubsrid'] ?? null;
            $NoOfViews = $stat['views'] ?? null;
            $StatsSource = $stat['source'] ?? null;

            // Example: Logging the received data (optional)
            error_log("Received stat: ServiceID=$mainServiceID, SubServiceID=$SubServiceID, SubSubServiceID=$SubSubServiceID, Views=$NoOfViews, Source=$StatsSource");
        }

        // Set a success message
        $response->status = "success";
        $response->message = "Statistics data received successfully.";
    } else {
        // Handle invalid JSON or empty data
        $response->status = "error";
        $response->message = "Invalid or empty statistics data received.";
    }

    // Echo the response as JSON
    header('Content-Type: application/json');
    echo json_encode($response);
}


function isValidUser($unm,$pwd)
{
	$sql="SELECT `active`,`expire_date` FROM `users` WHERE `user_name`='".$unm."' AND `password`='".$pwd."'";
	include "db_config.php"; 
	
	
	$temp="";
	$res = mysqli_query($con,$sql);
	if ($rr=$res->fetch_row())
	{
	$arr=explode(" ",$rr[1]);
	$arrr=explode("-",$arr[0]);
	$dt=$arrr[2]."/".$arrr[1]."/".$arrr[0];
	if(intval($rr[0])>0) $temp=$dt."~"."ok";
	else {$temp="هذا الحساب غير مفعل من فضلك إتصل بخدمة العملاء";$temp=iconv('utf-8','cp1256', $temp);}
		
	}
	if($temp=="") {$temp="خطأ في اسم المستخدم أو في كلمة المرور";$temp=iconv('utf-8','cp1256', $temp);};
	echo $temp;
}

/////////////////////////////////////////////////////////////////////////////

function InsertTalk($fnd,$brnch,$cid,$cname)
{
	$iddd="0";	
include "db_config.php"; 
$ret = mysqli_query($con,"SELECT MAX(`id`) FROM `talk`");
while($row = $ret->fetch_row()) {
$idd = $row[0];
$iddd=strval(intval($idd)+1);

}


	$sql="INSERT into `talk`(`foundation`,`branch`,`client_id`,`client_name`) VALUES('".$fnd."','".$brnch."','".$cid."','".$cname."')";
	
	$res = mysqli_query($con,$sql);
echo $iddd;
}
////////////////////////////////////////////////////////////////////
function InsertChat($cname, $talkid, $client, $clerk)
{
	$sql="INSERT into `chats`(`client_name`,`talk_id`,`client`,`clerk`) VALUES('".$cname."',".$talkid.",'".$client."','".$clerk."')";
	include "db_config.php"; 
	$res = mysqli_query($con,$sql);
	$sql="select `client`,`clerk`, `chat_time` FROM `chats` WHERE `talk_id`=".$talkid;
	$temp="";
	$res = mysqli_query($con,$sql);
	while ($rr=$res->fetch_row())
	{
		if($temp=="") $temp=$rr[0]."~".$rr[1]."~".$rr[2];
		else  $temp=$temp.",".$rr[0]."~".$rr[1]."~".$rr[2];
	}
	echo $temp;
}
///////////////////////////////////////////////////////////////////////////////////
function isValidAndroidUser($unm,$pwd,$fnd,$brnch)
{
	
	$datafile="";	$userinfo=new stdClass();
	    $userinfo->user="found";
		$userinfo->active="1";
		$userinfo->exp_date="2050-11-11";
		$userinfo->datafile="data~6";
		$userinfo->id="33";
		echo json_encode($userinfo);	
}
///////////////////////////////////////////////////////////////////////////////////
function GetFoundations()
{
	$sql="SELECT `foundation` FROM `foundations`";
	include "db_config.php"; 
	$res = mysqli_query($con,$sql);
	$temp="";
	while ($rr=$res->fetch_row())
	{
		if($temp!="") $temp=$temp."~".$rr[0];
		else  $temp=$rr[0];
	}
	echo $temp;
}
////////////////////////////////////////////////////////////////////////
function GetBranches($fnd)
{
	$sql="SELECT `branch` FROM `branches` WHERE `foundation`='".$fnd."'";
	include "db_config.php"; 
	$res = mysqli_query($con,$sql);
	$temp="";
	while ($rr=$res->fetch_row())
	{
		if($temp!="") $temp=$temp."~".$rr[0];
		else  $temp=$rr[0];
	}
	echo $temp;
}

/////////////////////////////////////////////////////////////////
function GetUpdates()
{
	/*
	$sql="SELECT `fname` FROM `update_versions` ORDER BY `id` DESC LIMIT 1";
	include "db_config.php"; 
	$res = mysqli_query($con,$sql);
	$temp="none";
	if ($rr=$res->fetch_row())
	{
		
		  $temp=$rr[0];
	}
	echo $temp;
	*/
	echo "none";
}
///////////////////////////////////////////////////////////////////////////////////
function GetFoundationsopt()
{
	$sql="SELECT `id`, `foundation` FROM `foundations`";
	include "db_config.php"; 
	$res = mysqli_query($con,$sql);
	$temp="";
	while ($rr=$res->fetch_row())
	{
		$temp = $temp."<option value='".$rr[0]."'>".$rr[1]."</option>";
	}
	echo $temp;
}
////////////////////////////////////////////////////////////////////////

function GetBranchesopt($fnd)
{
	$temp='';
	$sql = "SELECT `id`,`branch` FROM `branches`  WHERE `foundation`=(SELECT `foundation` FROM `foundations` WHERE `id`=".$fnd." LIMIT 1) COLLATE utf8_unicode_ci";
		include "db_config.php"; 
	$result = mysqli_query($con,$sql);
	while ($row = $result->fetch_row())
	{
      $temp = $temp."<option value='".$row[0]."'>".$row[1]."</option>";
     }
echo $temp;	

}

////////////////////////////////////////////////////////////////////////////////////////////////////////
function GetExpDate($pp)
{
	/*
	$sql="SELECT `expire_date` FROM `users` WHERE `id`=".$pp;
	include "db_config.php"; 
	
	
	$temp="";
	$res = mysqli_query($con,$sql);
	if ($rr=$res->fetch_row())
	
	$temp=strval($rr[0]);
	echo $temp;
	*/
	echo "2050-11-11 11:11:11";
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////
function SaveComplain($val1,$val2,$val3,$val4)
{
	$idd="1";
	include "db_config.php"; 
    $sql ="SELECT max(`id`) FROM `complains`";
	$res = mysqli_query($con,$sql);
	if ($rr=$res->fetch_row()){
		$temp=intval($rr[0])+1;
		$idd=strval($temp);
	}
	$newlink='<a href="index.php?page=345&val='.$idd.'" target="_blank">الردود</a>';
	$sql="INSERT INTO `complains`(`customer_name`,`customer_id_number`,`complain`,`mobile`,`replyslink`)
VALUES ('".$val1."','".$val2."','".$val3."','".$val4."','".$newlink."')";
	$res = mysqli_query($con,$sql);
	echo $idd;
}
///////////////////////////////////////////////////////////////////////////////////////////
function GetComplains($param)
{
	$sql="SELECT id,complain_date from complains where customer_id_number='".$param."'";
	$temp="<option value='0'>----  من فضلك اختر  الشكوى  ----</option>";
	include "db_config.php"; 
	$result = mysqli_query($con,$sql);
	while ($row = $result->fetch_row())
	{
		
		$temp = $temp."<option value='".$row[0]."'>".$row[0]." - ".$row[1]."</option>";
	}
	
	echo $temp;	
	
}

////////////////////////////////////////////////////////////////////////////////////////////////////
function GetReplies($param)
{
	$sql="select `complain`,`attach` from `complains` where `id`=".$param;
	$temp='<table class="col-xs-12 col-sm-12 col-md-12 col-lg-12 table table-striped "><tbody>';
	
	include "db_config.php"; 
	$result = mysqli_query($con,$sql);
	if ($row = $result->fetch_row())
	{
	    $lnk= $_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI'];
		$parts=explode("/",$lnk );
		
		$ttemp="http://";
		for($i=0;$i<count($parts)-2;$i++) $ttemp=$ttemp.$parts[$i]."/";
		$lnk=$ttemp.$mobile_site_folder."/data/complains/".$row[1];
			
		//$lnk=str_replace('services/deafservice.php',"backend/data/complains/".$row[1],$lnk);
		 $temp = $temp.'<tr><td data-icon="home" style="text-align:center;font-weight:bold;padding-right:15px;background:#eee;">نص الشكوى</td><td style="text-align:center;"><a href="#" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 btn btn-default contactbtn" target="_blank" style="direction:ltr;">'.$row[0].'<a></td><tr>';
		 if(strval($row[1])!="") $temp = $temp.'<tr><td data-icon="home" style="text-align:center;font-weight:bold;padding-right:15px;background:#eee;">الملف المرفق</td><td style="text-align:center;"><a href="'.$lnk.'" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 btn btn-default contactbtn" target="_blank" style="direction:ltr;">'.$row[1].'<a></td><tr>';
		 
	}
	$sql="select `clerk`,`customer`,`attach`, `reply_date` from `replys` where `complain_id`=".$param." order by `reply_date`";
	$result = mysqli_query($con,$sql);
	while ($row = $result->fetch_row())
	{
		 $lnk= $_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI'];
		$parts=explode("/",$lnk );
		$ttemp="http://";
		for($i=0;$i<count($parts)-2;$i++) $ttemp= $ttemp.$parts[$i]."/";
		$lnk=$ttemp.$mobile_site_folder."/data/replies/".$row[2];
		  $temp = $temp.'<tr><td data-icon="home" style="text-align:center;font-weight:bold;padding-right:15px;background:#eee;">تاريخ الرد</td><td style="text-align:center;"><a href="#" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 btn btn-default contactbtn" target="_blank" style="direction:ltr;">'.$row[3].'<a></td><tr>';
		 if(strval($row[0])!="") $temp = $temp.'<tr><td data-icon="home" style="text-align:center;font-weight:bold;padding-right:15px;background:#eee;">رد الموظف</td><td style="text-align:center;"><a href="#" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 btn btn-default contactbtn" target="_blank" style="direction:ltr;">'.$row[0].'<a></td><tr>';
		 if(strval($row[1])!="")$temp = $temp.'<tr><td data-icon="home" style="text-align:center;font-weight:bold;padding-right:15px;background:#eee;">رد العميل</td><td style="text-align:center;"><a href="#" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 btn btn-default contactbtn" target="_blank" style="direction:ltr;">'.$row[1].'<a></td><tr>';
		 if(strval($row[2])!="") $temp = $temp.'<tr><td data-icon="home" style="text-align:center;font-weight:bold;padding-right:15px;background:#eee;">الملف المرفق</td><td style="text-align:center;"><a href="'.$lnk.'" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 btn btn-default contactbtn" target="_blank" style="direction:ltr;">'.$row[2].'<a></td><tr>';
		 
	}
	$temp=$temp."</tbody></table>";
	echo $temp;
}

function GetReplies_json($param,$mobile_site_folder){
	/***get the complain data***/
	$sql="select `complain`,`attach`,`complain_date` from `complains` where `id`=".$param;
	include "db_config.php"; 
	$result = mysqli_query($con,$sql);
	$response_json=array();
	
	if ($row = $result->fetch_row()){
		$has_attachment=0;
		if(strval($row[1])!=""){
			$has_attachment=1;
		}
	    $lnk= $_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI'];
		$parts=explode("/",$lnk );
		$ttemp="http://";
		for($i=0;$i<count($parts)-2;$i++) $ttemp=$ttemp.$parts[$i]."/";
		$lnk=$ttemp.$mobile_site_folder."/data/complains/".$row[1];
		$response_json[]=array("iscustomer"=>1,"msg"=>$row[0],"has_attach"=>$has_attachment,"attach"=>$lnk,"msgdatetime"=>$row[2]);
	}
	
	/****get the replies of the complain id param****/
	
	$sql="select `clerk`,`customer`,`attach`, `reply_date` from `replys` where `complain_id`=".$param." order by `reply_date`";
	$result = mysqli_query($con,$sql);
	while ($row = $result->fetch_row()){
		$has_attachment=0;
		if(strval($row[2])!=""){
			$has_attachment=1;
		}
		$lnk= $_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI'];
		$parts=explode("/",$lnk );
		$ttemp="http://";
		for($i=0;$i<count($parts)-2;$i++) $ttemp= $ttemp.$parts[$i]."/";
		$lnk=$ttemp.$mobile_site_folder."/data/replies/".$row[2];
		/***if the reply is from customer service officer***/
		if(strval($row[0])!=""){
			$response_json[]=array("iscustomer"=>0,"msg"=>$row[0],"has_attach"=>$has_attachment,"attach"=>$lnk,"msgdatetime"=>$row[3]);
		}
		/***if the reply is from customer service officer***/
		if(strval($row[1])!=""){
			$response_json[]=array("iscustomer"=>1,"msg"=>$row[1],"has_attach"=>$has_attachment,"attach"=>$lnk,"msgdatetime"=>$row[3]);
		}
		
	}
	echo json_encode($response_json);
}
/////////////////////////////////////////////////////////////////////////
function SaveReply($val1,$val2)
{
	$idd="1";
	include "db_config.php"; 
    $sql ="SELECT max(`id`) FROM `replys`";
	$res = mysqli_query($con,$sql);
	if ($rr=$res->fetch_row()){
		$temp=intval($rr[0])+1;
		$idd=strval($temp);
	}
	$sql="INSERT INTO `replys`(`complain_id`,`customer`) VALUES ('".$val1."','".$val2."')";
	$res = mysqli_query($con,$sql);
	echo $idd;
}
//////////////////////////////////////////////////////////////////////////////////////////////
function GetLastUpdate()
{
	$datafile="none";
	include "db_config.php";
	$sql="SELECT `fname` FROM `update_versions` ORDER BY `id` DESC LIMIT 1";
	$res = mysqli_query($con,$sql);
	if ($rr=$res->fetch_row())
	{
		$datafile=$rr[0];
	}
	$temp=iconv('utf-8','cp1256', $datafile);
	echo $temp;
}
/////////////////////////////////get updates from the db for the tablet to download the files //////////////////////////////////////////////////
function GetLastUpdate2025($lastupdate) {
    // Initialize $datafile as an array to store results
    $datafile = [];

    // Include database configuration
    include "db_config.php";
	
	// Define the base path for zip files
    $zipFilesPath = __DIR__ . '/../zipfiles/';

    // Check if $lastupdate is provided
    if ($lastupdate === "all" || $lastupdate === "") {
        // Query to get all records
        $sql = "SELECT `id`, `updatedzipfile`, `timestamp` FROM `update_versions` ORDER BY `id`";
    } else {
        // Query to get all records after the specific zip file
        $sql = "SELECT `id`, `updatedzipfile`, `timestamp` 
                FROM `update_versions` 
                WHERE `id` > (SELECT `id` FROM `update_versions` WHERE `updatedzipfile` = ? LIMIT 1) 
                ORDER BY `id`";
    }

    // Prepare and execute the SQL query
    if ($stmt = $con->prepare($sql)) {
        // Bind the parameter if $lastupdate is provided and not "all"
        if ($lastupdate !== "all" && $lastupdate !== "") {
            $stmt->bind_param("s", $lastupdate);
        }

        $stmt->execute();
        $result = $stmt->get_result();
		
		// Fetch all rows
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                // Add file size to each record
                $filePath = $zipFilesPath . $row['updatedzipfile'].".zip";
                if (file_exists($filePath)) {
                    $row['filesize'] = filesize($filePath);
                } else {
                    $row['filesize'] = "File not found  ".$filePath;
                }
                $datafile[] = $row;
            }
        } else {
            $datafile = ["error" => "No records found."];
        }

        // Fetch all rows
        /* if ($result->num_rows > 0) {
            $datafile = $result->fetch_all(MYSQLI_ASSOC);
        } else {
            $datafile = ["error" => "No records found."];
        } */

        $stmt->close();
    } else {
        $datafile = ["error" => "Query preparation failed: " . $con->error];
    }

    // Close the database connection
    $con->close();

    // Convert the result to JSON and output it with proper encoding
    header('Content-Type: application/json; charset=windows-1256');
    echo json_encode($datafile, JSON_UNESCAPED_UNICODE);
}
?>