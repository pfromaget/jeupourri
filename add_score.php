<?php
if(isset($_POST['player'])) {
	if(file_exists("configure.php")) {
		include "configure.php";
		if($production_on && $db_host) {
			mysql_connect($db_host,$db_user,$db_password);
			mysql_select_db($db_database);
			mysql_query("INSERT INTO score (player,score,log_date)
			VALUES ('".addslashes($_POST['player'])."','".addslashes($_POST['score'])."',NOW())");
			if($_COOKIE['game_id']) {
				mysql_query("UPDATE games SET status=2 WHERE auto_id='".(int)$_COOKIE['game_id']."'");
			}
		}
	}
}
else {
	$jokes = array(
			"C'est une requête SQL qui entre dans un bar, et le serveur répond : « Il n'y a plus de tables ! ».",
			"J'ai une blague sur les erreurs 404, mais je ne la retrouve plus",
			"Désolé, les blagues sur les certificats sont expirées",
			"Il y a 10 sortes de gens. ceux qui connaissent le binaire et les autres.",
			"Un clavier azerty en vaut deux.",
			"Tu sais que tu es un développeur quand ça te gène pas d'avoir un String dans l'Array",
			"Roulette russe : [ $ [ RANDOM % 6 ] == 0 ] && rm -rf / || echo *Clic*",
			"Combien faut-il de développeurs pour changer une ampoule ? Impossible, c'est du hardware",
			"Tu nous fais chier avec ton java, alors tu prends teclipse et tes catch et tu te classes.",
			"Patrick Sebastien code en java :'Et on fait tourner les servlets !'",
			"T'es tellement long à répondre qu'on dirait que t'es codé en JAVA",
			".titanic {float: none;}",
			".twin_towers {border-collpase:collapse; overflow-y:scroll; display: none;}",
			"#sarkozy { height: 60%; }",
			"cd /pub && more beer",
			"Et sinon t'as pas du boulot ?",
			"Où partent les dev en vacances ? Au C-Shell");
			
	echo $jokes[mt_rand(0,count($jokes)-1)];
}
?>
