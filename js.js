sessionStorage.setItem("alcool",0);
sessionStorage.setItem("score",0);
sessionStorage.setItem("toilet_countdown",0);

function move_player(largeur,hauteur,e) {
		
	var event = e || window.event;
		
	if (event) {
		
		var tabletop = 100;
		var tableleft = $('#grid').offset().left;
				
		var left = parseInt($('#player').css("left"));
		var top = parseInt($('#player').css("top"));
		
		var key = event.keyCode;
		
		//très alcoolisé
		if(parseFloat(sessionStorage.getItem("alcool"))>5) {
			var rand = Math.floor(Math.random()*10)+1;
			if(rand==5 || rand==7) return 0; //rien
			else if(rand<5) { //deplacement aleatoire 5 fois sur 10
				key = rand+37;
			}
		}
		
		//alcoolisé
		else if(parseFloat(sessionStorage.getItem("alcool"))>3) {
			var rand = Math.floor(Math.random()*10)+1;
			if(rand==5) return 0; //rien
			else if(rand<2) { //deplacement aleatoire 2 fois sur 10
				key = rand+37;
			}
		}
		
		//déplacement
		switch(key) {
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
	
	
	moretoilet();
	morebeer();
	moreboss();
	move_boss();
	checkcollision();
}

function move_boss() {
	
	//position joueur
	var left = parseInt($('#player').css("left"));
	var top = parseInt($('#player').css("top"));
	
	//position boss
	var boss = $('[name="boss"]');
	if(boss.length>0) {
		
		for(i=0;i<boss.length;i++) {
			
			var rand = Math.floor(Math.random()*10)+1;
			//le boss bouge une fois sur deux
			if(rand>5) {
			
				var bossleft = parseInt($(boss[i]).css("left"));
				var bosstop = parseInt($(boss[i]).css("top"));
				
				var diffleft = bossleft-left;
				var difftop = bosstop-top;
				
				//on deplace vers le joueur
				if(Math.abs(diffleft)>Math.abs(difftop)) {
					//on bouge left 
					if(bossleft>left) {
						//gauche
						$(boss[i]).css("left",bossleft-60);
					}
					else {
						//droite
						$(boss[i]).css("left",bossleft+60);
					}
					
				}
				else {
					//on bouge top
					if(bosstop>top) {
						//haut
						$(boss[i]).css("top",bosstop-60);
					}
					else {
						//bas
						$(boss[i]).css("top",bosstop+60);
					}
				}
			}
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
		
		var x=Math.floor((Math.random() * 9) + 1);
		var y=Math.floor((Math.random() * 9) + 1);
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
	
	var boss = $('[name="boss"]');
	if(boss.length==0 && parseFloat(sessionStorage.getItem("score"))>5 && Math.floor((Math.random() * 29) + 1) ) {
	
		var tabletop = 100;
		var tableleft = $('#grid').offset().left;
		
		var x=Math.floor((Math.random() * 9) + 1);
		var y=Math.floor((Math.random() * 9) + 1);
		var newboss = document.createElement('div');
		$(newboss).addClass("boss");
		$(newboss).attr("name", "boss");
		$(newboss).css("left", tableleft+x*60 );
		$(newboss).css("top", tabletop+y*60 );
		$(newboss).appendTo($("#content"));
		checkcollision();
		
	}

}

function moretoilet() {
	
	if(parseFloat(sessionStorage.getItem("alcool"))>2) {
		
		var toilets = $('[name="wc"]');
		if(toilets.length==0) {
		
			if(Math.floor((Math.random() * 30) + 1)==1) {
				
				var tabletop = 100;
				var tableleft = $('#grid').offset().left;
				var x=Math.floor((Math.random() * 9) + 1);
				var y=Math.floor((Math.random() * 9) + 1);
				var toilet = document.createElement('div');
				$(toilet).addClass("wc");
				$(toilet).attr("name", "wc");
				$(toilet).css("left", tableleft+x*60 );
				$(toilet).css("top", tabletop+y*60 );
				$(toilet).appendTo($("#content"));
				sessionStorage.setItem("toilet_countdown",10); //duree de vie de la case toilettes
				checkcollision();
				
				
			}
		}
		else {
			if(parseInt(sessionStorage.getItem("toilet_countdown"))>0) { //on decremente la duree de vie
				sessionStorage.setItem("toilet_countdown",parseInt(parseInt(sessionStorage.getItem("toilet_countdown"))-1));
			}
			else {//duree de vie epuisée, on delete
				for(i=0;i<toilets.length;i++) {
					$(toilets[i]).remove();
				}
			}
		}
		
	}
	
}

function updateAlcool(value) {
	
	sessionStorage.setItem("alcool",parseFloat(parseFloat(sessionStorage.getItem("alcool"))+value));
	$("#alcool").html(Math.round(sessionStorage.getItem("alcool")*10)/10+'g');
	
}


function updateScore(value) {
	
	sessionStorage.setItem("score",parseFloat(sessionStorage.getItem("score"))+value);
	$("#score").html(sessionStorage.getItem("score"));
	
}

function checkcollision() {
	
	//position joueur
	var left = parseInt($('#player').css("left"));
	var top = parseInt($('#player').css("top"));
	
	//biere ?
	var beers = $('[name="beer"]');
	for(i=0;i<beers.length;i++) {
		var beerleft = parseInt($(beers[i]).css("left"));
		var beertop = parseInt($(beers[i]).css("top"));
		if(beerleft==left && beertop==top) {
			$(beers[i]).remove();
			updateAlcool(0.2);
			updateScore(1);
		}
	}
	
	//toilettes ?
	var toilets = $('[name="wc"]');
	for(i=0;i<toilets.length;i++) {
		var wcleft = parseInt($(toilets[i]).css("left"));
		var wctop = parseInt($(toilets[i]).css("top"));
		if(wcleft==left && wctop==top) {
			$(toilets[i]).remove();
			if(parseFloat(sessionStorage.getItem("alcool"))>=2) {
				updateAlcool(-2);
			}
			updateScore(2);
		}
	}
	
	//boss ?
	var boss = $('[name="boss"]');
	for(i=0;i<boss.length;i++) {
		var bossleft = parseInt($(boss[i]).css("left"));
		var bosstop = parseInt($(boss[i]).css("top"));
		console.log(bossleft+"/"+left+"   "+bosstop+"/"+top);
		if(bossleft==left && bosstop==top) {
			$(boss[i]).remove();
			updateScore(-2);
		}
	}
	
	
	
	
}

function loop() {
	
	if($('#player').css("display")=="none") {
		init_player();
		morebeer();
	}
	
	
	setTimeout(function(){loop()},1000);
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
			$(".grid td").css("border-color",' #fb00f6');
			$(".grid tr").css("border-color",' #fb00f6');
			break;
	}
	
}
