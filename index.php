<?php

$largeur = 10;
$hauteur = 10;


?>
<!DOCTYPE html>
<html>
	<head>
		<title>Dev life</title>
		<meta charset='utf8'></meta>
		<link rel="stylesheet" href="style.css">
		<script type="text/javascript" src="js.js"></script>
		<script type="text/javascript" src="http://static6.spartoo.com/js/jquery.min.js"></script>
	</head>
	<body onkeydown="move_player(<?=$largeur?>,<?=$hauteur?>,event);event.preventDefault();" onload="ask_pseudo();loop();"  onclick="$('#regles').hide();">
	<div id="content">
	<?php


	echo '
	
	<div id="leftpanel">
		<div>
			<b>Score :</b>
			<div id="score">0</div>
		</div>
		<div>
			<b>Alcoolémie :</b>
			<div id="alcool">0</div>
		</div>
		<div>
			<b>Pages de code :</b>
			<div id="code">0</div>
		</div>
		<div>
			<b>Sélection du geek :</b>
			<br>
			<img src="player.png" width="60px" onclick="change_player(1);" class="choose_player">&nbsp;
			<img src="player_girl.png" width="60px" onclick="change_player(2);" class="choose_player">
		</div>
		<br />
		<div id="message"></div>
		<div id="debug"></div>
		<div id="highscore">';
		
		if(file_exists("configure.php")) {
			include "configure.php";
			if($production_on) {
				mysql_connect($db_host,$db_user,$db_password);
				mysql_select_db($db_database);
				$query = mysql_query("SELECT * FROM score ORDER BY score DESC LIMIT 5");
				if(mysql_num_rows($query)) {
					$inc = 1;
					echo "<b>HighScore :</b><br />";
					while($array = mysql_fetch_array($query)) {
						echo $inc. " : " .$array['player']." - ".$array['score']."<br />";
						$inc++;
					}
				}
			}
		}
		
		echo '</div>
	</div>
	<div id="divgrid">
	<table class="grid" id="grid">';

	for($i=0;$i<$hauteur;$i++) {
		
		echo '<tr>';
		
		for($j=0;$j<$largeur;$j++) {
			
			echo '<td></td>';
			
		}
		
		echo '</tr>';
	}


	echo '
	</table>
	</div>';
	
	echo '
	<div id="player"></div>';

	?>
	</div>
	<div id="regles">
		<h1>Dev Life</h1>
		<b>Règles du jeu :</b><br>
		<ul>
			<li>But du jeu : avoir le score le plus elevé</li>
			<li>Déplacement avec les flèches du clavier</li>
			<li>Gagner des points en attrapant : bières (1pt), pages de codes (1pt), café (1pt) et toilettes (2pt)</li>
			<li>L'alcoolémie augmente de 0.2g a chaque bière</li>
			<li>L'alcoolémie diminue de 2g a chaque passage aux toilettes</li>
			<li>Le café double les points gagnés pendant une durée limitée</li>
			<li>Si le patron vous attrape avec une page de code, il ne vous dira rien, sinon vous perdez 2 points de score</li>
			<li>Si la police vous attrape avec moins de 3g d'alcool elle ne vous dira rien, sinon vous avez perdu</li>
		</ul>
		<span>Cliquez pour démarrer !</span>
	</div>
	<div id="facebook">
	<iframe src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.rotten-games.com%2Fjeu%2F&amp;width=600&amp;layout=standard&amp;action=like&amp;show_faces=false&amp;share=true&amp;height=35&amp;colorscheme=dark&amp;appId=238301449547296" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:600px; height:35px;" allowTransparency="true"></iframe></div>
	</body>
</html>
