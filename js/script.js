var score = 0;
var cookieperclick = 1;
var multiplicateur = 1;
var mult_price = 10;
var benable = false;

//autoclic variables - BEGIN
  //to specify that the autoclic does not exist yet
  var autoclic=false;
  //creation of the autoclic button
  var autoclic_button=document.createElement("button");
  autoclic_button.setAttribute("type", "button");
  autoclic_button.setAttribute("id", "autoclic");
  autoclic_button.setAttribute("class", "upgrade_button");
  //value to buy an autoclic
  var autoclic_price=500;
  //score value to get a free autoclic
  var autoclic_free=200;
  //counting the number of autoclic.. init is 1 cause we get one free
  var autoclic_count=1;
  var autoclic_msg=document.createElement("p");
  autoclic_msg.setAttribute("id", "autoclic_msg");
  autoclic_msg.setAttribute("style", "top:"+(Math.random()*200)+"px");
  autoclic_msg.setAttribute("style", "left:"+(Math.random()*450)+"px");
//Autoclic variables - END

//These functions are made to launch different sounds when clicking on the upgrades and bonus button.
var bonus_audio=document.createElement('audio');
bonus_audio.setAttribute('src', '../Cookies-clicker/special_effects/bonus_time.mp3');

function cookie_sound(){
	var cookie_sound=document.createElement('audio');
	cookie_sound.setAttribute('src', '../Cookies-clicker/special_effects/cookie_sound.mp3');
	cookie_sound.play();
}

function upgrade_sound(){
	var cookie_upgrade=document.createElement('audio');
	cookie_upgrade.setAttribute('src', '../Cookies-clicker/special_effects/cookie_power.mp3');
	cookie_upgrade.play();
}
//END of the sounds functions

(function() {

    function addcookie(){
        score = score + cookieperclick;
        displayscore(score);
        add_autoclic();
        console.log(cookieperclick);
    };

    setInterval(function(){
        displayscore(score);
        checkprix();
    }, 10);

    function displayscore(){
        document.getElementsByClassName("affichage")[0].setAttribute("value", score);
        document.getElementsByClassName("affichage")[0].innerHTML = "Here your cookies : " + score;
    };

    // actualize score on display each millisecond
    setInterval(function(){
        displayscore(score);
        checkprix();  /*Antoine*/
    }, 10);

    //add cookie and displays it when clicked
    document.getElementById("click").addEventListener("click", function(){
        addcookie();
        cookie_sound();
    });

    //lancement video apd score = 1.000.000
    var videoplay = setInterval(function(){
      if (score > 50) {
        var video = document.querySelector("body").appendChild(document.createElement("video"));
        video.setAttribute("src", "img/Cool Guys Don't Look At Explosions.mp4");
        video.setAttribute("autoplay", "true");
        video.setAttribute("preload", "auto");
				clearInterval(videoplay);
				setTimeout(function(){
					document.querySelector("body").removeChild(video);
				}, 150000);
      }
    }, 1);

    //explosions lors du clic sur le multiplier
    var tableExplosions = ["explosion.gif", "explosion-2.gif", "explosion-3.gif", "explosion-4.gif", "explosion-5.gif", "explosion-6.gif"]
    document.getElementById("multiplier").addEventListener("click",function() {
      var explode = document.querySelector(".maincontainer").appendChild(document.createElement("img"));
      explode.style.position = "absolute";
      explode.setAttribute("src", "img/"+ tableExplosions[Math.floor(tableExplosions.length * Math.random())]);
      explode.style.left = Math.random() *800 + "px";
      explode.style.top = Math.random() *400 + "px";

      setTimeout(function frame() {
        explode.parentNode.removeChild(explode);
      }, 1000);
    });
    /*Ted*/
/* Partie de JM */

    function augmenterMultiplicateur (){
        multiplicateur = multiplicateur + 1;
    };

    function make_price(price){
        return price*2;
    };

    document.getElementById("multiplier").innerHTML = "Multiplier x"+ multiplicateur + " Price: " + mult_price;

    document.getElementById("multiplier").addEventListener("click", function(){
		upgrade_sound();
            if (score >= mult_price){
                if(!benable){
                  cookieperclick = cookieperclick + multiplicateur;
                  console.log("normal");
                } else{
                  cookieperclick = cookieperclick + multiplicateur + multiplicateur;
                  console.log("bonus");
                }
                augmenterMultiplicateur(multiplicateur);
                document.getElementById("multiplier").innerHTML = "Multiplier x"+ multiplicateur + " Price: " + make_price(mult_price);
                score = score - mult_price;
                mult_price = make_price(mult_price);
                console.log(multiplicateur, cookieperclick, score, mult_price);
            };
        });

	//Autoclic functions - BEGIN
	/*WARNING: This functions must be added in the addcookie() function or any function that add cookies to the counter
	--> Initialize the autoclic, gives a message to the user to be deleted after a moment.
	i.e. if it does not exists, it creates it. If it does, it calls the check_autoclic() functions*/
	function add_autoclic(){
		if(autoclic==false){
			if(score>=autoclic_free){
				document.querySelector("#autoclic_col").appendChild(autoclic_button).innerHTML="Auto-clic "+autoclic_count+"x,  price="+autoclic_price;
        setInterval(addcookie, 1000);
				document.querySelector("#second_container").appendChild(autoclic_msg).innerHTML="Yeay, you've unlocked the autoclick! It clicks automatically every second :)";
				setTimeout(function(){document.querySelector("#second_container").removeChild(autoclic_msg)}, 4*1000);
				autoclic=true;
			}
		}
		else{
			check_autoclic();
		}
	}

	/*this function checks if user got enough cookies to buy an autoclic*/
	function check_autoclic(){
		if(score<autoclic_price){
				autoclic_button.disabled=true;
			}
			if(score>=autoclic_price){
				autoclic_button.disabled=false;
			}
	}

	/*To buy an autoclic
	- on click, the score is decremented by the autoclic_price
	- the score on screen is updated
	- a new autoclic_price is calculated and updated on screen
	- check_autoclic() function is called to make sure user cannot buy another one after new price is calculated
	- finally, launch an interval for the function addcookie() every seconds*/
	autoclic_button.addEventListener("click", function(){
		upgrade_sound();
		score-=autoclic_price;
		displayscore(score);
		autoclic_price=make_price(autoclic_price);
		autoclic_count++;
		autoclic_button.innerHTML="Auto-clic "+autoclic_count+"x,  price="+autoclic_price;
    check_autoclic();
		setInterval(addcookie, 1000);
	})
	//Autoclic functions - END

}());

// Initialisation du bonus
function bonusinit() {
  var b = document.querySelector("#bonus_col").appendChild(document.createElement("button"));
  b.setAttribute("id", "bonus");
  b.setAttribute("type", "button");
  b.setAttribute("value", "5000");
  b.setAttribute("class", "upgrade_button");
  b.appendChild(document.createTextNode("Bonus [Prix = 5000]"));
};

// !!! BONUS TIME !!!
// AJOUTER LE CHECK DE L'ACHAT DE MULTI LORS DU BONUS
function bonus_time() {
  bonus_audio.play();
  score = score - 5000;
  cookieperclick = cookieperclick * 2;

  benable = true;
  btps = 30;
  m = multiplicateur;

  bb = document.getElementById("bonus");
  bb.setAttribute('disabled', 'true');
  bb.innerHTML = "BONUS TIME " + btps + "s";
  bb.removeEventListener("click", bonus_time);

  var countdown = setInterval(function() {

    btps--;
    bb.innerHTML = "BONUS TIME " + btps + "s";

    if(btps < 1){
      bb.addEventListener("click", bonus_time);
      benable = false;
      cookieperclick = cookieperclick / 2;
      bb.innerHTML = "Bonus [Prix = 5000]";
      bb.removeAttribute("disabled");
      clearInterval(countdown);
      bonus_audio.pause();
      bonus_audio.currentTime = 0;
    }

  }, 1000);

};

//le juste prix
function checkprix() {

  btns = document.querySelectorAll("button");

  btns.forEach(function(cebtn) {

    switch (cebtn.id) {

      case "multiplier":
        if (score < mult_price) {
          cebtn.disabled=true;
        } else {
          cebtn.disabled=false;
        };
        break;

      case "bonus":
        if (score < 5000 || benable) {
          cebtn.disabled=true;
        } else {
          cebtn.disabled=false;
        };
        break;

      case "autoclic":
        if (score < autoclic_price) {
          cebtn.disabled=true;
        } else {
          cebtn.disabled=false;
        };
        break;
    }

  });

}

bonusinit();

document.getElementById("bonus").addEventListener("click", bonus_time);


//Raining Cookies
var tableCookies=["mm.png","rainingCookie.png","oreo.png"];
document.getElementById("click").addEventListener("click", function (){
  var elem = document.querySelector("#cookies").appendChild(document.createElement("img"));
  elem.style.position = "absolute";
  elem.style.width="50px";
  elem.style.height="50px";
  elem.style.zIndex="1";
  var angle = Math.random()*360;
  elem.style.transform= "rotate(" + angle + "deg)";
  elem.setAttribute("src", "img/"+ tableCookies[Math.floor(tableCookies.length * Math.random())]);
  elem.style.left = Math.random() *95 + "%";
  var pos = 0;
  var angle = Math.random() * 360;
  var id = setInterval(frame, 10);
  function frame() {
    if (pos == 600) {
      clearInterval(id);
      elem.parentNode.removeChild(elem);
    } else {
      pos++;
      elem.style.top = pos + 'px';
      elem.style.transform= "rotate("+ (angle + pos) + "deg)";
    }
  }
});

// document.body.style.background
