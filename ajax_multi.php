<?php
if(file_exists("configure.php")) {
	include "configure.php";
	if($production_on && $db_host) {
		mysql_connect($db_host,$db_user,$db_password);
		mysql_select_db($db_database);
		
		if($_POST['game_id']>0) {
			$player=2;
		}
		else {
			$player=1;
		}
		
		switch($_POST['action']) {

			case 'start':
				//créé la partie en base
				if(!isset($_COOKIE['game_id']) || $_COOKIE['game_id']==0) {
					mysql_query("INSERT INTO games (created_by,status,log_date) VALUES ('".addslashes($_COOKIE['player'])."',0,NOW())");
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
				mysql_query("INSERT INTO games_elements (game_id, element, `left`, top, player)
				VALUES ('".(int)$_COOKIE['game_id']."','".$_POST['type']."','".(float)$_POST['left']."','".(float)$_POST['top']."', '".$player."' )");
				break;
			case 'update_item':
				//met à jour la position de l'item
				break;
			case 'del_item':
				//supprime la ligne de l'item
				echo "DELETE FROM games_elements WHERE game_id='".(int)$_COOKIE['game_id']."' AND `left`='".(float)$_POST['left']."' AND top='".(float)$_POST['top']."' AND element='".$_POST['type']."'";
				mysql_query("DELETE FROM games_elements WHERE game_id='".(int)$_COOKIE['game_id']."' AND `left`='".(float)$_POST['left']."' AND top='".(float)$_POST['top']."' AND element='".$_POST['type']."'");
				break;
			case 'finished':
				//met à jour le statut (fini)
				//supprime tous les items
				break;
			case 'list_games':
				//parties en attente
				$query = mysql_query("SELECT * FROM games WHERE status=0 AND log_date>=SUBDATE(NOW(),INTERVAL 5 MINUTE) AND created_by!='".(int)$_COOKIE['player']."'");
				if(mysql_num_rows($query)) {
					echo '<h3>Liste des parties en cours :</h3><ul>';
					while($array = mysql_fetch_array($query)) {
						echo '<li><a href="#" onclick="document.location=\'index.php?game_id='.$array['auto_id'].'\'">'.$array['created_by'].'</a></li>';
					}
					echo '</ul>';
				}
				break;
			case 'get_lock':
				$query = mysql_query("INSERT IGNORE INTO locks (game_id,log_date) VALUES ('".(int)$_COOKIE['game_id']."',NOW())") or die("erreur");
				$id = mysql_insert_id();
				if($id) {
					echo "ok";
				}
				else {
					echo "locked";
				}
				break;
			case 'release_lock':
				mysql_query("DELETE FROM locks WHERE game_id='".(int)$_COOKIE['game_id']."'") or die("erreur");
				echo "DELETE FROM locks WHERE game_id='".(int)$_COOKIE['game_id']."'";
				break;
			case 'refresh_screen':
				$query = mysql_query("SELECT status FROM games WHERE auto_id='".(int)$_COOKIE['game_id']."' AND status=2");
				if(mysql_num_rows($query)) {
					echo "END";
					die();
				}
			
			
				
				$objetlist = explode("|||",$_POST['objetlist']);
				$objettab = array();
				foreach($objetlist as $key=>$objet) {
					$tmp = explode("|",$objet);
					if($tmp[1]!='') {
						$objettab[$tmp[1]][$tmp[2]] = $tmp[0];
					}
				}
				//objettab est un tableau au format : objettab[left][top]=type
				$return = "";
				
				//on compare le tableau avec ce qui est en base
				//si pas en base il faut le créer
				$query = mysql_query("SELECT * FROM games_elements WHERE game_id='".(int)$_COOKIE['game_id']."'");
				while($array = mysql_fetch_array($query)) {
					
					if(isset($objettab[$array['left']][$array['top']]) && $objettab[$array['left']][$array['top']]==$array['element']) {
						//ok - on vire l'entrée du tableau
						unset($objettab[$array['left']][$array['top']]);
					}
					else {		
						if( 
							($_POST['game_id']>0 && $array['element']=="player")
							|| (!$_POST['game_id'] && $array['element']=="player2")
							|| !in_array($array['element'],array("player","player2"))
						) {						
										
							if(	$array['element']=="player") $array['element']="player1";
							
							if((!$_POST['game_id'])
		
							||
							
							(($array['element']!="cops" && $array['element']!="army" && $array['element']!="boss" && $array['element']!="wc")
							&& $_POST['game_id'])
							
							) {
										
								$return.=$array['element']."|".$array["left"]."|".$array['top']."|new|||";
								
							}							
							elseif($array['player']==1 && $_POST['game_id']>0) {
								$return.=$array['element']."|".$array["left"]."|".$array['top']."|new|||";
							}
						
						}
						
					}
				
				}
				
				//tout ce qu'il reste dans le tableau passé en post doit etre supprimé
				$return_delete = "";
				foreach($objettab as $left=>$value) {
					
					foreach($value as $top=>$element) {
						
						$return_delete.=$element."|".$left."|".$top."|delete|||";
						
					}
					
					
				}
				
				echo $return_delete.$return;
				
		
				
				
				break;
		
		}	
	}
}

?>
