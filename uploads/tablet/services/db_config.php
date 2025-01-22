<?php
$mysql_db_hostname = "localhost";
$mysql_db_user = "pwdguidediginovi_user";
$mysql_db_password = "2fj[f{+9w(~r";
//$mysql_db_database = "pwdguidediginovi_tabdb";
$mysql_db_database = "pwdguidediginovi_db";
$con = mysqli_connect($mysql_db_hostname, $mysql_db_user, $mysql_db_password,$mysql_db_database) or die("يوجد مشكلة فِي الاتصال بقاعدة البيانات ، يرجى اعادة المحاولة لاحقا أو الاتصال بخدمة العملاء");
$con->set_charset('utf8');
?>