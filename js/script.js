var score =0;
var cookieperclick = 1;
var autoclick=false;
var free_autoclick;

function addcookie(){
    score = score + cookieperclick;
    displayscore(score);
    console.log(score);
    add_autoclick();
}

function displayscore(){
    document.getElementsByClassName("affichage")[0].setAttribute("value", score);
    document.getElementsByClassName("affichage")[0].innerHTML = "here your cookies : " + score;
};

function make_price(price){
	return price*2;
}
//!! this must be placed everywhere the score is updated !!
function add_autoclick(){
	if(autoclick==false){
		if(score==10){
			var autoclick_button=document.createElement("button");
			autoclick_button.setAttribute("type", "button");
			autoclick_button.setAttribute("id", "autoclick");
			autoclick_button.setAttribute("style","opacity=0.5")
			document.querySelector(".maincontainer").appendChild(autoclick_button).innerHTML="Auto-click";
			autoclick=true;
		}
	}
	else{
		if(score>=10 && score <20){
			document.selectElementById("autoclick").style.opacity=0.5;
		}
		if(score>=20){
			document.selectElementById("autoclick").style.opacity=0;
		}
	}
}

document.getElementById("click").addEventListener("click", function(){
    addcookie();
});

