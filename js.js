
function move_player(largeur,hauteur) {
	
	//TODO: preventDefault (uilliam cherche)
	//TODO: faire marcher sur firefox
	
	
	if (window.event) {
		
		
		
		var left = parseInt($('#player').css("left"));
		var top = parseInt($('#player').css("top"));
		
		
		switch(window.event.keyCode) {
			case 37:
			case 52: //gauche pave num	
				if(left-60>0) {
					$('#player').css("left", left-60 );
				}
				break;
			case 38:
			case 56: //haut pave num	
				if(top-60>0) {
					$('#player').css("top", top-60 );
				}
				break;
			case 39:
			case 54: //droite pave num
				if(left+60<largeur*60) {
					$('#player').css("left", left+60 );
				}
				break;
			case 40:
			case 50: //bas pave num		
				if(top+60<hauteur*60) {
					$('#player').css("top", top+60 );
				}
				break;
			default:
				break;
		}
	}
}
