<?php
date_default_timezone_set("Africa/Cairo");
header('content-type: text/javascript; charset=utf-8');

// Extract parameters
$order = intval($_REQUEST["order"] ?? 0);
$val1 = strval($_REQUEST["val1"] ?? "");
$val2 = strval($_REQUEST["val2"] ?? "");
$val3 = strval($_REQUEST["val3"] ?? "");
$val4 = strval($_REQUEST["val4"] ?? "");
$val5 = strval($_REQUEST["val5"] ?? "");
$callback = $_REQUEST["callback"] ?? "";

// Route to appropriate function based on the order parameter
switch ($order) {
    case 2:
        InsertTalk($val1, $val2, $val3, $val4, $val5, $callback);
        break;
    case 3:
        InsertChat($val1, $val2, $val3, $val4, $callback);
        break;
    case 4:
        InsertFav($val1, $val2, $val3, $callback);
        break;
    case 5:
        GetFavs($val1, $val2, $callback);
        break;
    case 6:
        GetColumn1($val1, $val2, $callback);
        break;
    case 7:
        GetColumn2($val1, $val2, $callback);
        break;
    case 8:
        InsertUser($val1, $val2, $val3, $val4, $val5, $callback);
        break;
    default:
        echo $callback . "({\"error\":\"Invalid order parameter\"});";
        break;
}

// Function definitions

function InsertTalk($fnd, $branch, $cid, $cname, $cmob, $callback) {
    include "db_config.php";

    $obj = new stdClass();
    $id = "0";

    // Get the max ID
    $result = mysqli_query($con, "SELECT MAX(`id`) FROM `talk`");
    if ($row = $result->fetch_row()) {
        $id = strval(intval($row[0]) + 1);
    }

    // Insert new talk record
    $sql = "INSERT INTO `talk`(`foundation`, `branch`, `client_id`, `client_name`, `client_mob`) 
            VALUES ('$fnd', '$branch', '$cid', '$cname', '$cmob')";
    $res = mysqli_query($con, $sql);

    if ($res) {
        $obj->status = "success";
        $obj->message = "Talk inserted successfully";
        $obj->talkid = $id;
    } else {
        $obj->status = "error";
        $obj->message = "Failed to insert talk: " . mysqli_error($con);
    }

    echo $callback . "(" . json_encode($obj) . ");";
}

function InsertChat($cname, $talkid, $client, $clerk, $callback) {
    include "db_config.php";

    $sql = "INSERT INTO `chatstab`(`client_name`, `talk_id`, `client`, `clerk`) VALUES ('$cname', $talkid, '$client', '$clerk')";
    if (empty($client)) {
        $sql = "INSERT INTO `chatstab`(`client_name`, `talk_id`, `clerk`) VALUES ('$cname', $talkid, '$clerk')";
    }
    if (empty($clerk)) {
        $sql = "INSERT INTO `chatstab`(`client_name`, `talk_id`, `client`) VALUES ('$cname', $talkid, '$client')";
    }

    mysqli_query($con, $sql);

    // Fetch chat details
    $sql = "SELECT `client`, `clerk`, `chat_time` FROM `chatstab` WHERE `talk_id` = $talkid";
    $res = mysqli_query($con, $sql);
    $temp = [];
    while ($row = $res->fetch_assoc()) {
        $temp[] = $row;
    }

    $obj = new stdClass();
    $obj->txt = json_encode($temp);

    echo $callback . "(" . json_encode($obj) . ");";
}

function InsertFav($fnd, $branch, $fav, $callback) {
    include "db_config.php";

    $sql = "SELECT `id` FROM `favs` WHERE `foundation` = '$fnd' AND `branch` = '$branch' AND `fav` = '$fav'";
    $res = mysqli_query($con, $sql);
    if (!$res->fetch_row()) {
        $sql = "INSERT INTO `favs`(`foundation`, `branch`, `fav`) VALUES ('$fnd', '$branch', '$fav')";
        mysqli_query($con, $sql);
    }

    $obj = new stdClass();
    $obj->txt = "ok";

    echo $callback . "(" . json_encode($obj) . ");";
}

function GetFavs($fnd, $branch, $callback) {
    include "db_config.php";

    $sql = "SELECT `fav` FROM `favs` WHERE `foundation` = '$fnd' AND `branch` = '$branch'";
    $res = mysqli_query($con, $sql);
    $favs = [];
    while ($row = $res->fetch_row()) {
        $favs[] = $row[0];
    }

    $obj = new stdClass();
    $obj->txt = implode("~", $favs);

    echo $callback . "(" . json_encode($obj) . ");";
}

function GetColumn1($fnd, $branch, $callback) {
    include "db_config.php";

    $sql = "SELECT `word`, `pic` FROM `chatpics1` WHERE `foundation` = '$fnd' AND `branch` = '$branch'";
    $res = mysqli_query($con, $sql);

    $words = [];
    $pics = [];
    while ($row = $res->fetch_assoc()) {
        $words[] = $row['word'];
        $pics[] = $row['pic'];
    }

    $obj = new stdClass();
    $obj->txt = implode("~", $words);
    $obj->pic = implode("~", $pics);

    echo $callback . "(" . json_encode($obj) . ");";
}

function GetColumn2($fnd, $branch, $callback) {
    include "db_config.php";

    $sql = "SELECT `word`, `pic` FROM `chatpics2` WHERE `foundation` = '$fnd' AND `branch` = '$branch'";
    $res = mysqli_query($con, $sql);

    $words = [];
    $pics = [];
    while ($row = $res->fetch_assoc()) {
        $words[] = $row['word'];
        $pics[] = $row['pic'];
    }

    $obj = new stdClass();
    $obj->txt = implode("~", $words);
    $obj->pic = implode("~", $pics);

    echo $callback . "(" . json_encode($obj) . ");";
}

function InsertUser($uname, $umob, $uid, $udisability_type, $uemail, $callback) {
    include "db_config.php";

    $sql = "SELECT `umob`, `uname` FROM `userregform` WHERE `umob` = '$umob' OR `uname` = '$uname'";
    $res = mysqli_query($con, $sql);

    $obj = new stdClass();
    if ($res->fetch_row()) {
        $obj->txt = "duplicate";
    } else {
        $timestamp = date('Y-m-d G:i:s');
        $sql = "INSERT INTO `userregform` (`uname`, `umob`, `uid`, `udisability_type`, `uemail`, `timestamp`) 
                VALUES ('$uname', '$umob', '$uid', '$udisability_type', '$uemail', '$timestamp')";
        $res = mysqli_query($con, $sql);

        $obj->txt = $res ? "ok" : "error";
    }

    echo $callback . "(" . json_encode($obj) . ");";
}
?>
