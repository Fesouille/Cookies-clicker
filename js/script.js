var score =0;
var cookieperclick = 1;
//autoclic variables - BEGIN
var autoclic=false;
var autoclic_button=document.createElement("button");
autoclic_button.setAttribute("type", "button");
autoclic_button.setAttribute("id", "autoclic");
autoclic_button.setAttribute("class", "upgrade_button");
var autoclic_price=5;
var autoclic_msg=document.createElement("p");
//Autoclic variables - END

function addcookie(){
    score = score + cookieperclick;
    displayscore(score);
    add_autoclic();
}

function displayscore(){
    document.getElementsByClassName("affichage")[0].setAttribute("value", score);
    document.getElementsByClassName("affichage")[0].innerHTML = "here your cookies : " + score;
};

function make_price(price){
	return price*2;
}

/*WARNING: This functions must be added in the addcookie() function or any function that add cookies to the counter
--> Initialize the autoclic, gives a message to the user to be deleted after a moment.
i.e. if it does not exists, it creates it. If it does, it calls the check_autoclic() functions*/
function add_autoclic(){
	if(autoclic==false){
		if(score==autoclic_price){
			document.querySelector(".maincontainer").appendChild(autoclic_button).innerHTML="Auto-clic,  price="+autoclic_price;
			document.querySelector(".maincontainer").appendChild(autoclic_msg).innerHTML="Yeay, you've unlocked the autoclick! It clicks automatically every second :)";
			setTimeout(function(){document.querySelector(".maincontainer").removeChild(autoclic_msg)}, 3*1000);
			autoclic=true;
		}
	}
	else{
		check_autoclic();
	}
}

//Autoclic functions - BEGIN
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
	autoclic_button.innerHTML="Auto-clic, price="+autoclic_price;
	check_autoclic();
	setInterval(addcookie, 1000);
})
//Autoclic functions - END

document.getElementById("click").addEventListener("click", function(){
    addcookie();
});

