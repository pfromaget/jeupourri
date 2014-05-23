sessionStorage.setItem("score",0);

function move_player(largeur,hauteur,e) {
		
	var event = e || window.event;
		
	if (event) {
		
		var tabletop = 100;
		var tableleft = $('#grid').offset().left;
				
		var left = parseInt($('#player').css("left"));
		var top = parseInt($('#player').css("top"));
		
		switch(event.keyCode) {
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
	
	
	checkcollision();
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
		$(newbeer).attr("name", "beer");
		$(newbeer).css("left", tableleft+x*60 );
		$(newbeer).css("top", tabletop+y*60 );
		$(newbeer).appendTo($("#content"));
		checkcollision();
		
	}
		
}

function moreboss() {

}

function updateScore(value) {
	
	sessionStorage.setItem("score",parseInt(sessionStorage.getItem("score"))+value);
	$("#score").html(sessionStorage.getItem("score"));
	
}

function checkcollision() {
	
	//biere ?
	var left = parseInt($('#player').css("left"));
	var top = parseInt($('#player').css("top"));
	var beers = $('[name="beer"]');
	for(i=0;i<beers.length;i++) {
		var beerleft = parseInt($(beers[i]).css("left"));
		var beertop = parseInt($(beers[i]).css("top"));
		if(beerleft==left && beertop==top) {
			$(beers[i]).remove();
			updateScore(1);
		}
	}
	
	
}

function loop() {
	
	if($('#player').css("display")=="none") {
		init_player();
	}
	
	morebeer();
	moreboss();
	
	setTimeout(function(){loop()},100);
}

function change_player(player) {
	
	switch(player) {
		case 1:
			$("body").css("background",'url("bg.jpg")');
			$("#player").css("background",'url("player.png")');
			$("#player").css("background-size",'60px auto');
			$(".grid td").css("border-color",' #0af4fd');
			$(".grid tr").css("border-color",' #0af4fd');
			break;
		case 2:
			$("body").css("background",'url("bg_girl.jpg")');
			$("#player").css("background",'url("player_girl.png")');
			$("#player").css("background-size",'60px auto');
			$(".grid td").css("border-color",' #fa0c5a');
			$(".grid tr").css("border-color",' #fa0c5a');
			break;
	}
	
}
