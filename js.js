sessionStorage.setItem("alcool",0);
sessionStorage.setItem("score",0);
sessionStorage.setItem("code",0);
sessionStorage.setItem("toilet_countdown",0);
sessionStorage.setItem("beer_green",0);
sessionStorage.setItem("cops_direction",0);
sessionStorage.setItem("message_timer",0);
sessionStorage.setItem("coffee",0);
sessionStorage.setItem("coffee_move",0);
sessionStorage.setItem("player","boy");
var timerBeer = 0;

var cases = new Object();

function move_player(largeur,hauteur,e) {
	
	var moved = false;

		
	var event = e || window.event;
		
	if (1) {
		
		var tabletop = 100;
		var tableleft = $('#grid').offset().left;
				
		var left = parseFloat($('#player').css("left"));
		var top = parseFloat($('#player').css("top"));
		
		var key = event.keyCode || e;
		
		
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
				if(left-60>=0+tableleft && !is_wall(left-60,top)) {
					$('#player').css("left", left-60 );
					moved = true;
				}
				break;
			case 38:
			case 56: //haut pave num	
				if(top-60>=0+tabletop && !is_wall(left,top-60)) {
					$('#player').css("top", top-60 );
					moved = true;
				}
				break;
			case 39:
			case 54: //droite pave num
				if(left+60<largeur*60+tableleft && !is_wall(left+60,top)) {
					$('#player').css("left", left+60 );
					moved = true;
				}
				break;
			case 40:
			case 50: //bas pave num		
				if(top+60<hauteur*60+tabletop && !is_wall(left,top+60)) {
					$('#player').css("top", top+60 );
					moved = true;
				}
				break;
			default:
				break;
		}
	}
	
	if(sessionStorage.getItem("coffee")>0) {	
		sessionStorage.setItem("coffee",parseFloat(sessionStorage.getItem("coffee"))-1);
	}
	
	//on vide le div message
	if(parseFloat(sessionStorage.getItem("message_timer"))>0) {
		sessionStorage.setItem("message_timer",parseFloat(sessionStorage.getItem("message_timer"))-1);
	}
	else {		
		$("#message").hide();
	}
	
	if(moved) {
		moretoilet();
		moreboss();
		morecode();
		morecoffee();
		morecops();
		changeface();
		moreblock();
		
		checkcollision();
		move_boss();
		move_cops();
		checkcollision();
	}
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
	var left = parseFloat($('#player').css("left"));
	var top = parseFloat($('#player').css("top"));
	
	//position boss
	var boss = $('[name="boss"]');
	if(boss.length>0) {
		
		for(i=0;i<boss.length;i++) {
			
			var rand = Math.floor(Math.random()*10)+1;
			//le boss bouge une fois sur deux
			if(rand>5) {
			
				var bossleft = parseFloat($(boss[i]).css("left"));
				var bosstop = parseFloat($(boss[i]).css("top"));
				
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
			
			if( (parseFloat(sessionStorage.getItem("cops_direction"))==0 && copsleft<tableleft+540) 
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
				sessionStorage.setItem("cops_direction",Math.abs(parseFloat(sessionStorage.getItem("cops_direction"))-1));
				//$(cops[i]).css("left",copsleft+60);				
			}
		}
	}
	
}

function init_player() {
	change_player(getCookie("geek"));
	var tableleft = $('#grid').offset().left;
	$('#player').css("left", tableleft );
	$('#player').css("display","block");
	$('#regles').css("left", tableleft );
	
	$('#facebook').css("left", tableleft );
	$("#message").hide();
}

function morebeer() {

	var beers = $('[name="beer"]');
	if(beers.length==0) {
	
		var tabletop = 100;
		var tableleft = $('#grid').offset().left;
		
		var x=Math.floor((Math.random() * 10));
		var y=Math.floor((Math.random() * 10));
		
		while(!is_empty(tableleft+x*60,tabletop+y*60)) {
		
			x=Math.floor((Math.random() * 10));
			y=Math.floor((Math.random() * 10));
		
		}
		
		var newbeer = document.createElement('div');
		$(newbeer).addClass("beer");
		$(newbeer).addClass("objet");
		$(newbeer).attr("name", "beer");
		$(newbeer).css("left", tableleft+x*60 );
		$(newbeer).css("top", tabletop+y*60 );
		$(newbeer).appendTo($("#content"));
		checkcollision();
		
		loopBeer();
		
	}
		
}

function moreboss() {
	
	var boss = $('[name="boss"]');
	if(boss.length==0 && parseFloat(decrypt(sessionStorage.getItem("score")),"moreboss")>5 && Math.floor((Math.random() * 29))==1 ) {
	
		var tabletop = 100;
		var tableleft = $('#grid').offset().left;
		
		var x=Math.floor((Math.random() * 10));
		var y=Math.floor((Math.random() * 10));
		
		while(!is_empty(tableleft+x*60,tabletop+y*60)) {
		
			x=Math.floor((Math.random() * 10));
			y=Math.floor((Math.random() * 10));
		
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
	if(cops.length==0 && parseFloat(sessionStorage.getItem("alcool"))>3 /*&& Math.floor((Math.random() * 29))==1*/ ) {
		var tabletop = 100;
		var tableleft = $('#grid').offset().left;
		
		
		var x=Math.floor((Math.random() * 10));
		var y=Math.floor((Math.random() * 10));
		
		while(!is_empty(tableleft+x*60,tabletop+y*60)) {
		
			x=Math.floor((Math.random() * 10));
			y=Math.floor((Math.random() * 10));
		
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
	if(code.length<2 && Math.floor((Math.random() * 49))==1 ) {
	
		var tabletop = 100;
		var tableleft = $('#grid').offset().left;
		
		var x=Math.floor((Math.random() * 10));
		var y=Math.floor((Math.random() * 10));
		
		while(!is_empty(tableleft+x*60,tabletop+y*60)) {
		
			x=Math.floor((Math.random() * 10));
			y=Math.floor((Math.random() * 10));
		
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
	if(coffee.length<2 && Math.floor((Math.random() * 99))==1 ) {
	
		var tabletop = 100;
		var tableleft = $('#grid').offset().left;
		
		var x=Math.floor((Math.random() * 10));
		var y=Math.floor((Math.random() * 10));
		
		while(!is_empty(tableleft+x*60,tabletop+y*60)) {
		
			x=Math.floor((Math.random() * 10));
			y=Math.floor((Math.random() * 10));
		
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
		
			if(Math.floor((Math.random() * 30))==1) {
				
				var tabletop = 100;
				var tableleft = $('#grid').offset().left;
				var x=Math.floor((Math.random() * 10));
				var y=Math.floor((Math.random() * 10));
				while(!is_empty(tableleft+x*60,tabletop+y*60)) {
		
					x=Math.floor((Math.random() * 10));
					y=Math.floor((Math.random() * 10));
				
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
			if(parseFloat(sessionStorage.getItem("toilet_countdown"))>0) { //on decremente la duree de vie
				sessionStorage.setItem("toilet_countdown",parseFloat(parseFloat(sessionStorage.getItem("toilet_countdown"))-1));
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
	
	sessionStorage.setItem("score",crypt(parseFloat(decrypt(sessionStorage.getItem("score")),"updatescore")+value));
	$("#score").html(decrypt(sessionStorage.getItem("score"),"updatescore 2"));
	
}

function checkcollision() {
	
	
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
			if(parseInt(sessionStorage.getItem("beer_green"))>0) {
				updateScore(-2);
			}
			else {
				updateScore(1);
			}
			if(sessionStorage.getItem("coffee")>0) {
				updateScore(1);
			}
			clearTimeout(timerBeer);			
			sessionStorage.setItem("beer_green",0);
			done=0;
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
			sessionStorage.setItem("coffee",sessionStorage.getItem("coffee")+50);
			if(sessionStorage.getItem("coffee")>0) {
				updateScore(1);
			}
			$("#message").show();
			$("#message").html("Bonus café activé !");
			sessionStorage.setItem("message_timer",50);
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
				  async: false,
				  data: { player: getCookie("player"), score: decrypt(sessionStorage.getItem("score")) }
				});
				location.reload();
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
	
	var playerleft = parseFloat($('#player').css("left"));
	var playertop = parseFloat($('#player').css("top"));
	if(playerleft==left && playertop==top) {			
		return false;			
	}
	
	return true;
	
}

function is_wall(left,top) {
	
	var objets = $('.wall');
	for(var i=0;i<objets.length;i++) {
		
		var objetleft = parseFloat($(objets[i]).css("left"));
		var objettop = parseFloat($(objets[i]).css("top"));
		
		if(objetleft==left && objettop==top) {			
			return true;			
		}
		
	}
	return false;
	
}

function loop() {
	
	if($('#player').css("display")=="none") {
		init_player();
		morebeer();
		
		$("body").on('swipeleft',function(e,data){move_player(10,10,37);});
		$("body").on('swiperight',function(e,data){move_player(10,10,39);});
		$("body").on('swipeup',function(e,data){move_player(10,10,38);});
		$("body").on('swipedown',function(e,data){move_player(10,10,40);});
		
	}
	
	
	morejokes();
	check_blocked();
	
	
	setTimeout(function(){loop()},20000);
}
var done = 0;
function loopBeer() {
	if(done==1) {
		$(".beer").css("background",'url("green_beer.png")');
		sessionStorage.setItem("beer_green",1);
	}	
	done = 1;
	if(decrypt(sessionStorage.getItem("score"))>200) {
		timerBeer = setTimeout(function(){loopBeer()},5000);
	}
	else if(decrypt(sessionStorage.getItem("score"))>100) {
		timerBeer = setTimeout(function(){loopBeer()},10000);		
	}
	else {
		timerBeer = setTimeout(function(){loopBeer()},20000);		
	}
	
}

function change_player(player) {
	switch(parseInt(player)) {
		case 1:
		default:
			$("body").css("background",'url("bg.jpg")');
			$("#player").css("background",'url("player.png")');
			$("#player").css("background-size",'60px auto');
			$(".grid td").css("border-color",' #0af4fd');
			$(".grid tr").css("border-color",' #0af4fd');
			sessionStorage.setItem("player","boy");
			setCookie("geek",1,30);
			break;
		case 2:
			$("body").css("background",'url("bg_girl.jpg")');
			$("#player").css("background",'url("player_girl.png")');
			$("#player").css("background-size",'60px auto');
			$(".grid td").css("border-color",' #fb00f6');
			$(".grid tr").css("border-color",' #fb00f6');
			sessionStorage.setItem("player","girl");
			setCookie("geek",2,30);
			break;
	}
	
}

function ask_pseudo(force) {
	if(getCookie("player")=="" || force) {
		var i=0;
		while(player==null) {
			if(i==0) {
				var player = prompt("Pseudo :", "K3vin");
			}
			else {
				var player = prompt("On t'as demandé le pseudo boulet !", "K3vin");
			}
			i++;
		}
		setCookie("player",player,30);
		$("#pseudo").html(player);
	}
	else {
		$("#pseudo").html(getCookie("player"));
	}
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function remove_regles() {
	
	  $( "#regles" ).animate({
		opacity: 0.25,
		top: "+=600",
		height: "toggle"
	  }, 1500, function() {
			$( "#regles" ).remove();
	  });
	
}

function moreblock() {
	var blocks = $('[name="block"]');
	if(blocks.length<50) {
	if(decrypt(sessionStorage.getItem("score"),"moreblock") >100&& Math.floor((Math.random() * 99))==1) {
		
		var tabletop = 100;
		var tableleft = $('#grid').offset().left;
		
		var x=0;
		var y=0;
		
		while(!is_empty(tableleft+x*60,tabletop+y*60)) {
			console.log("qaa");
			if(x==9) {
				x=0;
				y++;
			}
			else {
				x++;
			}
		
		}
		
		var newblock = document.createElement('div');
		$(newblock).addClass("wall");
		$(newblock).addClass("objet");
		$(newblock).attr("name", "block");
		$(newblock).css("left", tableleft+x*60 );
		$(newblock).css("top", tabletop+y*60 );
		$(newblock).appendTo($("#content"));
		checkcollision();
		
		
	}
	}
}


function crypt(value) {
	var value2 = value*17;
	value2 = value2.toString(16);
	return value2;
}

function decrypt(value2,debug) {
	var value = parseInt(value2,16)/17;	
	if(parseInt(value)!=value) {
		value=0;
	}
	return value;
}


function getTouchDirection(dir) {
	if(dir=="right") {
		return 39;
	}
	else if(dir=="left") {
		return 37;
	}
	else if(dir=="up") {
		return 38;
	}
	else if(dir=="down") {
		return 40;
	}	
}

function morejokes () {

	if($("#jokes").length>0) {
		$("#jokes").remove();
	}
	
	
	var tabletop = 100;
	var tableleft = $('#grid').offset().left;
	var jokes = document.createElement('marquee');
	$(jokes).addClass("jokes");
	$(jokes).attr("name", "jokes");
	$(jokes).attr("id", "jokes");
	$(jokes).attr("behavior", "slide");
	$(jokes).attr("scrollamount", "40");
	$(jokes).css("left", tableleft );
	$(jokes).css("top", tabletop-20 );
	$.ajax({
		type: "POST",
		url: "add_score.php",
		complete: function(response){
			$(jokes).html(response.responseText);
			$(jokes).appendTo($("#content"));
		}
	});	
	
	
	

}

function is_blocked(left,top) {
	
	var tableleft = $('#grid').offset().left;
	if((is_wall(left-60,top) || left-60<tableleft)
	&& (is_wall(left+60,top) || left+60>600+tableleft)
	&& (is_wall(left,top-60) || top-60<100)
	&& (is_wall(left,top+60) || top+60>700)
	) {
		return true;
	}
	
	
}


function check_blocked() {
	if(score>100) {		
		//position joueur
		var left = parseFloat($('#player').css("left"));
		var top = parseFloat($('#player').css("top"));
		
		if(is_blocked(left,top)) {
			$('#player').remove();
			alert("Vous avez perdu !");
			$.ajax({
			  type: "POST",
			  url: "add_score.php",
			  async: false,
			  data: { player: getCookie("player"), score: decrypt(sessionStorage.getItem("score")) }
			});
			location.reload();
		}
		
		//position biere
		var beers = $('[name="beer"]');
		for(i=0;i<beers.length;i++) {
			var beerleft = parseFloat($(beers[i]).css("left"));
			var beertop = parseFloat($(beers[i]).css("top"));
			if(is_blocked(beerleft,beertop)) {
				$(beers[i]).remove();
				morebeer();
			}
		}
		
	}
}
