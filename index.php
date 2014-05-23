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
	<body onkeydown="move_player(<?=$largeur?>,<?=$hauteur?>,event);event.preventDefault();" onload="loop();">
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
			<b>Sélection du geek :</b>
			<br>
			<img src="player.png" width="60px" onclick="change_player(1);" class="choose_player">&nbsp;
			<img src="player_girl.png" width="60px" onclick="change_player(2);" class="choose_player">
		</div>
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
	</body>
</html>
