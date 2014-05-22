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
	<body onkeydown="move_player(<?=$largeur?>,<?=$hauteur?>);event.preventDefault();" onload="loop();">
	<div id="content">
	<?php


	echo '
	<table class="grid" id="grid">';

	for($i=0;$i<$hauteur;$i++) {
		
		echo '<tr>';
		
		for($j=0;$j<$largeur;$j++) {
			
			echo '<td></td>';
			
		}
		
		echo '</tr>';
	}


	echo '
	</table>';
	
	echo '
	<div id="player"></div>';

	?>
	</div>
	</body>
</html>
