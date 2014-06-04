sessionStorage.setItem("alcool",0);
sessionStorage.setItem("score",0);
sessionStorage.setItem("code",0);
sessionStorage.setItem("toilet_countdown",0);
sessionStorage.setItem("cops_direction",0);
sessionStorage.setItem("message_timer",0);
sessionStorage.setItem("coffee",0);
sessionStorage.setItem("coffee_move",0);
sessionStorage.setItem("player","boy");

var cases = new Object();

function move_player(largeur,hauteur,e) {
	

	move_boss();
	move_cops();
	checkcollision();
		
	var event = e || window.event;
		
	if (event) {
		
		var tabletop = 100;
		var tableleft = $('#grid').offset().left;
				
		var left = parseFloat($('#player').css("left"));
		var top = parseFloat($('#player').css("top"));
		
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
	
	if(sessionStorage.getItem("coffee")>0) {	
		sessionStorage.setItem("coffee",parseInt(sessionStorage.getItem("coffee"))-1);
	}
	
	moretoilet();
	moreboss();
	morecode();
	morecoffee();
	morecops();
	checkcollision();
	changeface();
}

function changeface() {

	if(sessionStorage.getItem("player")=="boy") {
		if(sessionStorage.getItem("alcool")<3) {
			$("#player").css("background",'url("player.png")');
			$("#player").css("background-size",'60px auto');
		}
		else {
			$("#player").css("background",'url("player2.png")');
			$("#player").css("background-size",'60px auto');
		}
	}
	else {
		if(sessionStorage.getItem("alcool")<3) {
			$("#player").css("background",'url("player_girl.png")');
			$("#player").css("background-size",'60px auto');
		}
		else {
			$("#player").css("background",'url("player_girl2.png")');
			$("#player").css("background-size",'60px auto');
		}
	}

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
						if(is_empty(bossleft-60,bosstop)) {
							$(boss[i]).css("left",bossleft-60);
						}
					}
					else {
						//droite
						if(is_empty(bossleft+60,bosstop)) {
							$(boss[i]).css("left",bossleft+60);
						}
					}
					
				}
				else {
					//on bouge top
					if(bosstop>top) {
						//haut
						if(is_empty(bossleft,bosstop-60)) {
							$(boss[i]).css("top",bosstop-60);
						}
					}
					else {
						//bas
						if(is_empty(bossleft,bosstop+60)) {
							$(boss[i]).css("top",bosstop+60);
						}
					}
				}
			}
		}
	}
	
}

function move_cops() {
	//les flics bougent en ligne droite
	var tableleft = $('#grid').offset().left;
	var cops = $('[name="cops"]');
	if(cops.length>0) {		
		for(i=0;i<cops.length;i++) {
			var copsleft = parseFloat($(cops[i]).css("left"));
			var copstop = parseFloat($(cops[i]).css("top"));
			
			if( (parseInt(sessionStorage.getItem("cops_direction"))==0 && copsleft<tableleft+540) 
			&& is_empty(copsleft+60,copstop)  ) {
				//droite
				sessionStorage.setItem("cops_direction",0);
				$(cops[i]).css("left",copsleft+60);
			}
			else if(copsleft>=tableleft+60 && is_empty(copsleft-60,copstop)) {
				//gauche
				sessionStorage.setItem("cops_direction",1);
				$(cops[i]).css("left",copsleft-60);
			}
			else {
				//droite
				sessionStorage.setItem("cops_direction",Math.abs(parseInt(sessionStorage.getItem("cops_direction"))-1));
				//$(cops[i]).css("left",copsleft+60);				
			}
		}
	}
	
}

function init_player() {
	var tableleft = $('#grid').offset().left;
	$('#player').css("left", tableleft );
	$('#player').css("display","block");
	$('#regles').css("left", tableleft );
	
}

function morebeer() {

	var beers = $('[name="beer"]');
	if(beers.length==0) {
	
		var tabletop = 100;
		var tableleft = $('#grid').offset().left;
		
		var x=Math.floor((Math.random() * 9) + 1);
		var y=Math.floor((Math.random() * 9) + 1);
		
		while(!is_empty(tableleft+x*60,tabletop+y*60)) {
		
			x=Math.floor((Math.random() * 9) + 1);
			y=Math.floor((Math.random() * 9) + 1);
		
		}
		
		var newbeer = document.createElement('div');
		$(newbeer).addClass("beer");
		$(newbeer).addClass("objet");
		$(newbeer).attr("name", "beer");
		$(newbeer).css("left", tableleft+x*60 );
		$(newbeer).css("top", tabletop+y*60 );
		$(newbeer).appendTo($("#content"));
		checkcollision();
		
	}
		
}

function moreboss() {
	
	var boss = $('[name="boss"]');
	if(boss.length==0 && parseFloat(sessionStorage.getItem("score"))>5 && Math.floor((Math.random() * 29) + 1)==1 ) {
	
		var tabletop = 100;
		var tableleft = $('#grid').offset().left;
		
		var x=Math.floor((Math.random() * 9) + 1);
		var y=Math.floor((Math.random() * 9) + 1);
		
		while(!is_empty(tableleft+x*60,tabletop+y*60)) {
		
			x=Math.floor((Math.random() * 9) + 1);
			y=Math.floor((Math.random() * 9) + 1);
		
		}
		
		var newboss = document.createElement('div');
		$(newboss).addClass("boss");
		$(newboss).addClass("objet");
		$(newboss).attr("name", "boss");
		$(newboss).css("left", tableleft+x*60 );
		$(newboss).css("top", tabletop+y*60 );
		$(newboss).appendTo($("#content"));
		checkcollision();
		
	}

}

function morecops() {
	
	var cops = $('[name="cops"]');
	if(cops.length==0 && parseFloat(sessionStorage.getItem("alcool"))>3 /*&& Math.floor((Math.random() * 29) + 1)==1*/ ) {
		var tabletop = 100;
		var tableleft = $('#grid').offset().left;
		
		
		var x=Math.floor((Math.random() * 9) + 1);
		var y=Math.floor((Math.random() * 9) + 1);
		
		while(!is_empty(tableleft+x*60,tabletop+y*60)) {
		
			x=Math.floor((Math.random() * 9) + 1);
			y=Math.floor((Math.random() * 9) + 1);
		
		}
		
		var newcops = document.createElement('div');
		$(newcops).addClass("cops");
		$(newcops).addClass("objet");
		$(newcops).attr("name", "cops");
		$(newcops).css("left", tableleft+x*60 );
		$(newcops).css("top", tabletop+y*60 );
		$(newcops).appendTo($("#content"));
		checkcollision();
		
	}

}

function morecode() {
	
	var code = $('[name="code"]');
	if(code.length<2 && Math.floor((Math.random() * 49) + 1)==1 ) {
	
		var tabletop = 100;
		var tableleft = $('#grid').offset().left;
		
		var x=Math.floor((Math.random() * 9) + 1);
		var y=Math.floor((Math.random() * 9) + 1);
		
		while(!is_empty(tableleft+x*60,tabletop+y*60)) {
		
			x=Math.floor((Math.random() * 9) + 1);
			y=Math.floor((Math.random() * 9) + 1);
		
		}
		
		
		var newcode = document.createElement('div');
		$(newcode).addClass("code");
		$(newcode).addClass("objet");
		$(newcode).attr("name", "code");
		$(newcode).css("left", tableleft+x*60 );
		$(newcode).css("top", tabletop+y*60 );
		$(newcode).appendTo($("#content"));
		checkcollision();
		
	}

}


function morecoffee() {
	
	var coffee = $('[name="coffee"]');
	if(coffee.length<2 && Math.floor((Math.random() * 99) + 1)==1 ) {
	
		var tabletop = 100;
		var tableleft = $('#grid').offset().left;
		
		var x=Math.floor((Math.random() * 9) + 1);
		var y=Math.floor((Math.random() * 9) + 1);
		
		while(!is_empty(tableleft+x*60,tabletop+y*60)) {
		
			x=Math.floor((Math.random() * 9) + 1);
			y=Math.floor((Math.random() * 9) + 1);
		
		}
		
		
		var newcoffee = document.createElement('div');
		$(newcoffee).addClass("coffee");
		$(newcoffee).addClass("objet");
		$(newcoffee).attr("name", "coffee");
		$(newcoffee).css("left", tableleft+x*60 );
		$(newcoffee).css("top", tabletop+y*60 );
		$(newcoffee).appendTo($("#content"));
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
				while(!is_empty(tableleft+x*60,tabletop+y*60)) {
		
					x=Math.floor((Math.random() * 9) + 1);
					y=Math.floor((Math.random() * 9) + 1);
				
				}
				
				
				var toilet = document.createElement('div');
				$(toilet).addClass("wc");
				$(toilet).addClass("objet");
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

function updateCode(value) {
	
	sessionStorage.setItem("code",parseFloat(parseFloat(sessionStorage.getItem("code"))+value));
	$("#code").html(Math.round(sessionStorage.getItem("code")*10)/10);
	
}


function updateScore(value) {
	
	sessionStorage.setItem("score",parseFloat(sessionStorage.getItem("score"))+value);
	$("#score").html(sessionStorage.getItem("score"));
	
}

function checkcollision() {
	
	//on vide le div message
	if(parseFloat(sessionStorage.getItem("message_timer"))>0) {
		sessionStorage.setItem("message_timer",parseFloat(sessionStorage.getItem("message_timer"))-1);
	}
	else {		
		$("#message").hide();
	}
	
	
	//position joueur
	var left = parseFloat($('#player').css("left"));
	var top = parseFloat($('#player').css("top"));
	
	//biere ?
	var beers = $('[name="beer"]');
	for(i=0;i<beers.length;i++) {
		var beerleft = parseFloat($(beers[i]).css("left"));
		var beertop = parseFloat($(beers[i]).css("top"));
		if(beerleft==left && beertop==top) {
			$(beers[i]).remove();
			updateAlcool(0.2);
			updateScore(1);
			if(sessionStorage.getItem("coffee")>0) {
				updateScore(1);
			}
			morebeer();
		}
	}
	
	//toilettes ?
	var toilets = $('[name="wc"]');
	for(i=0;i<toilets.length;i++) {
		var wcleft = parseFloat($(toilets[i]).css("left"));
		var wctop = parseFloat($(toilets[i]).css("top"));
		if(wcleft==left && wctop==top) {
			$(toilets[i]).remove();
			if(parseFloat(sessionStorage.getItem("alcool"))>=2) {
				updateAlcool(-2);
			}
			updateScore(2);
			if(sessionStorage.getItem("coffee")>0) {
				updateScore(2);
			}
		}
	}
	
	//boss ?
	var boss = $('[name="boss"]');
	for(i=0;i<boss.length;i++) {
		var bossleft = parseFloat($(boss[i]).css("left"));
		var bosstop = parseFloat($(boss[i]).css("top"));
		if(bossleft==left && bosstop==top) {
			$(boss[i]).remove();
			if(parseFloat(sessionStorage.getItem("code"))>0) {
				//si pages codées, le boss en prend une
				updateCode(-1);
				$("#message").show();
				$("#message").html("Le boss vous a pris une page de code");
				sessionStorage.setItem("message_timer",10);
			}
			else {
				//pas de pages codées, le boss diminue le score
				updateScore(-2);
				$("#message").show();
				$("#message").html("Pas de page de code, vous avez perdu 2 points");
				sessionStorage.setItem("message_timer",10);
			}
		}
	}
	
	//code ?
	var code = $('[name="code"]');
	for(i=0;i<code.length;i++) {
		var codeleft = parseFloat($(code[i]).css("left"));
		var codetop = parseFloat($(code[i]).css("top"));
		if(codeleft==left && codetop==top) {
			$(code[i]).remove();
			updateScore(1);
			updateCode(1);
			if(sessionStorage.getItem("coffee")>0) {
				updateScore(1);
			}
		}
	}
	
	//coffee ?
	var coffee = $('[name="coffee"]');
	for(i=0;i<coffee.length;i++) {
		var coffeeleft = parseFloat($(coffee[i]).css("left"));
		var coffeetop = parseFloat($(coffee[i]).css("top"));
		if(coffeeleft==left && coffeetop==top) {
			$(coffee[i]).remove();
			updateScore(1);
			sessionStorage.setItem("coffee",30);
			if(sessionStorage.getItem("coffee")>0) {
				updateScore(1);
			}
			$("#message").show();
			$("#message").html("Bonus café activé !");
			sessionStorage.setItem("message_timer",10);
		}
	}
	
	
	//cops ?
	var cops = $('[name="cops"]');
	for(i=0;i<cops.length;i++) {
		var copsleft = parseFloat($(cops[i]).css("left"));
		var copstop = parseFloat($(cops[i]).css("top"));
		if(copsleft==left && copstop==top) {
			$(cops[i]).remove();
			if(parseFloat(sessionStorage.getItem("alcool"))>3) {
				$('#player').remove();
				alert("Vous avez perdu !");
				$.ajax({
				  type: "POST",
				  url: "add_score.php",
				  data: { player: "John", score: sessionStorage.getItem("score") }
				});
			}
		}
	}
	
	
}

function is_empty(left,top) {
	
	var objets = $('.objet');
	for(var i=0;i<objets.length;i++) {
		
		var objetleft = parseFloat($(objets[i]).css("left"));
		var objettop = parseFloat($(objets[i]).css("top"));
		
		if(objetleft==left && objettop==top) {			
			return false;			
		}
		
	}
	return true;
	
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
			sessionStorage.setItem("player","boy");
			break;
		case 2:
			$("body").css("background",'url("bg_girl.jpg")');
			$("#player").css("background",'url("player_girl.png")');
			$("#player").css("background-size",'60px auto');
			$(".grid td").css("border-color",' #fb00f6');
			$(".grid tr").css("border-color",' #fb00f6');
			sessionStorage.setItem("player","girl");
			break;
	}
	
}
