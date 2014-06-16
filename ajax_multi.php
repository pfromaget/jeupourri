<?php
if(file_exists("configure.php")) {
	include "configure.php";
	if($production_on && $db_host) {
		mysql_connect($db_host,$db_user,$db_password);
		mysql_select_db($db_database);
		
		switch($_POST['action']) {

			case 'start':
				//créé la partie en base
				if(!isset($_COOKIE['game_id']) || $_COOKIE['game_id']==0) {
					mysql_query("INSERT INTO games (created_by,status) VALUES ('".addslashes($_COOKIE['player'])."',0)");
					$game_id = mysql_insert_id();
					setcookie("game_id",$game_id,time()+60*60);
				}
				break;
			case 'started':
				//met à jour le statut (plus joignable)
				mysql_query("UPDATE games SET status=1 WHERE auto_id='".(int)$_COOKIE['game_id']."'");
				break;
			case 'add_item':
				//enregistre la position de l'item ajouté
				mysql_query("INSERT INTO games_elements (game_id, element, `left`, top)
				VALUES ('".(int)$_COOKIE['game_id']."','".$_POST['type']."','".(int)$_POST['left']."','".(int)$_POST['top']."')");
				break;
			case 'update_item':
				//met à jour la position de l'item
				break;
			case 'del_item':
				//supprime la ligne de l'item
				break;
			case 'finished':
				//met à jour le statut (fini)
				//supprime tous les items
				break;
		
		}	
	}
}

?>