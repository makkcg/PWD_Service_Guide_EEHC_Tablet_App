<?php
header('Content-Type: text/html; charset=utf-8');
$fname= $_REQUEST["fname"];
if(file_exists($fname))
echo filesize($fname);
else 
echo "0";
?>