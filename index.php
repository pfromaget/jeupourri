<?php

$largeur = 10;
$hauteur = 10;


?>
<!DOCTYPE html>
<html>
	<head>
		<title>Jeu pourri</title>
		<meta charset='utf8'></meta>
		<link rel="stylesheet" href="style.css">
		<script type="text/javascript" src="js.js"></script>
		<script type="text/javascript" src="http://static6.spartoo.com/js/jquery.min.js"></script>
	</head>
	<body onkeydown="move_player(<?=$largeur?>,<?=$hauteur?>,event);event.preventDefault();" onload="loop();"  onclick="$('#regles').hide();">
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
		<h1>Le jeu sans nom</h1>
		<b>Règles du jeu :</b><br>
		<ul>
			<li>But du jeu : avoir le score le plus elevé</li>
			<li>Déplacement avec les flèches du clavier</li>
			<li>Gagner des points en attrapant : bières (1pt), pages de codes (1pt), café (1pt) et toilettes (2pt)</li>
			<li>L'alcoolémie augmente de 0.2g a chaque bière</li>
			<li>L'alcoolémie diminue de 2g a chaque passage aux toilettes</li>
			<li>Le café double les points gagnés pendant une durée limitée</li>
			<li>Si le patron vous attrape avec une page de code, il ne vous dira rien, sinon vous perdez 2 points de score</li>
			<li>Si la police vous attrape avec moins de 5g d'alcool elle ne vous dira rien, sinon vous avez perdu</li>
		</ul>
		<span>Cliquez pour démarrer !</span>
	</div>
	</body>
</html>
