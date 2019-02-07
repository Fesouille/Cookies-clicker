var score =0;
var cookieperclick = 1;
//autoclick variables - BEGIN
var autoclick=false;
var autoclick_button=document.createElement("button");
autoclick_button.setAttribute("type", "button");
autoclick_button.setAttribute("id", "autoclick");
var autoclick_timer;
var autoclick_price=5;
//Autoclick variables - END

function addcookie(){
    score = score + cookieperclick;
    displayscore(score);
    add_autoclick();
}

function displayscore(){
    document.getElementsByClassName("affichage")[0].setAttribute("value", score);
    document.getElementsByClassName("affichage")[0].innerHTML = "here your cookies : " + score;
};

function make_price(price){
	return price*2;
}

//Autoclick functions - BEGIN
/*this function checks if user got enough cookies to buy an autoclick*/
function check_autoclick(){
	if(score<autoclick_price){
			autoclick_button.disabled=true;
		}
		if(score>=autoclick_price){
			autoclick_button.disabled=false;
		}
}

/*Initialize the autoclick
i.e. if it does not exists, it creates it. If it does, it calls the check_autoclick() functions
WARNING: This functions must be added in the addcookie() function or any function that add cookies to the counter*/
function add_autoclick(){
	if(autoclick==false){
		if(score==autoclick_price){
			document.querySelector(".maincontainer").appendChild(autoclick_button).innerHTML="Auto-click,  price="+autoclick_price;
			autoclick=true;
		}
	}
	else{
		check_autoclick();
	}
}
/*To buy an autoclick
- on click, the score is decremented by the autoclick_price
- the score on screen is updated
- a new autoclick_price is calculated and updated on screen
- check_autoclick() function is called to make sure user cannot buy another one after new price is calculated
- finally, launch an interval for the function addcookie() every seconds*/
autoclick_button.addEventListener("click", function(){
	score-=autoclick_price;
	displayscore(score);
	autoclick_price=make_price(autoclick_price);
	autoclick_button.innerHTML="Auto-click, price="+autoclick_price;
	check_autoclick();
	setInterval(addcookie, 1000);
})
//Autoclick functions - END

document.getElementById("click").addEventListener("click", function(){
    addcookie();
});

