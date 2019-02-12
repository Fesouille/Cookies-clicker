var score = 0;
var cookieperclick = 1;
var multiplicateur = 1;
var mult_price = 10;
var benable = false;

//autoclic variables - BEGIN
var autoclic=false;
var autoclic_button=document.createElement("button");
autoclic_button.setAttribute("type", "button");
autoclic_button.setAttribute("id", "autoclic");
autoclic_button.setAttribute("class", "upgrade_button");
var autoclic_price=5;
var autoclic_count=0;
var autoclic_msg=document.createElement("p");
//Autoclic variables - END

(function() {
    /*Ted*/
    function addcookie(){
        score = score + cookieperclick;
        displayscore(score);
        add_autoclic(); /*Joseph*/
    };

    function displayscore(){
        document.getElementsByClassName("affichage")[0].setAttribute("value", score);
        document.getElementsByClassName("affichage")[0].innerHTML = "here your cookies : " + score;
    };

    // actualize score on display each millisecond
    setInterval(function(){
        displayscore(score);
        checkprix();  /*Antoine*/
    }, 10);

    //add cookie and displays it when clicked
    document.getElementById("click").addEventListener("click", function(){
        addcookie();
    });

    //lancement video apd score = 1.000.000
    var videoplay = setInterval(function(){
      if (score > 999999) {
        var video = document.querySelector(".maincontainer").appendChild(document.createElement("video"));
        video.setAttribute("src", "img/Cool Guys Don't Look At Explosions.mp4");
        video.setAttribute("autoplay", "true");
        video.setAttribute("preload", "auto");
        video.setAttribute("position", "absolute");
        video.requestFullscreen;
        clearInterval(videoplay);
      }
    }, 1);

    //explosions lors du clic sur le multiplier
    var tableExplosions = ["explosion.gif", "explosion-2.gif", "explosion-3.gif", "explosion-4.gif", "explosion-5.gif", "explosion-6.gif"]
    document.getElementById("multiplier").addEventListener("click",function() {
      var explode = document.querySelector(".maincontainer").appendChild(document.createElement("img"));
      explode.style.position = "absolute";
      explode.setAttribute("src", "img/"+ tableExplosions[Math.floor(tableExplosions.length * Math.random())]);
      explode.style.left = Math.random() *800 + "px";
      explode.style.top = Math.random() *600 + "px";
        
      setTimeout(function frame() {
        explode.parentNode.removeChild(explode);
      }, 3000);
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
			if(score==autoclic_price){
				document.querySelector(".maincontainer").appendChild(autoclic_button).innerHTML="Auto-clic "+autoclic_count+"x,  price="+autoclic_price;
				document.querySelector(".maincontainer").appendChild(autoclic_msg).innerHTML="Yeay, you've unlocked the autoclick! It clicks automatically every second :)";
				setTimeout(function(){document.querySelector(".maincontainer").removeChild(autoclic_msg)}, 3*1000);
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
  var b = document.querySelector(".maincontainer").appendChild(document.createElement("button"));
  b.setAttribute("id", "bonus");
  b.setAttribute("type", "button");
  b.setAttribute("value", "5000");
  b.setAttribute("class", "upgrade_button");
  b.appendChild(document.createTextNode("Bonus [Prix = 5000]"));
};

// !!! BONUS TIME !!!
// AJOUTER LE CHECK DE L'ACHAT DE MULTI LORS DU BONUS
function bonus_time() {

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

    if(m != multiplicateur){
      m
    }

    if(btps < 1){
      bb.addEventListener("click", bonus_time);
      benable = false;
      cookieperclick = cookieperclick / 2;
      bb.innerHTML = "Bonus [Prix = 5000]";
      bb.removeAttribute("disabled");
      clearInterval(countdown);
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

