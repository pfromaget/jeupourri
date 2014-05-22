
function move_player(largeur,hauteur) {
	
	//TODO: preventDefault (uilliam cherche)
	//TODO: faire marcher sur firefox
		
	if (window.event) {
		
		var tabletop = 100;
		var tableleft = $('#grid').offset().left;
		
		var left = parseInt($('#player').css("left"));
		var top = parseInt($('#player').css("top"));
		
		
		switch(window.event.keyCode) {
			case 37:
			case 52: //gauche pave num	
				if(left-60>=0+tableleft) {
					$('#player').css("left", left-60 );
				}
				break;
			case 38:
			case 56: //haut pave num	
				if(top-60>=0+tabletop) {
					$('#player').css("top", top-60 );
				}
				break;
			case 39:
			case 54: //droite pave num
				if(left+60<largeur*60+tableleft) {
					$('#player').css("left", left+60 );
				}
				break;
			case 40:
			case 50: //bas pave num		
				if(top+60<hauteur*60+tabletop) {
					$('#player').css("top", top+60 );
				}
				break;
			default:
				break;
		}
	}
}

function init_player() {
	var tableleft = $('#grid').offset().left;
	$('#player').css("left", tableleft );
	$('#player').css("display","block");
}

function morebeer() {

	var beers = $('[name="beer"]');
	if(beers.length==0) {
	
		var tabletop = 100;
		var tableleft = $('#grid').offset().left;
		
		var x=Math.floor((Math.random() * 9) + 1);;
		var y=Math.floor((Math.random() * 9) + 1);;
		var newbeer = document.createElement('div');
		$(newbeer).addClass("beer");
		$(newbeer).css("left", tableleft+x*60 );
		$(newbeer).css("top", tabletop+y*60 );
		$(newbeer).appendTo($("#content"));
		
	}
		
}

function moreboss() {

}

function loop() {
	
	if($('#player').css("display")=="none") {
		init_player();
	}
	
	morebeer();
	moreboss();
	
	setTimeout(function(){loop()},50000);
}
