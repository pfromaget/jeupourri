<?php
include "configure.php";
if($production_on && $db_host) {
	mysql_connect($db_host,$db_user,$db_password);
	mysql_select_db($db_database);
	mysql_query("INSERT INTO score (player,score,log_date)
	VALUES ('".addslashes($_POST['player'])."','".addslashes($_POST['score'])."',NOW())");
}

?>