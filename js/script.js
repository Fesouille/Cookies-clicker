var score = 5000;
var cookieperclick = 1;

//variable pour check si des multiplicateurs sont acheter lors du BONUSTIME
var multiplicateur = 1;

// Initialisation du bonus
function bonusinit() {
  var b = document.querySelector(".maincontainer").appendChild(document.createElement("button"));
  b.setAttribute("id", "bonus");
  b.setAttribute("type", "button");
  b.setAttribute("value", "5000");
  b.appendChild(document.createTextNode("Bonus [Prix = 5000]"));
};

// !!! BONUS TIME !!!
// AJOUTER LE CHECK DE L'ACHAT DE MULTI LORS DU BONUS
function bonus_time() {

  score = score - 5000;
  cookieperclick = cookieperclick * 2;

  btps = 30;
  m = multiplicateur;

  bb = document.getElementById("bonus");
  bb.disabled = true;
  bb.innerHTML = "BONUS TIME " + btps + "s";

  var countdown = setInterval(function() {

    btps--;
    bb.innerHTML = "BONUS TIME " + btps + "s";

    if(btps < 1){
      cookieperclick = Math.floor(cookieperclick / 2);
      bb.innerHTML = "Bonus [Prix = 5000]";
      bb.disabled = false;
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
          cebtn.disabled = true;
        } else {
          cebtn.disabled = false;
        };
        break;

      case "bonus":
        if (score < 5000) {
          cebtn.disabled = true;
        } else {
          cebtn.disabled = false;
        };
        break;

      case "autoclic":
        if (score < autoclic_price) {
          cebtn.disabled = true;
        } else {
          cebtn.disabled = false;
        };
        break;
    }

  });

}

bonusinit();
checkprix();
document.getElementById("bonus").addEventListener("click", bonus_time);
